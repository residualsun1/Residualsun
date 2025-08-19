---
title: HTML 基础结构及各元素
author: 黄国政
date: '2025-08-11'
slug: front-end-class5
categories: []
tags:
  - 前端
  - HTML
---

<!--more-->

## 一、文档声明

前面讲到基本的 HTML 结构主要由 `<html>...</html>`、`<head>...</head>` 和 `<body>...</body>` 几个元素构成，但实际上还缺少文档声明。

```HTML
<!DOCTYPE html>
```

{{% notice info "说明" %}}
由 `<!DOCTYPE html>` 的字面也能看出其含义， Document 意味「文档」，Type 对应「类型」。
{{% /notice %}}

文档声明是位于 HTML 最上方的一段文本，用于声明文档类型，不仅声明当前的文件是 HTML，还声明 HTML 的版本——我们现在使用的是 HTML5，以让浏览器用 HTML5 的标准去解析和识别内容。文档声明必须放在 HTML 文档的最前面，**不能省略**，否则可能会出现兼容性问题。

事实上，HTML5 的文档声明比 HTML4.01、XHTML1.0 都要简洁得多。

```HTML
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html14/loose.dtd">
```

```HTML
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

## 二、html 元素

让我们来区别一下，当谈到「HTML 元素」时，我们讲的是 HTML 语言下面的所有元素（包括 h1、p、img 等），但说到「html 元素」时，我们讲的是 HTML 语言下具体的 「html 元素」。

```HTML
<!DOCTYPE html>
<html lang="en">
</hmtl>
```

「html 元素」表示一个 HTML 文档的根（顶级元素），所以它又被称为根元素，所有其他元素必须是它的后代。在 html 元素中，有时能看到 lang 属性，lang 是 language 的缩写，表示语言，其作用一方面是帮助语音合成工具确定要使用的发音，另一方面则是帮助翻译工具确定要使用的翻译规则。

lang 属性不是必须的，但 W3C 建议为 html 元素增加该属性。`lang = "en"` 表示 HTML 文档的语言是英文，`lang = "zh"` 则表示该 HTML 文档语言是中文（zh-CN 更进一步具体地表示中国大陆使用的简中）。

## 三、head 元素

head 元素规定了文档相关的配置信息（也称之为元数据），包括文档的标题、引用的文档样式和脚本等。所谓元数据（meta data）是描述数据的数据——我们学习的 HTML 本身就是一种超文本语言，那么，描述这种超文本语言的语言，就是元数据——可以理解为给网页添加的额外信息，对整个网页页面进行配置。

```HTML
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
```

在 head 元素中，一般至少会包含如下 2 个设置：一个是网页的标题 title 元素，另一个则是网页的编码 meta 元素。

meta 元素用于设置网页的**字符编码**，让浏览器更精准地显示每一个文字，**不设置或者设置错误会导致乱码**。meta 之后的 charset 很明显，按照字面意思来看，char 指字符，set 是设置，因此 charset 是设置字符编码，一般来说都是设置为 **utf-8**（大小写都可以），其涵盖了世界上几乎所有文字。[^1]

[^1]: 计算机中本身不能直接存储文字、图片等资源，如果要存储则需要对资源进行编码，转换成 0 或 1。编码完成后，如果计算机要显示这些资源，还需要进行解码。在编码过程中，存在许多编码格式，utf-8 正是其中一种，浏览器会根据设置好的编码格式进行解码。在 meta 中设置 `charset = utf-8`，正是告知浏览器该网页使用 utf-8 的编码格式。

head 元素专用于网页的配置，其中不仅仅有 title 元素和 meta 元素，但这是两个最基本的元素，后续再学习其他元素。

{{% notice info "说明" %}}
可以在 head 元素中引用脚本 script，但是不建议这么做。我就在自己的博客 baseof.html 文件的 head 元素中引用了几个脚本。

```HTML
  <head>
    <title>{{ block "title" . }}{{ with .Params.Title }}{{ . }} | {{ end }}{{ .Site.Title }}{{ end }}</title>

    {{ partial "head.html" . }}
    <!-- 注释此处，将下面的网址复制到config.yaml文件。-->
    
    <script>
  (function() {
    // 匹配桌面宽度阈值
    const desktopMQ = window.matchMedia("(min-width: 1281px)");

    function loadSidenotes() {
      // 如果已经加载过，就不再重复
      if (window.__sidenotesLoaded) return;
      window.__sidenotesLoaded = true;

      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@xiee/utils/js/sidenotes.min.js";
      s.defer = true;
      document.head.appendChild(s);
    }

    function unloadSidenotes() {
      // 可选：如果你还想在从桌面切回手机时移除侧注 DOM，写卸载逻辑
      // 但一般页面刷新后就不会再触发
    }

    // 初始判断
    if (desktopMQ.matches) {
      loadSidenotes();
    }

    // 响应浏览器窗口 resize
    desktopMQ.addListener(e => {
      if (e.matches) {
        loadSidenotes();
      } else {
        unloadSidenotes();
      }
    });
  })();
    </script>

    <script src="https://cdn.jsdelivr.net/npm/@xiee/utils/js/right-quote.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/@xiee/utils/js/copy-button.min.js" defer></script>
    <link href="https://cdn.jsdelivr.net/npm/@xiee/utils/css/copy-button.min.css" rel="stylesheet">
  </head>
