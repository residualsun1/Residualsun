# 先加载个人 R 配置，再应用此项目的 blogdown 设置。
if (file.exists("~/.Rprofile")) {
  base::sys.source("~/.Rprofile", envir = environment())
}

options(
  blogdown.serve_site.startup = FALSE,
  blogdown.knit.on_save = TRUE,
  blogdown.method = 'markdown'
)

options(blogdown.hugo.version = "0.111.3")
