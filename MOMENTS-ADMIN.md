# 思绪后台指南

入口：[guozheng.rbind.io/admin/](https://guozheng.rbind.io/admin/)。手机可收藏或添加到主屏幕。

## 日常操作

- **新建**：输入正文，时间默认当前时间，标题可留空。支持 Markdown、写作／预览切换、字符计数和专注模式。
- **保存与发布**：草稿使用 Hugo 的 `draft` 字段；发布／更新由 Decap 提交到 GitHub `main`，随后 Netlify 构建。后台提交成功不等于公开站点已完成部署。没有远程自动保存。
- **查找与编辑**：列表支持全文搜索、草稿／已发布筛选和日期排序。编辑旧思绪会保留文件名及原日期。开始本地写作前，先拉取后台产生的提交。
- **删除**：打开已保存的思绪，点击顶部「删除」并确认。未保存修改也会丢弃；网站构建完成后公开页移除该记录。目录配置 `_index.md` 不显示，且禁止保存、删除。

日期输入沿用原格式和本地时区，阅读日期按主站 UTC+08:00 展示。媒体通过现有媒体库管理，上传位置为 `static/images/moments/`。

## 引用历史思绪

在已发布条目中点击「引用此思绪」，或在编辑器正文下方点击「引用思绪」，按编号、日期、正文搜索并选择。可更换、移除，每条最多引用一条。

关联保存在可选 Front Matter 字段 `quoted_moment`，值为历史 Markdown 文件名（不含扩展名），与显示编号、公开 URL 分离。移除引用不修改原文。

点击引用卡片会定位到公开思绪列表中的原帖：已经加载的原帖直接滚动定位，否则跳到对应列表分页。原有单篇永久链接保持不变。

公开卡片在 Hugo 构建时读取原文，复用编号、日期和字体，显示最多六行摘要及第一张图片或原生 HTML5 视频。视频保留控件，不自动播放；音频、第三方 iframe 和轮播不嵌入引用卡片。内部引用及外链卡片不递归展示。已删除、转为草稿或异常循环的目标显示不可用提示；失效媒体隐藏。

## 外链预览

输入或粘贴独占一段的 HTTP / HTTPS 网址，停顿后自动获取。正文与网址之间需留空行；普通文字、Markdown 链接、代码块及历史普通外链不会自动转换。本站思绪永久链接使用上述引用功能，首页等普通站内页面仍可生成网页预览。

写作区提供加载状态、生成／查看、重新获取、移除预览和「正文保留网址」。移除后原网址保留，并记住仅保留链接的选择；可手动重新生成。每条最多 4 张卡片，同时最多抓取 2 个网址。失败不影响保存发布；抓取完成晚于保存时，生成卡片会成为新的未保存修改。

卡片元数据随正文保存为 `linkcard` Shortcode，包含原 URL、标题、简介、封面、网站名称、来源主机名及获取时间。后台还原为可编辑网址和可视卡片，公开页面只使用已保存数据，构建和访客阅读不抓取网页。旧版「URL + Shortcode」仍可读取；默认仅隐藏卡片前紧邻且匹配的裸网址，勾选「正文保留网址」可同时显示。历史内容无需迁移。

卡片采用 X 的两种布局：`summary` 为紧凑卡片；有合适封面的 `summary_large_image` 或 OG 卡片使用 1.91:1 大图、左下角标题遮罩及外部 `From 完整主机名`。无图或图片失败时降为紧凑卡片，完全无有效元数据时保留普通链接。只有外链卡片内部使用系统无衬线字体。

## GitHub 登录接入

已有可用 OAuth Provider 时无需替换。首次配置：

1. 将后台及配套文件推送到 `main`，等待 Netlify 构建。
2. 在 [GitHub OAuth Apps](https://github.com/settings/developers) 注册应用：
   - Application name：`Residualsun 思绪`
   - Homepage URL：`https://guozheng.rbind.io`
   - Authorization callback URL：`https://api.netlify.com/auth/done`
3. 在 Netlify 项目 **Project configuration → Security → OAuth → Authentication Providers → Install Provider** 中选择 GitHub，填写 Client ID 和 Client Secret。
4. 在正式域名后台登录，使用对 `residualsun1/Residualsun` 有写权限的账号授权。

Client Secret 仅存于 Netlify 后台，不写入仓库。这里使用 GitHub OAuth，无需 Netlify Identity 或 Git Gateway。后台只管理思绪集合，但 OAuth 本身没有文件夹级权限隔离。

参考：[Decap GitHub backend](https://decapcms.org/docs/github-backend/)、[Netlify OAuth](https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/)。

## 实现位置与约束

| 位置 | 职责 |
| --- | --- |
| `static/admin/config.yml` | GitHub backend、思绪字段、媒体路径与原有保存格式 |
| `static/admin/studio.js` / `admin.css` | 写作工作台及列表；认证、读取、提交仍由固定版本 Decap 3.16.3 完成 |
| `static/admin/quotes.js` | 引用选择与预览 |
| `content/admin-records.md` / `layouts/_default/admin-records.html` | 生成 `/admin/records.json`，只提供公开思绪信息，不进入首页、搜索或站点地图 |
| `layouts/partials/moments/` / `static/js/moment-quotes.js` | 引用关联解析与卡片 |
| `layouts/shortcodes/linkcard.html` / `static/js/link-cards.js` | 外链数据与共享渲染 |
| `netlify/functions/link-preview.mjs` / `netlify/lib/link-preview.mjs` | 元数据接口与服务端抓取 |

后台加载主站 `/css/custom.css`，继承思源宋体、Palatino、完整楷体分包及代码字体，不复制字体资源。UI 选择器依赖固定版本 Decap，升级后需重新检查。编号取自当前公开页索引，不因后台排序而重写。

元数据接口为 `/.netlify/functions/link-preview`，依赖由 `package-lock.json` 固定。只接受标准端口 HTTP / HTTPS，校验所有 DNS 地址、固定连接目标并检查每次重定向，拒绝本机、私网和保留地址。总超时 8 秒，HTML 上限 1 MiB（压缩传输上限 2 MiB），最多 4 次重定向；实例缓存 30 分钟、最多 100 条，平台按 IP 每分钟限制 30 次。外部 HTML 只解析文本，不执行脚本。

## 验证与停用

执行 `npm ci`、`npm run test:link-preview` 和 Hugo 0.111.3 构建。界面改动后针对性检查桌面／手机、保存重开、日期、引用与预览即可。纯 Hugo 不运行元数据接口，完整抓取需用 Netlify Dev 或部署预览。

Decap 的 `test-repo` 仅在浏览器模拟保存，刷新后消失，不能证明 GitHub 上传成功。真实登录、仓库提交和 Netlify 发布应在正式域名验证。

停用后台时移除 `static/admin/`、后台索引内容及模板；已发布内容仍保留在 `content/moments/`。外链预览和引用的共享资源也用于公开页面，已有相关内容时应保留。