```

等后续弄清楚不建议这么写的原因，我再修改。
{{% /notice %}}

## 四、body 元素

body 元素中的内容是用户在浏览器窗口中看到的东西，也就是网页的具体内容和结构

```HTML
<body>
  
</body>
```

### 4.1 body 元素中的几类元素

在 body 元素中可以书写的子元素很多，按照学习的习惯，我们在这里暂且分成常用的、不常用但相对重要的和 HTML5 新增的。[如前所述](https://guozheng.rbind.io/project/front-end-class3/#23-html-%e5%85%83%e7%b4%a0)，记住常见的，有需要不常用的再[查询](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)即可。

常用的主要包括这几种：

* p 元素
* h 元素
* img 元素
* a 元素
* iframe 元素
* div 元素
* span 元素

不常用但相对重要的有：

* ul 元素
* ol 元素
* li 元素
* button 元素
* input 元素
* table 元素
* thead 元素
* tbody 元素
* th 元素
* tr 元素
* td 元素

在这里，对元素的学习不必按照文档那样一个一个了解然后记忆，而是可以先把握常见的并进行实践，待后续的学习过程再补充相对重要的元素。例如，由于部分元素常常涉及 CSS 样式，在学习 CSS 时更有利于掌握它们。前面讲到的不常用但相对重要的元素大多如此，过去我经常在捣鼓自己博客网站的 CSS 样式时见到它们，但对许多元素总是分不清楚。

除了这两类元素，HTML5 还新增了一些元素，这些元素同样留待后续进行学习。

### 4.2 常见元素 h

一个页面中通常会有一些比较重要的文字作为标题，表示 Heading 的 h 元素负责实现这一功能。

值得注意的是，h 元素不是单个元素，而是多个元素的统称，从 h1 到 h6 才是完整的 h 元素，一共六个级别，其中 h1 级别最高，h6 级别最低。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>标题</h1>
  <h2>标题</h2>
  <h3>标题</h3>
  <h4>标题</h4>
  <h5>标题</h5>
  <h6>标题</h6>
</body>
</html>
```

以上面这段代码为例，在呈现网页时，**浏览器实际上是通过 CSS 样式的不同来区分 h1 - h6** —— 在浏览器中进行查看，会发现 h1 和 h6 之间的不同仅在于 font-size 和 margin。可以说，**<u>通过 CSS 样式的修改，用任何（HTML）元素可以做任何事情，如用 div 元素， span 元素或 p 元素也可以实现上面这些效果</u>**，换句话说，当我们比较 h 元素、span 元素和 p 元素时，可以说本质上它们之间没什么区别，但出于语义化，我们往往还是选择特定的元素做特定的事情。

另外，h 元素通常和 SEO 优化有关系。

### 4.3 常见元素 p

p 元素用于表示文本的一个段落，它是 paragraph 的缩写，意为段落、分段，由 p 元素组成的多个段落之间会有一定的间距。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>p 元素的用法</title>
</head>
<body>
  
  <p>
    我离开工厂之后，有很多个夜晚，都在稿纸上描述它。有时候我把它写得非常伤感，有时候则非常快乐。我从来没有写过白蓝，除了这一次。即使是在我三十岁以后，写到她，也只是一些断断续续的故事，我不能一次就把她说完。我做不到。在我有限的生命里，我将一次次地把她放下，又重新拾起。我用这种方式所表达的已经不是爱了，而是怀念。但是这种怀念来自于我身体最深的地方，是我血液中的一部分，不仅是白蓝，还有其他人。
  </p>
  <p>
    每一个秋天，站在白蓝的医务室里，都能看到工厂外面的野花。那是一种没有名字的花，大多数是黄色的，还有一小部分是橙色的。这些低矮的野花沿着工厂的围墙，一直开到远处的公路两旁，它们非常绚丽，像很炽烈的阳光照射在地面上的颜色。连片的，绵延的，在阴暗的地方似乎要断绝，但在开阔之处又骤然呈现出一片盛景。这种野花的花期很长，从十月开始，一直到霜降大地，它们都出现在我的视线中，用一种骄傲而无所谓的表情。在它们盛开的季节里，有些路人随意地采摘它们，然后又随意地抛弃在路上，车辆碾过，黄色的花瓣被挤压得粉身碎骨。即使如此，也无损于它们本身的美丽。
  </p>

