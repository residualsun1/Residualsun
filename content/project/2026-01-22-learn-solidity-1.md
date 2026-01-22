---
title: 理解 Solidity 语法的基本结构（一）
author: 黄国政
date: '2026-01-22'
slug: learn-solidity-1
categories: []
tags:
  - Web3
  - Solidity
---

<!--more-->

{{% notice content "说明" %}}

这篇博文也是「残酷共学」第 11 天的学习笔记。

昨晚熬夜总结 Vibe Coding 的过程，可能还是自己时间管理不到位，效率低下，熬了大夜，捣鼓到凌晨三点才睡，下午两点才起床，整个人精神和状态不好，没能充分把握学习时间，以致于今天学习的内容十分有限。

今晚痛定思痛，有多少就写多少，不够往后继续写，继续「堆砌」。但从中或许也暴露了我个人的生活习惯与学习习惯不够系统、结构化，很是混乱。

写完这部分就睡觉，早上早些起来好好干。

{{% /notice %}}

## Solidity 语法中的基本结构

在 Solidity 代码中，都必须先指定和声明 Solidity 的编译器版本。

```Solidity
pragma solidity ^0.8.26;
```

接下来的具体内容以实例来理解 Solidity 语法中的基本结构，以下面三段 Solidity 语法为例。

```Solidity
contract HelloWorld {
    string public greet = "Hello World!";
}
```

```Solidity
contract Counter {
    uint256 public count;

    // Function to get the current count
    function get() public view returns (uint256) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to decrement count by 1
    function dec() public {
        // This function will fail if count = 0
        count -= 1;
    }
}
```

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    // 状态变量
    uint256 public myNumber;

    // 构造函数
    constructor() {
        myNumber = 100;
    }

    // 函数
    function setNumber(uint256 _number) public {
        myNumber = _number;
    }
}
```

### 1.1 合约定义结构

可以看到三段代码的共通处是都含有 `contract XXX {}` 的结构——**合约定义**（Contract Definition），是智能合约中的基本构件单元，类似于 Java 或者 C++ 中的类（Class）。

* `contract`：向编译器声明这是一个合约模块。
* `XXX`：合约的名称，由开发者来定义，通常用大驼峰命名法——首字母大写——来书写，比如上面例子中的 `HelloWorld` 和 `Counter`。
* `{}`: 合约体，里面是合约的具体内容，主要包括**状态变量**和**函数**。
    * **状态变量**可以被简单理解为「数据」，相当于合约的「属性」/「肉体」，主要存数据。
    如同文档中所定义的：
    > 状态变量是指在合约中定义的、其值永久存储在区块链上的变量。它们用于记录合约的持久化数据，构成了合约的整体状态。当合约被部署后，这些变量将被写入区块链，并在合约的整个生命周期中保持可访问性和可追踪性。
    * **函数**则可以被简单理解为「逻辑」/「行为」，或者说是操作数据的方法。函数是一个统称，可以分出构造函数、普通函数。**构造函数** `constructor` 比较特殊，是初始化逻辑，只在合约部署时执行一次，通常用于给状态变量赋予初始值；**普通函数** `function` 可以被理解为具体的执行或业务逻辑，随时都可以执行，用于日常的交互、数据读取和修改等。

前面讲到了 `contract xxx {}` 这样的基本结构，下面继续对其中的要素进行理解，比如其中的数据存储结构（含状态变量）——可在此[回顾](https://guozheng.rbind.io/project/compile-and-deploy-message-contract/#1%e6%95%b0%e6%8d%ae%e5%ad%98%e5%82%a8%e7%bb%93%e6%9e%84%e9%83%a8%e5%88%86)——构造函数和普通函数。

### 1.2 构造函数结构

构造函数的基本结构如下：

```Solidity
constructor(参数列表) {
    // 初始化逻辑
}
```

`constructor` 是关键字也是名字，没有自定义的名称，`(参数列表)` 内用接收部署时传入的初始参数。另外，构造函数不需要写可见性，因为默认只能在部署时由系统调用，而且由于其任务是初始化，所以不存在返回结果。

### 1.3 普通函数结构

普通函数结构我们已经[看过](https://guozheng.rbind.io/project/smart-contract-development/#solidity-%e6%99%ba%e8%83%bd%e5%90%88%e7%ba%a6%e7%bc%96%e7%a8%8b)了，但是没有与智能合约中的其他部分一起进行梳理，在此再次书写一次，以便对比和理解。

```Solidity
function 函数名(参数列表) 可见性 状态可变性 修饰符 返回类型 {
    // 函数体
}
```

* `function` 固定开头，声明要定义一个函数；
* `函数名` 部分可以自定义，且通常采用小驼峰命名法——第一个单词首字母小写，从第二个单词开始每个单词的首字母大写；
* `(参数列表)` 内的内容是函数接收的参数，可以为空；
* `可见性` 包括 `public`（谁都可以调用参数）、`private`（只有合约自己内部可以调用参数）、`internal`（自己和继承的子合约可以调用参数） 和 `external`（只有外部能调用参数）四种；
* `状态可变性` 部分详细可见[此处](https://guozheng.rbind.io/project/compile-and-deploy-message-contract/#4%e6%a0%b8%e5%bf%83%e5%8a%9f%e8%83%bd%e5%87%bd%e6%95%b0);
* `返回类型` 是函数返回的结果，如果有——写成 `returns` 而非 `return`——需要告知其返回的数据类型。
* `修饰符` 有点复杂，它允许在函数执行前插入额外逻辑，常用于权限控制与前置检查。

理解函数的基本结构，对于理解新的代码很有帮助，以一段计数的代码为例。

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Counter {
    uint256 public count;

    // Function to get the current count
    function get() public view returns (uint256) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to decrement count by 1
    function dec() public {
        // This function will fail if count = 0
        count -= 1;
    }
}
```

