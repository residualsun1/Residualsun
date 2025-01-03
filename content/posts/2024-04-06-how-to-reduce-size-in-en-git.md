---
title: 如何减少基于Git的博客仓库大小（简化版）
author: 黄国政
date: '2024-04-06'
slug: how-to-reduce-size-in-en-git
categories: []
tags:
  - 技术折腾
  - Git
---

继上一回成功[减少中文博客仓库的大小](https://guozheng.rbind.io/posts/2024/03/how-to-reduce-size-in-git/)以后，叶寻在评论区补充了一个将Git中所有提交记录合并为一个的[方法](https://github.com/residualsun1/Residualsun/discussions/46#discussioncomment-8882040)，刚好我希望能继续用英文写博客，同时进一步熟悉Git的历史记录与储存空间管理，并基于上一次的经验对记录过程进行简化，遂决定以此方法处理英文博客仓库。

<!--more-->

需要的储备知识：懂得如何使用GitHub创建仓库，以及Git的基本使用。

## 一、迁移博文二进制文件

博文的二进制文件在此特指图片、音乐和视频等文件，通常存放在`static`文件夹中。Git是一种分布式版本控制系统，用于处理各项项目，而GitHub则是不限流量，托管这些项目的平台。但需要指出的是，这并不意味着Git与GitHub适合用于[管理和储存大量大型文件](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)。过大的文件会导致Git管理下、托管在GitHub中的仓库过大，影响克隆、日常运作与协作。这在博客中的体现可能包含以下几点：

1. 当原电脑数据丢失后，从远程仓库中重新下载仓库到本地需要大量时间。
2. 在GitHub上进行提交的速度变慢，甚至会失败。
3. 协作者fork仓库很麻烦。

基于以上几点问题，我们可以先从减少仓库的二进制文件开始。一个十分简便的方法是在GitHub上创建一个新的仓库，并将原来的二进制文件迁移过去。当我们需要在博文中引用这些二进制文件时，我推荐使用[CDN](https://www.jsdelivr.com/)。下面提供一个在GitHub仓库中引用二进制文件的较为普适的模板：

```
https://cdn.jsdelivr.net/gh/你的GitHub账户名/你储存二进制的仓库名/二进制文件.后缀
```

例如，我在GitHub仓库中创建了一个名为`en-blog-static`的仓库，并在其中创建了`cover`与`img`两个子文件夹。其中，`cover`文件夹用于储存英文博客的文章封面图片，`img`文件夹则用于储存英文博客的文章内容图片。

现在我要引用`cover`文件夹中的格式为jpg的`2024-01-01`文件，则写成：

```
https://cdn.jsdelivr.net/gh/residualsun1/en-blog-static/cover/2024-01-01.jpg
```

如果是引用`img`文件夹中格式为webp的`khon`文件，则写成：

```
https://cdn.jsdelivr.net/gh/residualsun1/en-blog-static/img/khon.webp
```

音乐与视频文件类似，只需要注意将其所属文件夹、其文件名称及后缀对应写好即可。

## 二、使用Git命令将多个历史提交记录压缩为一项记录

这一步操作会改写Git中的历史提交记录，主要影响Git的协作。在正规的、大型的及协作项目中，我们非常不建议进行此项操作，这会导致团队或者其他贡献者在协作中拉取代码时出错，影响整个项目运行，同时阻碍对历史记录的排查。

当然，是否要在个人仓库中折腾则几乎取决于自己。对我来说，个人博客不是一个协作性极强的项目，只是我个人的写作展示与技术折腾平台，偶尔会有一两位好友拉取我的仓库代码进行合并提交，如果追溯历史记录对我而言并不重要，我会选择尝试一下。[^1]

[^1]: 这就需要麻烦朋友下次重新fork仓库了。

在本地博客仓库中，点击鼠标右键并选择`Git Bash Here`，进入Git的编辑页面，而后输入：

```bash
git rebase --interactive --root
```

此前，我强烈建议使用者在Git中关联界面较为清晰可辨的编辑器，Windows用户可以考虑广泛使用的[Visual Studio Code](https://code.visualstudio.com/)。如果你关联了Visual Studio Code，Git界面会提示等待一会，而后便在Visual Studio Code中打开新界面。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/images/2024/04/04-06-1.png)

这是我合并过历史提交记录后再次用`git rebase --interactive --root`打开的界面，故而只剩下了两个提交记录——可以看到界面中有两行pick。实际上，原来有着数十行pick，现在都被合并到了第一行pick中，即`pick 734668c Initial commit`。但方法不变，假设我们现在界面中有几百行pick，我们只需要点击界面左侧的放大镜标志，在Search栏中写下pick，并取消第一行的pick以及最后一行的pick，接着在Replace栏中写上fixup，接着点击全部替换，最后保存文件并退出即可。我们会看到Git的Bash界面会显示正在合并历史提交记录，待它执行完成以后，我们会发现过去的几百份历史提交记录全部被合并为一份。

![我已经在Search栏中输入pick，检索出了三处结果。需要注意，必须保留第一个pick提交记录，最后一行的pick往往属于注释内容，也可以保留不变。将鼠标移动到左侧检索结果，点击”×“取消需要保留的选择以后，在Replace栏输入fixup以将其他检索结果全部替换。](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/images/2024/04/04-06-2.png)

在历史提交记录全部被合并为一份以后，我们还需要在Git的Bash界面中手动输入几段代码清理垃圾，以真正释放仓库的储存空间。

```bash
git gc --prune=all
```

需要指出的是，使用`git gc --prune=all`命令会清理掉一些不再需要的对象，但可能仍然有一些对象未被清理，这时候需要搭配另一个命令一起使用。

```bash
git reflog expire --expire=now --all
```

接着再执行一次上一行的代码。

```bash
git gc --prune=all
```

这时候仓库中`.git`文件夹占据的空间会大大减少，可以使用两个不同的命令分别查看`.git`文件夹大小和仓库中每个具体文件夹的大小。

```bash
du -sh .git #查看.git文件夹大小
```

```bash
du -h #查看仓库中多个文件夹的大小
```