</body>
</html>
```

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/08/08-12-1.png)

在上面的示例中，两个 p 元素构成的段落之间存在着空隙，在检查中能发现是浏览器给加上了 CSS 样式，上下的 margin 是 16px。值得注意的是，第一段的下方空隙是 16px，第二段的上方空隙也是 16px，但是在检查时都显示为 16px 而非 32px，这是因为两者被合并了。如果不想合并，也可以通过 BFC（块级格式化上下文）阻止相邻的块级元素的垂直 margin 合并。

此外，经由 CSS 样式，即便不使用 p 元素，也同样可以给文本添加空隙。

### 4.4 img 元素

#### 4.4.1 img 元素基本介绍

```HTML
<img src="" alt="">
```

img 即 image（图片，图像），使用 img 元素可以将一份图像嵌入文档之中，让浏览器显示图片。

由于没给 img 元素添加属性时，浏览器上不会显示内容，但会被 img 元素占据一定空间，当后续再通过 src 请求并下载服务器中的资源到本地后，该资源会替换 img 元素原来占据的位置，因此 img 元素也被称为可替换元素（replaced element）。

#### 4.4.2 img 元素的属性

img 元素有两个常见属性，一个是 src，另一个是 alt（占位）。

* src 属性是必须的，包含嵌入图片的文件路径。其中 src 是 source 的缩写，表示源。

* alt 属性不是必须的，但包含两个作用：
  * 当图片加载不成功（如错误的地址或图片资源不存在），那么会显示这段文本。
  * 屏幕阅读器会将这些描述读给需要使用阅读器的使用者听，让他们知道图像的含义。

{{% notice info "示例" %}}
```HTML
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Levi-strauss_260.jpg/330px-Levi-strauss_260.jpg" alt="By Wikipedia | Claude Lévi-Strauss">
```

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Levi-strauss_260.jpg/330px-Levi-strauss_260.jpg" alt="By Wikipedia | Claude Lévi-Strauss">
{{% /notice %}}

{{% notice info "示例" %}}
```HTML
<img src="https://upload.wikimedia.org/wikipedia" alt="By Wikipedia | Claude Lévi-Strauss">
```

<img src="https://upload.wikimedia.org/wikipedia" alt="By Wikipedia | Claude Lévi-Strauss">
{{% /notice %}}

{{% notice warning "注意" %}}
出于将结构和样式分离的考虑，不建议在 img 元素中通过属性设置图片宽度和高度，如果要对此进行调整，可以在 CSS 中入手。
{{% /notice %}}

#### 4.4.3 img 元素的图片路径

img 元素有两种图片路径，一个是网络图片，另一个是本地图片。

* **网络图片**。网络图片的引用最简单，给 src 提供网络上现成的图片地址即可。

  ```HTML
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Levi-strauss_260.jpg/330px-Levi-strauss_260.jpg" alt="">
  ```

* **本地图片**。本地图片是本地电脑上的图片，后期要和 HTML 一起部署到服务器，用户使用时要在网络中进行加载，而在本地图片中，又分为**绝对路径**和**相对路径**两种方式。

  * **绝对（absolute）路径**从电脑的根目录开始一直找到资源的路径，但这种方式已经很少被使用。

    ```HTML
    <img src="D:\前端\HTML\images\Levi-strauss_260.jpg" alt="">
    ```

  * **相对（relative）路径**相当于当前文件的一个路径，以一个 `.` 代表当前文件夹（可以省略），两个 `.` 代表上级文件。

    ```HTML
    <img src="../images/Levi-strauss_260.jpg" alt="">
    ```

相比于绝对路径，相对路径用得更多，它往往更短也更方便，而且以后开发者还需要在服务器中部署 HTML、CSS、JavaScript 和图片等多种资源，用户在本地浏览器浏览时，向服务器请求和下载的图片需要相对路径的引用。就此而言，绝对路径可以说基本用不上。

{{% notice warning "注意" %}}
对于网页来说，不管什么操作系统（Windows、Mac、Linux），路径分隔符都是 `/`，而不是 `\`。
Windows 上有点特殊，在本地文件夹中的文件路径复制的内容默认用 `\`，但 `/` 才是更普遍的情况。
{{% /notice %}}

总的来说，img 元素在引用图片上很常用，适配多种图片格式，包括 `APNG`（动态便捷式网络图像）、`AVIF`（图像文件格式）、`BMP`（位图文件）、`GIF`（图像互换格式）、`ICO`（微软图像）、`JPEG`（联合影像专家小组图像）、`PNG`（便携式网络图像）、`SVG`（可缩放矢量图标）和 `WEBP`。

### 4.5 a 元素

#### 4.5.1 a 元素基本介绍

```HTML
<a href=""></a>
```

a 元素，或者称为锚（anchor）元素，用于定义超链接，打开新 URL，可以在一个网页跳转到另一个网页，或者是在同一个网页中的位置跳转到另一个位置。

a 元素有两个常见属性，分别是 href（Hypertext Reference）和 target。

* href 指定要打开的 URL 地址，也可以是一个本地地址。

* target 指定在什么地方显示链接的资源，其参数包括 _self、_blank、_top、_parent。_self 是默认值，在当前窗口打开 URL；_blank 则是在一个新的窗口打开 URL。至于其他两个其实不常用，在 iframe 元素中再详细了解一下。

{{% notice info "示例" %}}
```HTML
<a href="https://en.wikipedia.org/wiki/Claude_L%C3%A9vi-Strauss">Claude Lévi-Strauss</a>
```

<a href="https://en.wikipedia.org/wiki/Claude_L%C3%A9vi-Strauss">Claude Lévi-Strauss</a>
{{% /notice %}}

和之前在「[元素的属性](https://guozheng.rbind.io/project/front-end-class3/#232-%E5%85%83%E7%B4%A0%E7%9A%84%E5%B1%9E%E6%80%A7)」一节中讲的一般，**属性仅是对元素进行额外补充，不会像内容一样具体出现在界面上**，这里便是 href 属性给 a 元素「附魔」，出现下划虚线，并使其可以指向其他网页，但只有内容「Claude Lévi-Strauss」在界面显示，没有属性信息。

点击上面的超链接，新的页面会覆盖旧页面，因为默认 target 的参数是 _self，只要调整为 _blank，即可在点击后在新的页面打开超链接。

{{% notice info "示例" %}}
```HTML
<a href="https://en.wikipedia.org/wiki/Claude_L%C3%A9vi-Strauss" target="_blank">Claude Lévi-Strauss</a>
```

<a href="https://en.wikipedia.org/wiki/Claude_L%C3%A9vi-Strauss" target="_blank">Claude Lévi-Strauss</a>
{{% /notice %}}

除了跳转到某个 URL 地址，也可以跳转到本地资源。

{{% notice info "示例" %}}
```HTML
<a href="../../static/images/avatar.jpg" >我的博客仓库图片</a>
```

<a href="../../static/images/avatar.jpg">我的博客仓库图片</a>
{{% /notice %}}

可以给文本添加超链接，也可以给图片添加超链接。

{{% notice info "示例" %}}

```HTML
<a href="https://zh.wikipedia.org/w/index.php?title=%E5%85%8B%E5%8B%9E%E5%BE%B7%C2%B7%E6%9D%8E%E7%B6%AD-%E5%8F%B2%E9%99%80&oldformat=true&variant=zh-cn" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Levi-strauss_260.jpg/330px-Levi-strauss_260.jpg" alt=""></a>
```

<a href="https://zh.wikipedia.org/w/index.php?title=%E5%85%8B%E5%8B%9E%E5%BE%B7%C2%B7%E6%9D%8E%E7%B6%AD-%E5%8F%B2%E9%99%80&oldformat=true&variant=zh-cn" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Levi-strauss_260.jpg/330px-Levi-strauss_260.jpg" alt=""></a>

{{% /notice %}}

#### 4.5.2 a 元素的锚点链接

锚点链接可以实现跳转到网页中的具体位置的效果，主要有两个步骤：

* 第一是在要跳到的元素上定义一个 id 属性。
* 第二是定义 a 元素，并且把 a 元素的 href 指向对应的 id。

这样，我们在点击「段落一」后，界面就会跳转到段落一对应的 id 位置，其他段落同理。

这其实相当于目录，在学习 CSS 后，可以给 a 元素的锚点链接添加相关的动画效果，如固定目录块不动，方便点击跳转，或者是跳转时画面渐进等等。

{{% notice info "示例" %}}

```HTML

