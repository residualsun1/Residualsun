/* Published-note selection for Decap; only the target slug is persisted. */
(() => {
  const { CMS, h, createClass } = window;
  const Quotes = window.ResidualMomentQuotes;
  const records = new Map();
  let pending = "";
  const index = window.ResidualQuoteIndex = {
    records, loaded: false, siteURL: location.origin,
    load() {
      this.ready = fetch(new URL("records.json", location.href)).then(response => {
        if (!response.ok) throw new Error("Index unavailable");
        return response.json();
      }).then(data => {
        records.clear();
        data.records.forEach(record => records.set(record.slug, record));
        this.siteURL = data.siteURL || location.origin;
        this.loaded = true;
        return records;
      });
      this.ready.catch(() => {});
      return this.ready;
    },
    begin(slug) { pending = slug; location.hash = "/collections/moments/new"; },
    takePending() { const slug = pending; pending = ""; return slug; },
    momentSlug(url) { return Quotes.momentSlug(url, this.siteURL, location.origin); },
  };
  index.load();
  const sourceSlug = () => decodeURIComponent(location.hash.split("/entries/")[1] || "");
  const QuoteControl = createClass({
    getInitialState() { return { open: false, search: "", loaded: index.loaded, error: false }; },
    componentDidMount() {
      this.active = true;
      this.load(index.ready);
    },
    componentWillUnmount() { this.active = false; },
    load(promise) {
      this.setState({ error: false });
      promise.then(() => {
        if (!this.active) return;
        this.setState({ loaded: true });
        const slug = index.takePending();
        if (slug && location.hash.endsWith("/new")) this.select(slug);
      }).catch(() => { if (this.active) this.setState({ error: true }); });
    },
    select(slug) {
      if (slug && (!records.has(slug) || Quotes.cyclic(records, slug, sourceSlug()))) return;
      this.props.onChange(slug);
      window.dispatchEvent(new Event("studio:editing"));
      this.setState({ open: false, search: "" }, () => document.querySelector(".studio-body")?.focus());
    },
    render() {
      const value = this.props.value || "";
      const record = records.get(value);
      const term = this.state.search.trim().toLocaleLowerCase();
      const options = [...records.values()].filter(item => !Quotes.cyclic(records, item.slug, sourceSlug()) &&
        (!term || `${item.number} ${item.date} ${item.meta} ${item.text}`.toLocaleLowerCase().includes(term))).slice(0, term ? 30 : 12);
      return h("section", { className: "studio-quote-control", "aria-label": "思绪引用" },
        h("div", { className: "studio-quote-tools" },
          h("button", { type: "button", disabled: this.props.isDisabled, "aria-expanded": this.state.open,
            onClick: () => this.setState({ open: !this.state.open }) }, value ? "更换引用" : "引用思绪"),
          value ? h("button", { type: "button", disabled: this.props.isDisabled, onClick: () => this.select("") }, "移除引用") : null),
        this.state.open ? h("div", { className: "studio-quote-picker", role: "region", "aria-label": "选择历史思绪" },
          h("input", { type: "search", "aria-label": "搜索思绪编号、日期或正文", placeholder: "编号、日期或正文", value: this.state.search, autoFocus: true,
            onChange: event => this.setState({ search: event.target.value }),
            onKeyDown: event => { if (event.key === "Escape") { event.stopPropagation(); this.setState({ open: false }); } } }),
          this.state.error ? h("p", { role: "status" }, "无法读取历史思绪。", h("button", { type: "button", onClick: () => this.load(index.load()) }, "重试"))
            : !this.state.loaded ? h("p", { role: "status" }, "正在读取…")
              : options.length ? h("ul", null, options.map(item => h("li", { key: item.slug },
                h("button", { type: "button", onClick: () => this.select(item.slug) },
                  h("span", { className: "note-meta" }, item.meta), h("span", { className: "studio-quote-result" }, item.text || "查看原思绪")))))
                : h("p", { role: "status" }, "未找到可引用的思绪。")) : null,
        value && this.state.loaded ? Quotes.render(h, record && !Quotes.cyclic(records, value, sourceSlug()) ? record : null) : null,
        value && !this.state.loaded && !this.state.error ? h("p", { role: "status" }, "正在读取引用…") : null,
        value && this.state.error ? h("p", { role: "status" }, "引用暂不可预览。") : null);
    },
  });
  CMS.registerWidget("studio-quote", QuoteControl);
})();
