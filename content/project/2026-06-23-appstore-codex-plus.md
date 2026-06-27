---
title: "通过充值 App Store 礼品卡订阅 Codex Plus"
date: "2026-06-23"
slug: "appstore-codex-plus"
author: 黄国政
tags:
  - Codex
  - 技术折腾
---

<!--more-->

对海外大模型进行付费订阅一直是我无法克服的难题，最直接的原因是缺少一张海外信用卡。但听说苹果用户可以绕开这一方式，通过礼品卡的方式进行充值，加之我不再信任任何中转站和代充服务[^service]，遂决定怎么也要琢磨清楚如何通过相对正规的渠道完成订阅充值。

[^service]: 我们无法得知中转站背后反代的大模型究竟是什么，代充服务则往往要求消费者提供诸如 https://chatgpt.com/api/auth/session 这样的链接，显然涉及账号隐私，后患无穷。

本文以 Codex Plus 为例。开始以前，我们需要做好以下条件的准备：

1. 可以成功科学上网的 VPN（必需）
2. 一个海外邮箱（如 Google、Proton、Outlook 等，国内的 163 邮箱也可以）（必需）
3. 一个可以正常接受短信的大陆电话号码（必需）
4. 美国免税州地址生成器（[AddressGen]()）（可选）
5. 一个美区 Apple ID 账户（必需）
6. UU 加速器（可选）
7. 支付宝（必需）

{{% notice warning "注意" %}}
1. 以下经验主要参考了小红书用户经验帖子的分享，经个人实践后整理形成。
2. 以下所有步骤都建议在开启 VPN 走代理的环境下进行。
3. 通过礼品卡充值 Codex Plus 是当下的可行方式，但也可能在未来发生变化，并非最稳定的方式。事实上，只有我们自己的国产大模型做好了，才能从根本上摆脱绞尽脑汁获取海外大模型的现状。
{{% /notice %}}

## 一、获取美区 Apple ID

### 1.1 注册美区 Apple ID

要想购买 App Store 中的礼品卡 ，最重要的前置条件是获取一个美区 Apple ID，而这也是难倒许多人的第一步。

建议在无痕模式下的浏览器中打开 Apple 的官网，点击右上角的 Bag 图标，找到创建账号的选项，点击进入注册页面。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-1.png)

注册界面填写说明如下：

* **姓名（First Name；Last Name）**。可以使用前面提供的美国免税州地址生成器生成，也可以自起。
* **国家/地区（Country/Region）**。建议选择美国。过去被认为在 GPT 订阅中支付更便宜的土耳其已经涨价了。
* **生日（Birthday）**。参考美国免税州地址生成器，或者自行设置。
* **邮箱**。我个人使用的是 Proton 邮箱，小红书上则建议 163 邮箱，据闻使用 Google 邮箱无法通过（这可能涉及 Google 邮箱新旧号的问题）。
* **电话**。电话部分将「Country Options」改为 +86，即中国，接着填写一个可以正常接受短信且没有注册过 Apple ID 的电话号码即可。经测试，这是可以收到验证码的。

以上步骤通过以后，我们便成功创建了一个美区 Apple ID 账号，接下来还需要在 App Store 中填写付款方式、地址、电话等，才能真正激活与使用这一美区账号。

### 1.2 激活美区 Apple ID

开始激活美区 Apple ID 前，我建议先到 iPhone 的「设置」中将「语言」和「地区」分别改为「英语」和「美国」。

接下来到「App Store」中点击右上角的账户图标，使用我们创建的美区 Apple ID 账号进行登录，接着将「App Store」中的「国家/地区」改为「美国」。<mark>注意，是在 「App Store」而非在「设置」中登录该美区 Apple ID 账号。</mark>

完成上述步骤后，接下来一般需要添加付款方式等[^special]，我们要做的是让「None」这一选项在付款方式中出现。

[^special]: 我没有遇到弹窗，此时只需要在 App Store 中选择任一软件下载即可见到弹窗，接着选择「Review」就可以进入付款方式的填写页面。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-2.png)

解决方式应该有两种：

其一是开好代理——我的代理质量一般，用的一年 6 元的套餐，可能因此网络不行，导致没能显示 「None」的选项；

其二是使用 UU 加速器对 App Store 进行加速（没使用过可以免费试用一天），之后再进入界面即可见到「None」选项。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-3.png)