<!--第二步：定义 a 元素，并把 a 元素的 href 指向对应 id-->
  <a href="#theme01">段落一</a>
  <a href="#theme02">段落二</a>
  <a href="#theme03">段落三</a>
  <a href="#theme04">段落四</a>
  <a href="#theme05">段落五</a>


<!--第一步：在要跳转的元素上定义 id 属性-->
  <h4 id="theme01">段落一</h4>
  <p>
    大约六月底，我收到一张明信片，是四月间从西藏寄出的，上面写着：走了几千公里路，都不能忘记你。给我的小路。这张明信片被贴在传达室的玻璃窗后面，人人得而见之，但事实上没有人去看它。我在凌晨四点下班时才发现了它，当时头很晕，明信片正面是布达拉宫和蓝天白云。我看着背面的字，又看着正面的布达拉宫，翻来覆去地看。天色浓黑，只有厂门口的一盏白炽灯亮着，许多蠓虫绕着灯在飞，马路上一个人都没有。此时此刻，全世界都在安睡，我爱着的人也在安睡，在她的梦境中路过天堂。我一时失控，眼泪落在几千公里的钢笔字上。
  </p>
  <h4 id="theme02">段落二</h4>
  <p>
    她曾经对我说，路小路，真搞不清楚我为什么会爱上你。我也很奇怪，居然有人爱我，还心甘情愿和我上床，这事情传到工厂里，简直不会有人相信。大概连我妈都不会相信吧。我问她：“你知道什么叫奇幻的旅程吗？”和你去西藏一样，我也有我的奇幻旅程，只是你不知道。我说，在我一生中能走过的路，有多少是梦幻的，我自己不能确定，但是有多少是狗屎，这倒是历历在目。正因如此，凡不是狗屎的，我都视之为奇幻的旅程。我这么去想，并非因为我幼稚，而是试图告诉自己，在此旅程结束之时，就等同于一个梦做完了。我就是这么想的。
  </p>
  <h4 id="theme03">主题三</h4>
  <p>
    我说，那年送德卵去医院，我把他背进急诊室，我的心脏都快爆掉了，假如我当时发心脏病死了，别人还以为我是为了德卵而死。鸡巴，我活了二十岁，最后为了一个钳工班的傻班长而送命，传出去被人笑死。其实真相是：我是为了我的奇幻旅程而死。在那一幕大雨中，我像一个演员，因为你的存在，故此扮演着我的亡命的角色。
  </p>
  <h4 id="theme04">主题四</h4>
  <p>
    我说，很长一段日子，我都认为自己无人可爱，所以只能爱你。我为这种爱情而羞愧，但在这样的旅程中我无法为自己的羞愧之心承担责任，假如无路可走，那不是罪过。但我也不想睁着无辜的双眼看着你，你既不在此岸也不在彼岸，你在河流之中。大多数人的年轻时代都被毁于某种东西。像我这样，自认为一开始就毁了，其实是一种错觉，我同样被时间洗得皱巴巴的，在三十岁以后，晾在我的小说中。
  </p>
  <h4 id="theme05">主题五</h4>
  <p>
    我说，我不再为这种爱情而羞愧，在我三十岁以后回忆它，就像一颗子弹射穿了我的脑袋，可惜你看不到我脑浆迸裂的样子了。
  <p>
