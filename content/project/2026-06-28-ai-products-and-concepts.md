---
title: "海外 AI 产品和概念的区分与关系梳理"
date: "2026-06-28"
slug: "ai-products-and-concepts"
author: 黄国政
tags:
  - AI
  - Agent
  - Harness
  - 产品
---

<!--more-->

{{% notice content "按语" %}}
今天在「程序员鱼皮」的公众号看到了一篇[文章](https://mp.weixin.qq.com/s/aCFXu9pNBQQ1t0v8U5BdsA)，里面介绍如何通过 CC Switch 在 Claude Code 中使用订阅门槛低且可「量大管饱」的 Deepseek。翻到评论区，有人问「这样做还有什么意义？claudecode到底指的是什么，大模型还是IDE」。这很快也成为了我的困惑，而该评论下的几则回复则让我感到好像被回应明白了，可随即对 AI 产品与概念更感模糊。

> 一个cli工具，不是大模型

> 智能体，里面塞啥大模型都可以

> claude code严格意义上讲指的是一个harness，可以理解为大模型（LLM）的调度器，harness+LLM=agent（智能体）。正常来说，Claude code这个harness配合自家的Claude大模型比如opus4.8，发挥的作用最佳。但他家大模型由于一些原因，普通用户想要用上有门槛。但是它的Claude code harness这个模型调度器又很好，所以就衍生出了，claude code harness+各类国内LLM的玩法

Claude Code 是 Harness？那 Claude 是什么？哪些是产品，哪些是大模型，哪些又是 Agent……我以为我了解 AI，其实很多内容都很陌生，遂决定搜集资料写作此博文。
{{% /notice %}}

随着 AI 的发展，各种产品和概念层出不穷，本篇博文尝试以从 Anthropic、OpenAI 和 Google 三大厂商推出的模型和产品切入，对各海外主流 AI 产品及该领域中的概念进行梳理。

在对各厂商的产品进行介绍和梳理前，我们需要澄清一下 7 个概念，分别是 Web 网页、Desktop 桌面端应用、Mobile App 移动端、IDE、CLI、 TUI 和 GUI。

我们可以简单将这 7 个概念理解为**用户与 AI 产品的交互界面/方式**，它们之间的关系如下：

```
交互界面
├── GUI（图形用户界面）← 一个"大类"
│    ├── Web 网页
│    ├── Desktop 桌面应用
│    ├── Mobile App 移动端
│    └── IDE（Desktop GUI 的专用形态）
└── 文字界面
     ├── CLI（纯命令行）
     └── TUI（终端伪图形，介于 CLI 和 GUI 之间）
```

对于一般用户而言，Web 网页、Desktop 桌面应用和 Mobile App 移动端最为熟悉，用得也最频繁。

|                | 运行方式         | 特征                     |
|:---------------|:-------------|:-----------------------|
| Web 网页         | 浏览器访问 URL 链接 | 无需安装，可跨设备，但受到浏览器的限制    |
| Desktop 桌面应用   | 在电脑上安装运行     | 需要下载和安装，可以访问本地文件/通知    |
| Mobile App 移动端 | 在手机上安装运行     | 需要下载和安装，可以调用摄像头/麦克风等硬件 |

CLI、TUI 和 IDE 则多为开发者使用。[^1]

[^1]: CLI 和 终端（Terminal） 之间的关系可能会被搞混。终端是运行文本程序的容器/环境，也可以说是一个应用程序，比如我们在 Windows 中按下 <kbd>Win</kbd>+<kbd>R</kbd>，然后输入 `cmd` 唤起的界面。CLI 则是程序与用户交互的设计方式。CLI 几乎必然跑在终端中。

|     | 运行方式 | 特征 |
|:----|:--------|:----|
| CLI | 在终端（Terminal）中运行 | 1、无图形界面，纯文本命令输入和输出 <br/>2、可脚本化，面向开发者  |
| TUI | 在终端（Terminal）中运行 | 1、终端中的伪图形界面，有颜色、方框等界面增强 <br/>2、可被理解为介于 GUI 和 CLI 之间  |
| IDE | 在电脑上安装运行  | 1、类似 Desktop 桌面应用，可访问本地文件、运行本地程序，有完整的 GUI（图形窗口界面） <br/>2、将代码编辑器、终端/命令行、调试器、版本控制、插件系统和 AI Agent 等工具链集成在一个窗口里，专为软件开发设计 |

值得注意的是，这里 GUI 和其他 6 个概念之间并不是完全并列的关系。事实上，在具体的产品中，它结合于 Web 网页、Desktop 桌面应用、Mobile App 移动端 和 IDE 4 种交互界面中。TUI 中虽然有伪图形增强，但不算真正的 GUI，不将其归于 GUI。

```
交互界面
├── Web          → 浏览器 + GUI
├── Desktop      → 本地电脑 + GUI
├── IDE          → 本地电脑 + GUI
├── Mobile       → 手机 + GUI（触控）
└── Terminal/CLI → 终端 + 纯文本交互
                    ├── 纯 CLI（只有纯文本）
                    └── TUI（文字 + 伪图形增强）
```

## 产品（Product）

基于以上概念的信息背景补充，我们便可以总结归纳一下三大厂商推出的 AI 产品。

### Anthropic 的产品

* Claude
  * Web 网页
  * 对话式产品，Agent 能力有限
* Claude
  * Desktop 桌面端应用
* Claude
  * App 移动端应用
* Claude Code
  * CLI + TUI + Agent
  * Harness

### OpenAI 的产品

* ChatGPT
  * Web 网页
  * 对话式产品，Agent 能力优先
* ChatGPT
  * Desktop 桌面端应用
* ChatGPT
  * App 移动端应用
* Codex CLI
  * CLI + Agent
  * Harness
* Codex Desktop
  * 桌面端应用

### Google 的产品

* Gemini
  * Web 网页
* Gemini
  * Desktop 桌面端应用
  * 截至本文发布日期，Gemini Desktop 目前只在 Mac 发布
* Gemini
  * App 移动端
* Gemini CLI
  * CLI Agent
  * Harness
* Antigravity
  * Agent
  * Harness
* Antigravity IDE
  * IDE Desktop 桌面应用

{{% notice info "补充" %}}

从产品的目标用户出发，可以这样区分：

| 目标用户 | 使用场景 | 产品  |
|:--------|:-------|:------|
| 普通用户 | 聊天、问答、创作 | Claude (Web, Deskpot, App) <br/>ChatGPT (Web, Deskpot, App) <br/>Gemini (Web, Desktop, App)  |
| 开发者 | 编程、自动化、工具链 | Codex (Desktop, CLI) <br/>Claude Code Gemini (CLI), Antigravity, Antigravity IDE  |
| 企业 / API 使用方 | 将大模型集成到自己的产品中 | OpenAI API <br/>Anthropic API <br/>Google AI Studio  |

{{% /notice %}}

## 大模型（LLM）

Anthropic 的大模型主要包括 Haiku、Sonnet、Opus 和 Fable。

OpenAI 的大模型主要包括 GPT-5.3、GPT-5.4、GPT-5.5 等。

Gemini 的大模型主要包括 Flash、Pro 和 Ultra。

## 关系（Relationship）

理解本文提到的三大海外产商的 AI 产品，可以从大模型（LLM）、Agent 和交互界面三个层级出发。

```
┌────────────────────────────────────────────────────────┐
│                    第三层：交互界面层                    │
│        用户如何"使用" Agent（IDE / CLI / TUI / Desktop） │
├────────────────────────────────────────────────────────┤
│                    第二层：Agent 层                     │
│        Harness（调度逻辑） + 工具调用（Tool Use）         │
├────────────────────────────────────────────────────────┤ 
│                    第一层：模型层（LLM）                 │
│        真正的"大脑"：Claude / GPT-4 / Gemini / DeepSeek │
└────────────────────────────────────────────────────────┘
```

大模型（LLM） 可以被理解为「大脑」，是纯粹的文本输入与输出程序（输入才有输出），自身无法主动执行代码或操作文件。

Agent 可以被理解为「LLM + Harness + 工具调用」，这相当给大模型（LLM）装上了"手脚"（实现工具调用），让它能真正执行任务。具体来说，在一个 Agent 的工作流程中，LLM 负责思考和决定下一步做什么（决策）；Harness 负责执行循环，将 LLM 的输出解析为动作，工具调用执行之后，Harness 再把结果反馈给 LLM；工具调用指的是读写文件、执行 Shell、浏览网页、调用 API 等。

交互界面则决定了用户以什么方式使用这套系统，或者说在什么「壳子」上使用 Agent。第一部分讲得已十分详细，如 Web、Desktop、Mobile、IDE、CLI 、TUI。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-28-01.png)

