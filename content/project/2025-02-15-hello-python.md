---
title: 下载与安装 Python （Windows版）
author: 黄国政
date: '2025-02-15'
slug: hello-python
categories: []
tags:
  - Python
  - 技术折腾
  - 与 AI 学习
---

<!--more-->

## 下载 Python

下载 Python 并不困难，直接到官网[https://www.python.org/](https://www.python.org/)，在主页面的导航栏 「Downloads」 处选择 「Windows」，然后再选择「Stable Releases」（稳定版本）处的最新一版下载。

我下载的版本是 Python 3.13.2，下载完成后，我将安装包放在了 D 盘的文件夹中，预备在 D 盘进行安装。

## 安装 Python

虽然下载简单，但安装 Python 时会出现许多设置选项，一般认为默认即可，但我认为，如果想扎实学习，应当对此做一些详细的了解，因此我决定以询问 AI 的方式进行相对全面的了解安装。

安装新的软件，为运行顺畅，我往往倾向于将其放在 D 盘文件夹， C 盘能不放便不放。因此，本次下载 Python 时勾选 `Customize installation`（自定义安装），而非 `Install Now`（即刻安装，通常安装在C盘中的用户文件夹中）。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/02/02-15-1.png)

在选择安装路径前，还有`Use admin privileges when installing py.exe` 和 `Add python.exe to PATH`两个选择，GPT提供的含义回答分别如下：

1. `Use admin privileges when installing py.exe` 表示在安装 `py.exe` 启动器时，使用管理员权限进行安装。`py.exe` 是 Python 启动器，可以帮助用户轻松地在命令行中启动 Python 解释器并选择特定版本的 Python。启用此选项将确保 `py.exe` 在系统的所有用户中都可用，而不仅仅是当前用户。如果希望多个用户都能使用 py 启动器，可以选择启用这个选项。[^user]

[^user]: 所谓「当前用户」和「所有用户」主要指安装 Python 时，是否希望该 Python 安装对计算机上的所有账户都可用。具体来说，「当前用户」指现在在计算机上登录的用户账户，如果不勾选第一个选项，则只有当前账户能使用 Python 和 `py.exe`，其他账户无法访问这些工具；「所有用户」指的是这台计算机上所有的用户账户，如果勾选第一个选项，那么在这台计算机上的每个账户（比如 「user1」、「user2」 等）都可以访问 Python 和 `py.exe`。

2. `Add python.exe to PATH` 会将 Python 的执行文件（`python.exe`）路径添加到系统的环境变量中（PATH）。勾选此项后，**可以在命令行界面（如 CMD 或 PowerShell）中直接输入 python 来启动 Python，而无需手动进入 Python 的安装目录。通常建议勾选此选项，因为它使得 Python 更加便捷易用，尤其是以后可能需要从不同的路径或命令行窗口中运行 Python**。

对我这个新手小白来说，第一条可勾可不勾，但第二条建议勾选，待 Python 下载完成后，按键盘<kbd>⊞</kbd>+<kbd>R</kbd>，可召唤运行窗口，再输入 `cmd`，可进入命令行窗口运行命令，例如检查是否成功下载 Python、查看 Python 版本号。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/02/02-15-4.png)

勾选 `Add python.exe to PATH` 后，进入 `Customize installation` 还需要进行额外的设置，如下图所示：

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/02/02-15-2.png)

向 GPT 请教图中的内容都是什么含义，列表如下：

| 选项 | 解释 |
|:---:|:---:|
| Documentation  <br><br>Installs the Python documentation files. | 安装 Python 的官方文档文件，帮助你查阅 Python 的使用手册。如果你经常需要离线访问 Python 文档，可以勾选这个选项。否则，如果你不需要离线文档，完全可以不选。 |
| pip  <br><br>Installs pip, which can download and install other Python packages. | 安装 pip，Python 的包管理工具。pip 可以让你轻松安装、升级、卸载其他 Python 包。强烈建议勾选这个选项，因为它是安装 Python 库和依赖的主要方式。 |
| tcl/tk and IDLE  <br><br>Installs tkinter and the IDLE development environment. | 安装 tkinter 库和 IDLE 开发环境。tkinter 是 Python 的标准 GUI（图形用户界面）库，用于开发桌面应用程序。如果你打算使用 Python 创建图形界面应用程序，或者使用 IDLE 这个官方的轻量级 IDE，那么可以勾选这个选项。 |
| Python test suite  <br><br>Installs the standard library test suite. | 安装 Python 的标准库测试套件，用于测试 Python 安装是否正常。如果你是 Python 开发者或想要运行一些自我测试，可以勾选此项。如果只是日常使用 Python，不勾选也没问题。 |
| py launcher / for all users (requires admin privileges)  <br><br>Installs the global 'py' launcher to make it easier to start Python. | 安装 Python 启动器，它提供了一个命令行工具 py，可以让你更方便地启动 Python 程序，尤其是在系统中安装了多个版本的 Python 时。例如，你可以使用 py -3.9 来启动 Python 3.9 版本，而不是手动指定完整路径。<br>选择 "for all users" 会让所有用户都能使用这个启动器（需要管理员权限）。 |

默认除 `for all users (requires admin privileges` 这一项外，全部勾选，按照 GPT 的介绍，默认勾选的功能应当是必要的，最后是否允许所有用户都可使用取决于个人意愿。如此，这一个界面直接<kbd>Next</kbd>即可。

接下来的界面是高级选项，默认勾选了2、3、4选项。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/02/02-15-3.png)

