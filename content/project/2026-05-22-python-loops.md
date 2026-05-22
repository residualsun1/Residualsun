---
title: "我在「循环语句」犯过的错误与总结"
date: "2026-05-22"
slug: "python-loops"
tags:
  - Python
---

<!--more-->

Python 的循环语句部分我花了不少时间，可以说有点「卡」在这儿了，一度怀疑自己是不是太蠢了——难道我这个所谓的「文科生」真像老王他们说的那样，就是因为**学不懂理科，所以才去学文科**吗？进一步地，难道我们这些「文科生」就这么不堪吗？为什么说得好像我们「天生缺陷」或「低人一等」一般？似乎文科就是更容易的，理科才真正考验一个人的智力，而学文科的人正是因为智力不够所以才没有去学理科。

言归正传，在循环语句的习题练习中，我发现自己对循环本身的理解有问题，回过头细细探究，似乎由于学习内容全是英文，因而在对术语概念的理解上也出现一些偏误。不过有了 AI 就是好啊，无论多蠢的问题都有人随时回应，而在一来一回的沟通中，我将自己逐渐形成的想法反馈给 AI，还能得到 AI 进一步的点评和完善。

## 什么是循环

坦白说，学习循环语句时，上来就是这样一个例子应该是不难理解的，虽然开始的我是懵懵懂懂，后续还要反复查看。

```python
while True:
    number = int(input("Please type in a number, -1 to quit: "))

    if number == -1:
        break

    print(number ** 2)

print("Thanks and bye!")
```

但有一些细节，我认为初学者应该能自己解释清楚。例如，在上面这段代码中，从 `while True` 下面第一行起，**循环就开始了**（<mark>由于过去不理解，这里成为了我后面练习时一度犯错的伏笔</mark>），只要 `break` 没有生效，程序就会按照顺序依次运行 `print(number ** 2)` 和 `number = int(input("Please type in a number, -1 to quit: "))`。

当 `break` 生效后，`while True` 这整个结构就结束了，进而走到下一部分，也就是 `print("Thanks and bye!")`。

借助这一最简单的例子，接下来可以回顾两个概念。

## 语句与代码块

以上面提到的代码作为例子，`while True` 属于声明——声明要开始循环了，其下这一部分才属于代码块（Block）。

```python
    number = int(input("Please type in a number, -1 to quit: "))

    if number == -1:
        break

    print(number ** 2)
```
对于循环语句来说，循环会在这一块区域内流转，直到触发 `break` 才结束，执行下一个部分。

简而言之，在 Python 中，代码块一般是跟在 `if`、`while`、`for`、`def` 等关键字之后，而且**需要缩进的那一组语句**。

循环结束后，来到独立的 `print("Thanks and bye!")` 这一部分，它没有缩进，属于普通的语句（Statement）。

所谓语句就是程序中的一个执行单元，它通常指涉一行代码。

> A statement is a part of the program which executes something. It often, but not always, refers to a single command.

但也可以更复杂，包含着其他语句在其中。

> A statement can also be more complicated. It can, for instance, contain other statements. The following statement spans three lines:
> ```python
> if name == "Anna":
>    print("Hi!")
>    number = 2
>```

这里可以将 `if name == "Anna"` 之后的两行缩进内容视为代码块，但也可以理解为：

* `print("Hi!")` 是一个语句
* `number = 2` 是一个语句
* 整个 `if name == "Anna": ...` 也是一个语句，只不过它是一个包含了其他语句的复杂语句

语句和代码块的关系不是完全分开，可以将代码块视为缩进在一起、属于同一个结构的一组语句。

总的来说，一份 Python 文件由许多语句和代码块组成，并且按照从上到下的顺序来运行。其中，有些语句很简单，只有一行；有些语句则比较复杂，包含了代码块，甚至是代码块中还包含代码块。

## 我犯过的错误

让我们来看一下三道题目，每道题目都可以给予一些启发。

### 题一：理解 `break` 并精简写法

