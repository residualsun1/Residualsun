---
title: 搜索
disable_comments: true
disable_sidenotes: true
---

本页面的搜索框参考[谢益辉](https://yihui.org)的博文[《Add Client-side Searching via Fuse.js to Static Sites》](https://yihui.org/en/2023/09/fuse-search/)进行设置，以下是根据关键词进行搜索的具体说明：

- 空格：代表 `AND` 运算符，例如`生活 想法` 匹配的是包含 `生活` 和 `想法` 两个关键词的文章。  
- `|` ：代表 `OR` 运算符，例如`生活 | 想法` 匹配的是包含 `生活` 或 `想法` 关键词的文章。
- `""`：用以精确匹配短语，例如 `"生活 想法"` 匹配包含整个短语 `生活 想法` 的文章。  

<style type="text/css">
.main {
  width: 100%;
}
.title, .toc-line > a {
  font-style: initial;
}
.single .main a, .single .main h2 {
  border-bottom: none;
}
.main h2 {
  text-align: initial;
}
#search-input {
  width: 100%;
  font-size: 1.2em;
  padding: .5em;
}
.search-results {
  font-size: .9em;
}
.search-results b {
  background-color: yellow;
}
.search-preview {
  margin-left: 2em;
}
.footnotes {
  margin-top: 4em;
}
</style>

<input type="search" id="search-input" placeholder="请搜索(●'◡'●).">

<div class="search-results">
<section>
<h2 class="toc-line"><a target="_blank"></a><span class="dots"></span><span class="page-num small"></span></h2>
<div class="search-preview"></div>
</section>
</div>

<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2" defer></script>
<script src="https://cdn.jsdelivr.net/npm/@xiee/utils/js/fuse-search.min.js" defer></script>