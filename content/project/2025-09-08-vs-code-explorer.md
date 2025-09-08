---
title: 让 VS Code 中 Explorer 栏内的文件按分级树状显示
author: 黄国政
date: '2025-09-08'
slug: vs-code-explorer
categories: []
tags:
  - VS Code
---

<!--more-->

今天在 VS Code 内的 Front-end 文件夹中创建新文件夹 CSS 时碰到了一个小问题。

当在 CSS 文件夹内再创建一个子文件夹时，该文件夹没有按照父文件夹与子文件夹之间的层级关系那样展开，即呈现为一种分级树状，而是显示为 `父文件夹\子文件夹` 这样的单行显示状态，如下图所示。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/09/09-08-1.png)

原因是 VS Code 「Compact folders」（压缩文件夹）功能在起作用，详见其介绍：

> Control whether the Explorer should render folders in a compact form. In such a form, sing child folders will be compressed in a combined tree element. Useful for Java package structures, for example.

如果偏好分级树状的显示，可以在设置（setting）中输入「Compact folders」，将 「Explorer: Compact Folders」关闭即可。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/09/09-08-2.png)