{{% notice info "重复输入密码" %}}
Please write a program which asks the user for a password. The program should then ask the user to type in the password again. If the user types in something else than the first password, the program should keep on asking until the user types the first password again correctly.

Have a look at the expected behaviour below:

```bash
Password: sekred
Repeat password: secret
They do not match!
Repeat password: cantremember
They do not match!
Repeat password: sekred
User account created!
```
{{% /notice %}}

这道题我做了两次，第二次的答案是在重新理解循环语句后精简过的版本。

```python
# 第一次
password = input("Password:")
while True:
    re_password = input("Repeat password:")
    if password == re_password:
        break
    else:
        print("They do not match!")
print("User account created!")
```

第一次写的这部分可以直接省略 `else:`，然后**取消缩进** `print("They do not match!")`，因为只要 `if password == re_password` 不成立，就会打印 `They do not match!`，并且重新循环。

可以说 `break` 之后的代码相当于 `else`，完全不需要再写出来。

```python
# 第二次
password = input("Password:")
while True:
    re_password = input("Repeat password:")
    if password == re_password:
        break
    print("They do not match!")
print("User account created!")
``` 

### 题二：理解缩进

{{% notice info "输入 PIN 及记录输入次数" %}}
Please write a program which keeps asking the user for a PIN code until they type in the correct one, which is 4321. The program should then print out the number of times the user tried different codes.

```bash
PIN: 3245
Wrong
PIN: 1234
Wrong
PIN: 0000
Wrong
PIN: 4321
Correct! It took you 4 attempts
```

If the user gets it right on the first try, the program should print out something a bit different:

```
PIN: 4321
Correct! It only took you one single attempt!
```
{{% /notice %}}

