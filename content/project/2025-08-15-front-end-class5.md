---
title: HTML 部分额外知识补充
author: 黄国政
date: '2025-08-15'
slug: front-end-class5
categories: []
tags:
  - 前端
---

<!--more-->

额外知识在前面的帖子中有穿插讲过一部分，包括 URL、元素语义化和字符编码等，这里再简单集合整理一下，方便回顾。

## 一、字符实体

在 HTML 中，`<>` 的使用十分常见，浏览器会将其中的 `<` 背后的文本解析为一个 tag，但在某些情况下，我们却需要编写一个 `<` 展示出来，此时便要用到字符实体。

HTML 实体是一段以连字号 `&` 开头，以分号 `;` 结尾的文本（字符串），实体常常用于显示保留字符——这些字符原本会被解析为 HTML 代码——和不可见的字符（如「不换行空格」），也可以用实体代替其他难以用标准键盘键入的字符。

具体实现的方式是在 `&` 和 `;` 之间写上指定字符实体的名称或编号。

```HTML
&名称/编号;
```

部分常用的字符实体的名称与编号如下。

| **字符** | **描述**        | **实体名称** | **实体编号** |
|----------|-----------------|--------------|--------------|
|          | 空格            | nbsp         | #160         |
| <        | 小于号          | lt           | #60          |
| >        | 大于号          | gt           | #62          |
| &        | 和号            | amp          | #38          |
| "        | 双引号          | quot         | #34          |
| '        | 单引号          | apos         | #39          |
| ©        | 版权            | copy         | #169         |
| ®        | 注册商标        | reg          | #174         |
| ™        | 商标            | trade        | #8482        |
| ¢        | 分              | cent         | #162         |
| £        | 镑              | pound        | #163         |
| ￥       | 元              | yen          | #165         |
| €        | 欧元            | euro         | #8364        |
| §        | 小节            | sect         | #167         |
| ×        | 乘号            | times        | #215         |
| ÷        | 除号            | divide       | #247         |


{{% notice info "示例" %}}
```HTML
&lt;这是一段文本&gt;
```

&lt;这是一段文本&gt;

```HTML
&#60;这是一段文本&#62;
```

&#60;这是一段文本&#62;
{{% /notice %}}

## 二、URL 地址

### 2.1 URL 格式

URL（Uniform Resource Locator） 代表统一资源定位符，指一个给定的独特资源在 Web 上的地址。从理论上来说，每个有效的 URL 都指向一个唯一的资源，该资源可以是一个 HTML 页面、一份 CSS 文档，或者一副图像等等。

通过输入特定的 URL，浏览器向服务器主机请求对应的资源，后者将资源返回给浏览器，浏览器再进行展示。比如直接输入 `https://github.com` 进入 GitHub 官网，`https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg` 则是 GitHub 的 svg，复杂一些的还有 `http://123.207.32.32:8000/home/data?page=1&type=sell` 这样的。

总的来说，URL 可以非常复杂，但其标准/完整格式如下：

```
[协议类型]://[服务器地址]:[端口号]/[文件路径][文件名]?[查询]#[片段ID]
```

![By Alhadis - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=82827943](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/08/08-06-1.png)

* 「协议」是什么？简单来说指在互联网上和服务器沟通时使用的方式，如常见的 `http`、`https` 和 `file` 都是协议的一种类型。

