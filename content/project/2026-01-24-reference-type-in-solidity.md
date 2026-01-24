---
title: Solidity 中的引用类型
author: 黄国政
date: '2026-01-24'
slug: reference-type-in-solidity
categories: []
tags:
  - Solidity
---

<!--more-->

Solidity 语法的变量类型包括值类型、引用类型、映射类型和函数类型，上次已经学习过值类型，这一次是引用类型。

引用类型主要包括数组（array）和结构体（struct）。

## 数组

数组可以用来存储一组数据，包括整数、字节、地址等，在分类上可以划分为固定长度数组和可变长度数组两种。

固定长度数组会指定数组的长度，如下所示：

```
uint[8] uint 是元素类型，8 则是长度
address[100] address 是元素类型，100 则是长度
```

可变长度数组不指定数组长度，如下所示：

```
uint[]
address[]
bytes1[]
bytes
```

`bytes` 是数组，但不用加 `[]`。还不能用 `byte[]` 声明单数组，但可以使用 `bytes` 或 `bytes1[]`，前者比后者更节省 Gas。

如果用 `memory` 修饰动态数组，可以用 `new` 操作符来创建，但是必须声明长度，而且在声明长度以后不能改变。

```
uint[] memory array8 = new uint[](5);
```

`memory` 和 `storage` 很不一样，前者存在临时内存，后者存在区块链中。

对于一个数组来说，每一个元素的类型以第一个元素为准，例如 `[1,2,3]` 所有元素都是 `uint8` 类型。这是因为在 Solidity 中，如果一个值没有指定类型的话，会根据上下文来推断元素的类型，默认就是最小单位的类型，这里默认最小单位是 `uint8`。在 `[uint(1),2,3]` 中，元素则都是 `uint` 类型，因为第一个元素就指定了 `uint` 类型，之后的每一个元素类型都以它为准。

## 结构体

结构体是一种允许自定义数据类型的方式，比如如果要描述一个「学生」，仅仅用 `uint` 或者 `string` 还不足够，还需要将 `id`（ta 的学号）、`score`（分数）和 `name`（名字）装在一起，而装着这些东西的对象就是所谓结构体，以下列代码为例。

```Solidity
// 定义一个名为 Student 的结构体
struct Student {
    uint256 id;
    uint256 score;
}
Student public student; // 初始一个student结构体
```

假设在合约中已经定义了一个状态变量，基于以上，可以参考四种给 `struct` 赋值的方式。

```Solidity
//  给结构体赋值
// 方法1:在函数中创建一个 storage 的 struct 引用
function initStudent1() external{
    Student storage _student = student; 
    _student.id = 11;
    _student.score = 100;
}
```

`Student storage _student = student` 创建了一个引用（指针），其中 `_student` 如同 `student` 的一个「替身」，当修改 `student.id` 时，实际上修改的是区块链的状态变量 `student.id`.

{{% notice success "例子" %}}
这里可以以一道题为例。

有如下一段合约代码，执行initStudent方法后，student.id和student.score的值分别为

```Solidity
contract StructTypes {
    struct Student{
        uint256 id;
        uint256 score; 
    }
   Student student;
   function initStudent() external{
        student.id = 100;
        student.score = 200;
        Student storage _student = student;
        _student.id = 300;
        _student.score = 400;
    }
}
```

按照我们在方法一中的理解，执行 `initStudent()` 以后，`student.id` 和 `student.score` 的值分别为 300 和 400。

{{% /notice %}}

```Solidity
// 方法2:直接引用状态变量的struct
function initStudent2() external{
    student.id = 1;
    student.score = 80;
}
```

第二种方法直接定位到了状态变量 `student` 的成员进行修改，但在本质上和方法一一样，都是直接对 Storage 进行操作。

```Solidity
// 方法3:构造函数式
function initStudent3() external {
    student = Student(3, 90);
}
```

这里是创建一个临时的 `Student` 结构体，通常位于内存或者栈中，然后将其整体覆盖写入 `student` 的 Storage 位置之中。但是参数的顺序必须严格按照 Struct 的顺序，即先 `id` 后 `score`。

```Solidity
// 方法4:key value
function initStudent4() external {
    student = Student({id: 4, score: 60});
}
```
这种方法是整体重写，但是可以不受顺序影响，而且可以更直观地看出哪个数字是 id，哪个是 score。