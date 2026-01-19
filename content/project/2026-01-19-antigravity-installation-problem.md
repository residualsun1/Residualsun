---
title: 解决安装 Antigravity 时无法在验证邮箱后跳转回应用的问题
author: 黄国政
date: '2026-01-19'
slug: antigravity-installation-problem
categories: []
tags:
  - 技术折腾
---

<!--more-->

Google 最近新出的 Antigravity 似乎非常好用，但在下载之后我遭遇了无法于验证 Google 邮箱后顺利跳转回应用的问题。在网络上进行检索后，我通过以下两种方法解决了问题，成功安装与运行 Antigravity。

## Google 账号归属地

Google 账号的**归属地**如果被判定为中国大陆或者香港地区，可能会导致使用受到限制。如果要知道自己的账号归属地，可以通过该[链接](https://policies.google.com/terms)进行查看。

进入链接后，页面底部会显示当前 Google 账号所归属的国家/地区。我初始查看时显示的就是香港，将 Google 浏览器的默认语言改为英语后，我发起修改申请，最后改为美国——美国应当是最稳妥的选择。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-19-1.png)

Google 官方提供的修改通道在此链接：https://policies.google.com/country-association-form

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-19-2.png)

将地区修改为美国，然后勾选原因。听说勾选的原因多一些会更容易通过，我选择了 4-5 个原因。

让我感到意外的是，申请提交以后，Google 官方很快——一个小时以内——就给我回复了邮件。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-19-3.png)

## Tun 模式

只是修改 Google 账号归属地，我发现还是无法成功在 Antigravity 的网页上验证邮件后跳转回应用。网上检索的信息指出梯子需要打开「全局模式」，并勾选「Tun 模式」。

我没在我的 Clash Verge 上找到「全局模式」，但是可以启用「服务模式」，之后打开「Tun 模式」并再去尝试，最后成功在验证邮箱后跳转回应用。