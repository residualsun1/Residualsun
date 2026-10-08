# 手机发布「思绪」

后台入口：部署后打开 https://guozheng.rbind.io/admin/ 。

本次只新增 `static/admin/index.html`、`static/admin/config.yml` 和本说明。
不修改 Hugo 配置、Netlify 构建配置、主题、导航或已有内容。
后台只配置 `content/moments` 一个内容集合，关闭删除入口，并阻止保存该目录中的 `_index.md` 页面配置。
这限制的是后台操作范围；GitHub OAuth 授权本身不提供文件夹级别的权限隔离。

## 首次接入 GitHub 登录

1. 将新增文件提交并推送到此仓库的 `main` 分支，等待现有 Netlify 构建完成。
2. 打开 [GitHub OAuth Apps](https://github.com/settings/developers)，选择 **New OAuth App**，填写：
   - Application name：`Residualsun 思绪`
   - Homepage URL：`https://guozheng.rbind.io`
   - Authorization callback URL：`https://api.netlify.com/auth/done`
3. 注册后复制 Client ID，并生成 Client Secret。
4. 在承载本博客的 Netlify 项目中，打开 **Project configuration → Security → OAuth → Authentication Providers → Install Provider**，选择 GitHub，填入上一步的 Client ID 和 Client Secret 后保存。
   如果该项目已经配置了可用的 GitHub OAuth Provider，则先测试登录，无需替换它。
5. 打开后台，选择 GitHub 登录，使用对 `residualsun1/Residualsun` 有写权限的账号授权。

Client Secret 只填入 Netlify 后台，不写进仓库或前端文件，也不需要发到聊天里。
这里使用 GitHub OAuth，不需要开启 Netlify Identity 或 Git Gateway。
参考：[Decap GitHub backend](https://decapcms.org/docs/github-backend/)、[Netlify OAuth 配置](https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/)。

## 日常使用

1. 在手机浏览器中收藏后台入口，或添加到主屏幕。
2. 登录后打开「思绪」，选择新建。
3. 输入正文，时间自动填写，标题可留空。
4. 选择发布。内容直接提交到 `main`，随后由 Netlify 构建并发布。
5. 构建完成后在 `/moments/` 查看；后台保存成功不等于网站已经完成部署。

新文件自动命名，例如 `2026-10-08-143025.md`，不需要手动起英文文件名。
旧思绪仍使用原文件名；编辑时保留原有日期。正文支持 Markdown，但本版使用简单文本框，不提供富文本工具栏。
如果列表出现没有日期、正文为空、名为「思绪」的目录条目，请勿编辑；它是 `_index.md`，保存会被阻止。
电脑上继续写作之前，先拉取手机提交的更新，避免本地分支落后。

## 验证与移除

本地检查可以使用项目现有的 Hugo 预览方式打开 `/admin/`；真实 GitHub 登录应在正式域名上测试。
未经 OAuth 接入，后台可以加载，但无法读取或发布仓库内容。
本地演示若采用 Decap 的 `test-repo` backend，内容只在浏览器内模拟保存，刷新后消失，不代表已上传 GitHub。

本次验证已通过：Hugo 0.111.3 构建、原有 716 个构建文件比较、390px 手机表单及内容列表、无标题内容的模拟发布，以及阻止保存 `_index.md` 和空白正文。
正式 GitHub 登录、写入仓库和 Netlify 发布尚需完成上述账号接入后验证。

如不再使用，移除本次新增的 `static/admin/` 及本说明，然后按原方式部署即可。
通过后台发布的思绪仍是普通 Markdown 文件，会保留在 `content/moments/` 中。
