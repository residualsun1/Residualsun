---
title: 正式启用思源宋体
author: 黄国政
date: '2023-06-30'
slug: siyuansong
categories: []
tags:
  - R
---

<!--more-->

## 前言

看过[益辉](https:yihui.org)的博客之后，便开始对思源宋体垂涎三尺了。

虽说博客写作主打内容，但是美丽的字体也是持续创作的重要动力啊混蛋！（脑子里突然冒出了银时怒吼的模样，啊不，应该是新八的？）

![](/images/posts/2023/06/06-30-xinba-tucao.jpg)
|:--:|
|论吐槽，我新八哥没输过。|

每次逛益辉的博客，就好像曹操惦记着小乔，带着觊觎之心，我辗转反侧，最后还是下定决定给自己博客也换上思源宋体，虽然感觉很难。

## 过程

此前我已经将思源宋体下载并安装到自己电脑本地中，当然为保险起见，我也将字体复制了一份到博客的字体文件夹中。

这回在谷歌找到的这篇博客[帖子](https://blog.yfei.page/cn/2020/12/siyuansongti/)初步实现了我的需求。我基本按照里面的做法，将以下代码输入自己创建的custom.css文件中。

```
@font-face {
font-family: 'SiYuanSong';
src: local('Source Han Serif CN'), local('Source Han Serif SC'), /*如果可能，调用本地字体*/
  url('fonts/Noto_Serif_SC/NotoSerifSC-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'SiYuanSong';
  src: local('Source Han Serif CN'), local('Source Han Serif SC'), /*如果可能，调用本地字体*/
    url('fonts/Noto_Serif_SC/NotoSerifSC-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

body{
  font-family: 'SiYuanSong', serif;
}
```

此前我需要解决的第一个问题是如何自行创建.css文件。

google一下，这篇[文章](https://www.w3cschool.cn/article/91795162.html)可以解决问题，直接在记事本输入内容，保存的时候在文件名后加上.css的后缀即可。

将文件放入css文件夹中，回到自己的config.yaml文件，启用customCSS，字体便更换为思源宋体了。

## 问题

但是仍然存在一些小问题：

1. css中的代码路径似乎和我的不对应，我没有修改，但是仍然能显示思源字体。
2. **无法显示粗体字体**，应该是custom.css中的设置存在问题。

## 附

发现一篇关于益辉幻灯片思源字体设置的[帖子](https://d.cosx.org/d/421962-yihuicss)，码住，往后应当是能用上的。话说，这个[幻灯片](https://slides.yihui.org/2020-random-walk.html#1)的内容也特别走心。