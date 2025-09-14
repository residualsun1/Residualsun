---
title: CSS 具体内容
author: 黄国政
date: '2025-09-14'
slug: front-end-class8
categories: []
tags:
  - 前端
  - CSS
draft: true
---

{{% notice content "示例" %}}

{{%/ notice %}}

<!--more-->

## 一、CSS 文本属性

### text-decoration

这是一个较为常用的属性，用于设置文字的装饰线，包括如下几种值：

* `none`：无任何装饰线，可以去除 a 元素默认的下划线
* `underline`：下划线
* `overline`：上划线
* `line-through`：中划线（删除线）

`a` 元素默认浏览器添加 `text-decoration: underline` 属性。利用 `span` 元素也可以实现类似 `a` 元素的效果，不止下划线的样式，还有鼠标光标悬停在元素包裹的内容上方时的图案——通过 `cursor: pointer` 实现。虽然各种元素之间可以相互模拟，但还是做到见名知意为好。

{{% notice content "示例" %}}
```CSS
<style>
  .google {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
```

```HTML
<span class="google">谷歌</span>
```

<style>
  .google {
    text-decoration: underline;
    cursor: pointer;
  }
</style>

<span class="google">谷歌</span>
{{%/ notice %}}

几种参数当中，实际应用得较多的还是 `none`，一些网站往往会将文本上的超链接下划线去除，我们可以通过在引入的 CSS 文件 `reset.css` 中设置的 `text-decoration: none` 来实现。

往后可以将 `border-bottom` 与 `border-top` 两个属性分别与 `text-decoration: underline` 和 `text-decoration: overline` 区别一下。

### text-transform

### text-indent

### text-align

### word/letter-spacing

## 二、CSS 字体属性



## 三、CSS 常见选择器