```

  <a href="#theme01">段落一</a>
  <a href="#theme02">段落二</a>
  <a href="#theme03">段落三</a>
  <a href="#theme04">段落四</a>
  <a href="#theme05">段落五</a>

  <h4 id="theme01">段落一</h4>
  <p>
    大约六月底，我收到一张明信片，是四月间从西藏寄出的，上面写着：走了几千公里路，都不能忘记你。给我的小路。这张明信片被贴在传达室的玻璃窗后面，人人得而见之，但事实上没有人去看它。我在凌晨四点下班时才发现了它，当时头很晕，明信片正面是布达拉宫和蓝天白云。我看着背面的字，又看着正面的布达拉宫，翻来覆去地看。天色浓黑，只有厂门口的一盏白炽灯亮着，许多蠓虫绕着灯在飞，马路上一个人都没有。此时此刻，全世界都在安睡，我爱着的人也在安睡，在她的梦境中路过天堂。我一时失控，眼泪落在几千公里的钢笔字上。
  </p>
  <h4 id="theme02">段落二</h4>
  <p>
    她曾经对我说，路小路，真搞不清楚我为什么会爱上你。我也很奇怪，居然有人爱我，还心甘情愿和我上床，这事情传到工厂里，简直不会有人相信。大概连我妈都不会相信吧。我问她：“你知道什么叫奇幻的旅程吗？”和你去西藏一样，我也有我的奇幻旅程，只是你不知道。我说，在我一生中能走过的路，有多少是梦幻的，我自己不能确定，但是有多少是狗屎，这倒是历历在目。正因如此，凡不是狗屎的，我都视之为奇幻的旅程。我这么去想，并非因为我幼稚，而是试图告诉自己，在此旅程结束之时，就等同于一个梦做完了。我就是这么想的。
  </p>
  <h4 id="theme03">主题三</h4>
  <p>
    我说，那年送德卵去医院，我把他背进急诊室，我的心脏都快爆掉了，假如我当时发心脏病死了，别人还以为我是为了德卵而死。鸡巴，我活了二十岁，最后为了一个钳工班的傻班长而送命，传出去被人笑死。其实真相是：我是为了我的奇幻旅程而死。在那一幕大雨中，我像一个演员，因为你的存在，故此扮演着我的亡命的角色。
  </p>
  <h4 id="theme04">主题四</h4>
  <p>
    我说，很长一段日子，我都认为自己无人可爱，所以只能爱你。我为这种爱情而羞愧，但在这样的旅程中我无法为自己的羞愧之心承担责任，假如无路可走，那不是罪过。但我也不想睁着无辜的双眼看着你，你既不在此岸也不在彼岸，你在河流之中。大多数人的年轻时代都被毁于某种东西。像我这样，自认为一开始就毁了，其实是一种错觉，我同样被时间洗得皱巴巴的，在三十岁以后，晾在我的小说中。
  </p>
  <h4 id="theme05">主题五</h4>
  <p>
    我说，我不再为这种爱情而羞愧，在我三十岁以后回忆它，就像一颗子弹射穿了我的脑袋，可惜你看不到我脑浆迸裂的样子了。
  <p>
{{% /notice %}}

#### 4.5.3 a 元素与其他 URL 地址

除了跳转到新网页，a 元素也可以用于跳转指向链接以下载特定资源，也可以用于发邮件。

在这里，URL 可以是指向其他网页的一个地址，也可以是定向到某一特定资源，其具体内容可以参考《[URL 与 URI](https://guozheng.rbind.io/project/front-end-class4/)》。

{{% notice info "示例" %}}

```HTML
<!-- 指向链接：zip 压缩包 -->
 <a href="https://github.com/residualsun1/Leslie-Cheung/archive/refs/heads/main.zip">下载网页资源压缩包</a>
```

 <a href="https://github.com/residualsun1/Leslie-Cheung/archive/refs/heads/main.zip">下载网页资源压缩包</a>

{{% /notice %}}

{{% notice info "示例" %}}

```HTML
<!-- 指向其他协议地址：mailto -->
<a href="mailto:sonder53231323@163.com">发邮件给博主</a>

<!-- 这里 mailto 相当于协议头，但它指向的是让当前系统打开对应发邮件的 app -->

```

<a href="mailto:sonder53231323@163.com">发邮件给博主</a>
{{% /notice %}}

### 4.6 iframe 元素

利用 iframe 元素可以实现在一个 HTML 文档中嵌入其他 HTML 文档的效果，例如在一个网页页面嵌入诸如 bilibili 的页面。

iframe 的属性是 frameboder，用于规定是否显示边框，1 为显示，0 为不显示。

例如，我要将自己博客网站嵌入到该页面（~~禁止套娃~~）。

{{% notice info "示例" %}}

```HTML
<iframe src="https://guozheng.rbind.io/" width="600" height="600" frameborder="1"></iframe>
```

<iframe src="https://guozheng.rbind.io/" width="600" height="600" frameborder="1"></iframe>

{{% /notice %}}

微前端就涉及到 iframe，但是据说被诟病？另外，现在很多网站如百度、京东、小米等都限制了 iframe，即便嵌入网页也无法浏览。

为什么 iframe 的请求和引用被禁用了呢？

在京东网页打开「检查」，点击查看导航栏中的「网络」，刷新一下，在左侧的名称中选择显示该网页的网址——这实际上是一个 HTML 文件，在「预览」中可以看到它的界面，由于只是请求了 HTML 而没有 CSS 样式，所以看起来很简陋。浏览器要在解析 HTML 后再请求 CSS。回到「表头」，里面的「响应表头」中的 x-frame-options设置为了 SAMEORIGIN，意为只允许在同源页面请求该地址。

我想，**学习技术很重要的一点是要追问「为什么」，为什么有的页面可以被 iframe 引用，有的就不行？是被限制了吗？被什么限制了**？

最后收一下，前面讲过，要理解 a 元素 target 属性中的 _parent 和 _top 两个参数，需要结合 iframe 元素。

假设现在建立三个 HTML 文件，具体的名称分别是：

* 「a元素所在的网页.html」
* 「iframe元素所在的网页.html」
* 「15_iframe和a元素的结合.html」

为方便文件管理，前两个文件放在了和第三个文件同级的文件夹「other」中，然后利用 iframe 元素进行嵌套。

{{% notice info "示例" %}}

三份 HTML 文件如下所示：

a元素所在的网页.html
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <a href="https://www.taobao.com" target="_parent">淘宝</a>
  <p>a元素所在的网页.html</p>

</body>
</html>
```