这道题我想了好久，至少得有 1 个小时……受到[其他例题](https://programming-26.mooc.fi/part-2/4-simple-loops#loops-and-helper-variables)的影响，我第一次给的答案如下：

```python
attempt = 0
while True:
    code = input("PIN:")
    attempt += 1

    if code == "4321":
        if attempt == 1:
            times = True
            break
        elif attempt > 1:
            times = False
            break
    print("Wrong")
if times:
    print("Correct! It only took you one single attempt!")
else:
    print(f"Correct! It took you {attempt} attempts")
```
这里多了一个 `times` 的中间变量，将信息传递到循环外面，绕了很多，但可以将打印和 `break` 都放进循环内部。

```python
attempt = 0
while True:
    code = input("PIN:")
    attempt += 1

    if code == "4321":
        if attempt == 1:
            print("Correct! It only took you one single attempt!")
        else:
            print(f"Correct! It took you {attempt} attempts")
        break
    print("Wrong")
```

---

这里我以为自己真的理解了，急头白脸地想马上给教程中的相似结构的代码精简一下，但发现又出了问题。

要精简的代码：

```python
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1

    if code == "1234":
        success = True
        break

    if attempts == 3:
        success = False
        break

    # this is printed if the code was incorrect AND there have been less than three attempts
    print("Incorrect...try again")

if success:
    print("Correct PIN entered!")
else:
    print("Too many attempts...")
```
我精简的有错误的代码及其输出：

```python
attempts = 0

while True:
  code = input("Please type in your PIN: ")
  attempts += 1

  if code == "1234":
    print("Correct PIN entered!")
  if attempts == 3:
    print("Too many attempts...")
    break
  print("Incorrect...try again")
```

```bash
Please type in your PIN: 1234
Correct PIN entered!
Incorrect...try again
Please type in your PIN:
```

这里 `print("Incorrect...try again")` 和两个 `if` 语句同样缩进，所以同级，也就是说 `if` 处只要没有触发 `break`，那就都会打印 `"Incorrect...try again"`。

尝试改了一遍，还是不对。
```python
attempts = 0

while True:
  code = input("Please type in your PIN: ")
  attempts += 1

  if code == "1234":
    print("Correct PIN entered!")
  if attempts == 3:
    print("Too many attempts...")
    break
print("Incorrect...try again")
```

```bash
Please type in your PIN: 1234
Correct PIN entered!
Please type in your PIN:
```

第二个 `print("Incorrect...try again")` 和 `while True:` 同级，所以如果没触发 `if` 的 `break`，那么就不会打印 `"Incorrect...try again"`。只有在终端中重复输入 PIN 直到三次，触发了 `break`，这时循环结束，才会打印。

正确的修复方案：

```python
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1

    if code == "1234":
        print("Correct PIN entered!")
        break                        # ← 必须 break，否则循环不会停
    elif attempts == 3:
        print("Too many attempts...")
        break
    else:
        print("Incorrect...try again")
```

---

### 题三：无限循环，谁需要循环，谁不需要循坏？

{{% notice info "计算下一个闰年" %}}
Please write a program which asks the user for a year, and prints out the next leap year.

```bash
Year: 2023
The next leap year after 2023 is 2024
```

If the user inputs a year which is a leap year (such as 2024), the program should print out the following leap year:

```bash
Year: 2024
The next leap year after 2024 is 2028
```
{{% /notice %}}

这里补充一下闰年的判断标准：

> Generally, any year that is divisible by four is a leap year. However, if the year is additionally divisible by 100, it is a leap year only if it also divisible by 400.

也就是说，闰年年份可以被 4 整除，但如果该年份还可以被 100 整除，它必须同时能被 400 整除才算是闰年。让我们将其转化为逻辑表达方式：

```python
leap_year % 4 == 0 and leap_year % 100 != 0
leap_year % 4 == 0 and leap_year % 100 == 0 and leap_year % 400 == 0
```

过去做过闰年的判断程序设计：

```python
year = int(input("Year:"))
leap_year = year + 1
while True:
    if leap_year % 4 == 0:
        if leap_year % 100 == 0:
            if leap_year % 400 == 0:
                break
            else:
                leap_year += 1
        else:
            break
    else:
        leap_year += 1
print(f"The next leap year after {year} is {leap_year}")
```

第一次作答错得很离谱。

```python
while True:
    year = int(input("Year:"))
    leap_year = year + 1
    if leap_year % 4 == 0:
        if leap_year % 100 == 0:
            if leap_year % 400 == 0:
                break
    break
print(f"The next leap year after {year} is {leap_year}")
```

这里没能处理 `year + 1` 不是闰年的问题。当 `year + 1` 不是闰年，程序应该继续检查 `year + 2`、`year + 3` 等，直到找到为止，如此才构成循环的退出 `break` 条件，而非固定执行一次。

第二次修改。

```python
while True:
    year = int(input("Year:"))
    leap_year = year + 1
    if leap_year % 4 == 0:
        if leap_year % 100 == 0:
            if leap_year % 400 == 0:
                break
            else:
                leap_year += 1
        else:
            leap_year += 1
    break
print(f"The next leap year after {year} is {leap_year}")
```

这里离正确答案近了，但没处理好闰年的判断逻辑条件。

```python
year = int(input("Year:"))
while True:
    leap_year = year + 1
    if leap_year % 4 == 0:
        if leap_year % 100 == 0:
            if leap_year % 400 == 0:
                break
            else:
                leap_year += 1
        else:
            break
    else:
        leap_year += 1
print(f"The next leap year after {year} is {leap_year}")
```

这里出现了「无限循环」的问题，因为 `leap_year = year + 1` 被放在了循环部分之中，这样每次循环，`leap_year` 都会被重置回 `year + 1`，所以 `leap_year += 1` 加了也白加，下一圈又回到原点，永远找不到答案。因此只需要把 `leap_year = year + 1` 这部分移到循环以外。

正确答案：

```python
year = int(input("Year:"))
leap_year = year + 1
while True:
    if leap_year % 4 == 0:
        if leap_year % 100 == 0:
            if leap_year % 400 == 0:
                break
            else:
                leap_year += 1
        else:
            break
    else:
        leap_year += 1
print(f"The next leap year after {year} is {leap_year}")
```