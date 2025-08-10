---
title: URL 与 URI
author: 黄国政
date: '2025-08-06'
slug: front-end-class4
categories: []
tags:
  - 前端
---

<!--more-->

## URL 格式

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

## URL 与 URI 的区别

URL（Uniform Resource Locator）是统一资源**定位符**，俗称网络地址，相当于网络中的门牌号；URI（Uniform Resource Identifier）是统一资源**标志符**，用于标识 Web 技术使用的逻辑或物理资源——物理资源就是字面意思，如在服务器的机房中有许多主机，可以使用 URI 来标记这些主机。

一句话概括，前者用于定位，后者用于标识。

值得注意的是，URL 作为一个网络 Web 资源的地址，可以将一个资源**唯一**地识别出来，因此它也可被视作一个 URI，或者说 URL 是 URI 的一个子集。

不过 URI 却不一定是 URL。例如，在服务器中存储着许多资源，如果要在浏览器上访问这些资源，要先连接服务器中开发好的相关程序（可能是 Java、node、python等）的接口，服务器会向浏览器返回地址，此时在浏览器输入网络地址（URL）便可以访问服务器中存储的那些资源。这个过程先定位了服务器，还有具体的资源，这里体现出了 URL 的「定位」。可以说，这也符合 URI 的定义，但是在服务器里对存储的资源进行加密生成 ID，即便在程序中可以通过 ID 找到这些资源，但这只是 ID，而非 网络地址，也就不是 URL。

> locators are also identifiers, so every URL is also a URI, but there are URIs which are not URLs.
>
> --- Joes Techland, *Web Service Design*