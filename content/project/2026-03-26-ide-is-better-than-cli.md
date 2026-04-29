---
title: 我更愿意选择 IDE 而非 CLI 来使用大模型
author: 黄国政
date: '2026-03-26'
slug: ide-is-better-than-cli
categories: []
tags:
  - 大模型
  - IDE
  - CLI
---

<!--more-->

我现在基本不再通过中转站在 CLI 中使用 Claude 或 Codex，一方面是因为自己无法验证中转站背后反代的真实模型究竟是什么，另一方面则是感觉自己还没有能力充分使用 Claude 和 Codex。

讽刺的是，过去我对国产模型有着很深的[偏见](https://guozheng.rbind.io/posts/2026/03/thought-concerning-ai/)，但近来我的看法发生了很大变化——只是根据网络上的讨论而在抽象概念中对比海外大模型与国产大模型是一种很不谨慎的行为。

* 首先，**不少人对大模型的使用需求还远没达到需要比拼大模型能力的程度**。
* 其次，**只要大模型能解决相关具体的问题，那它便是有效的、值得使用的**。我认为对于初入开发领域的人来说，GLM 完全够用。

值得一提的是，使用大模型往往涉及 CLI 和 IDE，两种方式应该是各有好处，但当下我更倾向于选择后者。

CLI（Command Line Interface）是一种命令行界面，过去我多是在 CLI 中使用 Claude 和 Codex。CLI 的优势不少，相比于在界面中点击大量内容，通过 CLI 的命令可以快速批量处理。另外，可以借助 CLI 将所有命令写入脚本，以后配置环境只需运行该文件可以零误差复现操作。还有，由于在 CLI 中输入的都是纯文本，因此传输更加便捷。

基于以上特点，CLI 对开发者而言仍然是十分重要的与计算机交互的方式。不过在使用大模型的过程中，如果我们希望使得提示词的内容更加完整丰富，可能会需要分段段落、引用上下文内容、加入图片、视频等，此时 CLI 的纯文本可能会限制提示词的表达，但 IDE 却可以在保留 CLI 的交互方式的同时，还满足不同的提示词类型输入。

IDE（Integrated Development Environment）是集成开发环境，如同其名字「集成」，将开发需要的编辑器、编译器、终端、调试器、文件管理器等都整合到一个图形界面中，以最大化开发者的生产力，减少在不同工具之间切换的时间成本。VS Code 是最知名与流行的 IDE，虽然它本质上是一个轻量级的代码编辑器，但由于其强大的插件系统，它具备 IDE 所有核心功能。现在的 Antigravity、Cursor 和 Trae 等都是在 VS Code 的基础上进行研发。

如果让我选择开发环境，我还是更愿意选择 IDE。首要原因是可以在 IDE 的大模型对话框中相对更自如地编辑提示词，特别是当我需要引用上文某部分内容时；其次是据闻 IDE 可能对大模型有针对代码开发的优化，比如加载相关上下文的优化；最后是输入体验的偏好，过去因为只了解 Blogdown 包，我早已习惯在同为集成开发环境的 Rstudio 中写博客。

不过，我近来发现 Trae 中内置的国产大模型已经可以满足我个人的各种疑问，无论开发还是日常生活的，因此目前我已转战 Trae。此外，Trae 这些内置大模型的 IDE 基本都是沿用 VS Code 的模式，因此在文件管理方面上十分直观便利，还可以借助插件、终端和大模型进行各种操作。我认为这不仅适合于开发，也适合辅助日常写作的生产和管理。

---

参考链接：

1、[命令行与 Shell 脚本 - easy vibe](https://datawhalechina.github.io/easy-vibe/zh-cn/appendix/2-development-tools/command-line-shell.html)

2、[集成开发环境 (IDE) 基础 - easy vibe](https://datawhalechina.github.io/easy-vibe/zh-cn/appendix/2-development-tools/ide-basics.html)