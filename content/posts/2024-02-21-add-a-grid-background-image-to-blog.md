---
title: 如何给博客网页添加网格背景图
author: 黄国政
date: '2024-02-21'
slug: add-a-grid-background-image-to-blog
categories: []
tags:
  - 技术折腾
  - CSS
---

<!--more-->

一位名为[天仙子](https://tianxianzi.me/)的博主的博客主题很是好看，背景以网格状呈现，字体18px，配色看起来也很舒适。

我顺着博客的页面找下去，摸到了[主题模板](https://github.com/SumiMakito/hexo-theme-typography)，遗憾的是它属于[Hexo](https://hexo.io/)，不属于[Hugo](https://gohugo.io/)。在Github上搜索hugo-theme-typography也无果。

这再一次让我产生了折腾和捣鼓博客主题的想法。

静下来仔细想想，我的需求很简单，其实无非就是将博客背景设置成和天仙子一样带有网格即可。说干就干，以下是折腾的过程和出现的相关问题。

## 过程

网格界面属于CSS中网页背景的设置，一般是在body的background中。如果查看的网页代码开源，那便有两种方式查看其CSS代码。

第一种是在GitHub上查找仓库，直接点进文件查看代码。

第二种是叶寻教我的[方法](https://github.com/residualsun1/Residualsun/issues/35)，直接在网页页面点击鼠标右键，选择“检查”，便可以查看网页样式。

两种方法我都使用过了，第一种点击该[链接](https://github.com/sumimakito/hexo-theme-typography/blob/master/raw/scss/style.scss)可查看。

第二种如下所示：

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/images/2024/02/02-21-inspect.png)

其中，这段代码我看不懂，不清楚是否能照搬到我的CSS。

```
body {
    font-size: 18px;
    line-height: 1.5em;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACFJREFUeNpiZGBg4GegAsBlCD8TqSYNQg2Mo6FEBAAIMACdPABtrSW/IQAAAABJRU5ErkJggg==);
    background-repeat: repeat;
    background-attachment: fixed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.04);
    min-height: 100vh;
}
```

我在谷歌搜了一下`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACFJREFUeNpiZGBg4GegAsBlCD8TqSYNQg2Mo6FEBAAIMACdPABtrSW/IQAAAABJRU5ErkJggg==`，发现有一个[帖子](https://www.cnblogs.com/eqvpkbz/p/14421360.html)专门在讲CSS实现网页格子背景，提供了完整的代码。

> CSS 实现网页格子背景  
> 原理： 用小的方格图来绘制背景， 然后不断重复就好了
>
> 方格图采用base64编码， 没有普通网页背景加载的网络速度限制
>
> 完全代码如下:  
> ```  
> body {  
>   background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACFJREFUeNpiZGBg4GegAsBlCD8TqSYNQg2Mo6FEBAAIMACdPABtrSW/IQAAAABJRU5ErkJggg==");  
>   background-repeat: repeat;  
>   background-attachment: fixed;  
>   -webkit-font-smoothing: antialiased;  
>   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.04);  
>   min-height: 100vh;  
>   margin: 0;  
> }  
> ```

我心想天仙子的博客主题模板作者多半也是从这获得的灵感，于是我就一股脑地将这段代码复制粘贴到CSS中，并初步成功实现网页格子背景。

## 问题

说初步，是因为页面仍然存在一些问题。尽管整个主题页面已经实现网页格子，但是导航栏却保持空白背景，看起来很是奇怪。

回到CSS界面检查navigation，发现删除两段代码即可。

```
nav.navigation {
  padding: 20px 20px 0;
  /*删除下方两个代码后，导航栏背景即可随body变表格*/
  /*background: #fff;
  background: rgba(255, 255, 255, 0.9);*/
  margin: 0 auto;
  text-align: right;
  z-index: 100;
}
```

这个问题很简单，只要直到导航栏的CSS是哪一行代码便可自行修改。

接下来，我将实现网页格子的代码复制到了Chatgpt，询问其代码的具体解释。

> 我：分析以下代码的作用：
> ```
>   background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACFJREFUeNpiZGBg4GegAsBlCD8TqSYNQg2Mo6FEBAAIMACdPABtrSW/IQAAAABJRU5ErkJggg==");  
>   background-repeat: repeat;  
>   background-attachment: fixed;  
>   -webkit-font-smoothing: antialiased;  
>   -moz-osx-font-smoothing: grayscale;  
>   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.04);  
>   min-height: 100vh;  
>   margin: 0;
> ```

Chatgpt的回答很详细：

> Chatgpt：这段代码是用于设置一个网页的样式，具体作用如下：
>
> 1. `background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACFJREFUeNpiZGBg4GegAsBlCD8TqSYNQg2Mo6FEBAAIMACdPABtrSW/IQAAAABJRU5ErkJggg==");`: 这行代码设置了元素的背景图片，使用了一个data URL来指定图片的来源。在这个例子中，图片以base64编码的形式嵌入在代码中，这样可以减少HTTP请求，但会增加HTML文件的大小。
>
> 2. `background-repeat: repeat;`: 这行代码指定了背景图片的重复方式为平铺。
>
> 3. `background-attachment: fixed;`: 这行代码指定了背景图片的固定方式，即当页面滚动时，背景图片将保持固定不动。
>
> 4. `-webkit-font-smoothing: antialiased;` 和 `-moz-osx-font-smoothing: grayscale;`: 这两行代码用于设置字体渲染的平滑方式，分别是Webkit和Mozilla引擎的设置，用于改善字体在不同浏览器上的显示效果。
>
> 5. `text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.04);`: 这行代码添加了文本阴影效果，使文本在背景上更加突出。
>
> 6. `min-height: 100vh;`: 这行代码指定了元素的最小高度为视口高度的100%，确保元素至少占据整个视口的高度。
>
> 7. `margin: 0;`: 这行代码将元素的外边距设置为0，以确保元素与其周围的其他元素之间没有空白间隙。

大部分的回答内容我都能看懂，唯独好奇`-webkit-font-smoothing: antialiased`和`-moz-osx-font-smoothing: grayscale`究竟是个啥。

> 我：可以具体说说-webkit-font-smoothing: antialiased; 和 -moz-osx-font-smoothing: grayscale;吗？

> Chatgpt：当在网页中设置文本时，字体可能会在不同的操作系统和浏览器中显示出略微不同的外观。 `-webkit-font-smoothing: antialiased;` 和 `-moz-osx-font-smoothing: grayscale;` 这两行代码是为了改善字体在不同浏览器和操作系统中的呈现效果。
>
> 1. `-webkit-font-smoothing: antialiased;`:  
>    - 这个属性是针对WebKit引擎的浏览器（例如Chrome和Safari）的特定设置。  
>    - `antialiased` 表示使用抗锯齿技术渲染字体，使字体边缘更加平滑，减少锯齿状的边缘，从而提高字体的清晰度和可读性。
>
> 2. `-moz-osx-font-smoothing: grayscale;`:  
>    - 这个属性是针对Mozilla引擎的浏览器（例如Firefox）在Mac操作系统上的设置。  
>    - `grayscale` 表示以灰度方式渲染字体，这种渲染方式可以帮助减少在Mac系统上的一些次像素级别的模糊和锯齿，从而提高字体在Mac系统上的清晰度。
>
> 这两个属性通常用于提高字体的可读性和外观，并使字体在不同的操作系统和浏览器中更加一致。

我找到了新问题的症结。第二个问题是当我手机打开网页时，加载速度很慢，不光思源宋体加载不出来，许多js也没办法正常加载（例如脚注序号添加“[]”和内容右浮）。我想了一下，“使用抗锯齿技术渲染字体，使字体边缘更加平滑，减少锯齿状的边缘”应该是和作为衬形字体的思源字体有所冲突，保险起见，我删除了`-webkit-font-smoothing: antialiased`和`-moz-osx-font-smoothing: grayscale`，再用Safari浏览器进入网站，速度恢复，只是微信似乎还不行。不过如果用我的荣耀手机，无论是浏览器还是微信都能正常加载。

另，这种网页格子的背景似乎更适合非衬线字体。

最终实现代码：

```
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACFJREFUeNpiZGBg4GegAsBlCD8TqSYNQg2Mo6FEBAAIMACdPABtrSW/IQAAAABJRU5ErkJggg==");
  background-repeat: repeat;
  background-attachment: fixed;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.04);
  min-height: 100vh;
  margin: 0;
```