---
title: "为 C 盘桌面应用创建快捷方式"
date: "2026-06-20"
slug: "create-shortcut-from-c"
author: 黄国政
tags:
  - 技术折腾
  - Shortcut
---

<!--more-->

目前 Windows 中的 Codex 和 ChatGPT 都只能在微软商店中下载，下载后也只能默认安装在 C 盘中，但这对创建桌面快捷方式并不方便。

在网络上检索后，一位博主提供的方案很好用，这里摘录具体的操作方法，原文[在此](https://www.cnblogs.com/zsnhweb/p/20019119)。

首先先按 <kbd>Win</kbd> + <kbd>R</kbd>，接着输入以下命令：

```
shell:AppsFolder
```

`shell:AppsFolder` 是 Windows Explorer 提供的特殊 `Shell` 地址，可以打开系统里的所有应用试图，包括 Microsoft Store 应用、普通桌面软件和一些系统应用。

回车后会显示一个 Application 的界面，如下：

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-28-02.png)

接下来找到希望创建桌面快捷方式的应用，右键并选择「创建快捷方式(S)」，会显示不能在当前位置创建，是否要放在桌面，此时选择「是」即可成功创建。