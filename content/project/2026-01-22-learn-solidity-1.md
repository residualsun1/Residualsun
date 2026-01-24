---
title: 理解 Solidity 语法的基本结构
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

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;
contract HelloWeb3{
    string public _string = "Hello Web3!";
}
```

上面是几段最简单的 Solidity 代码，由一行注释和三行代码组成。第一行的注释说明前加上了 `//` 意为注释，不会被程序执行，整行注释代码表示使用软件许可 MIT，如果不写许可，编译时就会出现警告

由于不同版本的语法有差异，因此第二行代码是声明 Solidity 的编译器版本，这里是表示源文件不允许小于 0.8.21 版本或大于 0.9.0 编译器编译，然后在 Solidity 中语句要以 `;` 作为结尾。

第三行和第四行的代码是合约部分，第三行意为创建合约，合约名称采用大驼峰命名法命名为 `HelloWeb3`，第四行则是具体的合约内容，在 `string` 字符串这一数据存储结构中将状态变量 `_string` 赋值为 `Hello Web3!`。

接下来的具体内容以实例来理解 Solidity 语法中的基本结构，以下面三段 Solidity 语法为例。

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public _string = "Hello Web3!";
}
```

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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
function 函数名(参数列表) 
可见性说明符 
状态可变性 
修饰符 
虚拟/重写关键字 
自定义修饰器
returns(返回类型)
{
    // 函数体
}
```

* `function` 固定开头，声明要定义一个函数；
* `函数名` 部分可以自定义，且通常采用小驼峰命名法——第一个单词首字母小写，从第二个单词开始每个单词的首字母大写；
* `(参数列表)` 内的内容是函数接收的参数，即输入到函数的变量类型和名称，可以为空；
* `可见性说明符` 有四种
  * `public`：内部和外部都可见（谁都可以调用参数）
  * `private`：只能从本合约内部访问，继承的合约也不能使用（只有合约自己内部可以调用参数）
  * `internal`：只能从合约内部访问，继承的合约可以用（自己和继承的子合约可以调用参数）
  * `external`：只能从合约外部访问（但内部可以通过 `this.f()` 来调用，`f` 是函数名）；
  
  {{% notice warning "注意" %}}
  合约中定义的函数需要明确指定可见性，它们没有默认值。
  
  `public`、`private` 和 `internal` 也可用于修饰状态变量，`public` 变量会自动生成同名的 `getter` 函数，用于查询数值。未标明可见性类型的状态变量，默认为 `internal`。
  
  另外，由于 `internal` 函数只能由合约内部调用，所以可以通过定义一个 `external` 的 `minuxCall` 函数来间接调用内部的 `minus` 函数。
  
  ```Solidity
    // internal: 内部函数 每次调用都使得 number 减少 1
  function minus() internal {
      number = number - 1;
  }

  // 合约内的函数可以调用内部函数
  function minusCall() external {
      minus();
  }
  ```
  {{% /notice %}}

