---
title: Rstudio：软换行
author: 黄国政
date: '2025-05-18'
slug: rstudio-soft-wrap
categories: []
tags:
  - R
  - Rstudio
  - 技术折腾
---

<!--more-->

## 在 Rstudio 中实现「软换行」效果 

最新版的 Rstudio 默认关闭了「软换行」（soft wrap），导致一行中的文本无论写得多长，编辑器也不会自动在窗口边界处将其换行。

「软换行」的设置方法如下：

1. 打开 Rstudio。

2. 点击菜单栏中的 `Tools`，然后选择 `Global Options`。

3. 在弹出的窗口中，选择 `Code` 选项卡。

4. 在 `Editing` 部分，找到 `Soft-wrap source files` 选项。

5. 勾选该选项。

6. 点击 `Apply` 进行应用。

这是未设置「软换行」的情况下呈现的界面：

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/05/05-18-1.png)

这是设置「软换行」后的界面：

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/05/05-18-2.png)

## 什么是「软换行」

「软换行」（soft wrap）指的是在文本编辑器中，当一行文本过长时，自动换行到下一行，而不是插入换行符。这样可以保持文本在编辑器界面中的可读性，同时避免在打印或显示时出现不必要的换行。

对「软换行」的解释让人联想到「硬换行」，两者都对一段文本进行了分行处理，但不同在于，后者会在文本的换行点中插入实际的换行符，这意味着文本实际上已经被换行了；但前者只是在视觉效果上呈现出文本被分行的效果，而文本实际上仍然处于同一行。

例如此刻我在 Rtudio 编辑器中输入的文本，实际上并没有换行，但在编辑器中却呈现出换行的效果，这就是「软换行」。

## `wbr` 标签：软换行的一种实现

`<br>` 标签是 HTML 中的换行标签，它会在文本中插入一个换行符，导致文本在该位置断开并换行，在这一层面上，可以将其理解为「硬换行」，示例如下：

<div class="highlight-block">

```html
<p>这是第一行<br>这是第二行</p>
```

<p>这是第一行<br>这是第二行</p>

</div>

`<wbr>` 则是 HTML5 中的新标签，全称是「Word Break Opportunity」，被翻译为「单词换行时机」或「软换行」，用于告知浏览器这是一个可以换行的地方，但本身不会输出任何字符，也不插入空格或标点，更不会强制换行，只是提供一个换行的机会——在浏览器布局中，如果文本过长，浏览器会优先考虑在 `<wbr>` 标签处进行换行。示例如下（效果要在不同宽距的界面比较中看出，如电脑端和手机端）：

<div class="highlight-block">

```html
这是一个超长单词：aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<wbr>bbbbbbbbbbbbbbbb
```

这是一个超长单词：aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<wbr>bbbbbbbbbbbbbbbb

</div>

一般情况下，我们或许会在博客写作中发现，即便某些区域的文本占据的空间会受到网站布局限制，但是过长的网站却会突破限制，导致文本溢出，十分不美观（文本溢出的效果在较小的浏览界面中显示。如手机端）。

1. https://wu-yikun.github.io/post/%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7/markdown-mathjax-basic-tutorial-and-quick-reference/

此时可以使用 `<wbr>` 标签解决这个问题。[^1]示例如下（同样需要在较小的浏览界面中显示，如手机端）：

[^1]: [雅虎风格指南](https://web.archive.org/web/20121014054923/http://styleguide.yahoo.com/)建议[在标点之前为 URL 换行](https://web.archive.org/web/20121105171040/http://styleguide.yahoo.com/editing/treat-abbreviations-capitalization-and-titles-consistently/website-names-and-addresses)，以避免在行尾留下可能被读者误认为是 URL 末尾的标点符号。

<div class="highlight-block">

```html
1. https://wu-yikun<wbr>.github<wbr>.io<wbr>/post<wbr>/%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7<wbr>/markdown-mathjax-basic-tutorial-and-quick-reference/
```

1. https://wu-yikun<wbr>.github<wbr>.io<wbr>/post<wbr>/%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7<wbr>/markdown-mathjax-basic-tutorial-and-quick-reference/

</div>

## 参考资料

1. 叫我技术帝. 「Web前端基础知识：软换行使用详解」, 知乎专栏, 2020-09-30, https://zhuanlan<wbr>.zhihu<wbr>.com<wbr>/p/260793939, 访问日期：2025-05-18.
2. Mozilla’s MDN team. *\<wbr>: The Line Break Opportunity element*, MDN Web Docs, 2008-11-26,  https://developer<wbr>.mozilla<wbr>.org<wbr>/en-US<wbr>/docs<wbr>/Web<wbr>/HTML<wbr>/Reference<wbr>/Elements<wbr>/wbr, 访问日期：2025-05-18.
3. titaniumdecoy. *Difference between hard wrap and soft wrap?*, StackOverflow, 2008-11-26, https://stackoverflow<wbr>.com<wbr>/questions<wbr>/319925<wbr>/difference-between-hard-wrap-and-soft-wrap, 访问日期：2025-05-18.