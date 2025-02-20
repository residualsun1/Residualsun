---
title: 对 CGSS2021 数据进行探索
author: 黄国政
date: '2025-02-13'
slug: cgss2021-1
categories: []
tags:
  - R
  - 数据分析
draft: yes
---

<!--more-->

大二时老师让我们用 CGSS 的数据库进行简单的数据分析，从安装 R 开始，一路自行探索。我仍然记得，当时同学们大多被困于 R 的下载安装和数据录入两个步骤，我则在处理数据缺失值上犯难。

我们当时以四川师范大学的王敏杰老师编写的《[数据科学中的R语言](https://bookdown.org/wangminjie/R4DS/)》为主要参考书，这本入门书对中文小白十分友好。

过去的作业提交在了 Rpubs 上，现将其复现于 blogdown 中。

首先录入选择的 CGSS2021 数据，文件格式为 .dta。


```r
library(haven)
library(tidyverse)
```

```
## ── Attaching core tidyverse packages ──────────────────────── tidyverse 2.0.0 ──
## ✔ dplyr     1.1.3     ✔ readr     2.1.4
## ✔ forcats   1.0.0     ✔ stringr   1.5.0
## ✔ ggplot2   3.4.4     ✔ tibble    3.2.1
## ✔ lubridate 1.9.3     ✔ tidyr     1.3.0
## ✔ purrr     1.0.2     
## ── Conflicts ────────────────────────────────────────── tidyverse_conflicts() ──
## ✖ dplyr::filter() masks stats::filter()
## ✖ dplyr::lag()    masks stats::lag()
## ℹ Use the conflicted package (<http://conflicted.r-lib.org/>) to force all conflicts to become errors
```

我将分析对象命名为 cgss2021，使用<kbd>Alt</kbd>+<kbd>-</kbd>，可以快速召唤`<-`。


```r
cgss <- read_stata("D://05_GitHub/Data/dta/CGSS2021.dta")
data(cgss)
```

```
## Warning in data(cgss): data set 'cgss' not found
```