「Billing Address」部分的 Street（街道）、City（城市）、State（州）、Zip（邮政编码）与电话都使用前面提供的美国免税州地址生成器生成的信息填入即可。电话部分不需要担心，虽然必须填写七位美国号码，但生成器提供的号码也可以通过，并且后续使用 Apple ID 需要验证信息时，关联到的也是最早注册美区 Apple ID 账号时使用的中国号码。

完成以上步骤后，我们便可以在美区 App Store 中下载软件，正式拥有了一个可以正常使用的美区 Apple ID 账号。

## 二、支付宝礼品卡充值

### 2.1 购买礼品卡并兑换充值

进入支付宝，在左上角将地址改为 San Francisco（旧金山），然后在搜索框输入「支付宝出境游」，接着选择下方的「惠出境」。

在「惠出境」页面下方的「大牌礼卡」处选择「精选大牌折扣礼卡」，再选择里面的「App Store & Itunes USA」。首次使用，我们需要注册 Pockyt Shop，这里使用前面注册美区账号的邮箱即可。

注册好后继续按照正常流程走，接下来就可以充值购买礼品卡了。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-4.png)

这里我们输入 20 美元，通过支付宝可以用国内的银行卡支付，根据汇率转换后是 136.09。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-5.png)

购买礼品卡后可以获取一段礼品卡号码，邮箱里也会收到，还可以在 Pockyt Shop 中的订单中找到。

将这段礼品卡号码复制下来，回到 App Store，点击右上角的账号图标，选择「Redeem Gift Card or Code」，即兑换礼品卡或号码，将礼品卡号码粘贴好并确认，App Store 的账户便可成功充值 20 美元。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-6.png)

最后，让我们在美区 App Store 中下载的 ChatGPT 中将账号订阅升级为 Plus，会默认使用礼品卡充值的余额完成支付。此时在电脑上打开 Codex，登录升级为 Plus 的 GPT 账号，即可使用 Codex Plus 了。

### 2.2 问题

如果在支付 Plus 的订阅时显示「Your Purchase Could Not Be Completed」怎么办？我也确实遇到这一问题了，据闻原因可能是注册的美区 Apple ID 账号太新，苹果会对此进行风控。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-7.png)

我采取的是小红书上分享的解决方案。

首先前往链接 https://getsupport.apple.com/ ，进入链接以后，先登录个人的美区 Apple 账号，然后选择左侧「View your products」下的「Choose a product」。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-8.png)


在 product 界面中，往下滑，选择 App Store。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-9.png)

在 App Store 中选择 「Subscriptions & Purchase」。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-10.png)

再选择里面的「Unable to purchase」。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-11.png)

接下来「Continue」。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-12.png)

进入新的界面以后，拉到底部，点击「Get more help」。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-13.png)

之后可以看到联系客服的在线窗口。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-14.png)

进入以后，系统会根据账号写好 ID 与邮箱地址，接下来只需要输入遇到的问题内容即可。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-15.png)

苹果的客服还是挺有耐心的，一步步引导我，从提出问题，到获取 PIN 码，最后我被告知这是出于安全管理的需要（其实也就是风控），我需要等待 72 小时之后才可以订阅充值，期间不要再尝试进行充值。等三天过后，看看问题是否能如期解决。

{{< imgloop "https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-16.png,https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-17.png,https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-18.png,https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-19.png,https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-20.png" >}} 

---

{{% notice info "二编" %}}

2026 年 6 月 27 日，我再次在 ChatGPT 移动端中订阅 ChatGPT Plus，这一次购买成功，回到 PC 端的 Codex，登录相应账号即可正常使用。

![ChatGPT 移动端](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-21.png)

![Codex PC 端](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/06/06-23-22.png)

{{% /notice %}}

## 三、感想

过去时而听说我们「要研好自己的芯片，不要被别人卡脖子」，现在使用 AI，这样的体会深刻了不少。不得不承认，Claude 和 Codex 在开发中就是好用，但是在大陆想要使用和订阅都得费上老大劲，要么是无法科学上网，要么是缺少相关信用卡，要么是随时可能被封控账号——主动权显然都掌握在别人手中。

希望国内的 GLM、Deepseek、Minimax、Qwen、Doubao 越做越好，我也会不断熟悉和使用这些国产大模型。或许在未来的某一天，中美两国的大模型都成为世界最好最顶尖的大模型，而那时的我们则不必再一次次地采用代充、中转站、礼品卡充值等这些方式来「仰仗」美国大模型，甚至欧洲、非洲等区域上的国家还需要依赖我们的大模型。