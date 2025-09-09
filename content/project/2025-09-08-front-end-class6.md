---
title: 邂逅 CSS
author: 黄国政
date: '2025-09-08'
slug: front-end-class6
categories: []
tags:
  - 前端
  - CSS
---

<!--more-->

## 认识 CSS

CSS（Cascading Style Sheet） 表示层叠样式表，是为网页添加样式的代码。和 HTML 一样，CSS 也不是编程语言，但两者又是与计算机沟通的语言，因而是计算机语言。为方便识别，我们在这里具体区分，HTML 是一种标记语言，而 CSS 是一种样式表语言。

关于 CSS 的历史，我们在前面介绍「[span 元素与 div 元素的历史](https://guozheng.rbind.io/project/front-end-class4/#471-span-%E5%85%83%E7%B4%A0%E4%B8%8E-div-%E5%85%83%E7%B4%A0%E7%9A%84%E5%8E%86%E5%8F%B2)」中讲过。

早期网页主要通过 HTML 来编写，为了让界面更加丰富，便增加了一些具备特殊样式的元素，包括 i 元素、strong 元素等，后来虽然有不同的浏览器实现各自样式的语言，但缺乏统一规划。1994 年，Håkon Wium Lie 和 Bert Bos 合作设计了 CSS ，于 1996 年发布了 CSS1。1997 年，W3C 组织专门成立 CSS 工作组，并于 1998 年发布 CSS2。在 CSS 推出后的一段时间里，div + css 的布局方式几乎代替了所有 HTML 标签，从过去纯 HTML 实现的极端走向了纯 CSS 实现的极端。

值得一提的是，从 CSS3 开始，CSS 开始区分不同的模块（modules），每一个模块里都有在 CSS2 中额外增加的功能。从这个意义上来严格地说，其实并不存在一个所谓的 CSS3，因为每次发布的模块都不一样，这一次可能是字体，下一次可能是颜色，再下一次可能是背景。例如 2011 年 6 月 7 日，CSS3 Color Module 发布为 W3C Recommendation。

总的来说，CSS 的出现主要用于美化 HTML，并实现结构与样式的分离，其中美化的方式主要包括两种：
  * 其一，为 HTML 添加各种各样样式，比如颜色、字体、大小、下划线等等。
  * 其二，对 HTML 进行布局，按照某种结构进行显示，如浮动、定位、flex、grid 等布局。

## 编写 CSS 样式

CSS 的语法主要呈现为声明（Declaration），声明由属性（Property）与属性值（Property value）组成，用于指定添加的 CSS 样式。

```CSS
color: red;
```

作为属性名称的 `color` 与属性的值 `red` 共同组成了一个声明。

将 CSS 样式应用到元素上的方法有三种：

* 内联样式（inline style）
* 内部样式表（internal style sheet）、文档样式表（document style sheet）、内嵌样式表（embed style sheet）
* 外部样式表（external style sheet）

三种方式其实都很重要，至少在学习到 Vue 时都会用上，因而很难说哪个就一定比哪个更好。

### 内联样式

内联样式表主要用于 HTML 元素的全局属性 style 中——我们在《HTML 基础结构及各元素》中的「[全局属性](https://guozheng.rbind.io/project/front-end-class4/#%E4%BA%94html-%E5%85%A8%E5%B1%80%E5%B1%9E%E6%80%A7)」这一部分提及过，其具体写法如下所示。

{{% notice info "示例" %}}

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- 内联样式 -->
  <div style="color: red; font-size: 20px;">这里属于 div 元素</div>

</body>
</html>
```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- 内联样式 -->
  <div style="color: red; font-size: 20px;">这里属于 div 元素</div>
</body>
</html>

{{% /notice %}}

CSS 样式中的不同声明用 `;` 隔开，同时建议在每条 CSS 样式后面都加上分号 `;`。

虽然内联样式这样的写法在原生的 HTML 编写过程中已经不被推荐，但是在 Vue 的 template 中某些动态的样式内会使用内联样式。

### 内部样式表

如果我们想让一个 HTML 元素实现多种样式效果，按照内联样式的思路是将这些样式规则全部输入到全局属性 style 中。这样操作虽然也能让浏览器进行解析，但是在 HTML 元素中书写下的大量 CSS 样式会极其影响视觉体验，因而推荐将这些 CSS 样式单独放置在独立的位置。[^1]

[^1]: 非常特殊和动态的样式会通过相关语法加入到内联样式中。

这里说到的位置在 head 元素中。我们在「[HTML 基础结构及各元素](https://guozheng.rbind.io/project/front-end-class4/#%e4%b8%89head-%e5%85%83%e7%b4%a0)」一文中已经介绍过，head 元素主要用于给网页进行配置，style 可以被视作配置信息的一种以修饰网站，内部样式表具体来说就是将 CSS 样式放入 head 元素内的 style 元素中。至于要如何将样式应用于 body 中的元素，则通过选择器来实现，选择器的类型很多，这里我们直接选择要作用的 div 作为元素选择器。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    /* 选择器 */
    div {
      color: cyan; 
      font-size: 20px;
      background-color: azure;
    }
  </style>
</head>
<body>
  
  <div>你好，白蓝</div>

  <div>再见，路小路</div>

</body>
</html>
```

{{% notice danger "注意" %}}
以上代码 CSS 选择器是 div，而非自定义的选择器，因此设置的 CSS 样式会作用于整个网站的 div，在此示例不仅会在示例板块里展示效果，还会影响本篇文章的 CSS 样式。
{{% /notice %}}

如果需要对特定的元素进行配置，则需要使用全局属性 class，通过 class 来给元素增加特定的标识。关于这部分具体可见全局属性的[介绍](https://guozheng.rbind.io/project/front-end-class4/#%e4%ba%94html-%e5%85%a8%e5%b1%80%e5%b1%9e%e6%80%a7)。

{{% notice info "示例" %}}

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    /* 选择器 */
    .div-one {
      color: cyan; 
      font-size: 20px;
      background-color: azure;
    }
  </style>
</head>
<body>
  
  <div class="div-one">你好，白蓝</div>

  <div>再见，路小路</div>

</body>
</html>
```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    /* 选择器 */
    .div-one {
      color: cyan; 
      font-size: 20px;
      background-color: azure;
    }
  </style>
</head>
<body>
  
  <div class="div-one">你好，白蓝</div>

  <div>再见，路小路</div>

</body>
</html>

{{% /notice %}}

在 Vue 的开发过程中，每个组件也会有一个 style 元素，和内部样式表很相似，但原理不同。

### 外部样式表

head 元素是对当前文档进行相关配置，因此放置于 head 元素中的内部样式表只能应用于当前的 HTML 文件，但实际的开发应用中往往不止一份 HTML 文件，而这些 HTML 文件可能需要一部分甚至全部相同的 CSS 样式，因此我们需要实现 CSS 样式可以应用于多份 HTML 文件或全局的效果。此时，外部样式表便可以发挥作用。

外部样式表（external style sheet）是将 CSS 编写为一个独立的文件夹（后缀名为 `.css`），然后通过 link 元素引入。

{{% notice danger "注意" %}}
这里的情况和上面一样，我必须自定义选择器，如将原来的 `title` 改为 `title-x`，将原来的 `h1` 改为 `h1-a`，否则这里的 CSS 样式会打乱原本网站对本篇文章的 `title` 和 `h1` 的设置。
{{% /notice %}}

{{% notice info "示例" %}}

```CSS
.title-x {
  color: white;
  font-size: 20px;
  background-color: black;
}
```

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!--link 元素专门引入-->
  <!--href hypertext reference-->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/css/style.css">
</head>
<body>
  <div class="title-x">一个标题</div>
</body>
</html>
```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!--link 元素专门引入-->
  <!--href hypertext reference-->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/css/style.css">
</head>
<body>
  <div class="title-x">一个标题</div>
</body>
</html>
{{% /notice %}}

当然，还可以引入多个外部样式表。

{{% notice info "示例" %}}
```CSS
.h1-a {
  color: orange;
}
```

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!--link 元素专门引入-->
  <!--href hypertext reference-->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/css/style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/css/test.css">
</head>
<body>
  <div class="title-x">一个标题</div>
  <h1 class="h1-b">一个橙色的标题</h1>
</body>
</html>
```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!--link 元素专门引入-->
  <!--href hypertext reference-->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/css/style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/css/test.css">
</head>
<body>
  <div class="title-x">一个标题</div>
  <h1 class="h1-b">一个橙色的标题</h1>
</body>
</html>
{{% /notice %}}

显然，HTML 文件可以引入 CSS 文件，且可以引入不止一份 CSS 文件，但假设我们要引入 10 份 CSS 文件，那么维护起来定然很不方便。这时候可以在多份 CSS 文件所处的文件夹中建立一份 `index.css` 文件（index 意为索引），这份文件的功能是作为该文件夹的入口：在 `index.css` 文件中通过 `@import` 可以引入文件夹中其他所有 CSS 文件资源，之后在 HTML 文件中只需要引入 `index.css` 文件即可实现所有 CSS 文件的效果，不必一个一个引入，具体实现方法如下：

{{% notice info "示例" %}}

```CSS
@import url(./style.css);
@import url(./test.css);
```

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!--link 元素专门引入-->
  <!--href hypertext reference-->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/css/index.css">
</head>
<body>
  <div class="title-x">一个标题</div>
  <h1 class="h1-b">一级标题</h1>
</body>
</html>
```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!--link 元素专门引入-->
  <!--href hypertext reference-->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/css/index.css">
</head>
<body>
  <div class="title-x">一个标题</div>
  <h1 class="h1-b">一个橙色的标题</h1>
</body>
</html>

{{% /notice %}}

使用 `@import "./style.css"` 来代替 `@import url(./style.css);`，最后能实现的效果也是一样的，不一样的是，`url()` 内的内容是 CSS 中的函数，这种函数用于引入其他资源。例如给 div 元素引入一张背景图片。

```CSS
div {
background-image: url();
}
```

但对在最顶层引入 CSS 来说，两种写法都可以。

## CSS 注释

在 VS Code 中，通过 <kbd>Ctrl</kbd> + <kbd>/</kbd>，可以快捷打出 CSS 的注释，HTML 的注释形式同样是通过该快捷键实现，但外观不一样。

```CSS
/*这里是 CSS 样式代码的注释*/
```

对于初学者而言，多写注释是有好处的，这有助于加深印象和便于阅读，但在开发过程中尽量只在关键的地方注释，做到见名知意——不需要注释，阅读即可读出来。此外，注释也会在存储空间中占据一定的大小，注释太多的话，项目在服务器部署后，用户浏览时下载的内容也会更多，这一方面会占用带宽，另一面则可能增加浏览器的负担。

不过，实际上开发者部署到服务器上的代码会经过 Webpack 之类的工具打包，代码进而会得到优化和压缩。

## 常见的 CSS 属性

CSS 样式太多，全部记下并不现实，关键还是需要知道在哪里查找：

* 一个是官方文档：https://www.w3.org/TR/?tag=css
* 一个是 MDN 文档：https://developer.mozilla.org/en-US/docs/Web/CSS/Properties

这两个文档可以交替使用。

另外，由于浏览器版本、CSS 版本等问题，我们有时候需要查询某些 CSS 是否可用，这时候可以到 https://caniuse.com/ 查询 CSS 属性的可用性。不过现在前端已经存在工具可以自动利用这一类网站来使得代码兼容浏览器。

那么先从最基础最常用的 font-size、color（前景色）、background-color、width 和 height 开始。

{{% notice danger "注意" %}}
这里仍然和前面一样，为防止本网站对本篇文章设置的 CSS 样式内的 `title` 属性被改变，自定义为 `title-a`。
{{% /notice %}}

{{% notice info "示例" %}}

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .title-a {
      font-size: 24px;
      color: antiquewhite;
      background-color: black;
      width: 100px;
      height: 100px;
    }
  </style>
</head>
<body>
  <div class="title">Hello World</div>
</body>
</html>
```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .title-a {
      font-size: 24px;
      color: antiquewhite;
      background-color: black;
      width: 100px;
      height: 100px;
    }
  </style>
</head>
<body>
  <div class="title-a">Hello World</div>
</body>
</html>

{{% /notice %}}

这里讲一些提点：

* 第一，书写属性值时可以通过缩写快速打出，如 `font-size` 可以通过 `fz` 快速打出；
* 第二，在文字不多的情况下，背景还是占据了一整行，这是因为 div 默认占据一整行。[^2]在浏览器的检查页面可以看到，div 的用户代理样式显示 `display: block`，这是浏览器对 div 的默认设置，意味着 div 是块级元素，因而不论内容多少都独占一行。据此也可推知，在 span 元素中添加 `display: block` 可以实现同样的效果。[^3]；
* 第三，没有内容也没有设置高度时，高度则默认为 0，无内容但是设置高度时，则根据设置的像素来呈现相应的高度；
* 第四，color 不是简单的文字颜色，而是一种设置文本内容的前景色，包括文字、装饰线、边框、外轮廓等的颜色。

[^2]: 在不设置 width 的情况下，背景默认占据一整行。但在实际的界面中看到的并非完全占据整行全部空间，两边还是留下了小小的边距，这是 body 默认加进来的。

[^3]: 这里的独占一行不会因为对 div 的宽度进行设置而受到改变，例如将 div 的宽度调小，接着加入 span 元素的内容，该内容仍然是位于 div 元素的下一行。如果需要改变，可以通过 flex 等布局进行设置。

## 案例练习：介绍两位人类学家

下面通过简单介绍两位与「本体论转向」有关的人类学家来进行案例练习。

预期效果如下：

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/09/09-08-3.png)

首先要分析存在哪些结构（HTML），之后则是样式（CSS）。先从结构来看，有标题、图片、段落，实际上形成了两个区域，这两个区域刚好可以各自放进一个盒子（div）中。

{{% notice content "示例" %}}
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>本体论转向人类学家</h1>
  <div>
    <h2>Viveiros de Castro</h2>
    <img src="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/images/castro.jpg" alt="">
    <p>
    Viveiros de Castro，一位来自巴西的人类学家，同时也是「本体论转向」的主要人物之一，他的重要贡献是解释了透视主义——这是一种亚马逊土著人的观点。他对透视主义的描述借鉴了 Gilles Deleuze，谈到人类和动物之间的一种无区别状态，以及自我和他者的相互渗透性。对 Castro 来说，透视主义是所有生物都起源于人类（“文化”），并通过成为动物身体（即“我们”所说的“自然”）将自己与人类分开的想法。在许多方面，这与 Descartes 二元论相反，在 Descartes 的二元论中，人类起源于动物，并继续在人类和自然之间创造二分法（文化将我们置于自然之上）。
    </p>
  </div>
  <div>
    <h2>Roy Wagner</h2>
    <img src="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/images/wagner.jpg" alt="">
    <p>
    Roy Wagner，一位对文化意义与文化创造性深具远见的理论家，2018 年 9 月 10 日逝世于美国维吉尼亚州 Charlottesville 的家中。Wagner 以巴布亚新几内亚亲属、仪式、神话研究著称，更重要的是，他将人类学的思维再现为「观点互换（reciprocity of perspectives）」的实验，启迪了人类学的「本体论转向（ontological turn）」，以及倒反（reverse）、对称、交叉的复数人类学。简介来自芭乐人类学译稿，详见https://guavanthropology.tw/article/7000。
    </p>
  </div>
</body>
</html>
```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>本体论转向人类学家</h1>
  <div>
    <h2>Viveiros de Castro</h2>
    <img src="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/images/castro.jpg" alt="">
    <p>
    Viveiros de Castro，一位来自巴西的人类学家，同时也是「本体论转向」的主要人物之一，他的重要贡献是解释了透视主义——这是一种亚马逊土著人的观点。他对透视主义的描述借鉴了 Gilles Deleuze，谈到人类和动物之间的一种无区别状态，以及自我和他者的相互渗透性。对 Castro 来说，透视主义是所有生物都起源于人类（“文化”），并通过成为动物身体（即“我们”所说的“自然”）将自己与人类分开的想法。在许多方面，这与 Descartes 二元论相反，在 Descartes 的二元论中，人类起源于动物，并继续在人类和自然之间创造二分法（文化将我们置于自然之上）。相关文章：https://mp.weixin.qq.com/s/f5zm8XqzQLYk8GXRGmtHww
    </p>
  </div>
  <div>
    <h2>Roy Wagner</h2>
    <img src="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/images/wagner.jpg" alt="">
    <p>
    Roy Wagner，一位对文化意义与文化创造性深具远见的理论家，2018 年 9 月 10 日逝世于美国维吉尼亚州 Charlottesville 的家中。Wagner 以巴布亚新几内亚亲属、仪式、神话研究著称，更重要的是，他将人类学的思维再现为「观点互换（reciprocity of perspectives）」的实验，启迪了人类学的「本体论转向（ontological turn）」，以及倒反（reverse）、对称、交叉的复数人类学。简介来自芭乐人类学译稿，详见https://guavanthropology.tw/article/7000。
    </p>
  </div>
</body>
</html>

{{% /notice %}}

接着是样式，这里的样式需要调整的地方包括段落字体、图片大小以及整体布局，整体来说，这里的样式调整并不难，但更重要的是调整的具体思路。

* 字体调整：由于两个介绍区域内的效果一致，因此共用一个标识选择器即可。这里我们将标识选择器定义为「keyword」，并放在 span 元素中。

  ```CSS
  .keyword {
      background-color:burlywood;
      color: white;
      font-size: 24px;
    }
  ```
  
  ```HTML
   <span class="keyword">Viveiros de Castro</span>……
   <span class="keyword">Roy Wagner</span>……
  ```

* 整体布局：首先要调整布局，得先找到 div，但在真实的开发过程中，div 的数量可能会特别多，最好可以给予标识——我们可以将一个又一个 div 盒子看作「一项」又「一项」，在此基础上理解，可以给盒子标识为 item。既然两个盒子的效果一样，就不用区分为 item1 或 item2，甚至更多，只需要用到 item 一个即可。其次，由于两个盒子中的文本段落都各占据了整一行，如果要让两个盒子区域能够位于同一行，可以通过调整 div 整体的宽度来限制文本，我们在此将两个 div 的宽度都设置为 250px。[^4]

  
  ```CSS
  .item {
      width: 250px;
    }
  ```

  ```HTML
  <div class="item">
  <h2>Viveiros de Castro</h2>
  <img src="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/images/castro.jpg" alt="">
    <p>
    <span class="keyword">Viveiros de Castro</span>，一位来自巴西的人类学家，同时也是「本体论转向」的主要人物之一，他的重要贡献是解释了透视主义——这是一种亚马逊土著人的观点。他对透视主义的描述借鉴了 Gilles Deleuze，谈到人类和动物之间的一种无区别状态，以及自我和他者的相互渗透性。对 Castro 来说，透视主义是所有生物都起源于人类（“文化”），并通过成为动物身体（即“我们”所说的“自然”）将自己与人类分开的想法。在许多方面，这与 Descartes 二元论相反，在 Descartes 的二元论中，人类起源于动物，并继续在人类和自然之间创造二分法（文化将我们置于自然之上）。相关文章：https://mp.weixin.qq.com/s/f5zm8XqzQLYk8GXRGmtHww
    </p>
  </div>

  <div class="item">
  <h2>Roy Wagner</h2>
  <img src="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/images/wagner.jpg" alt="">
  <p>
  <span class="keyword">Roy Wagner</span>，一位对文化意义与文化创造性深具远见的理论家，2018 年 9 月 10 日逝世于美国维吉尼亚州 Charlottesville 的家中。Wagner 以巴布亚新几内亚亲属、仪式、神话研究著称，更重要的是，他将人类学的思维再现为「观点互换（reciprocity of perspectives）」的实验，启迪了人类学的「本体论转向（ontological turn）」，以及倒反（reverse）、对称、交叉的复数人类学。简介来自芭乐人类学译稿，详见https://guavanthropology.tw/article/7000。
  </p>
  </div>
  ```

  这一步完成以后，两个 div 区域的文字都被限制在了 div 的宽度之内，但 Wagner 的图片相较 Castro 的却超出了 div 的宽度限制。如果我们需要图片宽度和 div 宽度保持一致，则需要设置图片宽度。同样地，在开发过程中可能存在多个 img，若能指定 img 进行宽度设置会更好，这里有三种方法：
  
  * 第一，直接选择 img 元素选择器
  
    ```CSS
    img {
    width: 250px;
    }
    ```
  
  * 第二，在 img 后进行标识选择器。
    ```CSS
    .image {
    width: 250px;
    }
    ```
    ```HTML
    <img class="image" src="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/images/wagner.jpg" alt="">
    ```
  
  * 第三，使用后代选择器。
    ```CSS
    .item img {
    width: 250px;
    }
    ```
    ```HTML
    <div class="item">
      <h2>Roy Wagner</h2>
      <img src="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/images/wagner.jpg" alt="">
      <p>
      <span class="keyword">Roy Wagner</span>，一位对文化意义与文化创造性深具远见的理论家，2018 年 9 月 10 日逝世于美国维吉尼亚州 Charlottesville 的家中。Wagner 以巴布亚新几内亚亲属、仪式、神话研究著称，更重要的是，他将人类学的思维再现为「观点互换（reciprocity of perspectives）」的实验，启迪了人类学的「本体论转向（ontological turn）」，以及倒反（reverse）、对称、交叉的复数人类学。简介来自芭乐人类学译稿，详见https://guavanthropology.tw/article/7000。
      </p>
    </div>
    ```
  
  这时候两个 div 区域内的文本和图片宽度都达到了一致，但由于 div 元素默认 block 的块级特性，所以两个盒子仍然各占一行，此时则需要改变 div 特性以实现两个盒子水平排布的效果。这里提供两种方案：

  * 第一种是改变元素的特性和垂直方向的布局。
    ```CSS
    .item {
      width: 250px;
      display: inline-block;
      vertical-align: top; 
    }
    ```
  
  * 第二种是通过浮动完成。
    ```CSS
    .item {
      width: 250px;
      float: left;
    }
    ```
    
  两种方案，前者会使得两个 div 区域之间留有一点缝隙空间，后者效果下的两个 div 区域会紧密贴合。

{{% notice content "最终示例" %}}

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .keyword {
      background-color: burlywood;
      color: white;
      font-size: 24px;
    }
    .item {
      width: 250px;
      display: inline-block;
      vertical-align: top; 
    }
    .item img {
      width: 250px;
    }
  </style>
</head>
<body>

  <h1>本体论转向人类学家</h1>
  
  <div class="item">
  <h2>Viveiros de Castro</h2>
  <img src="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/images/castro.jpg" alt="">
    <p>
    <span class="keyword">Viveiros de Castro</span>，一位来自巴西的人类学家，同时也是「本体论转向」的主要人物之一，他的重要贡献是解释了透视主义——这是一种亚马逊土著人的观点。他对透视主义的描述借鉴了 Gilles Deleuze，谈到人类和动物之间的一种无区别状态，以及自我和他者的相互渗透性。对 Castro 来说，透视主义是所有生物都起源于人类（“文化”），并通过成为动物身体（即“我们”所说的“自然”）将自己与人类分开的想法。在许多方面，这与 Descartes 二元论相反，在 Descartes 的二元论中，人类起源于动物，并继续在人类和自然之间创造二分法（文化将我们置于自然之上）。相关文章：https://mp.weixin.qq.com/s/f5zm8XqzQLYk8GXRGmtHww
    </p>
  </div>

  <div class="item">
  <h2>Roy Wagner</h2>
  <img src="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/images/wagner.jpg" alt="">
  <p>
  <span class="keyword">Roy Wagner</span>，一位对文化意义与文化创造性深具远见的理论家，2018 年 9 月 10 日逝世于美国维吉尼亚州 Charlottesville 的家中。Wagner 以巴布亚新几内亚亲属、仪式、神话研究著称，更重要的是，他将人类学的思维再现为「观点互换（reciprocity of perspectives）」的实验，启迪了人类学的「本体论转向（ontological turn）」，以及倒反（reverse）、对称、交叉的复数人类学。简介来自芭乐人类学译稿，详见https://guavanthropology.tw/article/7000。
  </p>
  </div>
</body>
</html> 
```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .keyword {
      background-color: burlywood;
      color: white;
      font-size: 24px;
    }
    .item {
      width: 250px;
      display: inline-block;
      vertical-align: top; 
    }
    .item img {
      width: 250px;
    }
  </style>
</head>
<body>
  
  <h1>本体论转向人类学家</h1>

  <div class="item">
  <h2>Viveiros de Castro</h2>
  <img src="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/images/castro.jpg" alt="">
    <p>
    <span class="keyword">Viveiros de Castro</span>，一位来自巴西的人类学家，同时也是「本体论转向」的主要人物之一，他的重要贡献是解释了透视主义——这是一种亚马逊土著人的观点。他对透视主义的描述借鉴了 Gilles Deleuze，谈到人类和动物之间的一种无区别状态，以及自我和他者的相互渗透性。对 Castro 来说，透视主义是所有生物都起源于人类（“文化”），并通过成为动物身体（即“我们”所说的“自然”）将自己与人类分开的想法。在许多方面，这与 Descartes 二元论相反，在 Descartes 的二元论中，人类起源于动物，并继续在人类和自然之间创造二分法（文化将我们置于自然之上）。相关文章：https://mp.weixin.qq.com/s/f5zm8XqzQLYk8GXRGmtHww
    </p>
  </div>

  <div class="item">
  <h2>Roy Wagner</h2>
  <img src="https://cdn.jsdelivr.net/gh/residualsun1/Front-end/CSS/images/wagner.jpg" alt="">
  <p>
  <span class="keyword">Roy Wagner</span>，一位对文化意义与文化创造性深具远见的理论家，2018 年 9 月 10 日逝世于美国维吉尼亚州 Charlottesville 的家中。Wagner 以巴布亚新几内亚亲属、仪式、神话研究著称，更重要的是，他将人类学的思维再现为「观点互换（reciprocity of perspectives）」的实验，启迪了人类学的「本体论转向（ontological turn）」，以及倒反（reverse）、对称、交叉的复数人类学。简介来自芭乐人类学译稿，详见https://guavanthropology.tw/article/7000。
  </p>
  </div>
</body>
</html>
{{% /notice %}}

[^4]: 不对 div 设置高度，div 的高度会由里面的内容撑起来