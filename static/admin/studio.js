/* UI extensions for the pinned Decap 3.16.3; authentication and persistence stay in Decap. */
(() => {
  const { CMS, h, createClass } = window;
  const selector = name => `[class*="-${name}"]`;
  const query = (name, root = document) => root.querySelector(selector(name));
  const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Etc/GMT-8", year: "numeric", month: "long", day: "numeric",
  });
  const dateLabel = value => {
    const date = new Date(value && typeof value === "object" ? value.valueOf() : value);
    return Number.isNaN(date.getTime()) ? "选择时间" : dateFormatter.format(date);
  };
  const text = (element, value) => { if (element.textContent !== value) element.textContent = value; };
  const element = (tag, className, value) => {
    const node = document.createElement(tag);
    node.className = className;
    if (value) node.textContent = value;
    return node;
  };
  const plainText = value => window.ResidualLinkCards.read(value).text.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/<[^>]+>/g, "")
    .replace(/(^|\n)\s*(?:#{1,6}\s|>\s?|[-*+]\s|\d+\.\s)/g, " ")
    .replace(/[`*_~]/g, "").replace(/\s+/g, " ").trim();

  const zh = CMS.getLocale("zh_Hans");
  CMS.registerLocale("zh_Hans", {
    ...zh,
    app: { ...zh.app, header: { ...zh.app.header, media: "媒体", quickAdd: "新建思绪" } },
    collection: { ...zh.collection,
      sidebar: { ...zh.collection.sidebar, searchAll: "搜索正文或标题" },
      collectionTop: { ...zh.collection.collectionTop, newButton: "＋ 新建思绪", newButtonAriaLabel: "新建思绪" },
    },
    editor: { ...zh.editor,
      editor: { ...zh.editor.editor,
        onDeletePublishedEntry: "删除这条思绪？将提交到仓库，网站构建完成后公开页面才会移除。",
        onDeleteWithUnsavedChanges: "删除这条思绪？未保存的修改也会丢弃。网站构建完成后公开页面才会移除。",
      },
      editorToolbar: { ...zh.editor.editorToolbar,
        backCollection: "%{collectionLabel}", unsavedChanges: "未保存", changesSaved: "已保存到仓库",
        saving: "保存中…", publishing: "发布中…", updating: "更新中…", published: "已提交",
        publishNow: "确认提交", deleteEntry: "删除",
        publishAndCreateNew: "发布并新建", publishAndDuplicate: "发布并复制", deployButtonLabel: "公开页面",
      },
    },
  });

  const DateWidget = CMS.getWidget("datetime");
  const NativeDate = DateWidget.control;
  const MarkdownPreview = CMS.getWidget("markdown").preview;
  const Links = window.ResidualLinkCards;
  const DateControl = createClass({
    render() {
      return h("details", { className: "studio-date" },
        h("summary", null, dateLabel(this.props.value), h("span", { "aria-hidden": true }, "⌄")),
        h("div", { className: "studio-date-panel" },
          h("p", null, "发表时间 · 本地时间"), h(NativeDate, { ...this.props,
            onChange: value => { editing(); this.props.onChange(value); } })));
    },
  });
  const TitleControl = createClass({
    getInitialState() { return { expanded: Boolean(this.props.value) }; },
    render() {
      if (!this.state.expanded && !this.props.value) return h("button", {
        type: "button", className: "studio-add-title", onClick: () => this.setState({ expanded: true }),
        disabled: this.props.isDisabled,
      }, "添加标题（可选）");
      return h("input", { id: this.props.forID, className: "studio-title", value: this.props.value || "",
        "aria-label": "标题（可选）", placeholder: "标题（可选）", autoComplete: "off",
        disabled: this.props.isDisabled,
        onChange: event => { editing(); this.props.onChange(event.target.value); } });
    },
  });
  const DraftControl = createClass({
    componentDidMount() { this.notify(); },
    componentDidUpdate() { this.notify(); },
    componentWillUnmount() { document.body.classList.remove("studio-is-draft"); },
    notify() { document.body.classList.toggle("studio-is-draft", Boolean(this.props.value)); },
    render() {
      return h("details", { className: "studio-publishing" },
        h("summary", null, this.props.value ? "草稿 · 发布设置" : "发布设置"),
        h("label", null, h("input", { id: this.props.forID, type: "checkbox", checked: Boolean(this.props.value),
          disabled: this.props.isDisabled,
          onChange: event => { editing(); this.props.onChange(event.target.checked); } }), " 保存为草稿"),
        h("p", null, "草稿会保存到仓库，不在公开页面显示。"));
    },
  });
  const BodyControl = createClass({
    getInitialState() { return { preview: false, focus: false, linkStates: {} }; },
    componentDidMount() {
      this.active = true;
      this.linkQueue = [];
      this.linkRequests = new Map();
      this.currentValue = this.props.value || "";
      this.emittedValues = new Set();
      this.knownLinks = new Set(Links.standalone(Links.read(this.props.value).text).map(item => item.url));
      this.resize();
      this.onResize = () => this.resize();
      this.onEscape = event => { if (event.key === "Escape" && this.state.focus) this.setFocus(false); };
      window.addEventListener("resize", this.onResize);
      document.addEventListener("keydown", this.onEscape);
    },
    componentDidUpdate(previous) {
      if (previous.value !== this.props.value) {
        if (!this.emittedValues.delete(this.props.value)) this.currentValue = this.props.value || "";
      }
      this.resize();
      const urls = new Set(Links.standalone(Links.read(this.props.value).text).map(item => item.url));
      this.linkRequests.forEach((controller, url) => { if (!urls.has(url)) controller.abort(); });
      this.linkQueue = this.linkQueue.filter(item => urls.has(item.url));
    },
    componentWillUnmount() {
      this.active = false;
      clearTimeout(this.linkTimer);
      this.linkRequests.forEach(controller => controller.abort());
      window.removeEventListener("resize", this.onResize);
      document.removeEventListener("keydown", this.onEscape);
      document.body.classList.remove("studio-focus");
    },
    changeBody(text) {
      const { cards } = Links.read(this.currentValue);
      const urls = new Set(Links.standalone(text).map(item => item.url));
      // Removing a URL also clears its attempt marker, so entering it again can retry.
      this.knownLinks = new Set([...this.knownLinks].filter(url => urls.has(url)));
      this.setState(previous => {
        const linkStates = Object.fromEntries(Object.entries(previous.linkStates).filter(([url]) => urls.has(url)));
        urls.forEach(url => {
          if (!cards.has(url) && !this.knownLinks.has(url) && !linkStates[url]?.loading && new URL(url).origin !== location.origin) linkStates[url] = { waiting: true };
        });
        return { linkStates };
      });
      this.commitBody(Links.write(text, cards));
      this.scheduleLinkPreviews();
    },
    scheduleLinkPreviews() {
      clearTimeout(this.linkTimer);
      this.linkTimer = setTimeout(() => {
        const { text: current, cards: saved } = Links.read(this.currentValue);
        Links.standalone(current).forEach(({ url }) => {
          if (this.knownLinks.has(url)) return;
          this.knownLinks.add(url);
          if (!saved.has(url) && new URL(url).origin !== location.origin) this.requestPreview(url);
        });
      }, 700);
    },
    pastedBody(event) {
      const input = event.currentTarget;
      const pasted = event.clipboardData.getData("text/plain");
      const start = input.selectionStart, end = start + pasted.length;
      const next = input.value.slice(0, start) + pasted + input.value.slice(input.selectionEnd);
      const { cards } = Links.read(this.currentValue);
      const retries = [];
      // Explicit pasting may retry a historical/failed link, only at a standalone paragraph.
      Links.standalone(next).forEach(item => {
        if (item.start >= start && item.end <= end && !cards.has(item.url) && new URL(item.url).origin !== location.origin) {
          this.knownLinks.delete(item.url);
          retries.push(item.url);
        }
      });
      if (retries.length) {
        this.setState(previous => {
          const linkStates = { ...previous.linkStates };
          retries.forEach(url => { if (!linkStates[url]?.loading) linkStates[url] = { waiting: true }; });
          return { linkStates };
        });
        this.scheduleLinkPreviews();
      }
    },
    commitBody(value) {
      // Metadata responses can finish together before Decap echoes the new props.
      this.currentValue = value;
      this.emittedValues.add(value);
      if (this.emittedValues.size > 16) this.emittedValues.delete(this.emittedValues.values().next().value);
      editing();
      this.props.onChange(value);
    },
    updateLink(url, card) {
      const { text, cards } = Links.read(this.currentValue);
      if (!Links.standalone(text).some(item => item.url === url)) return;
      cards.set(url, card);
      this.commitBody(Links.write(text, cards));
    },
    requestPreview(url, refresh = false) {
      if (this.linkRequests.has(url) || this.linkQueue.some(item => item.url === url)) return;
      const { cards } = Links.read(this.currentValue);
      const occupied = new Set([...cards].filter(([, card]) => !card.disabled).map(([key]) => key));
      [...this.linkRequests.keys(), ...this.linkQueue.map(item => item.url)].forEach(key => occupied.add(key));
      occupied.delete(url);
      if (occupied.size >= Links.MAX_CARDS) {
        this.setState(state => ({ linkStates: { ...state.linkStates, [url]: { limited: true } } }));
        return;
      }
      this.setState(state => ({ linkStates: { ...state.linkStates, [url]: { loading: true } } }));
      this.linkQueue.push({ url, refresh });
      this.loadLinks();
    },
    loadLinks() {
      while (this.active && this.linkRequests.size < 2 && this.linkQueue.length) {
        const { url, refresh } = this.linkQueue.shift();
        const controller = new AbortController();
        this.linkRequests.set(url, controller);
        let timedOut = false;
        const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, 10000);
        const endpoint = new URL("/.netlify/functions/link-preview", location.origin);
        endpoint.searchParams.set("url", url);
        if (refresh) endpoint.searchParams.set("refresh", "1");
        fetch(endpoint, { signal: controller.signal, credentials: "same-origin" })
          .then(response => { if (!response.ok) throw new Error("Preview unavailable"); return response.json(); })
          .then(card => {
            if (!this.active || controller.signal.aborted) return;
            this.updateLink(url, {
              url, title: String(card.title || new URL(url).hostname).slice(0, 200),
              description: String(card.description || "").slice(0, 360), image: Links.urlKey(card.image),
              siteName: String(card.siteName || "").slice(0, 100), domain: new URL(url).hostname,
              canonicalUrl: Links.urlKey(card.canonicalUrl), fetchedAt: card.fetchedAt,
              cardType: card.cardType, imageWidth: card.imageWidth, imageHeight: card.imageHeight,
              keepUrl: Links.read(this.currentValue).cards.get(url)?.keepUrl || false,
            });
            this.setState(state => ({ linkStates: { ...state.linkStates, [url]: {} } }));
          })
          .catch(() => {
            if (this.active && (!controller.signal.aborted || timedOut)) this.setState(state => ({ linkStates: { ...state.linkStates, [url]: { error: true } } }));
          })
          .finally(() => {
            clearTimeout(timeout);
            this.linkRequests.delete(url);
            if (this.active) this.loadLinks();
          });
      }
    },
    removePreview(url) {
      this.linkQueue = this.linkQueue.filter(item => item.url !== url);
      this.linkRequests.get(url)?.abort();
      this.updateLink(url, { url, disabled: true });
      this.setState(state => ({ linkStates: { ...state.linkStates, [url]: {} } }));
    },
    renderLinkPreviews(text, cards) {
      const urls = [...new Set(Links.standalone(text).map(item => item.url))];
      const visible = urls.filter(url => new URL(url).origin !== location.origin);
      if (!visible.length) return null;
      return h("section", { className: "studio-link-previews", "aria-label": "链接预览" },
        visible.map(url => {
          const card = cards.get(url), state = this.state.linkStates[url] || {};
          return h("div", { key: url, className: "studio-link-preview", "aria-busy": Boolean(state.loading) },
            h("a", { className: "studio-link-url", href: url, target: "_blank", rel: "noopener noreferrer" }, url),
            card && !card.disabled ? Links.render(h, card) : null,
            h("div", { className: "studio-link-actions" },
              h("span", { role: "status", "aria-live": "polite" }, state.loading ? "正在获取预览…" : state.waiting ? "准备获取预览…" : state.limited ? "已达 4 个预览上限" : state.error ? "获取失败，原始链接仍可保存" : card?.disabled ? "仅保留链接" : !card ? "未生成预览" : ""),
              h("button", { type: "button", disabled: Boolean(state.loading) || this.props.isDisabled,
                onClick: () => this.requestPreview(url, true) }, card?.disabled || !card ? "生成预览" : "重新获取"),
              (card && !card.disabled) || state.loading || state.waiting || state.error ? h("button", { type: "button", disabled: this.props.isDisabled,
                onClick: () => this.removePreview(url) }, "移除预览") : null),
            card && !card.disabled ? h("label", { className: "studio-link-keep-url" },
              h("input", { type: "checkbox", checked: Boolean(card.keepUrl), disabled: this.props.isDisabled,
                onChange: event => this.updateLink(url, { ...card, keepUrl: event.target.checked }) }), "正文保留网址") : null);
        }),
        h("p", { className: "studio-link-limit" }, "每条思绪最多 4 个预览"));
    },
    resize() {
      if (!this.input) return;
      this.input.style.height = "0px";
      this.input.style.height = `${Math.max(280, this.input.scrollHeight)}px`;
    },
    setFocus(focus) {
      this.setState({ focus });
      document.body.classList.toggle("studio-focus", focus);
    },
    render() {
      const value = this.props.value || "";
      const { text: body, cards } = Links.read(value);
      const linkStates = Object.values(this.state.linkStates);
      const linkProgress = linkStates.some(state => state.loading) ? "正在获取预览…"
        : linkStates.some(state => state.waiting) ? "准备获取预览…"
        : linkStates.some(state => state.limited) ? "已达预览上限"
        : linkStates.some(state => state.error) ? "预览获取失败" : "";
      return h("section", { className: "studio-writer", "aria-label": "思绪写作区" },
        this.state.focus ? h("div", { className: "studio-focus-reveal", "aria-hidden": true }) : null,
        h("div", { className: "studio-writing-tools" },
          h("div", { className: "studio-mode", role: "group", "aria-label": "编辑模式" },
            h("button", { type: "button", "aria-pressed": !this.state.preview,
              onClick: () => this.setState({ preview: false }) }, "写作"),
            h("button", { type: "button", "aria-pressed": this.state.preview,
              onClick: () => this.setState({ preview: true }) }, "预览")),
          linkProgress ? h("span", { className: "studio-link-progress", role: "status", "aria-live": "polite" }, linkProgress) : null,
          h("button", { type: "button", className: "studio-focus-toggle", "aria-pressed": this.state.focus,
            onClick: () => this.setFocus(!this.state.focus) }, this.state.focus ? "退出专注" : "专注")),
        this.state.preview ? h("div", { className: "studio-preview" }, body
          ? Links.pieces(value).map((part, index) => part.card ? h("div", { key: index }, Links.render(h, part.card))
            : part.text.trim() ? h(MarkdownPreview, { ...this.props, key: index, value: part.text, getAsset: this.props.getAsset || (url => url) }) : null)
          : h("p", { className: "studio-empty-preview" }, "写下此刻的想法…")) : null,
        h("textarea", { id: this.props.forID, className: "studio-body", "aria-label": "正文",
          hidden: this.state.preview, placeholder: "写下此刻的想法…", value: body, spellCheck: false,
          disabled: this.props.isDisabled,
          ref: node => { this.input = node; },
          onPaste: event => this.pastedBody(event),
          onChange: event => this.changeBody(event.target.value) }),
        !this.state.preview ? this.renderLinkPreviews(body, cards) : null,
        h("footer", { className: "studio-writing-footer" }, h("span", null, "Markdown"),
          h("span", null, `${Array.from(body.replace(/\s/g, "")).length} 字符`)),
        h("p", { className: "studio-feedback", role: "status", "aria-live": "polite" }));
    },
  });
  // Keep the built-in field name/schema so date inference, slug timestamps and serializers stay intact.
  CMS.registerWidget("datetime", DateControl, DateWidget.preview, DateWidget.schema);
  CMS.registerWidget("studio-title", TitleControl);
  CMS.registerWidget("studio-body", BodyControl);
  CMS.registerWidget("studio-draft", DraftControl);

  let feedback = "";
  function editing() { feedback = ""; schedule(); }
  let lastSubmission = null;
  const pendingSlugs = new Set();
  function protectIndex(entry) {
    if (entry.get("slug") === "_index" || entry.get("path") === "content/moments/_index.md") {
      throw new Error("这是思绪页面的目录配置，不能在后台修改或删除。");
    }
  }
  CMS.registerEventListener({ name: "preSave", handler: ({ entry }) => {
    protectIndex(entry);
    if (!entry.getIn(["data", "body"], "").trim()) throw new Error("请先写下你的想法，再发布。");
    return entry.get("data");
  } });
  CMS.registerEventListener({ name: "preUnpublish", handler: ({ entry }) => protectIndex(entry) });
  CMS.registerEventListener({ name: "postSave", handler: ({ entry }) => {
    feedback = entry.getIn(["data", "draft"]) ? "草稿已保存到仓库。" : "已提交到仓库，等待网站构建。";
    lastSubmission = entry.get("slug") || "new";
    schedule();
  } });

  // The public template supplies its existing numbers and links; the UI never reassigns them.
  const records = new Map();
  let indexLoaded = false;
  fetch(new URL("records.json", location.href)).then(response => {
    if (!response.ok) throw new Error("Index unavailable");
    return response.json();
  }).then(data => { data.records.forEach(record => records.set(record.slug, record)); indexLoaded = true; schedule(); })
    .catch(() => { /* Editing remains available while a new deployment has no index yet. */ });

  let filter = "all";
  let searchTerm = "";
  let direction = -1;
  let lastRoute = "";
  let pending = false;
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; enhance(); });
  }
  function enhanceCard(card) {
    const link = card.querySelector('a[href*="/collections/moments/entries/"]');
    const heading = query("ListCardTitle", card) || query("CardHeading", card);
    if (!link || !heading) return;
    const slug = decodeURIComponent(link.hash.split("/entries/")[1]);
    if (slug === "_index") { card.hidden = true; return; }
    const parts = heading.textContent.split("\u001f");
    if (parts.length < 4) return;
    const date = parts.shift();
    const title = parts.shift().trim();
    const draft = parts.shift().trim() === "true";
    const excerpt = plainText(parts.join("\u001f"));
    const label = `编辑思绪：${title || excerpt.slice(0, 48)}`;
    if (link.getAttribute("aria-label") !== label) link.setAttribute("aria-label", label);
    card.dataset.studioDate = String(Date.parse(date) || 0);
    card.dataset.studioSlug = slug;
    card.dataset.studioDraft = String(draft);
    const matches = `${title}\n${parts.join("\u001f")}`.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase().trim());
    card.hidden = !matches || (filter === "draft" ? !draft : filter === "published" ? draft : false);
    let row = card.querySelector(".studio-entry");
    if (!row) {
      row = element("article", "studio-entry");
      row.append(element("div", "studio-entry-meta"), element("h2", "studio-entry-title"),
        element("p", "studio-entry-excerpt"), element("span", "studio-entry-edit", "编辑 →"));
      link.append(row);
      card.classList.add("studio-entry-ready");
    }
    const record = records.get(slug);
    const number = record ? ` · 第 ${record.number} 道` : "";
    const pendingBuild = !draft && (pendingSlugs.has(slug) || (indexLoaded && !record));
    text(row.querySelector(".studio-entry-meta"), `${dateLabel(date)}${number}${draft ? " · 草稿" : pendingBuild ? " · 待构建" : ""}`);
    const titleNode = row.querySelector(".studio-entry-title");
    titleNode.hidden = !title;
    text(titleNode, title);
    text(row.querySelector(".studio-entry-excerpt"), excerpt || "无正文");
    if (record && !draft && !card.querySelector(".studio-public-link")) {
      const publicLink = element("a", "studio-public-link", "公开页面 ↗");
      publicLink.href = record.url;
      publicLink.target = "_blank";
      publicLink.rel = "noopener";
      publicLink.setAttribute("aria-label", `查看公开思绪：${title || excerpt.slice(0, 30)}`);
      card.append(publicLink);
    }
    const publicLink = card.querySelector(".studio-public-link");
    if (publicLink) publicLink.hidden = draft;
  }
  function enhanceList(collection) {
    if (!collection.querySelector(".studio-search")) {
      const search = element("input", "studio-search");
      search.type = "search";
      search.value = searchTerm;
      search.placeholder = "搜索正文或标题";
      search.setAttribute("aria-label", "搜索正文或标题");
      search.oninput = () => { searchTerm = search.value; schedule(); };
      collection.append(search);
    }
    const heading = query("CollectionTopContainer", collection);
    if (heading && !heading.querySelector(".studio-intro")) {
      heading.append(element("p", "studio-intro", "记录那些尚未成为文章的瞬间"));
    }
    const controls = query("CollectionControlsContainer", collection);
    if (controls && !controls.querySelector(".studio-filters")) {
      const tabs = element("div", "studio-filters");
      tabs.setAttribute("role", "group");
      tabs.setAttribute("aria-label", "思绪状态");
      for (const [id, label] of [["all", "全部"], ["draft", "草稿"], ["published", "已发布"]]) {
        const button = element("button", "studio-filter", label);
        button.type = "button";
        button.dataset.filter = id;
        button.onclick = () => { filter = id; schedule(); };
        tabs.append(button);
      }
      const sort = element("button", "studio-sort", "时间 ↓");
      sort.type = "button";
      sort.setAttribute("aria-label", "按日期排序：最新优先");
      sort.onclick = () => {
        direction *= -1;
        text(sort, direction === -1 ? "时间 ↓" : "时间 ↑");
        sort.setAttribute("aria-label", `按日期排序：${direction === -1 ? "最新" : "最早"}优先`);
        schedule();
      };
      controls.append(tabs, sort);
    }
    collection.querySelectorAll(".studio-filter").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    });
    collection.querySelectorAll(`${selector("ListCard-card")},${selector("GridCard-card")}`)
      .forEach(enhanceCard);
    collection.querySelectorAll(selector("CardsGrid")).forEach(list => {
      const cards = Array.from(list.children).filter(card => card.dataset.studioSlug);
      const sorted = [...cards].sort((a, b) => direction * (Number(a.dataset.studioDate) - Number(b.dataset.studioDate))
        || a.dataset.studioSlug.localeCompare(b.dataset.studioSlug));
      if (cards.some((card, index) => card !== sorted[index])) sorted.forEach(card => list.append(card));
    });
    // Let Decap's own cursor finish reading this small collection before applying global search/sort.
    // Collapsing rows keeps its existing pagination sentinel visible; no second API/storage layer.
    const loading = Array.from(collection.querySelectorAll(selector("CardsGrid")))
      .some(list => Array.from(list.children).some(child => child.tagName !== "LI"));
    collection.classList.toggle("studio-loading", loading);
    const cards = collection.querySelectorAll(".studio-entry-ready");
    let empty = collection.querySelector(".studio-filter-empty");
    if (!empty) { empty = element("p", "studio-filter-empty"); query("CollectionMain", collection)?.append(empty); }
    if (empty) {
      empty.hidden = !loading && (!cards.length || Array.from(cards).some(card => !card.hidden));
      text(empty, loading ? "正在读取思绪…" : searchTerm.trim() ? "未找到匹配的思绪" : filter === "draft" ? "暂无草稿" : "暂无已发布思绪");
    }
  }
  function enhance() {
    if (lastRoute !== location.hash) {
      const justCreated = lastRoute.endsWith("/new") && location.hash.includes("/entries/");
      lastRoute = location.hash;
      if (!justCreated) feedback = "";
      document.body.classList.remove("studio-focus");
    }
    const editor = query("EditorContainer");
    const collection = query("CollectionContainer");
    document.body.dataset.studioView = editor ? "editor" : collection ? "list" : "other";
    const header = query("AppHeaderContent");
    if (header && !header.querySelector(".studio-brand")) {
      const brand = element("a", "studio-brand", "Residualsun / 思绪");
      brand.href = "#/collections/moments";
      header.append(brand);
    }
    if (collection) enhanceList(collection);
    if (editor) {
      const slug = decodeURIComponent(location.hash.split("/entries/")[1] || "");
      const deleteButton = query("DeleteButton", editor);
      if (deleteButton) {
        deleteButton.hidden = slug === "_index";
        deleteButton.title = "删除这条思绪";
      }
      if (lastSubmission && slug) {
        pendingSlugs.add(lastSubmission === "new" ? slug : lastSubmission);
        lastSubmission = null;
      }
      const preview = query("PreviewLink", editor);
      if (preview) {
        const path = records.get(slug)?.url || "/moments/";
        if (preview.getAttribute("href") !== path) preview.setAttribute("href", path);
        preview.hidden = document.body.classList.contains("studio-is-draft");
      }
      const error = document.querySelector(".Toastify__toast--error .Toastify__toast-body");
      const status = editor.querySelector(".studio-feedback");
      if (status) text(status, error ? error.textContent.trim() : feedback);
      const publish = query("StyledDropdownButton", query("ToolbarDropdown", editor) || editor);
      if (publish) {
        const label = Array.from(publish.childNodes).find(node => node.nodeType === Node.TEXT_NODE &&
          ["发布", "更新", "保存草稿"].includes(node.textContent.trim()));
        if (label) {
          const value = document.body.classList.contains("studio-is-draft") ? "保存草稿" : location.hash.includes("/entries/") ? "更新" : "发布";
          if (label.textContent !== value) label.textContent = value;
          if (publish.getAttribute("aria-label") !== value) publish.setAttribute("aria-label", value);
        }
        const busy = Array.from(publish.childNodes).find(node => node.nodeType === Node.TEXT_NODE &&
          ["发布中…", "保存中…", "更新中…"].includes(node.textContent.trim()));
        if (busy) {
          const value = document.body.classList.contains("studio-is-draft") ? "保存中…" : slug ? "更新中…" : "发布中…";
          if (busy.textContent !== value) busy.textContent = value;
          if (publish.getAttribute("aria-label") !== value) publish.setAttribute("aria-label", value);
        }
      }
    }
  }
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, characterData: true });
  window.addEventListener("hashchange", schedule);
  CMS.init();
})();
