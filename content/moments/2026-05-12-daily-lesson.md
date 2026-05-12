---
title: "2026-05-12日课"
date: '2026-05-12'
---

* [x] 完成《卢旺达大屠杀》选读并分享 

---

做题时被自己蠢到了，题目如下：

> Please write a program which asks for the user's name. 
If the name is anything but "Jerry", the program then asks for the number of portions and prints out the total cost. The price of a single portion is 5.90.

我的初始答案如下：

```Python
name = input("Please tell me your name:")
if name != Jerry:
    soup = int(input("How many portions of soup?"))
    print(f"The total cost is {soup*5.9}")
if name == Jerry:
    print("Next please!")
```

对 Python 变量的认识不够深，没有给 `Jerry` 加上引号转化为字符，它会被当作变量。

正确答案：

```Python
name = input("Please tell me your name:")
if name != "Jerry":
    soup = int(input("How many portions of soup?"))
    print(f"The total cost is {soup*5.9}")
    print("Next please!") # 这部分是题目参考的要求，需要补充这一段说明
if name == "Jerry":
    print("Next please!")
```

对 `f-string` 的认识感觉也模模糊糊，下面的第一种写法没必要用 `f-string`。

```Python
print(f"{num * -1}")
```

简洁写法：

```Python
print(num * -1)
```

记得 `f-string` 主要用于**在字符串中**插入变量或表达式的时候。