在上面这段代码中，合约名称直接命名为计数器 `Counter`，合约中的第一行内容即状态变量 `count`，它会被永久存储在区块链上，其数据存储结构是 `uint256`，也就是说 `count` 的类型已经确定为 256 位无符号整数。`public` 表示变量是公开的，外部用户可以直接通过调用 `count()` 来查看值，不需要额外写 `get()` 函数——虽然示例里为了演示还是写了一个。

之后的三段代码都是普通函数，根据不同的需要进行了不同的命名，如为了查看某个值用了 `grt()`，要增加值用了 `inc()`，要减少值用了 `dec()`。注意到了吗，也就是说**函数功能的发挥不在于这些函数名，而在于函数体的具体内容**。

第一个函数运行之后会获取一个 uint256 类型的值，可以查看。

第二个函数没有任何状态可变性的符号，因为已经在函数体中修改了 `count` 的值——通过 `+=` 这一运算符，使得右侧的 `1` 值加上左侧的 `count` 的值，并将结果赋值给左侧的变量，也就是 `count`。

第三个函数同理，通过 `-=` 运算符，使得右侧的 `1` 值减去左侧 `count` 的值，再将结果赋予给左侧的变量 `count`。不过需要注意的是，如果 `count` 的值是 0，那么这个函数就会失败，因为 `count` 的类型是 `uint256`，也就是无符号整数，不能为负数。

## 南塘 DAO 分享会

今晚的南塘 DAO 分享会让我想起了过去在西埠村做田野调查的经历。

或许可以理解为，南塘 DAO 在做的事情是将 Web3 技术和线下的乡村建设与治理结合起来，又或者说是 DAO 理念的一次实践。

如同第二位分享者说的，在传统公司模式中，老板决策，全员沉默执行，高效但压抑；不过在南塘 DAO 早期，是人人有权，但没有共识，很凌乱。基于这种情况，引入了「罗伯特议事规则」，似乎在这一规则体系之下，议事不批判人，只完善事，规则首先保护的是提出不成熟想法的人——「当每个人都感到安全，智慧才会真正开始流动」。换句话说，提出想法的人无法得到有效的保护，感受不到安全，是会议失败的一种原因。在议事之中，我们一开始就不需要诸葛亮，而是通过抚平信息差，让我们这些受过相似教育、「底层代码」相似的年轻人的个性和差异成为了资源，发挥三个臭皮匠的作用。

第三位分享者富章来自台湾，是上一期的学员，负责议事规则实践，提到了书籍《可操作的民主：罗伯特议事规则下乡群全纪录》。他还提出，每个人的想法是否可以永久保留在区块链中？一群人的共识可以以某种智能合约的方式来运作，而这个规则是非常程序化的。他还希望会议不仅可以由人主持，进一步还可以由 AI 主持，由区块链、智能合约执行……

第一位分享者小白说到大家的 Web3 实践如何与官方的沟通：只谈区块链的技术——记事簿，但不涉及法币。

据闻南塘道已经有了一个实践：

> 我们第二期艺术共创营已经过半了，这次的主题是南塘人物志，挖掘的是每一位村民最深刻的故事，并用画作和NFT保存下来。预计2月2日我们会进行线上展览，如果感兴趣的可以持续关注喔

为什么要用去中心化的理念来实践——区块链的技术可以让大家看到自己的贡献，而且这种贡献会一直存在且无法被篡改……

基于文档、照片，形成 NFT——将村民的故事、村庄历史变成区块链上永久的、不可篡改的 NFT，这些可以成为在西埠村的尝试吗？