---
title: CSS 部分额外知识补充
author: 黄国政
date: '2025-09-10'
slug: front-end-class7
categories: []
tags:
  - CSS
draft: true
---

<!--more-->

## link 元素

```HTML
<link rel="" href="">
```

link 元素是外部资源链接元素，规范了文档与外部资源的关系，通常是在 head 元素之中。其最常用的链接是样式表（CSS），但也可以用来创建站点图标，比如 favicon 图标。

link 元素最常用的属性是 href[^1]，该属性指定被链接资源的 URL，这里的 URL 可以是绝对的，也可以是相对的；另一个常用属性是 rel，它指定 link 元素的链接类型——如前所述，包括 stylesheet（CSS 样式）和 icon（站点图标），更多类型可见[此处](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel)。

在此可以聊聊 link 元素中有助于**网站实现性能优化**的属性 `dns-prefetch`。此处只是看名称也可以尝试见名知意。过去我们在「[网页的显示过程](http://guozheng.rbind.io/project/front-end-class2/#%E7%BD%91%E9%A1%B5%E7%9A%84%E6%98%BE%E7%A4%BA%E8%BF%87%E7%A8%8B)」中聊过 DNS 的含义，即域名解析服务器。

所谓域名解析服务器会将域名解析为对应的 IP 地址，进而找到对应的服务器，并将相关资源下载到浏览器中。但从域名解析为 IP 地址，这个过程需要花费一定的时间，因为 DNS 需要查询网站备案，而备案需要绑定对应服务器，这意味着默认的 DNS 解析需要经过查询备案和服务器的过程，最终才匹配到对应的 IP 地址。`dns-prefetch` 的功能正是预先执行 DNS 解析，这意味着我们下次再搜索相关域名时，该域名已经和对应的 IP 地址建立了映射关系，DNS 将不再需要花费时间进行解析。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/09/09-10-1.png)

如上图所示，京东网站的检查页面中就多次用到了 `dns-prefetch` 属性，这样可以让 DNS 将页面中的那些域名提前解析，待用户开始请求获取这些域名所对应的资源时，它们的 IP 地址已被获取，无须再解析。这种功能有利于网站的浏览，因为部分网站并非将所有的资源都放在同一个服务器，通过 DNS 的提前解析快速获取那些资源所在的 IP 地址，便能快速获取这部分资源。

## 计算机进制

## CSS 表示颜色

## Chrome 调试工具

## 浏览器渲染流程

[^1]: 回顾一下，img 和 iframe 元素中链接资源的属性都是 `src`，link 的是 `href`。此外，注意 link 元素虽可以引入 CSS 资源，但它是 HTML 中的元素，是标记语言，而非 CSS 这样的样式语言。
