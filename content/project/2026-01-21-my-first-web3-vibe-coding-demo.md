---
title: 开发我的第一个 Web3 Vibe Coding Demo 项目
author: 黄国政
date: '2026-01-21'
slug: my-first-web3-vibe-coding-demo
categories: []
tags:
  - AI
  - Vibe Coding
  - 与 AI 学习
  - Web3
---

Demo 项目地址：https://agentreputation.netlify.app/

<!--more-->

## 今日想法

黑客松即将到来，我决定今天上手结合 AI 尝试开发一个 DApp[^DApp]——严格来说或许只是一个 Demo 吧。同时，今天在 Co-Learning 上又听到 wachi 老师分享了自己关于 Web3 的学习理念，我最为在意的内容是**对概念的学习吸收**。具体来说，其实**技术向的学习也离不开概念的理解，许多概念越发熟悉，在写代码和做项目时也会越发得心应手**。

[^DApp]: DApp 概念可以见此[博文](https://guozheng.rbind.io/project/smart-contract-development/)。

此外，还有极其重要的一点是我自己的体悟：「做中学」。**一味地学习概念会让人感到迷失，但是在实践和应用中发现和理解的知识则会更生动、形象和深刻**。总的来说，「学习概念或知识」与「实践」两者都不可偏废，是相辅相成的关系——我在 Web3 的学习中感受十分深刻。

例如，今天 wachi 老师说到如何给 AI 提做黑客松的需求时，举到以「ERC-8004」为例子的技术点让 AI 帮忙进行开发，这无疑使得 AI 的协助更加具体，而不会天马行空地给出不着边际的方案。同时，我也才发现自己对 ERC 系列都不了解，不知道 ERC 都是些什么，但此次听了 wachi 老师的分享并找 AI 协助开发 DApp 时，我却对 ERC 的印象深刻了许多，远非看实习手册或听分享会时那般困顿、迷糊，甚至忽略了这一概念都不自知。

我的第一份提示词如下：

> 我是一个 Web3 新人，需要参加一场 Web3 的休闲黑客松，目的做出一个产品。但我目前只是学习了一周，了解 Web3 的基本概念（如区块链、去中心化、Gas 等），跟着文档在 Remix IDE 上编译和部署过关于链上留言的智能合约代码（我的记录在[这里](https://guozheng.rbind.io/project/compile-and-deploy-message-contract/)），所以我感觉我的情况可能不一定能做得了复杂的产品。你可以基于我的情况进行评估，然后为我提供 3-5 个可行的方案吗？相关背景是以 ERC8004 为技术点，制作产品的时间在一周以内，技术性可以不用太强，让普通人也可以感受到这个产品的作用即可。

我和 Claude Opus 4.5 讨论了一阵子，决定基于昨天的「[链上留言](https://guozheng.rbind.io/project/compile-and-deploy-message-contract/)」智能合约代码，做一个在区块链上对 AI Agent 进行评分的网页。

这里再插播一段：如果对区块链的知识不够了解，即便有再强大的 AI，也不知应该提出怎样的 idea 来开发产品。

下面让我和 AI 动手一起开发一个极其简单的 DApp 吧！也是经过这一次动手实践，我才对原来看过的部分概念有了更深的了解，也解决了一些过去遗留的问题。

## 构建 AI Agent 评分器

我们先简单回顾一下 [DApp 的开发流程](https://guozheng.rbind.io/project/smart-contract-development/#DApp-%e5%bc%80%e5%8f%91%e6%b5%81%e7%a8%8b)：

需求分析 → 智能合约开发 → 检索器开发 → 前端开发 → 与区块链交互 → 部署与上线 

### 1. 需求分析

我们的需求是**搭建一个简单的网页**，在这个网页上，用户可以对特定的 AI Agent ——用一串数字 ID 来指代——进行 1-5 星级 的评分，同时留下自己的评论。同时，由于这属于 Web3 的技术范畴，因而所有数据都会存储在区块链上，且不可篡改。

### 2. 智能合约开发

明确需求后，先在 Remix IDE 中编写好相关智能合约代码。

具体做法是在 `contracts` 文件夹中创建新文件，我命名为 `AgentReputation.sol`，代码如下：

<detail>

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgentReputation {
    
    // 定义一个评价的结构：包含 评分人、分数、评论内容
    struct Review {
        address reviewer; // 谁打的分
        uint8 score;      // 分数 (1-5)
        string comment;   // 具体的评价
        uint256 timestamp; // 时间戳
    }

    // 建立一个映射：通过 Agent ID (数字) 就能查到它所有的 评价列表
    mapping(uint256 => Review[]) public agentReviews;

    // 一个事件：当有人打分成功时，通知区块链外的世界
    event NewReview(uint256 indexed agentId, address indexed reviewer, uint8 score);

    // --- 功能函数 ---

    // 1. 打分函数
    // agentId: 给哪个AI打分, score: 几颗星, comment: 评价内容
    function rateAgent(uint256 _agentId, uint8 _score, string memory _comment) public {
        // 检查：分数必须在 1 到 5 之间
        require(_score >= 1 && _score <= 5, "Score must be between 1 and 5");

        // 创建一个新的评价
        Review memory newReview = Review({
            reviewer: msg.sender, // msg.sender 就是调用这个函数的人（钱包地址）
            score: _score,
            comment: _comment,
            timestamp: block.timestamp
        });

        // 把它加入到列表中
        agentReviews[_agentId].push(newReview);

        // 发出通知
        emit NewReview(_agentId, msg.sender, _score);
    }

    // 2. 查询某个 Agent 有多少条评价
    function getReviewCount(uint256 _agentId) public view returns (uint256) {
        return agentReviews[_agentId].length;
    }

    // 3. 获取特定的某一条评价 (因为数组太长不能一次取完，通常需要分页或者按索引取)
    function getReview(uint256 _agentId, uint256 _index) public view returns (address, uint8, string memory, uint256) {
        Review memory review = agentReviews[_agentId][_index];
        return (review.reviewer, review.score, review.comment, review.timestamp);
    }
    
    // 4. 获取某个 Agent 的所有评价（注意：如果评价太多，这个函数可能会因为Gas超限而失败，但做Demo没问题）
    function getAllReviews(uint256 _agentId) public view returns (Review[] memory) {
        return agentReviews[_agentId];
    }
}
```

</detail>

### 3. 智能合约代码编译与部署

智能合约代码编写好即可进行编译。编译的过程很简单，只需在 `Solidity Compiler` 部分（Remix IDE 界面最左侧的第三个图案）点击 `Compile AgentReputation.sol` 按钮即可。如果成功，图标会出现绿色的勾。

编译成功后即可到 `Deploy & Run Transactions` 部分（Remix IDE 界面最左侧的第四个图案）进行部署，然后在部署环境中选择 `Injected Provider - MetaMask`，这时候在浏览器安装好的 MetaMask 插件会弹出窗口——好了，这里我遇到了两个问题，第一个昨天已经遭遇但未能解决，但最终都在 AI 的协助下解决了，我认为很值得单独记录。

（1）让 MetaMask 的网络切换为 Sepolia 测试网

我在 Remix IDE 的部署界面中没能成功连接 Sepolia 测试网，而是默认为以太网主网。

解决方案有两步：

* 第一步是点击 MetaMask 插件右上角的第二个图标，然后进入 `设置 → 高级` 部分，然后将 `显示测试网络` 一栏打开，接着就可以在插件的主页面处将网络选择为 Sepolia。

{{< galleries >}}
{{< gallery src="https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-21-0.png" title="" >}}
{{< gallery src="https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-21-1.png" title="" >}}
{{< /galleries >}}

* 第二步是点击 MetaMask 插件右上角的第一个图标，然后点击显示的网络名称，进入 `管理网络`，拉到下方的 `显示测试网络`，找到 Sepolia 并点击。

{{< galleries >}}
{{< gallery src="https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-21-2.png" title="" >}}
{{< gallery src="https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-21-3.png" title="" >}}
{{< /galleries >}}

完成以上两个步骤后，可以确保 Remix IDE 连接的是 Sepolia 测试网。我在[第一次编译和部署「链上留言」](https://guozheng.rbind.io/project/compile-and-deploy-message-contract/)时就碰到这个问题，但是没有解决，导致无法正常部署——毕竟部署需要支付 Gas 费，但是作为新人的我在主网显然没有以太币，只有测试网的测试币。[^SepETH]

[^SepETH]: 关于如何领取测试币，可参考这一篇博文的[第三部分](https://guozheng.rbind.io/project/compile-and-deploy-message-contract/#%E6%B5%8B%E8%AF%95%E7%BD%91%E4%B8%8E%E9%A2%86%E5%8F%96-sepoia-%E4%BB%A3%E5%B8%81)。

（2）我在自己的 Google 上直接搜索 Remix，但没注意自己进入的 Remix 网站竟然不是官方的，而是 https://remix.polkadot.io/ ——Polkadot 版本的 Remix——它虽然也可以编译 Solidity，但是对测试网的兼容性有问题，无法正常部署，切换回官方网站 https://remix.ethereum.org 就成功部署了。

将以上两步都完成以后，我终于成功将智能合约代码部署到了 Sepolia 测试网的区块链上——控制台下出现绿色的对勾，显示合约成功部署，接下来就可以进入前端开发阶段，将部署的合约变成真正的网页应用。

但在此前，我们需要获取合约地址和 ABI，前者在部署成功以后 Remix 左下角的 `Deployed Contracts` 列表中复制，一般 `0x` 开头；后者可以回到 `Solidity Compiler` 部分，在最下方有一个 ABI 的复制选项，点击复制即可获取。

{{< galleries >}}
{{< gallery src="https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-21-4.png" title="" >}}
{{< gallery src="https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-21-5.png" title="" >}}
{{< /galleries >}}

### 4. 前端开发

我创建了一个新的文件夹 `AgentReputation`，创建 `index.html` 和 `app.js` 文件，之前拿到的合约地址和 ABI 就填入 `app.js` 文件中。

`index.html` 和 `app.js` 的代码太多，就不在此书写，可以到我的[仓库](https://github.com/residualsun1/AgentReputation)中查看。

将合约地址和 ABI 都填入 `app.js` 文件之中，由于此次开发没有后端内容[^nobackend]，直接打开 `index.html` 文件就可以看到网页。

[^nobackend]: 严格来说，智能合约本身也算是一种「后端」，但通常我们说的「后端」指的是传统的服务器程序（如 Node.js, Python Flask 等）。在这个项目中，我们完全依赖区块链来存储和验证数据，所以没有写传统的后端代码。不过我觉得也可以想一想，是否可以加入传统的后端内容？如果加入了传统的后端内容可以做成什么样？

不过由于没有将这些本地文件部署到云端——点击 `index.html` 文件后，地址栏显示`D://...`，因此在网页中点击「连接钱包」会由于浏览器的安全限制而要求安装 MetaMask，不允许访问其插件。

### 5. 部署网站

要将项目部署到云端，我的常规做法是将源代码文件托管到 GitHub，之后到 Netlify 中进行部署，网站可见：https://agentreputation.netlify.app/ 。

不过部署好网站后，「连接钱包」仍然是显示失败，向 Gemini 3 Pro（High）求助，得到的回应是大概率是因为浏览器 「混合内容」(Mixed Content) 的安全拦截或者 Ethers.js 版本加载失败，可以在网站上通过检查网页来查看控制台的情况。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-21-9.png)

原来是因为 `cdn.ethers.io` 加载失败。

```html
<script src="https://cdn.ethers.io/lib/ethers-5.7.umd.min.js"></script>
```

将上面这一个旧的 CDN 更换为下面这一个新的 CDN，然后将修改过的文件再推送到仓库中进行部署，之后重新进入网站就可以成功连接钱包了。

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js"></script>
```

## 使用 AI Agent 评分器

一切搞定以后，我们就可以使用这个简单的 DApp 了。

它的具体用法是：先连接自己的钱包，然后在 Agent ID 输入框中输入某个数字，比如 `123`——它是你指代的某个 AI，下面给它点星星评分，接着还可以输入具体的评论内容，比如我输入的 ID 是 `888`，然后给了 5 星，还评论了「Claude Opus 4.5 的表现超乎我的想象！」。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-21-6-1.png)

接着点击「提交评价」，会发现钱包弹出窗口，需要我们确认交易并消耗一点测试币——点击确认即可，网页不久便会弹出成功上链的说明。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-21-7.png)

最后再到网页最底部的「查看历史评价」处输入 `888`，然后点击「查询」即可看到之前留下的评论。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-21-8.png)