---
title: 开启与更新基于 Blogdown 的 Hugo 数学公式书写
author: 黄国政
date: '2025-04-29'
slug: start-and-upgradethe-math-expression-in-blogdown-hugo
categories: []
tags:
  - 技术折腾
---

<!--more-->

## 基本设置

我的网站基于[谢益辉](https://yihui.org/)开发的 [Blogdown](https://github.com/rstudio/blogdown) 包，结合 [Hugo](https://gohugo.io/)、[GitHub](https://github.com) 和 [Netlify](https://www.netlify.com/) 进行搭建和部署，主题选自 [Nodejh](https://github.com/nodejh) 开发的 [hugo-theme-mini](https://github.com/nodejh/hugo-theme-mini)。

要开启数学公式或符号书写，首先需要在「config.yaml」文件中找到 `params.math`，将其设置为 `true`：

```yaml
# Site parameters
params:
  # To enable math typesetting , you could set `math: true`, default is `false`
  math: true
```

然后将 `makeup` 中的 `goldmark.renderer.unsafe` 设置为 `ture` 即可。

```yaml
markup:
 # needed to render raw HTML (e.g. <sub>, <sup>, <kbd>, <mark>)
 goldmark:
    renderer:
      unsafe: true
```

### 1、问题

一般情况下，完成上面两步后便可以根据相应的语法规则在 `.md` 文件中书写数学公式或符号了，但在实际情况中，我**只能书写独立公式，无法书写行内公式**。[^1]

[^1]: 严格来说，书写对象是「数学公式或数学符号」，但为便于说明具体情况，后文统一表示为「行内公式」与「独立公式」。

向 ChatGPT 和 DeepSeek 求助都没办法解决，它们给的建议是多修改几步：

* 第一， 确保在 `yaml` 中将 `math` 设置为 `true`（启用数学扩展）；
* 第二步，将 `goldmark.renderer.unsafe` 设置为 `true`（确保 Hugo 不会把 KaTex/MathJax 插入的 Html 标签转义） ；
* 第三步，在 `goldmark` 再添加一个 `extensions.math`（让 Goldmark 识别行内  `\(...\)` 语法），并设置为 `true`。

如下所示：

```yaml
# Site parameters
params:
  # To enable math typesetting , you could set `math: true`, default is `false`
  math: true
# needed to render raw HTML (e.g. <sub>, <sup>, <kbd>, <mark>)
  goldmark:
    renderer:
      unsafe: true
    extensions:
      math: true
```

这个方案试图用 `\(...\)` 来代替 `$...$` 书写行内公式与独立公式，但仍然无法正常显示。

### 2、解决

我最后在 [$\KaTeX$](https://katex.org/) 文档的「[Auto-render Extension](https://katex.org/docs/autorender)」部分中找到了解决方式。看起来是 KaTeX Versions 的版本更新了，至少文档中显示的代码与本主题源代码不一致，前者是 `katex@0.16.22`，而后者是 `katex@0.13.13`。

正确的解决方案如下：在确保「config.yaml」文件中的 `math` 和 `unsafe` 都设置为 `true` 的情况下，以「Auto-render Extension」文档提供的代码全部替换「math.html」文件中的代码。

以下是「math.html」中原来的代码：

```html
<!--  https://katex.org/docs/autorender.html  -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css" integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.js" integrity="sha384-pK1WpvzWVBQiP0/GjnvRxV4mOb0oxFuyRxJlk6vVw146n3egcN5C925NCP7a7BY8" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/contrib/auto-render.min.js" integrity="sha384-vZTG03m+2yp6N6BNi5iM4rW4oIwk5DfcNdFfxkk9ZWpDriOkXX8voJBFrAO7MpVl" crossorigin="anonymous"
    onload="renderMathInElement(document.body);"></script>
```

以下是「Auto-render Extension」中的代码：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.js" integrity="sha384-cMkvdD8LoxVzGF/RPUKAcvmm49FQ0oxwDF3BGKtDXcEc+T1b2N+teh/OJfpU0jr6" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/contrib/auto-render.min.js" integrity="sha384-hCXGrW6PitJEwbkoStFjeJxv+fSOOQKOPbJxSfM6G5sWZjAyWhXiTIIAmQqnlLlh" crossorigin="anonymous"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        renderMathInElement(document.body, {
          // customised options
          // • auto-render specific keys, e.g.:
          delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false},
              {left: '\\(', right: '\\)', display: false},
              {left: '\\[', right: '\\]', display: true}
          ],
          // • rendering keys, e.g.:
          throwOnError : false
        });
    });