## Harness

这里再聊一下 Harness，前面大致说过，在 Agent 中，Harness 指调度循环，它主要是接受 LLM 的输出，对该输出进行解析，然后由工具调用执行相关文件，之后把结果反馈给 LLM。其运行逻辑如下所示。

```
用户输入
   ↓
LLM 思考 → "我应该先读一下 main.py"
   ↓
Harness 解析 → 执行 read_file("main.py")
   ↓
结果返回给 LLM → LLM 再次思考
   ↓
LLM 思考 → "我应该修改第 10 行"
   ↓
Harness 解析 → 执行 edit_file(...)
   ↓
...循环直到任务完成
```

回到博文开头，在鱼皮的公众号文章中，关于 Harness 的说明让我感到似懂非懂，与 Antigravity 中的 Claude Sonnet 4.6 讨论，它反馈如下，但是否准确我想需要先持保留意见。

> Claude Code 的价值 70% 在 Harness，30% 在 Claude 模型。
Harness 的工程设计（循环调度、工具集、上下文压缩）是 Anthropic 公开的工程成果，而底层 LLM 接口只要符合 OpenAI API 格式就可以替换 —— 这就是 CC Switch 的技术基础。

为了更具体说明 Harness 如何发挥作用，Antigravity 以自身为例子。

> 我是 Google DeepMind 团队构建的 Antigravity Agent，底层模型是 Gemini 系列。你现在用的是 Antigravity 的对话界面，它的 Agent 能力（读文件、写文件、运行命令、搜索代码）就是 Harness 层提供的。Antigravity IDE 则是将这套 Agent 嵌入桌面代码编辑器后的 IDE 产品形态。

按照这一理解的话，通过 CC Switch 将国产大模型接入 Claude Code 中，虽然国产大模型比不上大模型 Claude，但在订阅后者困难的情况下，使用前者还可以享受 Claude Code 更优秀的 Agent 能力——读文件、写文件、运行命令、搜索代码等。

这里再提一提，正是因为 Agent 的 Harness 的 LLM 之间的接口是标准化的——通常是 OpenAI 兼容的 API 格式——那么只要 LLM 支持这一接口格式，Harness 就可以调用。但这可能带来三个问题：

* 工具调用（Tool Use）的兼容性可能下降。
* 某些需要模型特定能力（如 Claude 的 Computer Use）的功能失效。
* 中文模型对 Harness 的指令理解可能不如原生模型精准。