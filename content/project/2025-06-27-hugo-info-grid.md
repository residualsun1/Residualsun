---
title: Hugo 信息提示框设置
author: 黄国政
date: '2025-06-27'
slug: hugo-info-grid
categories: []
tags:
  - Hugo
  - CSS
  - Shortcode
  - 技术折腾
  - 与 AI 学习
---

<!--more-->

## 背景

[上文](https://guozheng.rbind.io/project/escaping-in-hugo-shortcode/)讲到的通过自定义 Hugo 短码 `update.html` + CSS 样式实现了这样一种功能：封装了一个用于告知读者更新信息的「信息展示区」，该「信息展示区」呈现为黄色矩形区域，左上角是更新信息的标题，如「2025.06.27 更新」，矩形区域部分则用于书写更新信息的正文内容。

{{% notice info "2025.06.27 更新" %}}
这段文本信息更新于 2025 年 6 月 27 日。
{{% /notice %}}

这一类「信息展示区」具备以下几种功能：

第一，随时通过 Hugo 短码进行调用（`{{%/* update "更新" */%}} ... {{%/* /update */%}}`）；  
第二，支持 Markdown 语法，可以呈现出代码、列表、表格等等；  
第三，样式美观，黄色背景、圆角边框和楷体字体使得展示信息内容突出醒目；  
第四，代码实现语义清晰，且可以重复调用，维护也很方便。  

总结起来，这有点像 Hugo 官方文档中的信息块，在此基础上，可以将这种「信息展示区」称为「信息提示框」，并不局限于「更新说明」的具体用途，还可以用来进行注意事项说明、信息警告等。为了将原来的「更新说明」拓展为囊括「更新说明」、「注意事项」、「信息警告」等多类信息指示的「信息提示框」，我决定以不同的颜色进行区分。

## 实现代码

首先将原来的 `layouts/shortcodes/update.html` 中的 `update.html` 文件更换为 `notice.html`，但文件所在路径仍然一致。

<div class="highlight-block">

`update.html`

```html
<!-- File: layouts/shortcodes/update.html -->
<fieldset class="update-notification">
  <legend>{{ .Get 0 }}</legend>
  {{ .Inner | markdownify }}
</fieldset>
```

`notice.html`

```html
<!-- layouts/shortcodes/notice.html -->
{{ $type := .Get 0 | default "info" }}
{{ $title := .Get 1 | default (print (title $type) " Notice") }}

<fieldset class="notice-box notice-{{ $type }}">
  <legend>{{ $title }}</legend>
  <div class="notice-body">
    {{ .Inner | markdownify }}
  </div>
</fieldset>
```

</div>

ChatGPT 最早给的拓展方案是以 `<div>` 替换了 `<fieldset>` 和 `<legend>`，但这样无法实现效果——至少不符合我的主题。[^1]得到我的反馈后，ChatGPT 说浏览器对 `<fieldset>` 和 `<legend>` 具有内建样式，`<fieldset>` 会有边框和内边距，`<legend>` 则会自动悬浮在边框上方当作标题，因此，即便没有设置 CSS，浏览器也会自动渲染出带标题的盒子。

[^1]: 我不清楚这是不是 Hugo 的特点，益辉博客的信息提示框也是以 `<fieldset>` 和 `<legend>` 来实现。

`notice.html` 设置好后得到了一个矩形的封装区域，为区别不同的信息指示，可以通过 CSS 来实现。我们用新的 CSS 代码取代旧的 CSS 代码即可。

<div class="highlight-block">

旧的 CSS 代码
```css
/*note增加编者说明*/

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

新的 CSS 代码
```css
/*notice 信息提示框*/

/* 信息提示框整体 */
.notice-box {
  border: 1px solid;
  border-radius: 5px;
  padding: 1em;
  margin: 1.5em 0;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1); /*这段代码让盒子更有层次感，视觉效果更好*/
}

/* 标题样式 */
.notice-box legend {
  font-weight: bold;
  font-size: 1em;
  padding: 0 0.5em;
}

/* 内容正文样式 */
.notice-body {
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, FandolKai, serif;
  font-size: .9em;
}

/* 不同类型的背景色和边框 */
.notice-info {
  border-color: #CCCCCC;
  background-color: lightyellow;
}

.notice-warning {
  border-color: #f0ad4e;
  background-color: #fff8e6;
}

.notice-danger {
  border-color: #d9534f;
  background-color: #ffecec;
}

.notice-success {
  border-color: #5cb85c;
  background-color: #e6f4ea;
}
```

</div>

在写作时，可以在短码中通过具体不同的 `notice` 类型来呈现不同的信息提示。

## 效果展示

<div class="highlight-block">

```Markdown
{{%/* notice info "信息提示" */%}}
这是一个 **信息框**，背景是浅黄色，适合普通提示。  
支持代码：`pip install package`  
也支持表格：

| 参数 | 说明       |
|------|------------|
| a    | 参数 a 描述  |
| b    | 参数 b 描述  |
{{%/* /notice */%}}
```

{{% notice info "信息提示" %}}
这是一个 **信息框**，背景是浅黄色，适合普通提示。  
支持代码：`pip install package`  
也支持表格：

| 参数 | 说明       |
|------|------------|
| a    | 参数 a 描述  |
| b    | 参数 b 描述  |
{{% /notice %}}

</div>

<div class="highlight-block">

```Markdown
{{%/* notice warning "警告提示" */%}}
这是一个 **警告框**，背景是淡橙色，提醒注意事项。  
请务必确认操作步骤，避免数据丢失！
{{%/* /notice */%}}
```

{{% notice warning "警告提示" %}}
这是一个 **警告框**，背景是淡橙色，提醒注意事项。  
请务必确认操作步骤，避免数据丢失！
{{% /notice %}}

</div>

<div class="highlight-block">

```Markdown
{{%/* notice danger "危险提示" */%}}
这是一个 **危险框**，背景是淡红色，提示严重错误或风险。  
请勿轻易跳过此提示！
{{%/* /notice */%}}
```

{{% notice danger "危险提示" %}}
这是一个 **危险框**，背景是淡红色，提示严重错误或风险。  
请勿轻易跳过此提示！
{{% /notice %}}

</div>

<div class="highlight-block">

```Markdown
{{%/* notice success "成功提示" */%}}
这是一个 **成功框**，背景是淡绿色，适合表示操作完成或成功。  
恭喜你，所有配置均已生效！
{{%/* /notice */%}}
```

{{% notice success "成功提示" %}}
这是一个 **成功框**，背景是淡绿色，适合表示操作完成或成功。  
恭喜你，所有配置均已生效！
{{% /notice %}}

</div>

## 额外问题

将原来的 `update.html` 文件更换后，`notice.html` 文件的代码也不再匹配过去在不同文章里设置的短码 `{{%/* update */%}}`，因此需要统一修改这些文章的短码，具体操作可见[下一篇文章](https://guozheng.rbind.io/project/vs-code-regular-expression)。