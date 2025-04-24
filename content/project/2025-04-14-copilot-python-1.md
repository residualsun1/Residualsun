---
title: 初探实战项目：最好的人工智能辅助编程
author: 黄国政
date: '2025-04-14'
slug: copilot-python-1
categories: []
tags:
  - Python
  - 与 AI 学习
---

<!--more-->

谢颖老师给了我一本《 AI 辅助编程 Python 实战：基于 GitHub Copilot 和 ChatGPT》（下文简称为「《 AI 辅助编程 Python 实战》」），他简单地在 Python 中演示了如何结合 Copilot 写代码——在以 VS code 作为编辑代码环境的 Python 中安装 Copilot 的插件，接着给 Copilot 提供提示词，Copilot 会据此提供相应的回答和代码。

老师建议我将这种方式作为一个实战项目，展示「如何通过 AI 学习 Python 或 R」，例如，可以将之前做过的[ R 语言学习笔记](https://residualsun1/deploy)以这样的方式展示，做一个基于 Copilot 回答的学习笔记。

我不清楚这样一个项目成型的模样应该如何，但要先将基本的内容弄懂。

## 基本原理

Copilot 是一种 AI 助手，或者说是一种能将英语转换为程序代码的人工智能代理（AI Agent）。它的出现让我们可以以一种更便利、快捷的方式学习编写代码：**我们不必直接编写 Python 代码，而只需要懂得如何使用文字描述想要的程序功能（这些文字即「提示词」），Copilot 即可生成相应的代码**。

这与 LLM 密切相关，书籍作者 Leo Porter 和 Daniel Zingaro 给出的解释十分精辟和通俗，相信对没有接触过 AI 的初学者来说也完全能理解，引用如下：

> Copilot 的智能引擎是一种精妙的计算机程序，名为大语言模型（Large Language Model，LLM）。这种模型掌握了单词与单词之间的内在联系，包括识别特定语境中最合适的词汇搭配，并基于这些信息预测出一段提示词后面最匹配的单词顺序是什么。
>
> 想象一下，我们请你预测这个句子中的下一个单词可能是什么：“The person opened the____.” 你可以想到很多选项，例如 door、box 或 conversation 等，但有些单词如 the、it 或 open 则显然不合适。 LLM 会综合考虑当前上下文来生成下一个合适的单词，并持续不断地进行这一过程，直至任务完成。
>
> 请注意，我们并没有说 Copilot 明白它正在做的事情。它仅仅是依靠当前的上下文来持续生成代码。在你今后的编程之路上，要始终铭记：只有我们自己能判断生成的代码是否真正实现了自己的意图。虽然大多数情况下它能够做到，但你仍然应该时刻保持适度的怀疑精神。

过去，我在朋友袁凡的博客《[使用 Ragas 框架评估 RAG 项目的使用效果](https://yuanfan.rbind.io/project/ragas/)》中第一次接触到 LLM 的概念，只知晓其与 AI 有关，却怎么也看不懂是什么，没曾想《 AI 辅助编程 Python 实战》的解释却让我豁然开朗。

## 配置环境

直接上手，配置环境首先需要满足以下三步

1. 拥有一个 GitHub 账号，以访问 Copilot。进入 GitHub 后，到「Settings」的左侧导航栏找到「Copilot」，点击进入后启用 Copilot。
2. 安装 Python。关于这一点，可以参考我之前详细写过的《[下载与安装 Python （Windows版）](https://guozheng.rbind.io/project/hello-python/)》。
3. 安装 Visual Studio Code，作为编写代码的文本编辑器。进入 VScode 后，可以看见一共有「活动栏」、「侧边栏」、「编辑区」和「输出和终端版面」四个界面，然后在最左侧的活动栏中找到排第五的图标「Extensions」，点击进入，搜索并安装插件 `python` 、`GitHub Copilot`和`GitHub Copilot Chat`。

插件安装成功后，VS code 的界面右下角会出现一个 Copilot 图标，图示已用红线框标出。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/04/04-14-1.png)

接下来在左上角的「File」中选择「Open Floder」，选择合适的位置创建工作目录文件夹。我在 D 盘中创建了一个「Project」文件夹，再在里面创建「fun_with_copilot」文件夹作为工作目录[^work]，之后与结合 Copilot 进行编程或数据分析相关的具体文件都将存储于此。

[^work]: 创建「Project」的目的是将其作为集合 Python 的各种工作目录项目的文件夹。

创建好工作目录后，侧边栏会显示「FUN_WITH_COPILOT」，此时直接在「File」中选择「New File」，点击「Python File」，创建文件并将其命名为「first_Copilot_program.py」。

## 牛刀小试

文件成功创建后，编辑区会出现「first_Copilot_program.py」一栏，点击该文件，在其编辑区输入：`# output "Hello Copilot" to the screen`

以`#`作为开头的内容是注释内容，不会被运行，往往作为**描述代码功能的总结性文字**帮助程序员快速理解代码。安装 Copilot 后，注释内容便作为提示词的一种表现形式[^one]来触发 Copilot 提供代码建议，具体操作是在注释内容后点击<kbd>Enter</kbd>，移到新行的起始位置，Copilot 会提供建议内容——值得一提的是，Copilot 既可能直接提供一段代码，也可能提供一段注释。不管是代码还是注释，这些建议内容以浅色斜体字形式出现，按<kbd>Tab</kbd>可直接采纳。

[^one]: 后文会介绍提示词的另一种表现形式：文档字符串。

提供代码的例子：

```python
# output "Hello Copilot" to the screen
print("Hello Copilot")
```

提供注释的例子：

```python
# output "Hello Copilot" to the screen
#     print("Hello Copilot")
```

如果 Copilot 没有提供反馈，或者使用者不满意其提供的内容，可以在注释内容后按<kbd>Ctrl</kbd>+<kbd>Enter</kbd>来获取更多建议，这时候编辑区右侧会出现新面板「GitHub Copilot Suggestions」，里面会提供针对提示词而生成的多条建议，使用者根据需要进行判断和选择即可。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/04/04-14-2.png)

这里十分值得注意的，同时也是我认为最值得记录的是： **Copilot 的响应行为具有不确定性**，即针对同一段提示词，Copilot 可能会在不同的时间提供不同的建议内容——这种不确定性与 LLM 工作的原理直接相关，意味着我们必须掌握「判别提示词是否合适」，以及「识别代码是否准确」的能力。

得到正确的代码`print("Hello Copilot")`后，先保存文件，随后在编辑区右上角点击三角形形状的「运行」，显示结果如下

```python
PS D:\Project\fun_with_Copilot> & D:/Tool/Python/python.exe d:/Project/fun_with_Copilot/first_Copilot_program.py
Hello Copilot
```

`D:\Project\fun_with_Copilot>`即工作目录，`D:/Tool/Python/python.exe d:/Project/fun_with_Copilot/first_Copilot_program.py`即计算机运行代码的命令，意思是使用 Python 执行`first_Copilot_program.py`文件，得出输出结果「Hello Copilot」。

## Copilot 使用过程常见问题及应对方案

书籍的两位作者总结了一些应对使用 Copilot 时可能会面临的问题的方法，列在此处，方便随时回头参考。

| 问题                          | 描述                                                         | 应对方法                                                     |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 仅仅得到注释                  | 如果你使用注释符号（#）给 Copilot 提供提示词，当你换行时，它可能会生成更多的注释而不是生成代码。例如：<br /># output "Hello Copilot" to the screen <br /># print "Hello world" to the screen <br />我们见过 Copilot 生成一行又一行的注释，有时候还会重复！当发生这种情况时，第 3 条建议（使用文档字符串）往往是最有效的 | 1. 在编写的注释和 Copilot 的建议之间添加一个空行（通过按<kbd>Enter</kbd>实现），可以帮助它从注释切换到代码<br />2.如果新行不起作用，可以输入一两个代码字母（不使用注释符号）。以代码关键字的前几个字母作为提示词通常可以奏效。例如：<br />#output "Hello Copilot" to the screen<br />pr<br />3. 通常，输入关键字的前几个字母后，Copilot 会给出代码建议，把 # 注释换成文档字符串注释，类似这样：<br />"""<br />output "Hello Copilot" to the screen<br />"""<br />4. 按<kbd>Ctrl</kbd>+<kbd>Enter</kbd>组合键来看看 Copilot 是否可以给出代码而非注释的建议 |
| 错误的代码                    | 有时 Copilot 一开始就给出了明显错误的代码（在本书中，你将学会如何识别错误的代码）此外，有时 Copilot 似乎会陷入错误的路径。例如，它可能会试图解决一个与所要求解决的问题不同的问题（特别是第 3 条建议，可以帮助 Copilot 走上新的路径） | 本书的很多内容都是关于如何解决这个问题的，不过这里先给出一些能够让 Copilot 恢复正常的快捷技巧<br />1. 试图改变你的提示词，看看能够更好地描述需求<br />2. 尝试使用<kbd>Ctrl</kbd>+<kbd>Enter</kbd>组合键找到 Copilot 的正确代码建议<br />3. 关闭 VS Code 程序，稍等一会儿，然后重启它。这可以帮助清楚 Copilot 缓存，从而获取新的建议<br />4. 尝试将问题分解成更小的实现步骤（详见第 7 章）<br />5. 调试代码（详见第 8 章）<br />6. 尝试向 ChatGPT 请求代码，并将其建议复制到 VS Code 中。当一个 LLM 陷入僵局时，换一个 LLM 往往有助于摆脱困境 |
| Copilot 给出 # YOUR CODE HERE | 有时 Copilot 会在一段提示词后生成下面的注释（或类似的文本）来让我们自己写代码：<br /># YOUR CODE HERE | 我们认为，当我们让 Copilot 解决过去教师给学生布置的问题时，这种情况就会发生。为什么呢？因为当我们为学生布置作业时，我们（作为教师）经常会写出开头的代码，然后通过 # YOUR CODE HERE 来告诉学生该在哪里写出他们的代码。学生们往往会在他们的解决方案代码中保留这行注释，这意味着 Copilot 在训练时会认为这个注释是解决方案的重要部分（实际不是）。通常，可以通过按<kbd>Ctrl</kbd>+<kbd>Enter</kbd>组合键来解决这个问题，因为在 Copilot 的多条建议中通常可以找到合理的解决方案。但如果这种方法不起作用，请参见本表中“错误的代码”那一行的解决方案。 |
| 缺少模块                      | Copilot 给出了代码，但由于缺少模块而无法运行（模块是可以添加到 Python 中的额外代码块，它可以提供预先构建好的特定功能） | 请参阅 2.5 节中的 “Python 模块” 内容，了解如何在你的机器上安装新模块。 |

## 后话

与老师分别以前，老师还带着我到他的办公室，给了我一本《数据科学基础：基于 Python 的实现》。

路上，老师说北京的资源十分丰富，勉励我抓住机会——中央民族大学是一个更好的平台，好好努力，争取走得更远。