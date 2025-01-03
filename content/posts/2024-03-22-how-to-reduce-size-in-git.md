---
title: 如何减小基于Git的博客仓库大小
author: 黄国政
date: '2024-03-22'
slug: how-to-reduce-size-in-git
categories: []
tags:
  - 技术折腾
  - Git
---

<!--more-->

我特喜欢在博客上下左右前后东南西北地折腾，就好像装点自己的小屋，什么css，js，有时候一天能换个几遍。同时，由于不良的写作习惯，我老喜欢“提交-修改-再提交-再修改”，这样做的结果是Git的提交内容很多，但大多可以一次性一起完成，而非一次次提交。

这还不是最大的问题，最重要的是**不要随便用git管理大文件**，例如大图片、音乐与视频。我们用Git管理过的大文件，尽管事后删除，其历史记录都会被`.git`文件夹保留下来，时间长了，该文件夹会变得十分臃肿，影响仓库和Git的使用。

我从2023年5月27日开始写博客，期间用Git管理过大量图片、音乐和视频，上传过最大的视频大小高达98M。前几天我看了一下自己中文博客仓库，妈呀，存储空间占了1G多，几乎全来自`.git`文件夹，其次是存放静态文件的`static`文件夹占500多M，其他都只是占个几十K。

那么臃肿的`.git`文件夹和博客仓库会带来什么问题？我的理解有以下几点：

1. GitHub用户fork我的仓库时需要花费更多时间下载，同时我的仓库会占用别人更多的存储空间。
2. 以后我要是换电脑了，clone仓库到本地会很耗费时间。
3. 我在本地仓库向远程仓库推送文件会受到阻碍。
4. 仓库体积过大，占用电脑本地闪存的存储空间。
5. `git pull`时可能由于引用对象过多导致报错，导致本地代码无法更新。

基于以上几点考虑（好吧，其实让我最担心的是第二点），我决定减小本地与远程博客仓库的大小，一个是从`static`文件夹入手，另一个则从`.git`文件夹入手。随着探索，我才发现难度在两者间递增……

## 简化`static`文件夹