* 服务器地址对应 iP 地址，但一般来说用户在互联网上看到的都是域名，而域名[通常](https://guozheng.rbind.io/project/front-end-class2/#%e7%bd%91%e9%a1%b5%e7%9a%84%e6%98%be%e7%a4%ba%e8%bf%87%e7%a8%8b)会被解析为对应的 iP 地址。假设输入 bilibili 的域名，最后则会被解析为类似于 `110.76.40.240` 的 iP 地址。

* iP 地址用于找到对应的服务器主机，其背后的端口（port）号则是用于找到主机中提供具体服务的应用程序[^1]。具体来说，无论是使用用户的电脑还是服务器的电脑[^2]，里面都会启动各种各样的应用程序，特别是对服务器来说，内部默认会启动很多程序以提供不同的服务，有的提供图片，有的提供 HTML，而在通过 iP 地址寻找服务器主机时，端口就用于确定服务器中使用的具体服务，让服务器返回相应的资源。另外，如果在浏览器中没有提供端口时，会默认使用 80 端口，服务器中则有专门的位置监听 80 端口。

[^1]: [前面](https://guozheng.rbind.io/project/front-end-class2/#%e7%bd%91%e9%a1%b5%e7%9a%84%e6%98%be%e7%a4%ba%e8%bf%87%e7%a8%8b:~:text=%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9C%AC%E8%B4%A8%E4%B8%8A%E4%B9%9F%E6%98%AF%E4%B8%80%E5%8F%B0%E7%B1%BB%E4%BC%BC%E4%BA%8E%E7%94%B5%E8%84%91%E4%B8%80%E6%A0%B7%E7%9A%84%E4%B8%BB%E6%9C%BA)也说过，某种程度上来说，服务器也算是一种电脑。

[^2]: 这些应用程序 24 小时运行，且不被用户所见。

* 请求特定服务时，需要具体的文件路径（path）才能找到，文件名则可以进一步具体到某类资源，比如 png 图片，svg 等。

* `http://123.207.32.32:8000/home/data?page=1&type=sell` 中的 `page=1&type=sell` 是查询字符串（queryString），具有两个用途，其一，向服务器请求资源时，服务器会对查询字符串进行读取并据此决定返回什么数据；其二，在前端路由里，查询字符串会被用于在多个路由界面、组件之间来回传递数据。

* 片段（fragment） ID 一般在本地界面中才会有，相当于一个定位锚点。如 `https://guozheng.rbind.io/project/front-end-class2/#网页的显示过程`，`guozheng.rbind.io` 是服务器地址，`project/front-end-class2` 是文件路径，`#网页的显示过程` 就是片段 ID，点击这段 URL，会直接进入该页面「网页的显示过程」这一节。

![By MDN Web Docs, https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/08/08-06-2.png)

### 2.2 URL 与 URI 的区别

URL（Uniform Resource Locator）是统一资源**定位符**，俗称网络地址，相当于网络中的门牌号；URI（Uniform Resource Identifier）是统一资源**标志符**，用于标识 Web 技术使用的逻辑或物理资源——物理资源就是字面意思，如在服务器的机房中有许多主机，可以使用 URI 来标记这些主机。

一句话概括，前者用于定位，后者用于标识。

值得注意的是，URL 作为一个网络 Web 资源的地址，可以将一个资源**唯一**地识别出来，因此它也可被视作一个 URI，或者说 URL 是 URI 的一个子集。

不过 URI 却不一定是 URL。例如，在服务器中存储着许多资源，如果要在浏览器上访问这些资源，要先连接服务器中开发好的相关程序（可能是 Java、node、python等）的接口，服务器会向浏览器返回地址，此时在浏览器输入网络地址（URL）便可以访问服务器中存储的那些资源。这个过程先定位了服务器，还有具体的资源，这里体现出了 URL 的「定位」。可以说，这也符合 URI 的定义，但是在服务器里对存储的资源进行加密生成 ID，即便在程序中可以通过 ID 找到这些资源，但这只是 ID，而非 网络地址，也就不是 URL。

> locators are also identifiers, so every URL is also a URI, but there are URIs which are not URLs.
>
> --- Joes Techland, *Web Service Design*

## 三、元素语义化

以「正确」的元素做「正确」的事情，或者说以特定的元素完成特定的任务，如 h1 就具体对应标题，p 具体对应段落，img 就具体对应图片。

之所以谈到语义化，是因为理论上各 HTML 元素可以实现相同的效果，这里以 h1、p、div 和 span 元素为例。

{{% notice info "示例" %}}
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
  <!--我的网站中，h1 的字体大小是 21.6px-->
    .box {
      font-size: 21.6px;
      font-weight: 700;
      margin: 22px 0;
    }
  </style>
</head>
<body>
  
  <h1>我是 h1 元素</h1>
  <p class="box">我是 p 元素</p>
  <div class="box">我是 div 元素</div>
  <span class="box">我是 span 元素</span>
  
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
    .box {
      font-size: 21.6px;
      font-weight: 700;
      margin: 22px 0;
    }
  </style>
</head>
<body>
  
  <h1>我是 h1 元素</h1>
  <p class="box">我是 p 元素</p>
  <div class="box">我是 div 元素</div>
  <span class="box">我是 span 元素</span>
  
</body>
</html>
{{% /notice %}}

在浏览器检查页面可以发现，h1 元素的 user agent stylesheet （用户代理样式表）是指浏览器给 h1 元素添加的样式（用户代理 → 浏览器），而 div 元素的样式则是开发者加上的，如果开发者给 div、p、span 元素加上 h1 元素一样的样式，四个元素最后呈现的效果实际无异。[^3]

[^3]: 检查页面中元素的 Styles（样式）界面提供的数值在 Computed（计算样式）中会被转化，按照 h1 后者的数值对 div 等元素进行修改即可。

那么，是否可以用 div 或 span 代替其他 HTML 元素？理论上可以，但是符合元素语义化会增加代码可阅读性、方便于代码维护，进而减少开发者之间的沟通成本，另外让语音合成工具正确识别网页元素的用途[^4]，还有利于 SEO 优化。

[^4]: 假设用 div 代替了 h1，语音合成工具在播报内容时不会告诉（如失明的）用户这是一个标题，而仅仅读出内容。

因此，总的来说，在开发过程中做到元素语义化还是必要的。

## 四、SEO 优化

SEO 是搜索引擎优化（search engine optimization），指通过了解搜索引擎的运作规则来调整网站，以及提高网站在有关搜索引擎内排名的方式。

通常情况下，我们在浏览器上搜索某个内容会得到大量结果，搜索引擎会根据一定的算法来对这些搜索结果进行排序，以供用户选择——SEO 正是改善搜索结果排序的过程。而一个搜索引擎的好坏与否，往往取决于其是否能在最大程度上根据用户的搜索需求来对结果进行排序，而不是看「钞能力」的大小。

当然，我们一般无法了解搜索引擎的算法规则，但通过元素语义化（如相对于 p 元素，h 元素在搜索引擎的倾向权重更高），搜索引擎会尽量将相关网站收入系统，之后用户在搜索时便可能看到网站。此外，若相关网站中的内容与用户搜索内容高度重合，被搜索到的概率也会提高。

以百度的搜索引擎为例，它首先会通过爬虫[^5]抓取网络上的网页，然后将抓取到的网页存放到临时库中进行处理，不符合需求的会被清理，符合的则放入索引区，而后在索引区中进行分类、归档和排序，然后将相关结果反馈给用户。备受诟病的百度正是通过在索引区中对结果进行人为调整，从而让广告排列在搜索结果前位。

[^5]: 一种能有条理并且系统化地浏览 Web 以收集网页数据的程序（通常也被称作“机器人”），通过爬虫可以创建索引。

## 五、字符编码

最早提到字符编码是在 [head 元素](https://guozheng.rbind.io/project/front-end-class4/#%E4%B8%89head-%E5%85%83%E7%B4%A0)的学习中，由 head 元素中的 meta 元素的属性 charset 引出，而要提及字符编码，又往往离不开计算机的发展历史。

计算机最早用于解决数字计算问题，后来发现还可以用于文本处理。不过，由于计算机的底层硬件实现是用电路的开和闭两种状态来表示 1 和 0 两个数字，因此只能识别诸如 010110111000 这类由 0 和 1 两个数字组成的二进制数字，也只能直接存储和处理二进制数字。

为了在计算机上也能表示、存储和处理文字、符号这一类字符，就必须将这类字符转换为二进制数字。不过不是想怎么转换就怎么转换，否则会造成同一段二进制数字在不同计算机上显示出来的字符不一样的情况，因此必须得定一个统一、标准的转换规则。随着技术的发展，如今这些转换规则主要包括 ASCII、GBK 和 UTF-8 等。

通过 ASCII、UTF-8 或 GBK 这类字符转换规则，作为自然语言的文字可以（字符）编码转换为计算机语言，之后再按照原来对应的转换规则（也就是 ASCII、UTF-8 或 GBK）再重新解码为作为自然语言的文字。目前使用最广泛的字符编码规则是 UTF-8，互联网工程工作小组（IETF）也要求所有互联网协议都必须支持 UTF-8 编码。