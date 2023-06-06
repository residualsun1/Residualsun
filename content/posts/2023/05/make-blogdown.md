---
title: Blogdown的折腾之旅
author: 黄国政
date: '2023-05-29'
slug: []
categories:
  - 学术田野
tags:
  - Blogdown
link-citations: yes
toc: true
---

## A.前言

从周五晚上开始挑选模板，周六也是花了一个晚上在挑，并开始初步修改模板，到周日搭建网站，然后继续深入修改模板，我的blogdown折腾了几乎<u>整整两天</u>（虽然其间两个早上的时间大部分都用来睡觉了）。  

这是除了bookdown外第二个让我如此专注的项目，两天的工作都是从早上到凌晨，醒来继续，一点一点调试，实在不懂就到[GitHub](https://github.com/)和[统计之都](https://cosx.org/)上求助，面对问题时抓耳挠腮的感受仍然“历历在目”  🤯，所幸都能专注下来寻找各种方法解决——解决问题的感觉当真是属于心灵的愉悦！

谨以此贴记录我这两天的尝试，同时也是作为自己的问题反思。

## B.问题 

### B.1模板的选择 

目前我搭建blog使用的是谢益辉开发的`Blogdown`包，搭配`Hugo`和`Github`以及`Github Deskopt`一起使用，网站建成以后托管到`netfliy`上。这里的方法主要是参考统计之都的贴文[<sup>1</sup>](#references1)和庄闪闪的公众号文章[<sup>2</sup>](#references2)。

可以在网站Hugo<https://themes.gohugo.io/>或<https://hugothemesfree.com/>上挑选模板。[Hexo](https://hexo.io/themes/)上的主题看起来更加丰富，但是我下载的模板建站都会失败，不知道是不是因为没有兼容。**在这里埋下一个坑**，~~等有时间~~好好细读谢大哥的[说明文档](https://bookdown.org/yihui/blogdown/)，之后再来填坑。

我选择的模板是[“Anatole Hugo Theme”](https://github.com/lxndrblz/anatole.git)，需要修改的重要文件有如下几项：  

基础配置
1. /config/_default/config.yaml
    - baseURL需要改为自己最后生成的博客地址。
    - 语言这一部分暂时没敢改成cn，保持默认，因为会牵涉到其他文件修改。
    - title就是博客主页显示的文字。
    - 其余的根据具体需求再修改，我选择保持默认。
2. /config/_default/languages.toml
    - 这一部分可以进行多语言设置。
3. /config/_default/menus.en.toml
    - 这部分是导航栏设置，可以更改导航栏中的内容名称，也可以增加新的内容。
4. /config/_default/params.toml  
    - description是主页上的简要说明，显示在主页title下面。  
    - profilePicture是博客头像。  
    - favicon是网站的标签图。  
    - 下方的Date是各项内容的时间格式设置。  
    - hidesidebar可以设置是否在浏览主页以外的界面时显示博客头像、标题和描述。  
    - social link是主页下链接到其他平台的设置。

**评论设置**（这个问题困扰我好久😭）
1. /themes/anatole/layouts/_default/single.html  
    - 评论系统代码放置的文件，这样可以保证系统只显示在post底部。
2. /themes/anatole/layouts/partials/comments/utterances.hml
    - 或许需要将其中的src修改为"https://utteranc.es/client.js"

### B.2模板的修改  

不同的模板具体修改方式不一致，但是大同小异。基于上面的修改内容，我回顾一下其中比较复杂的过程。

在评论系统的设置上，我选择了GitHub上的[utterances](https://github.com/utterance/utterances)（开源及免费的），下载之后可以在个人GitHub的"setting-applications"中找到，对其进行configure，授权并连接到自己的博客代码项目。  

根据指引，获取属于自己的评论系统设置代码：

```
<script src="https://utteranc.es/client.js"
        repo="[ENTER REPO HERE]"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```
将`repo`改为"GitHub用户名/仓库名"，`repo`之后的设置是评论系统的主题等，可以在指引界面中选择，不必自己手动修改。  

这一串代码可以放在single.html的这部分位置：

```
<div class="post__footer">
      {{ with .Page.Params.Categories }}
        {{ partial "taxonomy/categories.html" . }}
      {{ end }}

      {{ with .Page.Params.Tags }}
        {{ partial "taxonomy/tags.html" . }}
      {{ end }}
  **<script src="https://utteranc.es/client.js"**
    **repo="residualsun1/Residualsun"**
    **issue-term="pathname"**
    **theme="github-light"**
    **crossorigin="anonymous"**
    **async>**
  **</script>**
  #**是为了突出说明位置，实际不能保留。
    </div>
```

utterances.html改成这样：  

```
<script
  src="https://utteranc.es/client.js"
  repo="{{ .Site.Params.utterances.repo }}"
  issue-term="{{ .Site.Params.utterances.issueTerm }}"
  theme="{{ .Site.Params.utterances.theme }}"
  {{ with .Site.Params.utterances.label }}
    label="{{ . }}"
  {{ end }}
  crossorigin="anonymous"
  async
></script>
```

config.yaml中的baseURL需要修改为自己的博客地址，否则在评论系统点击“Sign in with GitHub”时会跳转显示“Example Domain”。

具体问题暂时记录到这里，以后有坑再来加。

### B.3网站的搭建  

搭建网站之前，我们需要将本地文件push到Github的仓库上。这里我们使用GitHub Desktop。push成功以后，进入Netlify按照操作[<sup>1</sup>](#references1)进行。这里没有特别的问题，简要概述。

### B.4当Github和本地的文件不对应  

我们需要在Rstudio中进行博客的上传和更新，但在Rstudio和Git连接后，**似乎**当我们直接在Github中修改文件，待我们再回到Rstudio进行建站`blogdown:::serve_site()`时便会收到报错。  

毕竟，本地和GitHub都不一致了……

我第一反应是对照Github上的文件修改本地文件夹的文件，但似乎不奏效。  

后来我直接在自己的Github上用Github Desktop下载push过的文件（**要用Github Desktop很重要，因为我初始建站时也是用它进行push文件，上面有我“仓库-本地”的地址，我可以直接克隆**），下载之后文件夹存放于Github Desktop上连接本地和Github的地址，接着打开里面的`project`，再建站。

当我第一次这样尝试时，我仍然收到报错，大意是说`timeout`。后来我在统计之都的这个[帖子](https://d.cosx.org/d/420409-blogdown-serve-site/5)上找到如下回答：

> 装一下这个包 `install.packages('processx')` 然后试试：
> `options(blogdown.generator.server = TRUE)`<br/>
> `blogdown::serve_site()`<br/>
> 详情：<https://bookdown.org/yihui/blogdown/livereload.html>
> ——yihui  

按照这个方法试过以后，我成功在Rstudio建站。

### B.5博客写作与更新  

进行新的帖子创作很简单，直接在`Addins`中选择`New Post`，根据需要进行设定。  

新帖子和旧帖子的更新完成以后，点击右边窗口的`Git`进行push，一开始会需要输入GitHub用户名和密钥（[不再是输入密码了，而是密钥](https://blog.csdn.net/HYZX_9987/article/details/129813888)）。Push成功后要返回GitHub Desktop，需要在此进一步把更新的帖子push到GitHub的仓库上，这样才能真正更新托管好的博客。

## C.参考资料  

<div id="references1"></div>  

- [1] [《用 R 语言的 blogdown+hugo+netlify+github 建博客》](https://cosx.org/2018/01/build-blog-with-blogdown-hugo-netlify-github/)，钟浩光，2018，网络论坛：统计之都  

<div id="references2"></div>  

- [2] [《R沟通｜使用 Blogdown 构建个人博客》](https://mp.weixin.qq.com/s/uoecNdyHZVHGXEl1l3bM4Q)，庄闪闪，2017，个人公众号：庄闪闪的R语言手册