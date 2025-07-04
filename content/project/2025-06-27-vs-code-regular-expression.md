---
title: 使用 VS Code 与正则表达式批量修改 Markdown 文件
author: 黄国政
date: '2025-06-27T12:00:00Z'
slug: vs-code-regular-expression
categories: []
tags:
  - VS Code
  - Hugo
  - 技术折腾
  - 正则表达式
  - 与 AI 学习
---

<!--more-->

书接上文，更改了 Hugo 的短码配置后，散落在各篇文章中的短码需要得到修改。就我的网站和文章而言，我需要将原短码 `{{%/* update */%}} ... {{%/* /update */%}}` 统一修改为 `{{%/* notice */%}}...{{%/* /notice */%}}`。

ChatGPT 为我提供了「使用 VS Code 的正则替换」和「使用命令行批处理（适用于 Unix/Linux/macOS）」两种方案，我选择了前者。

## 具体操作

第一步，在 VS Code 中打开包含使用了短码的 `.md` 文件的文件夹——以我的网站为例，只有 `posts` 和 `project` 两个文件夹包含了使用短码的文件，分为两批先后处理即可。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/06/06-27-1.png)

第二步，在 VS Code 中打开文件夹后，按下 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd>（Windows/Linux）或 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd>（Mac）打开「全局搜索」，或者是直接点击最左侧导航栏的第二个搜索号。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/06/06-27-2.png)

第三步，点击搜索框最右侧的 `.*`，打开正则模式，之后在搜索框中输入以下正则表达式以查找所有 `update` 短码。

```bash
\{\{%+\s*update\s*%+\}\}
```

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/06/06-27-3.png)

第四步，点击搜索框左侧的 `>`，`>` 会变成 `v`，然后显示出替换输入框，接着在替换输入框中填入下面的代码，最后在输入框右侧点击全部替换。

```bash
{{%/* notice info$1 */%}}
```

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/06/06-27-4.png)

`$1` 是保留原来跟在 `update` 后面的参数信息（如果有的话），例如“2024-04-15 更新”。

进行到这里完成的是对起始标签 `{{%/* update */%}}` 的全部替换，还要对结尾标签 `{{%/* /update */%}}` 进行替换，步骤和上述一样，先输入结尾标签的正则表达式进行查找。

```bash
\{\{%+\s*/update\s*%+\}\}
```

然后在替换输入框输入以下代码并进行全部替换。

```bash
{{%/* /notice */%}}
```

分别对 `posts` 和 `project` 文件夹完成上述操作步骤即可。

如果可以，批量替换前先备份仓库或者 `.md` 文件。

## 正则表达式

过去我曾苦恼于如何批量修改网站的 `.md` 文件，以上操作似乎告诉我或许得了解甚至学习一下正则表达式了。[^regular]

[^regular]: 我最早在叶寻那里听说正则表达式，再次涉及正则，我想起了他写的《[正则表达式实例](https://cyrusyip.org/zh-cn/posts/2020/11/26/regex-examples/)》。但我好像是在他的日常博文或者某个评论区中看到的，已经记不清了。

什么是正则表达式？按照维基百科的[定义](https://zh.wikipedia.org/zh-cn/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)：

> 正则表达式（英语：regular expression，常简写为 regex、regexp 或 RE），又称规律表达式、正则表示式、正则表示法、规则表达式、常规表示法，是计算机科学概念，用简单字符串来描述、匹配文中全部匹配指定格式的字符串，**现在很多文本编辑器都支持用正则表达式搜索、取代匹配指定格式的字符串**。[^1]

[^1]: 博主加粗字体。

ChatGPT 的解释：

> 正则表达式（Regular Expression，简称 RegEx 或 regex）是一种用来匹配字符串中特定模式的语法规则。

正则表达式的主要用途包括这些：

* 搜索文本（如查找文中所有以“http”开头的链接）
* 替换文本（如把文章中所有中文引号 “ ” 替换成英文引号 " "）
* 验证输入格式（如检查邮箱地址、手机号、身份证号是否合法）
* 提取信息（如从文本中提取出所有日期、网址、标签）
* 批量文本处理（如在 Hugo 批量替换短码、统一 Markdown 格式、转换 HTML 标签等）

正则表达式的用途还十分广泛，从编程语言来看，可用于 Python、JavaScript、Java、Go 和 R —— 正则表达式不是编程语言，而是**一套字符串模式匹配的语法**；从文本编辑器来看，可以用于VS Code、Sublime Text、Notepad++ 等；从命令行工具来看，可以用于 grep、sed、awk等；从网页应用来看，则可以用于 Hugo、Markdown 处理、表单验证等。

ChatGPT 贴心地给出了学习正则表达式的建议——边查边学，还提供了一个可以实时测试、解释正则含义的网站： https://regex101.com/

我还不知道要不要学习正则表达式，如果后面还会不断接触到，就找时间好好了解一下。