</script>
```

代码更新完毕后，按照对应的语法规则即可正常书写行内公式和独立公式。

## 公式书写

如前所述，Markdown 中的数学公式和符号书写有两种方式，一种是行内公式，一种是独立公式。

Yikun Wu 在其博客文章《[Markdown 数学公式指导手册](https://wu-yikun.github.io/post/%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7/markdown-mathjax-basic-tutorial-and-quick-reference/)》中展示了大量实例及其写法，内容写得全面且详细。本文示例基于其原文内容进行参考。

### 1、行内公式

以行内公式语法规则书写出的数学公式或符号可以插入在文本内容之中，实现与文本内容混排的效果。

行内公式语法规则为 `$...$`，示例如下：

```markdown
$\alpha$, $\beta$, $\gamma$ 都是希腊字母。
```

$\alpha$, $\beta$, $\gamma$ 都是希腊字母。

```markdown
$f(x) = x^2$ 是一个简单的一元二次方程。
```

$f(x) = x^2$ 是一个简单的一元二次方程。

```
${x+1\over y+1} = \frac{1}{2}$ 是一个二元一次方程。
```

${x+1\over y+1} = \frac{1}{2}$ 是一个二元一次方程。

```
$\sqrt{3}$ 是根号 3，$\sqrt{9} = \sqrt[2]{9} = 3^2$。
```

$\sqrt{3}$ 是根号 3，$\sqrt{9} = \sqrt[2]{9} = 3^2$。

```
$\vec{a} \cdot \vec{b} = 0$ 和 $\overleftarrow{xy} \cdot \overrightarrow{z} = 0$ 都是矢量。
```

$\vec{a} \cdot \vec{b} = 0$ 和 $\overleftarrow{xy} \cdot \overrightarrow{z} = 0$ 都是矢量。

```
$\times$、$\div$、$\neq$、$\approx$ 是常见的关系运算符。
```

$\times$、$\div$、$\neq$、$\approx$ 是常见的关系运算符。

```
$\log$、$\lg$、$\ln$ 是常见的对数运算符。
```

$\log$、$\lg$、$\ln$ 是常见的对数运算符。

```
$\sin$、$\cos$、$\tan$ 是常见的三角运算符。
```

$\sin$、$\cos$、$\tan$ 是常见的三角运算符。

```
$\int$、$\partial$、$\oint$、$\lim$、$\infty$ 是常见的微积分运算符。
```

$\int$、$\partial$、$\oint$、$\lim$、$\infty$ 是常见的微积分运算符。

```
$\because$、$\therefore$ 是常见的逻辑运算符。
```

$\because$、$\therefore$ 是常见的逻辑运算符。

### 2、独立公式

按照独立公式的语法规则写出的数学公式或符号如同代码块一样，占据一片独立的空间。

独立公式的语法规则为 `$$...$$`，示例如下：

积分：

```markdown
$$\int_0^1 {x^2} \,{\rm d}x$$ 
```

$$\int_0^1 {x^2} \,{\rm d}x$$ 

极限：

```markdown
$$\lim_{n \to +\infty} \frac{1}{n(n+1)} \quad$$
```

$$\lim_{n \to +\infty} \frac{1}{n(n+1)} \quad$$

累加：

```markdown
$$ \sum_{i=1}^n \frac{1}{i^2} $$
```

$$ \sum_{i=1}^n \frac{1}{i^2} $$

包含省略号的一个式子：

```markdown
$$f(x_1,x_2,\ldots ,x_n) = x_1^2 + x_2^2 + \cdots + x_n^2$$
```

$$f(x_1,x_2,\ldots ,x_n) = x_1^2 + x_2^2 + \cdots + x_n^2$$

包含省略号的矩阵：

```markdown
$$
        \begin{pmatrix}
        1 & a_1 & a_1^2 & \cdots & a_1^n \\\\
        1 & a_2 & a_2^2 & \cdots & a_2^n \\\\
        \vdots & \vdots & \vdots & \ddots & \vdots \\\\
        1 & a_m & a_m^2 & \cdots & a_m^n \\\\
        \end{pmatrix}
$$
```

$$
        \begin{pmatrix}
        1 & a_1 & a_1^2 & \cdots & a_1^n \\\\
        1 & a_2 & a_2^2 & \cdots & a_2^n \\\\
        \vdots & \vdots & \vdots & \ddots & \vdots \\\\
        1 & a_m & a_m^2 & \cdots & a_m^n \\\\
        \end{pmatrix}
$$

包含分割符号的矩阵：

```markdown
$$
        \left[
            \begin{array}{cc|c}
              1&2&3\\\\
              4&5&6
            \end{array}
        \right]
$$
```

$$
        \left[
            \begin{array}{cc|c}
              1&2&3\\\\
              4&5&6
            \end{array}
        \right]
$$

方程式序列：

```markdown
$$
\left\\{ 
    \begin{array}{c}
        a_1x+b_1y+c_1z &=d_1 \\\\ 
        a_2x+b_2y+c_2z &=d_2 \\\\ 
        a_3x+b_3y+c_3z &=d_3 \\\\
    \end{array}
\right. 
$$
```

$$
\left\\{ 
    \begin{array}{c}
        a_1x+b_1y+c_1z &=d_1 \\\\ 
        a_2x+b_2y+c_2z &=d_2 \\\\ 
        a_3x+b_3y+c_3z &=d_3 \\\\
    \end{array}
\right. 
$$

条件表达式：

```markdown
$$
        f(n) =
        \begin{cases}
        n/2,  & \text{if $n$ is even} \\\\
        3n+1, & \text{if $n$ is odd}
        \end{cases}
$$
```

$$
        f(n) =
        \begin{cases}
        n/2,  & \text{if $n$ is even} \\\\
        3n+1, & \text{if $n$ is odd}
        \end{cases}
$$

## 参考资料

1. $\KaTeX$: The fastest math typesetting library for the web. 'Auto-render Extension'. [2025-04-30]. https://katex.org/docs/autorender
2. Yikun Wu. Markdown 数学公式指导手册. (2025-04-12)[2025-04-30]. https://wu-yikun.github.io/post/%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7/markdown-mathjax-basic-tutorial-and-quick-reference/