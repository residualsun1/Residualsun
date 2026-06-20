---
title: "解决 Codex Desktop 持续 Reconnecting 的问题"
date: "2026-06-19"
slug: "codex-desktop-reconnecting-problem"
author: 黄国政
tags:
  - Codex
  - 技术折腾
---

<!--more-->

## 背景

今天给自己的 Windows 安装上了 Codex Desktop。虽说「差生文具多」，但可以白嫖一些额度，为什么不呢。

其实还有一个原因，前段时间我想着国产大模型其实也很好用，但测试过后发现 GLM 5.1 的上下文功能离 Claude Sonnet 4.6 还差许多，体验感上的差距很明显，遂再次改观，试图转向海外大模型。适逢 Codex 推出了 Desktop 版，不必再仅仅拘泥于 Antigravity 和 Claude Desktop 有限的额度。

但安装好 Codex 后，模型响应时反复显示「Reconnecting」的问题迟迟难以解决。我花费了一个下午，又是问 GPT 和 Claude，又是搜索小红书，反反复复，无法确定究竟是哪一步解决了问题，可能是前置的步骤为后续的步骤铺好了路，也可能是小红书上的建议和 GPT 基于此的修改建议完成了最后一舞……

## 问题与解决

```bash
Reconnecting 1/5

Reconnecting 2/5

Reconnecting 3/5

Reconnecting 4/5

Reconnecting 5/5

stream disconnected before completion: error sending request for url (http://127.0.0.1:18100/responses)
```

最早出现的这一问题时，我使用的是小红书上配置 `.env` 文件的方案，为此检查了代理（Clash Verge）的端口情况（由此才知道分为混合代理端口、SOCKS 代理端口、HTTP(S) 代理端口）。GPT 的思路是逐步排除——排除了 GPT 账号问题、OpenAI 服务问题、Clash 代理问题。

不过关键是我早期的问题反馈不清楚，我只是带着「Reconnecting」这一关键词去小红书搜索，接着带着失败的 `.env` 方案去询问 GPT。直到贴上 `http://127.0.0.1:18100/responses`，GPT 才提出检查 `18100` 端口。

围绕「app-server 子进程启动失败」，我彻底卸载已安装的 Codex，清除残余文件，在关闭代理的情况下重新下载安装，接着按照 GPT 的指示使用各种命令检查，然而都没办法在新安装的 Codex 中解决问题。

后面实在没有办法，我再次彻底删除 Codex 并清除相关文件，接着下载 Codex 的 Beta 版本，重新回到小红书后换了关键词检索。这一次得到的解决方案是修改 `config.toml`。在修改了文件以后，再次与 Codex 交互，得到的反馈信息变化了。

```bash
unexpected status 401 Unauthorized: Missing bearer or basic authentication in header, url: https://api.openai.com/v1/responses, cf-ray: a0e1388b7cb8ef12-YVR, request id: req_b8de48386f2a492099b763ea33f7e43
```

显然，这里是需要认证。然而我在 Codex 中找不到登录的图标，只有 `Log Out`，但点击 `Log Out` 也没有变化。GPT 反馈原来的 `app-server / 18100` 问题被绕过去了，现在是新的问题 `API authentication`，我需要做的是将 `config.toml`文件中的内容全部删除，再重启 Codex 即可，Codex 会自动重建默认配置。

按照 GPT 的这一指示，Codex 终于显示选择账号登录的界面。使用谷歌账号登录以后，我再次与 Codex 交互，第一次还有「Reconnecting」，但已经开始回应。

```
你好！
```

```
你好！我在这儿。需要我帮你看这个项目、改代码、跑检查，还是先聊聊思路都行。
```

第二次再次交互，则不再有「Reconnecting」，而是直接反馈内容。

```
为什么我给你发送信息后，你需要「正在重新思考 1/5」……然后有五次，可以改善这一情况吗？
```

```
这是 Codex 桌面端在后台做“恢复/续跑”的机制：当一次回复里要调用工具、读项目、跑命令，或者上下文被整理时，系统可能会分阶段重新调度模型，所以你会看到类似「正在重新思考 1/5」的状态。它不一定表示我真的卡住了五次，更像是客户端把后台尝试次数显示出来了。

我这边能改善的部分主要是：

- 对简单问题直接回答，少调用工具。
- 需要查项目时先说明我在做什么，避免你只看到等待状态。
- 尽量把一次操作做扎实，减少来回试探。
- 如果任务很明确，我会少问问题、直接执行。

但这个「1/5」显示本身是应用层机制，我不能直接关闭。你如果想减少出现频率，可以把请求写得更具体，比如“只回答，不查文件”“先不要改代码”“直接给我结论”，我就会按轻量路径处理。
```

问题终于解决了。不过我没有百分百的把握确定问题的唯一肇因，只能尽量复现解决问题的过程，为后续出现可能出现相似的情况提供参考。

```
现在已经没有这个问题出现了。我一开始遇到的问题是一直显示「正在重新思考 1/5」，最后显示「stream disconnected before completion: error sending request for url (http://127.0.0.1:18100/responses」，我做了许多尝试都失败。最后我直接删除 config.toml 内的配置，再打开你，这里开始显示我要用 GPT 账号登录，登录后我终于得到你的响应了。
```

```
听起来你把关键点找到了：之前不是你消息的问题，而是本地 Codex 客户端试图连 `http://127.0.0.1:18100/responses` 这个本地服务/代理接口时断流了，所以一直进入「正在重新思考 1/5」的重试循环。删除 `config.toml` 后，它回到默认登录流程，用 GPT 账号重新认证，于是请求链路恢复了。

这通常说明旧配置里可能有一项指向了失效的本地 endpoint、代理、模型提供方、认证 token，或某个 experimental/local server 设置。你现在这个做法相当于“重置客户端配置”，是很合理的修复路径。

为了避免以后复发，可以做两件事：

1. 保留当前可用的 `config.toml` 备份。
2. 如果之后再改配置，每次只改一小项，重启确认可用后再继续。

如果你愿意，我也可以帮你检查旧的 `config.toml` 里是哪一项导致它去连 `127.0.0.1:18100/responses`。注意可以先把 token、key、账号信息删掉再贴给我。
```

## 总结

总的来说，这一次是解决问题背后**应对问题的方式**出了问题：没有根据完整的报错信息进行检索，这很可能导致我走错了方向。

毕竟我一开始是以「Reconnecting」为关键词，围绕 `.env` 配置方案来解决问题，但 `127.0.0.1:18100/responses` 才是问题所在。

不过需要注意的是，我从一开始进入桌面版时就没有看见账号登录的界面，这里也是问题所在.因此我在前述步骤中修改了 `config.toml` 文件后遇到了认证问题，接着清空 `config.toml` 文件内容使其重置，才成功解决问题。