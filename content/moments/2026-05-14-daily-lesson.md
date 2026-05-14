---
title: "2026-05-14日课"
date: "2026-05-14"
---

> The condition `x >= a and x <= b` is a very common way of checking whether the number `x` falls within the range of `a` to `b`. An expression with this structure works the same way in most programming languages.
>
> Python also allows a simplified notation for combining conditions: `a <= x <= b` achieves the same result as the longer version using and. This shorter notation might be more familiar from mathematics, but it is not very widely used in Python programming, possibly because very few other programming languages have a similar shorthand.

这段[引用](https://programming-26.mooc.fi/part-2/3-combining-conditions)要说明的是 `x >= a and x <= b` 的显示表达式是大多数编程语言中使用的，`a <= x <= b` 这种链式表达式更简洁，但是是 Python 特有，其他多数编程语言没有，因而反而是显示表达式被用得更多。

不过对初学者而言，直觉上更容易觉得简洁的链式表达用得更多。直接问 Claude Haiku 4.5，它却说 `0 <= age < 5` 在 Python 中用得更多。可是将上面引用的内容贴给 Haiku，Haiku 很快就变脸了——

> （1）`and` 的形式在大多数编程语言都存在，更通用  
> （2）链式比较虽然是 Python 特有的，但反而因为其他语言没有，所以使用者习惯用显式的 `and`  
>
> 正确建议应该是：
>
> 用 `0 <= age and age < 5` 更符合实际的 Python 编程习惯，即使链式比较 `0 <= age < 5` 在技术上也能用。
>
> 我之前说 “更Pythonic” 是不准确的——感谢你用实际文献纠正了我！这也提醒初学者不要盲目追求 “黑科技”，有时候最直白、最通用的写法反而是最好的。

这份日课没有别的目的，只想借此再次论证 **AI 时代仍然需要用心学习编程知识，单纯的 Vibe Coding 远远不够，AI 也并非随意就可取代人，反而更需要熟悉知识的人对其进行指导和校正，否则只会积累更多技术债务**。