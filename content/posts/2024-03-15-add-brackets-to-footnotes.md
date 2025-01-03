---
title: 给博客文章脚注编号添加括号[ ]
author: 黄国政
date: '2024-03-15'
slug: add-brackets-to-footnotes
categories: []
tags:
  - 技术折腾
---

<!--more-->

托益辉的福，我实现了博客[脚注内容右浮](https://github.com/yihui/yihui.org/discussions/1561)的功能。

实际上，到益辉博客的[Discussions](https://github.com/yihui/yihui.org/discussions)下面求助只初步实现了脚注右浮，具体的细节还有待完善，例如脚注内容与设置脚注文本之间的排列距离、响应式情况下脚注内容的分布和脚注编号显示样式等。

后来我想起曾经用过的主题模板[hugo-tania](https://github.com/WingLim/hugo-tania)就专门设置了[脚注内容右浮](https://hugo-tania.netlify.app/post/footnote/)，点进sass文件参考了设置脚注样式的代码，将上述的前两个问题一并解决。[^1]

[^1]: _footnotes.scss文件代码如下。

``` _footnotes.scss
.side {
    width: 200px;
    margin: 0 auto;

    p {
      margin: 0;
    }
}

.side-right {
    float: right;
    clear: right;
    margin-right: calc(-200px - 2em);
    background-color: var(--background);

    p {
        font-size: .9rem;
    }
}

.footnotes {
  ol li p {
    margin: 0;
  }
  hr {
    border: none;
    border-top: 1px solid var(--border);
  }
}

.footnote-ref {
  box-shadow: none !important;
}

.footnote-backref {
  box-shadow: none !important;
}

.note-ref {
    cursor: pointer;
    border: none;
    box-shadow: none !important;

    &:hover {
        box-shadow: none;
        border: none;
    }
}

.bg-number {
    background: var(--light-background);
    font-size: .9rem;
    color: var(--font-color);
    text-decoration: none;
    padding: 1px 5px;
    border-radius: 5px;
}

@media (max-width: 1280px) {
    .side {
        width: 100%;
        padding: 0 2em;
    }

    .side-right {
        float: none;
        clear: both;
        margin: 1em auto;
        background: none;
    }
}

@media (min-width: 1280px) {

    .note-ref:hover ~ .side {
        display: inline-block;
        position: absolute;
        margin-left: 1rem;
        padding: .5rem;
        box-sizing: content-box;
    }
}
```

后来我在baseof.html文件中添加了益辉写的[fix-footnote.min.js](https://github.com/yihui/misc.js/blob/main/js/fix-footnote.js)，成功给设置脚注的文本右上角编号添加了括号"[ ]"。[^2]

[^2]: 使用方法很简单，将`<script src="https://cdn.jsdelivr.net/npm/@xiee/utils/js/fix-footnotes.min.js" defer></script>`添加到html文件中（例如head.html或baseof.html）即可。

虽然设置脚注的文本右上角的编码确实带上了"[ ]"，但是右侧的脚注内容前的编号却没有。

|![我的博客](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/images/2024/03/03-15-01.png)|
|:-:|

然而益辉的博客中没有这样的问题，说明他写的js代码本身没有问题，可以将设置脚注文本的编号和脚注内容编号都加上括号，只是我的博客结构可能不适配。

|![益辉的博客](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/images/2024/03/03-15-02.png)|
|:-:|

我在两个博客的界面都使用过浏览器的检查功能，但检查出来的CSS样式并不是问题的关键所在。排除CSS以后，我的博客结构和益辉编写的js间的关系存在最大嫌疑。二话不说，直接上ChatGPT。

我的问题：

> 你好，我的博客引用了一段js代码，给脚注编号添加"[ ]"，这段js代码如下所示：
>
> ```javascript  
> (d => {  
>   // add [] to footnote numbers  
>   d.querySelectorAll('sup[id^="fnref:"] > a.footnote-ref, a.footnote-ref > sup').forEach(el => {  
>     if (!/^[0-9]+$/.test(el.innerText)) return;  
>     el.innerText = `[${el.innerText}]`;  
>     el.parentNode.before(d.createTextNode(' '));  
>   });  
>   // move the return symbol into the previous <p>  
>   d.querySelectorAll('.footnotes > ol > li > p ~ .footnote-return').forEach(el => {  
>     el.previousElementSibling.lastChild.after(el);  
>   });  
> })(document);
> ```
>
> 引用这段js后，我在博客页面检查，显示如下：
>
> ```html  
> <p>
> 说起“昼夜颠倒”，我又想起了梁博的专辑《昼夜本色》。最近很喜欢《昼夜本色》第二季中的几首歌曲，以及……尤其喜欢王菲的《乘客》和《花事了》 <sup id="fnref:1" class="note-ref"><a class="footnote-ref" role="doc-noteref">[1]</a></sup>
> <div class="side side-right footnotes"><p><span class="bg-number">1</span>《乘客》的粤语版。两首歌的原始版本都是《Going home》。&nbsp;</p></div>。喜欢上《乘客》这首歌，还是因为在公众号人物的文章中看过的一段话：
></p>  
> ```
>
> 可以看到，\<sup id="fnref:1" class="note-ref">\<a class="footnote-ref" role="doc-noteref">内的编号1加上了"[ ]"，但是\<span class="bg-number">内的编号1却没有加上"[ ]"。为什么？如何加上？
>

ChatGPT的回答：

> 感谢您的详细描述。根据您提供的信息，问题似乎是由于脚注编号的 HTML 结构不同导致的。在您的代码中，脚注编号是通过具有 `class="footnote-ref"` 的 `<a>` 元素来标识的，而不是 `<sup>` 元素内的文本。因此，当前的代码只会处理具有 `class="footnote-ref"` 的 `<a>` 元素，而不会处理 `<span class="bg-number">` 内的内容。
>
> 要解决这个问题，您可以简单地修改代码，以便它能够处理 `<span class="bg-number">` 内的内容，类似于处理 `<a class="footnote-ref">` 内容的方式。这样，您的 JavaScript 代码将会检查所有具有 `class="footnote-ref"` 的 `<a>` 元素以及所有具有 `class="bg-number"` 的 `<span>` 元素，并在它们内部的文本内容前后添加 "[ ]"。
>
> 以下是修改后的代码示例：
>
> ```javascript  
> (e => {  
>     e.querySelectorAll('sup[id^="fnref:"] > a.footnote-ref, a.footnote-ref > sup, span.bg-number').forEach((el => {  
>         if (/^[0-9]+$/.test(el.innerText)) {  
>             el.innerText = `[${el.innerText}]`;  
>             el.parentNode.before(e.createTextNode(" "));  
>         }  
>     }));  
>     e.querySelectorAll(".footnotes > ol > li > p ~ .footnote-return").forEach((el => {  
>         el.previousElementSibling.lastChild.after(el);  
>     }));  
> })(document);  
> ```
>
> 这样修改后，代码将会处理具有 `class="footnote-ref"` 的 `<a>` 元素以及具有 `class="bg-number"` 的 `<span>` 元素内部的文本内容，并在其前后添加 "[ ]"。
>
> 请注意，此修改假设 `span.bg-number` 元素中的内容也需要添加 "[ ]"。如果您的需求不同，请提供更多信息，我将尝试为您提供更合适的修改方案。

按照ChatGPT的建议，我在本地创建了使用其提供代码的js文件并进行引用，成功实现全脚注编号添加括号“[ ]”。[^3]

[^3]: 如此所示。

我还参考了益辉脚注编号的显示样式，使脚注编号显示更加醒目，效果在本页面也能见到，将编号为白色，编号的背景为深灰色。只需要在CSS中将`bg-number`的样式修改为：

```CSS
.bg-number {
    background: white;
    filter: invert(1);
    opacity: .6;
}
```

