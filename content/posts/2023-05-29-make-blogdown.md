---
title: Blogdown的折腾之旅
author: 黄国政
date: '2023-05-29'
slug: make-blogdown
tags: 
  - 技术折腾
---

<!--more-->

本文主要参考统计之都的文章《[用 R 语言的 blogdown+hugo+netlify+github 建博客](https://cosx.org/2018/01/build-blog-with-blogdown-hugo-netlify-github/)》和庄闪闪的公众号文章《[R沟通｜使用 Blogdown 构建个人博客](https://mp.weixin.qq.com/s/uoecNdyHZVHGXEl1l3bM4Q)》。

## 前言

我花了两天时间折腾Blogdown。

周五晚上开始挑选模板，周六晚上也在挑选，之后则开始初步修改模板，直到周日才开始搭建网站，之后仍然是修改模板……折腾的时间基本都在晚上，至于早上……睡觉去了(/▽＼).

这是除了Bookdown外第二个让我如此专注的项目，两天的折腾都是从早上到凌晨，醒来继续，一点一点调试，实在不懂就到[GitHub](https://github.com/)和[统计之都](https://cosx.org/)上求助。直到现在，面对问题时抓耳挠腮的感受仍然「历历在目」🤯，所幸都能专注下来寻找各种方法加以解决——解决问题的感觉当真是一种心灵的愉悦！

谨以此贴记录这两天的折腾，同时这也是作为自己的反思。

## 问题 

### 模板的选择 

我通过谢益辉开发的[Blogdown](https://github.com/rstudio/blogdown)包来搭建网站，网站由[Hugo](https://gohugo.io/)驱动，由[Netfliy](https://www.netlify.com/)生成，源代码文件托管在Github上，日常的代码管理通过[Github Deskopt](https://desktop.github.com/)进行。

你可以在网站<https://themes.gohugo.io/>或<https://hugothemesfree.com/>上挑选博客的模板。[Hexo](https://hexo.io/themes/)上的主题看起来更加丰富，但是我下载的模板建站都会失败，不知是不是因为没有兼容。[^guide]

[^guide]: 或许需要阅读一下[说明文档](https://bookdown.org/yihui/blogdown/)

我选择的模板是「[Anatole Hugo Theme](https://github.com/lxndrblz/anatole.git)」[^note1]，其中需要修改的重要文件有如下几项：  

[^note1]: 2024年3月1日更新，目前模板已更换为[hugo-theme-mini](https://github.com/nodejh/hugo-theme-mini)。

基础配置

1. `/config/_default/config.yaml`
    - baseURL需要改为自己最后生成的博客地址
    - 语言这一部分暂时没敢改成cn，保持默认，因为会牵涉到其他文件修改
    - title是博客主页显示的文字
    - 其余的根据具体需求再修改，我选择保持默认
2. `/config/_default/languages.toml`
    - 这一部分可以进行多语言设置。
3. `/config/_default/menus.en.toml`
    - 这部分是导航栏设置，可以在此更改导航栏中的内容名称，也可以增加新的内容
4. `/config/_default/params.toml`  
    - description是主页上的简要说明，显示在主页title下面  
    - profilePicture是博客头像  
    - favicon是网站的标签图
    - 下方的Date是各项内容的时间格式设置  
    - hidesidebar可以设置是否在浏览主页以外的界面时显示博客头像、标题和描述  
    - social link是主页下链接到其他平台的设置

评论设置（这个问题困扰我好久😭）

1. `/themes/anatole/layouts/_default/single.html`  
    - 评论系统代码放置的文件，这样可以保证系统只显示在post底部。
2. `/themes/anatole/layouts/partials/comments/utterances.hml`
    - 或许需要将其中的src修改为「https://utteranc.es/client.js」

### 模板的修改  

不同的模板具体修改方式不一致，但是大同小异。基于上面的修改内容，我回顾一下其中比较复杂的过程。

在评论系统的设置上，我选择了GitHub上的[utterances](https://github.com/utterance/utterances)，下载之后可以在个人GitHub的setting-applications中找到，对其进行configure，授权并连接到自己的博客代码项目。 [^note2]

[^note2]: 2024年3月1日更新，目前评论已更换为[giscus](https://github.com/giscus/giscus)。

根据指引，获取属于自己的评论系统设置代码：

``` html
<script src="https://utteranc.es/client.js"
        repo="[ENTER REPO HERE]"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```

将repo改为「GitHub用户名/仓库名」，repo之后的设置是评论系统的主题等，可以在指引界面中选择，不必自己手动修改。  

这一串代码可以放在single.html的这部分位置：

``` html
<div class="post__footer">
      {{ with .Page.Params.Categories }}
        {{ partial "taxonomy/categories.html" . }}
      {{ end }}

      {{ with .Page.Params.Tags }}
        {{ partial "taxonomy/tags.html" . }}
      {{ end }}
  <script src="https://utteranc.es/client.js"
    repo="residualsun1/Residualsun"
    issue-term="pathname"
    theme="github-light"
    crossorigin="anonymous"
    async>
  </script>
</div>
```

utterances.html改成这样：  

``` html
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

config.yaml中的baseURL需要修改为自己的博客地址，否则在评论系统点击「Sign in with GitHub」时会跳转显示「Example Domain」。

具体问题暂时记录到这里，以后有坑再来加。

### 网站的搭建  

搭建网站之前，我们需要将本地文件push到Github的仓库上。在这里，我使用GitHub Desktop进行push，完成以后进入Netlify，按照指引生成网站。

### Timeout问题

如果在Rstudio中预览网站显示「Timeout」，可以参考此[帖子](https://d.cosx.org/d/420409-blogdown-serve-site/5)：

> 装一下这个包 `install.packages('processx')` 然后试试：
> `options(blogdown.generator.server = TRUE)`<br/>
> `blogdown::serve_site()`<br/>
> 详情：<https://bookdown.org/yihui/blogdown/livereload.html>

### 用户密钥

过去我在Rstudio的Git中push文件时，会遇到输入GitHub用户名与密码的问题，但现在似乎只需要输入密钥，可以参考这篇[文章](https://blog.csdn.net/HYZX_9987/article/details/129813888)）。