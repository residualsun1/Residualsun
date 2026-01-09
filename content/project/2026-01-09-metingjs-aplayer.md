---
title: 使用 MetingJS 与 APlayer 代替 iframe 设置网站音乐播放器
author: 黄国政
date: '2026-01-09'
slug: metingjs-aplayer
categories: []
tags:
  - 技术折腾
  - 与 AI 学习
---

<!--more-->

## 问题

网易云音乐的 Web 版目前仍然提供音乐播放器外链。一般情况下，用户只要将外链复制好粘贴到个人网站后便可以基于 iframe 插件生成播放器——VIP 音乐除外。

长久以来，如果要引用网易云的音乐，我都会选择官方提供的外链播放器，但这种播放器却无法在我的 iPhone 浏览器上正常显示，只有请求桌面网站时才能加载出来。

Gemini 3 Pro Preview 告诉我，这不是链接本身写错的问题，而是网易云音乐官方对外链播放器的策略限制：

> 简单来说：网易云音乐为了推广自家的 APP，在检测到访问设备是“手机（iOS/Android）”时，会故意阻止外链播放器的正常加载，或者试图跳转到 APP，从而导致在 iPhone 的 Safari 浏览器中无法显示或显示空白。
>
> 当你点击“请求桌面网站”时，浏览器会伪装成电脑（改变 User Agent），网易云服务器以为你是电脑用户，所以就允许显示了。

## 解决方案

Gemini 给出的解决方案很简洁也很有效，使用开源的第三方播放器替代即可。

不过感觉 Gemini 呈现出了和 ChatGPT 十分不同的特点，也不知是不是我的错觉，Gemini 针对 iframe 的缺点做出了感情色彩似乎有些明显的价值判断——见下述我加粗的文字部分。

> 目前个人网站（如 Hexo, Hugo, WordPress 等）最主流的做法是**放弃官方那个丑陋且功能受限的 iframe**，改用 MetingJS 配合 APlayer。
>
> 它能自动解析网易云的 ID，生成一个适配移动端、支持 HTML5 的漂亮播放器。

具体方案见下述两步：

* 第一步，在我的网站仓库里找到 `baseof.html` 文件，在 `<head></head>` 标签之中引入下述 CSS 和 JS 文件。

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css">
  <script src="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js"></script>
  ```

* 第二步，完成第一步后，以后在帖子中使用下述代码即可引入网易云音乐，而不再需要使用 iframe。

  ```html
  <!-- server="netease" 代表网易云, type="song" 代表单曲, id就是你链接里的 id -->
  <meting-js
  	server="netease"
  	type="song"
  	id="">
  </meting-js>
  ```

以原子邦妮的《被你遗忘的森林》为例，传统上由网易云提供的音乐外链与生成的播放器如下：

```html
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=39436782&auto=0&height=66"></iframe>
```

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=39436782&auto=0&height=66"></iframe>

{{% notice info "说明" %}}

如果使用移动端（手机）浏览本篇帖子，应该看不到网易云的音乐播放器正常显示。

{{% /notice %}}

使用 MetingJS 和 APlayer 生成的播放器则如下：

```html
<meting-js
	server="netease"
	type="song"
	id="39436782">
</meting-js>
```

<meting-js
	server="netease"
	type="song"
	id="39436782">
</meting-js>

以这种方式设置的音乐播放器具有几个优点：

1. 与 iPhone、安卓手机以及电脑都能适配；
2. 界面更加美观，而且自带歌词；
3. 不会被网易云的防盗链策略轻易屏蔽。

## 后话

如果是 VIP 音乐，仍然能够解析，但只能解析到试听部分且只有 30 秒。原子邦妮的歌曲「被你遗忘的森林」就有《被你遗忘的森林》和《孤单会消失离开不见》两个专辑，前一个专辑是免费的，后一个专辑则需要 VIP。

<meting-js
	server="netease"
	type="song"
	id="448518236">
</meting-js>

希望免费的版本能够一直保留。