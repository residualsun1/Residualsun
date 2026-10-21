# 手机发布「思绪」

后台入口：部署后打开 https://guozheng.rbind.io/admin/ 。

后台文件位于 `static/admin/`。`studio.js` 扩展界面，认证、仓库读取和提交仍由固定版本 Decap 3.16.3 完成。
`content/admin-records.md` 和 `layouts/_default/admin-records.html` 仅生成 `/admin/records.json`，提供公开思绪原有编号及链接，不进入主页、搜索索引或站点地图。
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
旧思绪仍使用原文件名；编辑时保留原有日期。正文支持原始 Markdown、写作／预览切换、字符计数和专注模式。长文自然增长，仅使用页面滚动。
目录配置 `_index.md` 在列表中隐藏，保存保护仍保留。
电脑上继续写作之前，先拉取手机提交的更新，避免本地分支落后。

## 后台外观

全界面加载主站原有 `/css/custom.css`，直接继承思源宋体／Palatino、完整楷体分包和代码字体，不复制或更改字体资源。
首页只有一个新建入口，没有常驻侧栏。文字列表支持全文检索、草稿／已发布筛选与稳定日期排序；先使用 Decap 原生游标读完当前小型集合，再在同一份数据上筛选，不增加搜索服务。
标题可选，日期点击展开；日期仍使用原生 datetime 控件、原格式与本地时区输入，展示日期采用主站 UTC+08:00。草稿沿用 Hugo 的 `draft` 字段，不出现在公开页面。
没有新增远程自动保存。成功提示仅在 Decap 的 `postSave` 后显示；提交到 GitHub 不代表 Netlify 已部署，新提交会提示等待构建。编号只取自当前构建生成的公开页索引，不由列表排序重新分配。
该样式针对固定版本 Decap 3.16.3 的组件名称编写；升级 Decap 后需要重新检查这些选择器和手机布局。

## 验证与移除

本地检查可以使用项目现有的 Hugo 预览方式打开 `/admin/`；真实 GitHub 登录应在正式域名上测试。
未经 OAuth 接入，后台可以加载，但无法读取或发布仓库内容。
本地演示若采用 Decap 的 `test-repo` backend，内容只在浏览器内模拟保存，刷新后消失，不代表已上传 GitHub。

界面验证：Hugo 0.111.3 构建、桌面与 320／390px 手机布局、历史 115 条公开记录与 7 条草稿、完整正文检索、无标题草稿保存、日期及时区、重开与更新、Markdown 三套字体、长文单一滚动及专注模式。
GitHub 登录、仓库写入和 Netlify 发布需在正式域名上验证。

如不再使用，移除 `static/admin/`、上述后台索引页面和模板，再按原方式部署即可。
通过后台发布的思绪仍是普通 Markdown 文件，会保留在 `content/moments/` 中。

## 外链预览

在正文中粘贴独占一段的 HTTP / HTTPS 外部网址，停顿后自动获取预览。写作区下方显示卡片及「重新获取」「移除预览」；切到「预览」可查看卡片在正文中的位置。每条思绪最多 4 张卡片，同时最多抓取 2 个网址。普通段落、Markdown 链接、代码块和历史普通外链不会自动转换。

移除预览会保留原始 URL，并记住「仅保留链接」；可点击「生成预览」恢复。获取失败不影响草稿、发布或原始链接。抓取尚未完成时也可保存，之后生成的卡片会作为新的未保存修改。

卡片元数据以 `linkcard` Shortcode 随 Markdown 正文保存，包含原 URL、标题、简介、封面、网站名称、来源域名和获取时间。后台隐藏编码并显示可视卡片；公开页面仅渲染已保存数据，构建和阅读不抓取网页。移除记录也保存在正文中，以免重开后又自动生成。已有无卡片思绪不会被批量修改。

元数据接口为 `netlify/functions/link-preview.mjs`，使用 Netlify 默认函数路径 `/.netlify/functions/link-preview`，现有 Hugo 命令、认证和 `netlify.toml` 不变。新增 `.nvmrc` 选择 Node.js 24，两个 Node 依赖由 `package-lock.json` 固定；本地执行 `npm ci` 安装，Netlify 部署时会自动安装并打包函数。纯 Hugo 本地服务器不运行 Serverless 接口，完整抓取应使用 Netlify Dev 或部署预览。运行时依据：[Netlify Node.js 版本配置](https://docs.netlify.com/build/configure-builds/manage-dependencies/)。

接口只接收标准端口的 HTTP / HTTPS 链接，校验全部 DNS 地址并固定连接目标，逐次检查重定向，拒绝本机、私网及保留地址。单次总超时 8 秒，HTML 上限 1 MiB（压缩传输上限 2 MiB），最多 4 次重定向；实例缓存 30 分钟、最多 100 条，平台按 IP 限制每分钟 30 次。第三方 HTML 仅解析为文本，不执行脚本、不返回原始 HTML。封面使用外站图片 URL，加载失败自动隐藏。

针对性测试：`npm run test:link-preview`。上线需将函数、依赖锁文件、Shortcode、共享卡片样式与后台变更一起部署。