* `状态可变性` 主要有四种，分别是无可变性修饰符、`view`、`pure` 和 `payable`

  由于以太坊交易需要支付 Gas Fee，因而 `Solidity` 引入了 `view` 和 `pure`——合约的状态变量存储在链上，Gas Fee 很贵，如果计算不改变链上状态，就可以不支付 Gas Fee。这里包含 `view` 和 `pure` 的函数不会改写链上状态，因此用户直接调用它不需要支付 Gas Fee，相应地，非 `view` 和 `pure` 函数调用 `view` 和 `pure` 需要支付 Gas Fee。

  以下事件可以被视为修改链上状态。

  * 写入状态变量。
  * 释放事件。
  * 创建其他合约。
  * 使用 selfdestruct.
  * 通过调用发送以太币。
  * 调用任何未标记 view 或 pure 的函数。
  * 使用低级调用（low-level calls）。
  * 使用包含某些操作码的内联汇编。
  
  | 状态可变性修饰符 | 是否读取状态 | 是否修改状态 | 是否接收 ETH | Gas 费用 |
  | --- | --- | --- | --- | --- |
  | 无修饰符（普通） | ✅ | ✅ | ❌ | 需要 |
  | view            | ✅ | ❌ | ❌ | 免费* |
  | pure            | ❌ | ❌ | ❌ | 免费* |
  | payable         | ✅ | ✅ | ✅ | 需要 |

  *免费是指本地调用时；如果通过交易调用仍需 Gas

  {{% notice warning "Tips" %}}

  智能合约不一定必须含有普通函数，从语法角度来看，一个合约只包含 `view` 或 `pure` 函数也是完全合法的。但从实用角度来看，只有 `view` 或 `pure` 函数的合约由于无法改变状态，因而没有实际价值。大多数有意义的合约都会有至少一个可以修改状态的函数。

  {{% /notice %}}
  
  {{% notice success "补充" %}}
  
  ![还是要做题才能真实理解不同修饰符之间的差异](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-22-1.png)
  
  这里进一步补充一下 `view` 和 `pure` 之间的差异。虽然两者都不修改链上状态（**不修改存储在区块链上的状态变量**），但是前者需要在**读取状态变量**时使用，后者不可以涉及状态变量的读取和修改，但可以涉及局部变量、参数的运算。总结来说，`view` 和 `pure` 之间最大的差异其实是**是否对状态变量进行作用**，只要你对状态变量敏感，就能很快发现。
  
  可以用一些代码来进行对比。
  
  ```Solidity
    contract Demo {
      uint256 public stateVar = 10;
    
      // ✅ pure - 只用参数
      function pureMath(uint256 a, uint256 b) public pure returns (uint256) {
          return a + b;
      }
    
      // ✅ view - 要读取状态变量时才用到
      function viewMath(uint256 a) public view returns (uint256) {
          return a + stateVar;  // 使用了 stateVar
      }
    
      // ✅ payable - 接收 ETH
      function deposit() public payable {
          // 可以接收 ETH
      }
      
      // ❌ 错误示例
      function add(uint256 a, uint256 b) public view returns (uint256) {
          return a + b;  // 没必要用 view，应该用 pure
      }
  }
  ```

  这里再举一个有意思的例子。
  
  ```Solidity
    // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.21;
  contract FunctionTypes{
      uint256 public number = 5;
      
    // 这个写法是错误的 ❌ 
  function add() external pure{
      number = number + 1;
  }

    // 这个写法是正确的 ✅ 
  function addPure(uint256 _number) external pure returns(uint256 new_number){
      new_number = _number + 1;
  }
  
  // 为什么改了一下就对了？因为给函数传递一个参数 _number，然后让它返回 _number + 1，这个操作不会读取或写入状态变量。另外，这些应该是局部变量，只在函数执行时存在于内存中。
  
  // 这个写法也是错误的 ❌  因为 view 能读取，但不能够改写状态变量。
  function add() external view{
      number = number + 1;
  }
  
  // 这个写法是正确的 ✅  因为读取但是不改写 number，返回一个新的变量
  function addView() external view returns(uint256 new_number) {
      new_number = number + 1;
  }
  
  }
  ```
  
  发现 `pure` 和 `view` 正确改写之后的差异了吗？
  
  ```Solidity
  function addPure(uint256 _number) external pure returns(uint256 new_number){
      new_number = _number + 1;
  }
  
  function addView() external view returns(uint256 new_number) {
      new_number = number + 1;
  }
  ```
  
  是的，含有 `pure` 的函数的函数体中完全没有状态变量 `number`，因为它既无法读取也无法修改；而含 `view` 的函数的函数体中却可以出现状态变量 `number`，因为它至少可以读取，不过也仅仅是读取，不可以改写 `number` 本身，我们是在读取其的基础上造了一个新的变量 `new_number`。
  
  {{% /notice %}}
  
* `虚拟/重写关键字`：方法是否可以被重写，或者是否是重写方法。`virtual` 用在父合约上，标识的方法可以被子合约重写。`override` 用在自合约上，表名方法重写了父合约的方法；
* `自定义修饰器`：自定义的修饰器，可以有 0 个或多个，有点复杂，它允许在函数执行前插入额外逻辑，常用于权限控制与前置检查。
* `returns(返回类型)` 是函数返回的变量类型和名称，如果有——写成 `returns` 而非 `return`——需要告知其返回的数据类型。

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