iframe元素所在的网页.html
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <iframe src="./a元素所在的网页.html" frameborder="1"></iframe>
  <p>iframe元素所在的网页.html</p>

</body>
</html>
```

15_iframe和a元素的结合.html
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <iframe src="./other/iframe元素所在的网页.html"  width="400" height="300" frameborder="1"></iframe>
  <p>15_iframe和a元素的结合.html</p>

</body>
</html>
```

上面三份 HTML 文件的第三份文件已经完成嵌套，我们再在本网站对第三份文件进行一次嵌套。

```HTML
<iframe src="https://residualsun1.github.io/Front-end/HTML/02_HTML%E5%B8%B8%E8%A7%81%E7%9A%84%E5%85%83%E7%B4%A0/15_iframe%E5%92%8Ca%E5%85%83%E7%B4%A0%E7%9A%84%E7%BB%93%E5%90%88.html"  width="400" height="400" frameborder="1"></iframe>
```

<iframe src="https://residualsun1.github.io/Front-end/HTML/02_HTML%E5%B8%B8%E8%A7%81%E7%9A%84%E5%85%83%E7%B4%A0/15_iframe%E5%92%8Ca%E5%85%83%E7%B4%A0%E7%9A%84%E7%BB%93%E5%90%88.html"  width="400" height="400" frameborder="1"></iframe>

{{% /notice %}}

这下就很容易解释了，当我们在第一份 HTML 文件中将 target 设置为 _top，点击「淘宝」，淘宝页面会直接跳过所有嵌套的网页，覆盖最高级的网页「15_iframe和a元素的结合.html」；而当将 target 设置为 _parent，点击淘宝则只会覆盖第二份 HTML 文件「iframe元素所在的网页.html」，在「iframe元素所在的网页.html」跳转到淘宝界面——因为淘宝的链接在「a元素所在的网页.html」中，「iframe元素所在的网页.html」是「a元素所在的网页.html」的上一层，或者说父级（parent）。

我在 GitHub 中将文件代码设置为了 _parent，更直观展示。


### 4.7 span 元素与 div 元素

#### 4.7.1 span 元素与 div 元素的历史

h 系列元素是 heading，p 元素是 paragraph，a 元素是 anchor，img 元素是 image，这些元素语义化，比较容易理解，但 后来出现的 span 和 div 元素却相对特殊一些，它们语义化程度较低。

span 元素是跨域、涵盖的意思，div 元素是 division，意为分开、分配，要理解它们，还需要从它们出现的历史讲起。