仍然是向 GPT 求助，详细信息如下：

| 选项 | 解释 |
|---|---|
| Install Python 3.13 for all users | 这个选项表示将 Python 安装为系统上的所有用户可用，而不仅仅是当前用户。如果你选择此项，所有计算机上的用户都可以使用 Python，安装过程需要管理员权限。如果只希望当前用户使用 Python，可以不勾选此项。 |
| Associate files with Python (requires the 'py' launcher) | 这个选项会将 Python 文件（如 .py 文件）与 Python 解释器关联，这样你就可以直接双击 .py 文件来运行它，而无需在命令行中输入 python。这个功能需要同时安装 py 启动器。如果你喜欢通过双击文件来运行 Python 程序，建议勾选此项。 |
| Create shortcuts for installed applications | 这个选项会在开始菜单、桌面等地方创建一些快捷方式，方便你快速启动 Python 或相关工具（如 IDLE、Python 控制台等）。如果你希望有更便捷的方式来访问这些应用，可以勾选此项。 |
| Add Python to environment variables | **这个选项会将 Python 的安装路径添加到系统的环境变量中，这样你就可以在任何命令行窗口（CMD 或 PowerShell）中直接使用 python 命令，而不需要每次切换到 Python 安装目录。强烈建议勾选此项，特别是如果你希望在任何地方使用 Python 命令的话**。 |
| Precompile standard library | 这个选项会在安装时预编译标准库中的 .py 文件为 .pyc 文件。这样做可以在运行时加速 Python 程序的启动，特别是在标准库被频繁使用的情况下。如果你对启动速度有要求，可以选择启用此选项。 |
| Download debugging symbols | 这个选项会下载调试符号文件，它们对于开发者在调试 Python 解释器时非常有用。如果你是 Python 开发者，或计划调试 Python 本身或一些底层问题，可以勾选此项。但如果只是普通用户使用 Python，不需要勾选。 |
| Download debug binaries (requires VS 2017 or later) | 这个选项会下载调试版本的 Python 二进制文件。调试版本会包含额外的调试信息，适用于开发者进行调试，尤其是需要使用 Visual Studio（VS 2017 或更高版本）进行调试时。如果你不进行底层开发，或者不打算调试 Python 的源代码，可以不勾选。 |
| Download free-threaded binaries (experimental) | 这个选项会下载一个实验性的 Python 版本，它允许多线程执行时不使用全局解释器锁（GIL）。这可能会提高多线程程序的性能，但由于是实验性功能，可能存在不稳定或兼容性问题。大多数用户可以不勾选此项，除非你对 Python 的多线程优化有特别需求。 |

按照说明，第一项其实与前两步有所重复，我选择跳过。第二、三、四项保留，其中，第四项其实与开始勾选的 `Add python.exe to PATH` 相似。剩下的五、六、七、八用于满足速度、开发、优化等需求，对于刚入门的普通用户而言必要性似乎不大，我选择跳过。

接着点击下方的<kbd>Browse</kbd>自定义安装路径，我选择安装在 D 盘。安装完毕后，会显示「Disable path length limit Changes your machine configuration to allow programs, including Python, to bypass the 260 character "MAX PATH" limitation.」，询问是否要禁用 Windows 系统中的路径长度限制。因为 Windows 系统有一个默认的路径长度限制（路径名最长只能有 260 个字符），如果选择禁用路径长度限制，Python 和其他程序就能够使用更长的路径名，超过 260 个字符。如果有很多子文件夹或文件名很长，禁用这个限制可以避免因路径过长而导致无法访问文件的问题。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/02/02-15-5.png)

但我想一般文件名的字符长度不会出现这样的情况，决定跳过。

## 运行 Python

Python 安装完毕后，点击电脑键盘<kbd>⊞</kbd>+<kbd>R</kbd> ，召唤运行窗口，输入`cdm`，回车进入命令提示符。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/02/02-15-6.png)

此时的文件路径是 C 盘，如果将 Python 安装在了 D 盘，一般情况下需要输入 `D:`，将路径改为 D 盘才能运行，但是前面在安装 Python 时说过了勾选 `Add python.exe to PATH` 后， Python 的执行文件 `python.exe` 便被添加到系统的环境变量，此时我在界面中无需手动切换至 Python 的安装目录——即 D 盘，也可以直接运行 Python。

输入 `python`，返回信息

``` python
Python 3.13.2 (tags/v3.13.2:4f8bb39, Feb  4 2025, 15:23:48) [MSC v.1942 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
```

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2025/02/02-15-7.png)

进入 VScode (Visual Studio Code)，先在 `Extensions` 处安装 python 扩展，打开提前在文件夹路径 `D:\\Tool\Python` 创建好的子文件夹 `files`，之后在里面再创建以 `.py` 为后缀的文件 `first.py`，而后输入代码如 `print ("与 AI 学习")`，通过快捷键<kbd>Ctrl</kbd>+<kbd>S</kbd>快速保存文件。

接着可以通过快捷键<kbd>Ctrl</kbd>+<kbd>`</kbd>召唤终端，或者在顶头的 View 处选择 Terminal。

终端显示我在 Python 中打开的文件路径`D:\\Tool\Python`。此时要运行 `first.py`，还需要在前面加上上一级文件夹 `files`，中间用`/`或`\`都可以，而后回车即可运行代码。

``` python
PS D:\Tool\Python> python files/first.py
与 AI 学习
```

```
PS D:\Tool\Python> python files\first.py
与 AI 学习
```