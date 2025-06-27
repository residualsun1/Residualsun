---
title: Hugo Shortcode 的转义问题
author: 黄国政
date: '2025-06-26'
slug: escaping-in-hugo-shortcode
categories: []
tags:
  - Hugo
  - Shortcode
  - 与 AI 学习
---

<!--more-->

## 缘起

早些时候，我模仿益辉在网站设置了一个「更新说明」，但在我的网站使用了 Hugo 的短码（shortcode）功能，实现条件包括一个支持 shortcode 的 HTML 文件和修饰前者的 CSS 代码。

`layouts/shortcodes/update.html`:

```html
<!-- File: layouts/shortcodes/update.html -->
<fieldset class="update-notification">
  <legend>{{ .Get 0 }}</legend>
  <p>{{ .Inner }}</p>
</fieldset>
```

CSS：

```css
.update-notification {
  background-color: lightyellow;
  border: 1px solid #CCCCCC;
  border-radius: 5px;
  padding: 1em;
  margin: 1.5em 0;
}

.update-notification legend {
  font-weight: bold;
  font-size: 1em;
  padding: 0 0.5em;
}

.update-notification .update-body {
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, FandolKai, serif;
  font-size: .9em;
}
```

呈现出来的文本视觉效果如下：[^notice][^warning]

[^notice]: 这一类「更新信息」的说明后续被我称作「信息提示框」，并更换了实现的代码，具体可见《[Hugo 信息提示框设置](https://guozheng.rbind.io/project/hugo-info-grid/)》。
[^warning]: {{< notice danger "注意">}} `{\{< notice info "更新时间 2025 年 6 月 26 日">}}
那些美好的，越靠近越沉溺
{\{< /notice >}}` 部分本不应该有 `\`，但这里如果不加上 `\`，短码则会被执行，导致报错，后面也一样。{{< /notice >}}

<div class="highlight-block">

```
{\{< notice info "更新时间 2025 年 6 月 26 日">}}
那些美好的，越靠近越沉溺
{\{< /notice >}}
```

{{< notice info "更新时间 2025 年 6 月 26 日">}}
那些美好的，越靠近越沉溺
{{< /notice >}}

</div>

但是我却无法通过 Markdown 的语法实现文本加粗、换行、代码块、呈现表格等效果，只能通过 `<b></b>`、`<br>` 这一类 HTML 的标签实现加粗或换行效果，十分麻烦，而且能实现的效果也十分有限。

## 问题

根据 ChatGPT 的说法，Hugo 短码（shortcode）默认会对内容进行转义（escaping），特别是在 `{\{< shortcode >}} ... {\{< /shortcode >}}` 的格式下，它会将 Markdown、HTML 或代码中可能被误认为标签或语法的符号转换成普通的纯文本来显示，以防止它被解释或执行，进而无法解析或渲染出代码块、表格等效果。

例如在短码 `{\{< shortcode >}} ... {\{< /shortcode >}}` 中写下这段内容：

```
**我要加粗这段文字**
```

在不转义的情况下，浏览器会将 `**` 当作真正的 HTML 标签，渲染加粗效果：

<div class="highlight-block">

**我要加粗这段文字**

</div>

但在转义的情况下，浏览器不会将 `**` 当作标签，然后以文本的原样显示：

<div class="highlight-block">

\*\*我要加粗这段文字*\*

</div>

## 解决

解决方案是修改 `layouts/shortcodes/update.html`：

<div class="highlight-block">

原版本
```html
<!-- File: layouts/shortcodes/update.html -->
<fieldset class="update-notification">
  <legend>{{ .Get 0 }}</legend>
  <p>{{ .Inner }}</p>
</fieldset>
```

修改版本
```html
<!-- File: layouts/shortcodes/update.html -->
<fieldset class="update-notification">
  <legend>{{ .Get 0 }}</legend>
  {{ .Inner | markdownify }}
</fieldset>
```

</div>

问题出在 `<p>{{ .Inner }}</p>` 部分，`.Inner` 被放在 `<p>` 标签里，没有受到 Markdown 的渲染，因此写在短码内的代码块语法、表格语法、加粗语法等都不会被 Hugo 解释为 Markdown，而且，很明显的一个问题是表格语法在 `<p>` 标签中不合法，渲染了也会失败，所以解决方案是直接将 `<p>{{ .Inner }}</p>` 修改为 `{{ .Inner | markdownify }}`。

ChatGPT 还建议我用 `{{%/* */%}}` 的写法来代替 `{\{< >}}`，但在修改 `layouts/shortcodes/update.html` 后，我发现无论用 `{{%/* */%}}` 还是 `{\{< >}}` 效果都一样，都可以正常渲染短码内的 Markdown 语法。

对此，ChatGPT 的解释是<b> `{{ .Inner | markdownify }}` 的修改是关键，它强制 Hugo 无论用的是 `{\{< >}}` 还是 `{{%/* */%}}`，都把短码中的内容当成 Markdown 进行解析</b>。

`{\{< >}}` 和 `{{%/* */%}}` 具体区别如下：

| 写法            | 默认行为                 | 是否会解析 Markdown 内容           |
| ------------- | -------------------- | --------------------------- |
| `{\{< ... >}}` | **原样插入内容**           | ❌ 默认不解析，需要手动加 `markdownify` |
| `{{%/* ... */%}}` | **内容会被解析为 Markdown** | ✅ 自动解析                      |

<br>

| 情况                          | 推荐写法                    |
| --------------------------- | ----------------------- |
| 希望保留最原始的 Markdown 渲染一致性     | `{{%/* update */%}}`（语义更清晰） |
| 简单短码调用、或者已经手动 `markdownify` | `{\{< update >}}` 也可以    |
| 有嵌套短码需求（嵌套另一个 shortcode）    | `{{%/* update */%}}` 更安全    |

**我没有试过在不修改 `layouts/shortcodes/update.html` 的条件下使用 `{{%/* */%}}` 的效果**。

{{% notice info "2025.06.27 更新" %}}
我发现可以使用 `/* */` 对使用 `%%` 写法的短码进行注释，显示出来的短码是正常的，不会显示注释符号 `/* */` 本身。但我仍然没找到可以注释 `<>` 写法的短码，使用 `/* */` 会报错，虽然使用 `\` 不会报错，但是会显示出 `\` 符号。

因此，我决定统一采用 `%%` 的写法来书写信息提示框的短码。 
{{% /notice %}}