早期的网页发展还没有通过 CSS 进行样式设计的概念，这时必须通过语义化元素来告知浏览器一段文字如何显示，或者说以添加各种各样包含样式的 HTML 元素的方式来完成样式设计，但这样导致 HTML 元素越来越多，慢慢分不清哪些是搭建网页基本结构的元素，而哪些又是用来添加样式的元素。针对这样的问题出现了一些应对的方案，CSS 是其中的一种，后来还逐渐成为一种标准，甚至被 [W3C](https://www.w3.org/)[^2] 接管，每个浏览器基本都按照这一标准来进行。

[^2]: 这里可以查询关于 HTML、CSS 等相关资源的官方文档，但相比于官方文档，[MDN](https://developer.mozilla.org/en-US/) 的可读性更强。

CSS 成为标准后，HTML 的结构和 CSS 样式便需要分离——结构只由 HTML 元素负责，样式则只由 CSS 完成。我们知道 h1 元素相当于一段普通文本 + CSS，显示文字的同时，还有文字增大、变粗、间距加宽的效果，但这些实际属于样式。在结构与样式分离后，span 和 div 元素便被用于负责完成编写整个 HTML 结构，样式则交给 CSS。

与通过 HTML 完成结构和样式的设置这样一个极端相比，这呈现出来的是另一个极端：由原来的 HTML + CSS 变为 span/div + CSS。不过当下考虑到元素语义化——用正确的元素做正确的事情，h1 就负责标题，p 就负责段落等——最后又回归到了 HTML + CSS。

总的来说，其实页面可以没有 div 和 span，也可以全部都是。

#### 4.7.2 span 元素与 div 元素的区别

在 HTML 的历史上既然只需要特定的元素负责其结构搭建，为什么还要 span 元素与 div 元素两种？

div 元素和 span 元素都是「纯粹」的容器，或可被视作盒子，主要用于包裹内容，而内容被包裹后便拥有了属于自己的结构，可以对该结构进行各种调整以实现各种效果（h1、p、img、a 等等），但 div 和 span 具体上仍然有所不同。

多个 div 元素包裹的内容会在不同的行显示，它一般作为其他元素的父容器，把其他元素包裹住，代表一个整体，用于把网页分割为多个独立的部分。

多个 span 元素包裹的内容则会在同一行显示，默认情况下，它跟普通文本几乎没有差别，用于区分特殊文本和普通文本，比如用来显示一些关键字。

{{% notice info "示例" %}}

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .area {
      border: 1px solid #000;
    }
    .keyword {
      font-size: 30px;
      font-weight: 700;
      color: antiquewhite;
    }
  </style>
</head>
<body>
  
  <h1>学习前端</h1>

  <div class="area">
    <h2>1. 学习 HTML + CSS</h2>
    <p>
      先学习 HTML，再学习 CSS，了解一些历史和本质
    </p>
  </div>

  <div class="area">
    <h2>2. 学习 JavaScript</h2>
    <p>
      学习 <span class="keyword">JavaScript</span> 的基本语法，BOM/DOM，学网络请求，学习 ES6~12，学习一些高级语法，原理
    </p>
  </div>

  <div class="area">
    <h2>3.学习工具</h2>
    <p>
      npm/node/webpack/git
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
    .area {
      border: 1px solid #000;
    }
    .keyword {
      font-size: 30px;
      font-weight: 700;
      color: antiquewhite;
    }
  </style>
</head>
<body>
  
  <h1>学习前端</h1>

  <div class="area">
    <h2>1. 学习 HTML + CSS</h2>
    <p>
      先学习 HTML，再学习 CSS，了解一些历史和本质
    </p>
  </div>

  <div class="area">
    <h2>2. 学习 JavaScript</h2>
    <p>
      学习 <span class="keyword">JavaScript</span> 的基本语法，BOM/DOM，学网络请求，学习 ES6~12，学习一些高级语法，原理
    </p>
  </div>

  <div class="area">
    <h2>3.学习工具</h2>
    <p>
      npm/node/webpack/git
    </p>
  </div>

</body>
</html>

{{% /notice %}}

### 4.8 不常用元素

strong 元素用于内容加粗和强调，但通常使用 CSS 样式完成。

i 元素用于内容倾斜，开发中偶尔会用于字体图标。

code 元素用于显示代码，偶尔会使用来显示等宽字体。等宽字体会让每个字符占据的宽度一样，使得代码更加规矩美观，适用于技术分享的页面。

br 元素是换行元素（break），但在开发之中已经不使用。不再建议使用这一元素实现换行效果，可以直接使用 div 元素。

## 五、HTML 全局属性

在《[开发第一个网页](https://guozheng.rbind.io/project/front-end-class3/)》中，我们已经提到了元素的[属性](https://guozheng.rbind.io/project/front-end-class3/#232-%E5%85%83%E7%B4%A0%E7%9A%84%E5%B1%9E%E6%80%A7)。

某些属性只能设置在特定的元素中，如 img 元素中的 src，a 元素中的 href；而一些所有 HTML 元素都可以设置和拥有的属性则是[「全局属性」（Global Attributes）](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes)。

常见的全局属性包括以下几类：

* id：定义唯一标识符（ID），该标识符在整个文档[^3]中必须是唯一的，其目的是在链接（使用片段标识符），脚本或样式（使用CSS）时标识元素。

  id 属性的链接作用我们已经在本文的「[a 元素的锚点链接](https://guozheng.rbind.io/project/front-end-class5/#452-a-%e5%85%83%e7%b4%a0%e7%9a%84%e9%94%9a%e7%82%b9%e9%93%be%e6%8e%a5)」演示过。在 JavaScript 中，则可以通过 `const divEl = document.getElementByid()` 获取某个特定的元素并对其进行操作。

[^3]: 将文档理解为当前页面即可，因为页面在 JavaScript 中会被抽象成为一个对象，该对象叫 document，因此又将页面称为文档。

* class：一个以空格分隔的元素的类名（classes）列表，它允许 CSS 和 JavaScript 通过类选择器或者 DOM 方法来选择和访问特定的元素。

  class 属性的实践在本文的「[span 元素与 div 元素的区别](https://guozheng.rbind.io/project/front-end-class5/#472-span-%e5%85%83%e7%b4%a0%e4%b8%8e-div-%e5%85%83%e7%b4%a0%e7%9a%84%e5%8c%ba%e5%88%ab)」这一小节中演示过。class 属性可以添加多个参数值，不过 id 属性还没试过—— 但 id 属性是唯一的，不需添加多个。

{{% notice warning "注意" %}}

我一开始有些混淆 class 和 id，将多种情况整理如下：

以下是成立的，多个 class 可以并列写在一个属性值里。
```HTML
<p class = "one two three">这是一段文本</p>
```

以下是不成立的，一个元素只能有一个 id，且不能包含空格。
```HTML
<p id = "one two three">这是一段文本</p>
```

以下是成立的，多个元素可以共享同一个 class。
```HTML
<p class = "note">《银魂》很好看</p>

<p class = "note">没有《银魂》看是不行的</p>

<p class = "note">每天都想看《银魂》</p>
```

以下浏览器也会解析，但是写法不够规范，因为 id 在同一个 HTML 文档中必须唯一，正确做法是给每个 p 元素一个不同的 id，或者用同一个 class。
```HTML
<p id = "note">《银魂》很好看</p>

<p id = "note">没有《银魂》看是不行的</p>

<p id = "note">每天都想看《银魂》</p>
```

以下都是错误的，HTML 属性不允许重复写，后写的会覆盖前写的（结果只会保留最后一个）。
```HTML
<p class = "one" class = "two" class = "three">《银魂》很好看</p>

<p id = "one" id = "two" id = "three">《银魂》很好看</p>
```

最后再贴一张表格（虽然是 ChatGPT 给总结的）

| 特性                 | `class`                                 | `id`                           |
| ------------------ | --------------------------------------- | ------------------------------ |
| **在 CSS/JS 中的选择器** | `.`开头 | `#`开头 |
| **是否能有多个值** | ✅ 可以多个，用空格分隔，例如 `class="one two three"` | ❌ 只能一个，不能有空格，例如 `id="header"` |
| **是否能在多个元素上复用** | ✅ 可以，很多元素都能用相同的 class（如 `class="note"`） | ❌ 不能，同一个 HTML 文档中 `id` 必须唯一  |
| **是否能在同一元素上写多个属性** | ❌ 不能重复写 `class=""`，只能写一个 `class`，里面放多个值 | ❌ 同理，`id=""` 只能写一次 |
| **常见用途** | 给一组元素分组，方便统一加样式或绑定事件 | 给页面中某个唯一的元素标识，比如导航栏、页面顶部、表单输入框 |


{{% /notice %}}

* style：给元素添加内联样式。具体后面在 CSS 中再讲。

* title：包含表示与其所属元素相关信息的文本。这些信息通常可以作为提示呈现给用户，但不是必须的。具体来说，在一段文本的元素中的 title 属性内输入的是什么，鼠标悬停在该文本上便会出现什么。

{{% notice info "示例" %}}

```HTML
<p title="才怪！怎么可能呢？">我不喜欢看《银魂》。</p>
```

<p title="才怪！怎么可能呢？">我不喜欢看《银魂》。</p>

{{% /notice %}}

## 六、额外知识补充

额外知识在前面的帖子中有穿插讲过一部分，包括 URL、元素语义化和字符编码等，这里再简单集合整理一下，方便回顾。

### 6.1 字符实体

在 HTML 中，`<>` 的使用十分常见，浏览器会将其中的 `<` 背后的文本解析为一个 tag，但在某些情况下，我们却需要编写一个 `<` 展示出来，此时便要用到字符实体。

HTML 实体是一段以连字号 `&` 开头，以分号 `;` 结尾的文本（字符串），实体常常用于显示保留字符——这些字符原本会被解析为 HTML 代码——和不可见的字符（如「不换行空格」），也可以用实体代替其他难以用标准键盘键入的字符。

具体实现的方式是在 `&` 和 `;` 之间写上指定字符实体的名称或编码。

```HTML
<span>&名称/编码;这是一段文本</span>
```

部分常用的字符实体与编码如下。

| **字符** | **描述**        | **实体名称** | **实体编号** |
|----------|-----------------|--------------|--------------|
|          | 空格            | \&nbsp;      | \&#160;      |
| <        | 小于号          | \&lt;        | \&#60;       |
| >        | 大于号          | \&gt;        | \&#62;       |
| &        | 和号            | \&amp;       | \&#38;       |
| "        | 双引号          | \&quot;      | \&#34;       |
| '        | 单引号          | \&apos;      | \&#39;       |
| ©        | 版权（copyright） | \&copy:      | \&#169;      |
| ®        | 注册商标        | \&reg;       | \&#174;      |
| ™        | 商标            | \&trade;     | \&#8482;     |
| ¢        | 分（cent）      | \&cent;      | \&#162;      |
| £        | 镑（pound）     | \&pound;     | \&#163;      |
| ￥       | 元（yen）       | \&yen;       | \&#165;      |
| €        | 欧元（euro）    | \&euro;      | \&#8364;     |
| §        | 小节            | \&sect;      | \&#167;      |
| ×        | 乘号            | \&times;     | \&#215;      |
| ÷        | 除号            | \&divide;    | \&#247;      |


{{% notice info "示例" %}}
```HTML
<span>&lt;这是一段文本&gt;</span>
```

<span>&lt;这是一段文本&gt;</span>

{{% /notice %}}

### 6.2 URL 地址

详见《[URL 与 URI](https://guozheng.rbind.io/project/front-end-class4/)》一文。

### 6.3 元素语义化

以「正确」的元素做「正确」的事情，或者说以特定的元素完成特定的任务，p 就具体对应段落，img 就具体对应图片。

### 6.4 SEO 优化

SEO 是搜索引擎优化（search  engine optimization），通过了解搜索引擎的运作规则来调整网站，以及提高网站在有关搜索引擎内排名的方式。

### 6.5 字符编码

计算机最早用于解决数字计算问题，后来发现还可以用于文本处理。不过，由于计算机的底层硬件实现是用电路的开和闭两种状态来表示 1 和 0 两个数字，因此只能识别诸如 010110111000 这类由 0 和 1 两个数字组成的二进制数字，也只能直接存储和处理二进制数字。

为了再计算机上也能表示、存储和处理文字、符号这一类字符，就必须将这类字符转换为二进制数字。不过不是想怎么转换就怎么转换，否则会造成同一段二进制数字在不同计算机上显示出来的字符不一样的情况，因此必须得定一个统一、标准的转换规则。

作为自然语言的文字主要可以通过 ASCII、UTF8 或 GBK 等进行字符编码，转换为计算机语言，之后再按照原来对应的规则（也就是 ASCII、UTF8 或 GBK）再解码为文字。