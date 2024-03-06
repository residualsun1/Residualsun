---
title: 裸呈
author: 黄国政
date: '2024-03-02'
slug: naked-in-article
categories: []
tags:
  - 天工记
---

<!--more-->

## 前言

第一次听说“裸呈”这一概念，是在梁永佳的《[直面认识论难题的主体民族志](https://kns.cnki.net/kcms2/article/abstract?v=UeijT_GnegA-fDnOx8h_XAFbn3Df1npd6-qZ3JmQbIT3a3QhE0lXBbrJO3lPn5bY1MrziYNdZZaziWelGA4KDiWysPSazv6RJAl1XVAI4eUYKEjAEs3Q9j6nSWW3pq8S9NGmrAjSW0joO0nzia7cCA==&uniplatform=NZKPT&language=CHS)》这篇文章上[^note1]。原文中有一段话对“裸呈”的解释最为通俗：

[^note1]: 文章以朱炳祥“对蹠人”系列民族志中的《他者的表述》和《自我的解释》为例，讨论对象是主体民族志，其中“裸呈”概念由朱炳祥提出。

> “‘裸呈’指原原本本地呈现当事人的自发叙述。它除了要求简单的编辑外，还要求尽量减少作者的参与，追求将当事人的叙述‘自然而然地呈现’出来。”

当然，“裸呈”本身的概念十分丰富[^note2]，但在这里仅作为概念借用——关于面对自我的真实文字。

[^note2]: 可参见朱炳祥的《[三论“主体民族志”:走出“表述的危机”](https://kns.cnki.net/kcms2/article/abstract?v=UeijT_GnegCzoxHfQIDdk8CK9HYqyewcL3awWM8KWsIvJs1sYW3an_G4gT1-lOtcvwpNo_K_wLl9MzZXSXoErQb9ZClIDxGXiJMlvDIjvPn_GldgWI2mM5UDsZEcdV3E8UD0oG1bC__0rXZ4TU1Zvw==&uniplatform=NZKPT&language=CHS)》

今天突然想起了大一时下载的[eDiary](http://www.haoxg.net/ediary/index.html)，这是一个简易的日记软件，我在上面记录了2021年到2022年的大学生活和想法。今天再次打开，回忆重新被唤醒。

一两年前说远也不远，但当被遗忘的文字再次出现时，我多少还是会感到恍惚。当然，还有股失而复得的惊喜。

欣喜之余，我决定将这两年的78篇日记搬到自己的博客，但当再读起彼时的文字，几乎毫无保留的文字却让我感到些许的触目惊心，甚至是狰狞——我的偏执、我的偏激、我的戾气……在过去的文字中，我读出了今天部分让自己感到不满的性格的来源。

我认为，人还是很难直面自我——真实的自我。我会为自己的性格变得比过去更加稳定和内敛而高兴，但实在无法将它们再摆上台面，逐字逐句阅读下去。于我而言，至少在当下，它们只能被阅读一次，我也仅有一次经由文字感受自己变化过程的机会。但它们对我而言仍然重要，是曾经的我无法切割的一部分。只是我希望自己能像马达加斯加的维佐人一样，不受历史拘束，摆脱自己的过去，以行动于当下重新获得身份。

我决定将这78篇日记全部保存在GitHub的私密仓库中。由于文件太多，一个个拖动直接上传到仓库并不实际，于是我决定用起一直都不熟悉的Git，并将该过程记录下来。

或许以后，我会拥有坦然“裸呈”的心态。

## Git与GitHub

如何通过Git将本地文件上传到GitHub仓库？

首先，在GitHub创建一个私人/公共仓库（我选择了私人。如果要制作网页，则不能选择私人。），仓库创建好后会显示下列代码。

```
echo "# 2021-2022" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/residualsun1/2021-2022.git
git push -u origin main
```

接下来需要在本地的`2021-2022`文件夹右击鼠标，选择`Git Bash Here`，之后会跳出一个界面，以上命令便是在该界面中输入。

现在解释一下以上各命令的含义。

1. `echo "# 2021-2022" >> README.md`用于在本地的`2021-2022`文件夹下创建一个名为 `README.md` 的文件，并在文件中写入 `"# 2021-2022"` 这个标题。GitHub仓库中通常都会有一个`README.md`文件，作为该仓库的解释文档。

2. `git init`命令用于初始化一个新的 Git 仓库，即在本地的文件夹中创建一个新的Git仓库，包含用于跟踪文件版本历史的隐藏文件和目录（例如 .git 目录）以及其他 Git 所需的配置文件。这个新的Git仓库会与当前目录下的文件一起存在，并将跟踪和管理这些文件的更改。

3. `git add README.md`命令用于将 `README.md` 文件添加到 Git 仓库的暂存区（stage area）。

4. `git commit -m "first commit"`命令用于将暂存区中的更改提交到本地 Git 仓库，并添加一条提交消息 "first commit"。

5. `git branch -M main`命令用于重命名当前分支为 "main"。在较新版本的 Git 中，GitHub 仓库的默认主分支通常为 "main"。啊，据说将原来的master改为main和政治正确有关……

6. `git remote add origin https://github.com/residualsun1/2021-2022.git`命令用于将名为 "origin" 的远程仓库与本地仓库关联，这里的 URL 即GitHub 仓库的地址。

7. `git push -u origin main`命令用于将本地更改推送到名为 "origin" 的远程仓库的 "main" 分支。 -u 选项用于将当前分支与远程分支关联起来，以便以后只需键入 git push 就可以推送到相同的远程分支。

接下来展示我的运行过程。

### （1）git init

```
$ echo "# 2021-2022" >> README.md

$ git init
Initialized empty Git repository in D:/02_work/2021-2022/.git/

```

`Initialized empty Git repository`部分说明 Git 成功地初始化了一个空的 Git 仓库。

`in D:/02_work/2021-2022/.git/`说明 Git 仓库的位置。在这个例子中，Git 仓库被初始化在了 `D:/02_work/2021-2022/` 这个路径下，并且 Git 仓库的相关文件和目录（包括用于存储版本历史的文件）位于 .git/ 目录中。

### （2）git add

```
$ git add README.md
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it
```

`git add` 用于将文件或目录添加到 Git 的暂存区。啥是暂存区？就是一个缓存区域，用于存放即将被提交到 Git 仓库的更改。

警告信息一般不会影响正常命令的运行，而报错则会。但我还是Chatgpt了一下，看看警告的原因是什么。

> 这个警告信息表明您的 `README.md` 文件包含了与操作系统相关的换行符问题。在Windows操作系统上，文本文件通常使用 CRLF（回车换行）作为换行符，而在Unix/Linux系统上，文本文件则通常使用 LF（换行）作为换行符。当您在Windows上处理Unix/Linux风格的文本文件时，Git 会警告您这种换行符的转换可能会发生。
>
> 在这种情况下，Git 会将 `README.md` 文件中的 LF 换行符转换为 CRLF 换行符。这种转换可能会导致一些意外的问题，特别是如果您的团队中有使用不同操作系统的成员时。为了避免这种警告，您可以在提交前将 `README.md` 文件的换行符转换为符合当前系统规范的格式。
>
> 您可以使用 `git config` 命令来设置 Git 的换行符规则。例如，您可以将 `core.autocrlf` 设置为 `true`，以在提交时自动转换换行符为符合当前操作系统规范的格式：
>
> ```  
> git config --global core.autocrlf true  
> ```
>
> 或者，如果您希望 Git 在提交时保持换行符不变，您可以将 `core.autocrlf` 设置为 `false`：
>
> ```  
> git config --global core.autocrlf false  
> ```
>
> 通过这样设置，您就可以在提交时避免 Git 对换行符的转换警告。

### （3）git commit

```
$ git commit -m "first commit"
[master (root-commit) 81275c4] first commit
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
```

我知道这是在本地进行了提交。在Git中，提交（commit）是将更改保存到本地代码仓库的过程，仅在本地环境中创建了一个新的提交记录。当通过 `git commit` 命令提交更改时，这些更改会被保存到本地Git仓库中，并且会生成一个唯一的提交记录，其中包含了提交的消息、作者信息、时间戳等。如果要将本地提交推送到远程仓库，则需要执行 `git push` 命令。

-m 之后的信息是描述提交所做的更改。

之后的信息具体含义是：

> `[master (root-commit) 81275c4] first commit`：这部分是提交的结果信息。其中：
>
> `[master (root-commit) 81275c4]`：这部分包含了提交的基本信息。master 表示当前所在的分支是 master 分支，(root-commit) 表示这是一个根提交，即该提交是仓库的第一个提交，81275c4 是提交的哈希值，每个提交都有唯一的哈希值用于标识。
>
> `first commit`：这是您在提交时提供的提交消息，用来描述这次提交的目的。
>
> `1 file changed, 1 insertion(+)`：这部分是对本次提交所做更改的简要统计信息。它告诉您在本次提交中有 1 个文件发生了变化，并且在其中的 1 处进行了插入操作。
>
> `create mode 100644 README.md`：这部分是描述了对文件的更改。它告诉您在本次提交中创建了一个新文件 README.md，文件权限为 100644，这通常是文件的默认权限。

### （4）git branch

```
$ git branch -M main
```

`git branch`通常用于创建、列出或删除分支。`-M main`是 `git branch` 命令的一个选项，其中`-M` 选项用于重新命名当前分支。显然在这里分支被命名为main。

### （5）git remote add origin

```
$ git remote add origin https://github.com/residualsun1/2021-2022.git
```

`git remote add origin` 用于添加远程仓库，并命名为origin[^note3]。

[^note3]: 常用名称，也可以换成别的。

`https://github.com/residualsun1/2021-2022.git` 指向名为“2021-2022”的仓库，也就是和本地仓库关联的远程仓库。在这里，origin已经作为该远程仓库的别名，方便在推送更改到远程仓库或从远程仓库拉取更改时使用。

### （6）git push

```
$ git push -u origin main
remote: Invalid username or password.
fatal: Authentication failed for 'https://github.com/residualsun1/2021-2022.git/'
```

`git push` 用于将本地仓库中的更改推送（上传）到远程仓库。`-u origin main` 是 `git push` 的选项和参数。

1. `-u` 是一个选项，也可以写作 --set-upstream，它的作用是将当前本地分支与远程分支关联起来。一旦使用了 -u 选项，以后在没有指定远程分支的情况下执行 git push，Git 将会自动推送当前分支到它所关联的远程分支。

2. `origin` 是远程仓库的别名。在之前执行 git remote add origin <url> 命令时，将远程仓库的 URL 添加为了 origin 的别名。这里的 origin 代表的是远程仓库的地址。

3. `main` 是要推送到远程仓库的本地分支的名称。在这个命令中，main是示例分支名，可以根据实际情况替换为想要推送的本地分支名称。

## 问题

在这里，我们实际是要将本地仓库的README.md文件上传到远程仓库，但是却出现报错信息。

```
remote: Invalid username or password.
fatal: Authentication failed for 'https://github.com/residualsun1/2021-2022.git/'
```

折腾了一下有新的报错信息出现，发现原来用户名和密码验证的方式已经移除，现在需要通过个人令牌来验证。

```
$ git remote set-url origin https://github.com/residualsun1/2021-2022.git

$ git remote add origin https://github.com/residualsun1/2021-2022.git
error: remote origin already exists.

$  git push -u origin main
remote: Support for password authentication was removed on August 13, 2021.
remote: Please see https://docs.github.com/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls for information on currently recommended modes of authentication.
fatal: Authentication failed for 'https://github.com/residualsun1/2021-2022.git/'
```

这下好办，登录到GitHub，在Settings（设置）页面的左侧菜单中选择Developer settings（开发者设置），然后选择Personal access tokens（个人访问令牌）。点击Generate new token（生成新令牌），然后按照指示选择需要的权限和范围，最后点击Generate token（生成令牌），复制生成的令牌，并在 `git push` 后在左上角出现的界面的密码中输入令牌即可。

之后再push就可以成功了。

```
$ git push -u origin main
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 221 bytes | 110.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
error: RPC failed; curl 56 Recv failure: Connection was reset
send-pack: unexpected disconnect while reading sideband packet
fatal: the remote end hung up unexpectedly
Everything up-to-date
```

虽然下面显示了由于网络问题导致的连接被重置的错误，但类似下面这样的消息还是说明推送成功了。

```
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 221 bytes | 110.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
```

## 最后

回到重点，我的目的是将大量文件一次性全部上传到远程仓库，因此需要如此操作。

```
$ git add .
```

这是将所有文件添加到暂存区的命令。

```
$ git commit -m "我的2021-2022年大学日记"
```

将所有文件提交到本地仓库，并注明提交消息为“我的2021-2022年大学日记”。返回结果很多，以下省略。

```
[main 77b47ae] 我的2021-2022年大学日记
 478 files changed, 11975 insertions(+)
 create mode 100644 2021-12-26/img1.jpg
 create mode 100644 2021-12-26/img2.jpg
 create mode 100644 2021-12-26/img3.jpg
……
```

最后直接推送到远程仓库，只需要几秒钟——这是我喜欢git的地方。

```
$ git push -u origin main
Enumerating objects: 553, done.
Counting objects: 100% (553/553), done.
Delta compression using up to 16 threads
Compressing objects: 100% (546/546), done.
Writing objects: 100% (552/552), 6.81 MiB | 6.28 MiB/s, done.
Total 552 (delta 149), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (149/149), done.
To https://github.com/residualsun1/2021-2022.git
   81275c4..77b47ae  main -> main
branch 'main' set up to track 'origin/main'.
```

2021-2022的我，就封存在我的GitHub私人仓库里吧。或许在未来的某一天，我会再打开你们，面对裸呈的自我。