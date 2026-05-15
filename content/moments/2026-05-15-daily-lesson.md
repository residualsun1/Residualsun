---
title: "2026-05-15日课"
date: "2026-05-15"
---

还是昼夜颠倒，有些愿望落空，有些期望难以兑现，惟愿能有所改进，但不必拘于他者的目光。

学习 Agent 的需要，还是需要补一补 python 的知识。今天下午继续学习，完成了条件语句，到循环语句部分。也正是在练习的过程中，发现自己还有许多没弄清楚的地方——学习的本质是否真的是大量练习，重复才通往「学会」？还是这只是对于部分人而言罢了，有天赋的人可以更快一些。

我不清楚，但我确实需要花多一些时间，做多一些习题，通过大量训练达到学习效果。

---

{{% notice info "Summary" %}}
这一部分是在 if 条件练习中遇到的问题总结出的注意点，分为两方面——其一，条件语句内的层级关系；其二，变量与其值的表示方式。
{{% /notice %}}

我对 `if` 条件语句还是不够熟悉了解。

```python
if 条件1:
    # 代码块A
elif 条件2:
    # 代码块B
elif 条件3:
    # 代码块C
else:
    # 代码块D
```

运行的原理如下：

* 检查 条件1，如果真 → 执行A → 停止，不检查其他
* 如果 条件1 为假 → 检查 条件2，如果真 → 执行B → 停止
* 如果 条件2 也为假 → 检查 条件3，如果真 → 执行C → 停止
* 如果以上都为假 → 执行D

**当运行到某个 `elif` 时，说明前面的 `if` 和 `elif` 条件都为假，此后不需要再重复检查前面的这些条件**。最好的例子如下：

```python
x = 15

if x < 10:           # ① 假（15不小于10）
    print("A")
elif x < 20:         # ② 执行到这里时，已知 x >= 10，因为条件一为假
    print("B")       # 输出：B
elif x < 30:         # ③ 不执行
    print("C")
```

总结一下：

| 位置       | 已知信息                            |
|----------|---------------------------------|---|
| if 条件    | 无假设                             |
| elif 条件2 | 知道 条件1 == False                 |
| elif 条件3 | 知道 条件1 == False 且 条件2 == False  |
| else     | 知道所有前面的条件都是 False               |

这里可以拉出 `if` 和 `elif` 来对比一下。

```python
if a > 0

if b > 0
```

```python
if a > 0

elif b > 0
```

在第一种情况中，两个 `if` 都会运行，不管第一个是否真假，第二个都会独立运行，无法根据到达第二个 `if` 来判断第一个 `if` 语句的状态。当两个 `if` 的语句都为真时，会导致第二个条件覆盖第一个的结果。

但第二种情况是，`if` 为真后执行即停止，而如果运行到了 `elif`，则说明 `if` 为假。

### 问题溯源

遇到这个问题是源于在下面这道习题中的练习：

> Please write a program which asks the user for three letters. The program should then print out whichever of the three letters would be in the middle if the letters were in alphabetical order.
>
> You may assume the letters will be either all uppercase, or all lowercase.

我原来的写法：

```python
fir = input("1st letter:")
sec = input("2nd letter:")
thi = input("3rd letter:")

if fir < sec and sec < thi:
    print(f"The letter in the middle is {sec}")
elif thi < sec and sec < fir:
    print(f"The letter in the middle is {sec}")
elif thi < fir and fir < sec:
    print(f"The letter in the middle is {fir}")
elif sec < fir and fir <  thi:
    print(f"The letter in the middle is {fir}")
elif fir < thi and thi < sec:
    print(f"The letter in the middle is {thi}")  
elif sec < thi and thi < fir:
    print(f"The letter in the middle is {thi}")
```

改进的写法：

```python
le1 = input("1st letter:")
le2 = input("2nd letter:")
le3 = input("3rd letter:")

if le1 > le2 and le1 > le3: # 此条件中 le1 最大
    if le3 > le2: # 此条件中 le3 最大
        middle = le3 # 因此 le2 在中间
    else: # 在 le1 最大的情况下，le2 比 le3 大
        middle = le2
elif le2 > le3: # 到这里，已确定 le1 不是最大，反而是 le2 最大，只需要讨论 le1 和 le3 
    if le3 > le1:
        middle = le3
    else:
        middle = le1
else: # 到这里，确定 le1 和 le2 都不是最大的，那就只能是 le3
    if le2 > le1:
        middle = le2
    else:
        middle = le1

print(f"The letter in the middle is {middle}")
```

注意，在改进的写法中，我犯过很严重的低级错误，即将`middle = le` 写成 `le = middle`，这是对 python 中变量本身的了解还不够。

`middle = le` 是指 `middle` 获得 `le` 的值，换句话，是左边获得右边的值，左边是一个存储着值的变量。

另外，上面的写法中也只有一个 `print`，更简洁一些。以后尽量将 `print` 写在最后，通过变量来存储结果。

你认为你真的理解 `elif` 了吗？当你以为自己真的理解时，再做一次题却马上露馅了。

我的答案：

```python
value = int(input("Value of gift:"))
if 5000 <= value and value < 25000:
    tax = (100 + (value - 5000) * 0.08)
    print(f"Amount of tax: {tax} euros")
elif 25000 <= value and value <55000:
    tax = (1700 + (value - 25000) * 0.1)
    print(f"Amount of tax: {tax} euros")
elif 55000 <= value and value < 200000:
    tax = (4700 + (value - 55000) * 0.12)
    print(f"Amount of tax: {tax} euros")
elif 200000 <= value and value < 1000000:
    tax = (22100 + (value - 200000) * 0.15)
    print(f"Amount of tax: {tax} euros")
elif value >= 1000000:
    tax = (142100 + (value - 1000000) * 0.17)
    print(f"Amount of tax: {tax} euros")
else:
    print("No tax!")
```

正确答案：

```python
value = int(input("Value of gift:"))

if value < 5000:
    tax = 0 
elif value < 25000:
    tax = (100 + (value - 5000) * 0.08)
elif value <55000:
    tax = (1700 + (value - 25000) * 0.1)
elif value < 200000:
    tax = (4700 + (value - 55000) * 0.12)
elif value < 1000000:
    tax = (22100 + (value - 200000) * 0.15)
else:
    tax = (142100 + (value - 1000000) * 0.17)

if tax == 0:
    print("No tax!")
else:
    print(f"Amount of tax: {tax} euros")
```

仍然是一个中心主旨：将 `print` 放到最后。