诚如叶寻[所说](https://github.com/earfanfan/yuanfan/pull/609#issuecomment-2006406373)，将二进制文件放入基于Git管理的仓库不是一个优雅行为，我选择像他一样将本来放在`static`文件夹中的图片、音乐与视频等单独放进一个仓库中，再用jsDelivr链接来引用。

我在GitHub中创建了一个`blog-static`的远程仓库，之后直接在本地使用Git创建本地仓库并进行关联。

值得一提的是如何使用[jsDelivr](https://www.jsdelivr.com/)引用图片、音乐与视频。

我第一次看到类似的用法是益辉以此引用字体与js，示例如下：

```jsDelivr
https://cdn.jsdelivr.net/gh/yihui/cron/fonts/SourceHanSerifCN-Regular-yihui.woff2
```

```jsDelivr
https://cdn.jsdelivr.net/npm/@xiee/utils/js/faq.min.js
```

以前看不明白`https://cdn.jsdelivr.net/`，不知道该如何使用，还得翻到别人仓库反复看几遍才用起来。后来逐渐了解这只是一个载体/工具，可以加速引用，便用上了益辉的字体和js。在最近的一次讨论中，恰好叶寻贴出了自己用jsDelivr引用图片的代码。

```
![别直接连接 NS 和笔记本电脑](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/images/2021-08-05_ns-output-ways.png)
```

我照猫画虎，稍稍做了改动，发现自己也可以相似的链接引用图片，顿时喜上心头，连忙再试试音乐与视频——成了。ChatGPT的相关解释如下：

> 在GitHub上的公开仓库中，图片文件是可以直接通过其URL进行访问的，无需发布Release。这是因为GitHub公开仓库中的文件可以被公开访问，包括图片文件。
>
> 当你使用类似于`https://cdn.jsdelivr.net/gh/你的GitHub用户名/你的仓库名称/图片文件路径`这样的URL时，jsDelivr会直接从GitHub仓库中获取图片文件，并提供CDN加速服务，从而在网页中加载图片。
>
> 总之，对于公开仓库中的文件（包括图片文件），你可以直接通过GitHub的URL访问，也可以通过jsDelivr提供的CDN加速服务访问，而无需发布Release。

之后，我将博客仓库中的静态文件尽数转移到`blog-static`仓库并进行了jsDelivr引用，释放了博客仓库500多M的存储空间。

## 减小`.git`文件夹大小

一份`.git`文件夹在我的博客仓库中占了1.33G，要知道我整个博客仓库也就才1.34G左右（简化`static`文件夹后）。

看看GPT对`.git`文件夹的定义：

> `.git` 文件夹是Git版本控制系统中的核心文件夹，它包含了整个仓库的元数据和对象数据库。在这个文件夹中，包含了Git所有的配置信息、分支信息、提交历史记录、对象索引等等。一般来说，用户不需要直接操作 `.git` 文件夹，而是通过 Git 提供的命令和工具来管理仓库的状态和历史。

点进`.git`文件夹，接着是`objects`文件夹，之后是`pack`文件夹，里面有两份文件，一份后缀为`.idx`，一份后缀为`.pack`。其中，后缀为`.pack`的文件就独自占据了1.33G。我们继续来看看GPT对这几个文件夹及文件的解释：

> `objects`文件夹：在`.git`文件夹内，有一个名为`objects`的文件夹，这个文件夹用来存储Git仓库中的所有对象（objects）。Git 中的对象包括提交（commit）、树（tree）、标签（tag）和blob（文件内容）。这些对象通过 SHA-1 哈希值来进行唯一标识，并且它们在对象数据库中被存储为文件。

> `pack`文件夹：在`objects`文件夹中，还可能存在一个名为`pack`的文件夹。这个文件夹用来存储Git对象数据库中的一种压缩形式。当Git仓库中的对象数量较多时，将这些对象进行压缩存储可以节省磁盘空间，并且在传输时可以提高效率。在`pack`文件夹内，可能会有一对后缀为`.idx`和`.pack`的文件。这两个文件是Git对象压缩所生成的索引文件和数据文件。

> `.idx`文件：这是索引文件，它包含了对象数据库中各个对象的元数据和位置信息，以便快速定位和访问对象。

> `.pack`文件：这是数据文件，它包含了经过压缩处理的Git对象。这些对象被组织在一起，并采用了一种高效的压缩算法，以节省存储空间和提高传输效率。

说白了，我想应该就是指过去历史提交记录的存在及存储它们的老窝。那么我有1.33G的历史提交记录自然不难理解，完全在情理之中——谁会将两三次便能提交完成的记录提交个七八遍，还老喜欢传图片、音乐，甚至还传了个98m的视频呀！我真懊悔……

如何解决这个问题呢？我问了GPT好久，也在网络上找了好多方法，在这里做一个简单的整理：

1. 管理历史记录。如果项目历史记录太长，可以考虑删除一些不必要的提交记录，或者使用 Git 的压缩命令来压缩历史记录。比如可以用到`git rebase`，`git filter-branch`[^1]，[`git-filter-repo`](https://github.com/newren/git-filter-repo)[^2]或者BFG Repo-Cleaner[^3]。
2. 使用 Git LFS。Git Large File Storage（LFS）多用于管理项目中的大型文件。
3. 定期清理不必要的分支和标签。定期清理不再使用的分支和标签，可以减小`.git`文件夹的大小。
4. 运行 Git 的垃圾收集命令。定期运行 Git 的垃圾收集命令，清理不必要的数据，以减小 .git 文件夹的大小。
5. 删除仓库。删除远程仓库并且删除本地项目下的`.git`文件夹，然后执行`git init`之后重新推送到新仓库，这会导致历史commit记录全都被删除。
6. 删除分支。这一点其实也属于第一点，涉及历史记录的删除。建立新的分支替代旧的分支，并将旧的分支连同历史提交记录删除。

[^1]: 试过无果，不知道问题出在哪里。网络上，甚至Git官方都建议用`git-filter-repo`代替这一种。

[^2]: 我一直无法成功用pip下载`git-filter-repo`。

[^3]: 刚开始还是可以的，后来翻车了。说说怎么使用：在该[页面](https://rtyley.github.io/bfg-repo-cleaner/)下载文件，是一个Executable Jar File，放在博客仓库的文件夹中，并且在该文件夹中右键打开终端，运行`java -jar/path/to/bfg-1.14.0.jar --strip-blobs-bigger-than 98M .`，之后再到git bash里面运行`git reflog expire --expire=now --all && git gc --prune=now --aggressive`。前面是指定大小删除，也可以指定文件删除：`java -jar bfg-1.14.0.jar --delete-folders "images" .`，随后同样需要在git bash中运行`git reflog expire --expire=now --all && git gc --prune=now --aggressive`。

直接附上我最终选择的解决方案吧。事实上，我觉得自己选择的方法并非最优解，但实在没有办法，工具BFG Repo-Cleaner本来确实将`.git`文件夹从1G多减到了3.3M，但等我预备推送到远程仓库时又显示有好几千条要拉取的内容，拉取失败，只好force过去，force完以后再看本地文件——妈呀，怎么原来的历史提交记录都多了一两条，这下`.git`文件夹变成了3.2G！

没办法了，由于博客仓库的历史提交记录对我来说确实不重要，现在每个记录多了几条后还显得更加冗余，我果断选择删除分支。

```bash
git checkout --orphan new_branch
git commit --allow-empty -m "Initial commit"
```

```bash
git push --force origin new_main:main
```

以上命令将新的分支推送到远程仓库，并使用`--force`标志来覆盖远程分支，这会删除远程分支上所有记录。

```bash
git fetch origin
git checkout main
git reset --hard origin/main
```

上面的命令将本地的分支名称彻底由new_branch改回branch。

在删除旧分支（包括历史提交记录）之后，还需要手动执行垃圾收集操作，于是需要运行下面的命令。

```bash
git gc --prune=all
```

果不其然，`.git`文件夹从3.2G变成了1.4G。

使用`git gc --prune=all`命令会清理掉一些不再需要的对象，但可能仍然有一些对象未被清理，这时候需要搭配另一个命令一起使用。

```bash
git reflog expire --expire=now --all
git gc --prune=all
```

这时候，`.git`文件夹的大小已经变成了960K。

好了，基本是上面这些操作解决了我这几天苦苦思索的问题，可以说比较直接暴力。实际上，我尝试解决问题的过程中也用了许多其他方法，但都失败了，最后只有这么一个方案实现了我的需求。下面是博客重新投入使用后的检测，可以发现`.git`文件夹确实减小了。[^4]

[^4]: 不仅是本地的减小了，我在远程仓库clone了一份博客仓库到本地查看，其`.git`文件夹与本地的一样。

```bash
$ du -sh .git
1.1M    .git
```

`.git`文件夹总大小1.1M，整个仓库的大小则是4.3M。

下面的命令可以呈现更多文件夹的存储空间占用情况。

```bash
$ du -h
49K     ./.git/hooks
2.0K    ./.git/info
1.0K    ./.git/logs/refs/heads
2.0K    ./.git/logs/refs/remotes/origin
2.0K    ./.git/logs/refs/remotes
3.0K    ./.git/logs/refs
4.0K    ./.git/logs
1.0K    ./.git/objects/45
1.0K    ./.git/objects/53
8.0K    ./.git/objects/5c
4.0K    ./.git/objects/63
1.0K    ./.git/objects/74
5.0K    ./.git/objects/info
868K    ./.git/objects/pack
936K    ./.git/objects
1.0K    ./.git/refs/heads
0       ./.git/refs/original
2.0K    ./.git/refs/remotes/origin
2.0K    ./.git/refs/remotes
0       ./.git/refs/tags
3.0K    ./.git/refs
1.1M    ./.git
0       ./.Rproj.user/C1821C3F/bibliography-index
0       ./.Rproj.user/C1821C3F/ctx
0       ./.Rproj.user/C1821C3F/explorer-cache
10K     ./.Rproj.user/C1821C3F/pcs
0       ./.Rproj.user/C1821C3F/presentation
0       ./.Rproj.user/C1821C3F/profiles-cache
0       ./.Rproj.user/C1821C3F/sources/per/t
0       ./.Rproj.user/C1821C3F/sources/per/u
0       ./.Rproj.user/C1821C3F/sources/per
830K    ./.Rproj.user/C1821C3F/sources/prop
56K     ./.Rproj.user/C1821C3F/sources/session-3ea50aad
886K    ./.Rproj.user/C1821C3F/sources
0       ./.Rproj.user/C1821C3F/tutorial
0       ./.Rproj.user/C1821C3F/viewer-cache
0       ./.Rproj.user/C1821C3F/viewer_history
903K    ./.Rproj.user/C1821C3F
24K     ./.Rproj.user/shared/notebooks
24K     ./.Rproj.user/shared
927K    ./.Rproj.user
12K     ./content/about
12K     ./content/music
4.0K    ./content/now
1.6M    ./content/posts
1.6M    ./content
3.0K    ./data
1.0K    ./layouts/shortcodes/blogdown
5.0K    ./layouts/shortcodes
5.0K    ./layouts
4.0K    ./public/posts/2020-12-01-r-rmarkdown
4.0K    ./public/posts
8.0K    ./public
2.0K    ./R
0       ./resources/_gen/assets
0       ./resources/_gen/images
0       ./resources/_gen
0       ./resources
220K    ./static/images
224K    ./static
1.0K    ./themes/hugo-theme-mini/archetypes
4.0K    ./themes/hugo-theme-mini/exampleSite/content/about
28K     ./themes/hugo-theme-mini/exampleSite/content/posts
32K     ./themes/hugo-theme-mini/exampleSite/content
0       ./themes/hugo-theme-mini/exampleSite/layouts
0       ./themes/hugo-theme-mini/exampleSite/static
47K     ./themes/hugo-theme-mini/exampleSite
36K     ./themes/hugo-theme-mini/i18n
21K     ./themes/hugo-theme-mini/layouts/partials/svgs
60K     ./themes/hugo-theme-mini/layouts/partials
3.0K    ./themes/hugo-theme-mini/layouts/section
6.0K    ./themes/hugo-theme-mini/layouts/_default/_markup
30K     ./themes/hugo-theme-mini/layouts/_default
101K    ./themes/hugo-theme-mini/layouts
20K     ./themes/hugo-theme-mini/static/css
220K    ./themes/hugo-theme-mini/static/images
1.0K    ./themes/hugo-theme-mini/static/js
241K    ./themes/hugo-theme-mini/static
453K    ./themes/hugo-theme-mini
453K    ./themes
4.3M    .
```

---

## 可参考的文章

1、《GitHub/jsDelivr 图床教程》，叶寻的博客，2020-12-05，https://cyrusyip.org/zh-cn/post/2020/12/05/host-images-on-github/

2、《寻找并删除 Git 记录中的大文件》，Harttle Land，2016-03-22，https://harttle.land/2016/03/22/purge-large-files-in-gitrepo.html

3、《git filter-branch 命令修改删除提示记录,删除误提交的大文件.减小.git的大小》，赵克利博客，2018-11-24，https://www.zhaokeli.com/article/8332.html

4、《记录删除.git记录大文件的过程》，小仙的博客，2021-09-22，https://cexll.cn/posts/%E8%AE%B0%E5%BD%95%E5%88%A0%E9%99%A4.git%E8%AE%B0%E5%BD%95%E5%A4%A7%E6%96%87%E4%BB%B6%E7%9A%84%E8%BF%87%E7%A8%8B/