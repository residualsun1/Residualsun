---
title: 搜索
disable_comments: true
disable_sidenotes: true
---

本页面的搜索框代码取自来自博主[谢益辉](https://yihui.org)，通过[fuse.js](/en/2023/09/fuse-search/)运行，下列是关于搜索的说明：

搜索关键词时，空格代表`AND`运算符，`|`代表`OR`运算符，如果需要匹配精确的短语，可以使用双引号`""`。例如，`R Markdown`匹配的是包含`R`和`Markdown`的文章，`R | Markdown`匹配的是包含`R`或`Markdown`的文章，而`"R Markdown"`则匹配包含整个短语`R Markdown`的文章。

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