---
title: Solidity 的函数输出
author: 黄国政
date: '2026-01-25'
slug: return-returns-in-solidity
categories: []
tags:
  - Solidity
---

<!--more-->

## 个人的细碎理解

今天在对 `pure` 和 `view` 两个状态可变性修饰符进行辨析时，进一步理解了智能约合中的结构——用我自己的话来概括，就是包括「**对状态变量保持敏感**」、「**什么时候该用 `pure` 或 `view`**」，以及「**函数参数列表何时填入内容，填入什么**」。

首先是一段基础代码。

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract FunctionTypes{
    // 状态变量
    uint256 public number = 5;

    // 普通函数
    function add() external{
        number = number + 1;
  }

}
```

在《[理解 Solidity 语法的基本结构](https://guozheng.rbind.io/project/learn-solidity-1/)》的博文里，我已经详细写过了区别，这里想简要复现部分内容以整理知识。

结论先上，对状态变量的敏感有助于我快速判断什么时候该用 `pure` 或 `view` 可变性修饰符，以下面的代码为例。

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract FunctionTypes{
    // 状态变量
    uint256 public number = 5;
    
    // 普通函数
    function add() external pure{
      number = number + 1;
    }

    function add() external view{
      number = number + 1;
    }
}
```

从代码开头便可以清楚地知道状态变量是 `number`，数据存储结构是 `uint256`，因而两个普通函数的写法显然都是错误的——函数体中都直接读取和修改了状态变量 `number`，但 `pure` 既无法读取也无法修改，`view` 则是只能读取但无法修改。

如果要正确改写，可以如下所示。

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract FunctionTypes{
    // 状态变量
    uint256 public number = 5;

    // 普通函数
    function addPure(uint256 _number) external pure returns(uint256 new_number1){
        new_number1 = _number + 1;
    }
  
    function addView() external view returns(uint256 new_number2) {
        new_number2 = number + 1;
    }
}
```

这里可以阐述两点，其一是 `pure` 和 `view` 的具体非读取与读取功能的表现，其二是我过去一直不理解的——**函数的参数列表中啥时候该填入内容，又该填入什么**？

第一，可以看到含 `pure` 的函数在函数体中是完全没有涉及状态变量 `number`，而是给函数 `addPure()` 传递了一个参数 `_number`，并规定好数据类型是 `uint256`，接着再在函数体中创造了一个局部变量 `new_number1`，并赋值为 `_number + 1`，最后返回。

这里我们可以理解，如果要在函数体中加入新的参数，不涉及状态变量，可以在函数的参数列表里声明加入的参数名称（如`_number`），并指定其类型（如 `uint256`）。

第二，可以看到含 `view` 的函数在函数体里涉及了状态变量 `number`，但是并没有改变 `number` 本身，而是读取了 `number`，在此基础上创建了局部变量 `new_number2`，并赋值为 `number + 1`，最后返回。

这部分没有在函数的参数列表中加入新的参数，而是直接读取状态变量。

## 函数输出

### 1. 函数返回值

Solidity 中的函数输出相关的关键词是 `returns` 和 `return`。

`returns` 跟在函数名之后，用于声明返回的变量类型与变量名。
`return` 则是指定具体的变量值。

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract ReturnDemo{
    
    function returnDemo() public pure returns(uint256, bool, uint256[3] memory){
        return(1, true, [uint256(1),2,3] );
    }
}
```

在 Remix IDE 中编译和部署上述代码后，查看左下角的 `returnDemo`，会显示如下信息：

```
0:uint256: 1
1:bool: true
2:uint256[3]: 1,2,3
```

总结起来就是通过 `returns` 的关键字来声明有多个返回值以及返回值类型的 `returnDemo()` 函数，然后在函数主体再通过 `return()` 来确定具体的返回值。uint256[3] 声明了长度为 3 而且类型为 `uint256` 的数组作为返回值，而由于 `[1,2,3]` 会被默认为 `uint8(3)`，因此 `[uint256(1),2,3]` 中的首个元素必须强制转换为 `uint256` 来声明该数组内的元素都是这种类型。另外，数组类型返回值默认必须用 `memory` 来进行修饰。

### 2. 命名式返回

在函数返回值一节中已说到 `returns` 可以声明返回的变量名，如果这么做，Solidity 会初始化这些变量，自动返回变量值而无需再使用 `return`。上一节的做法是只声明了变量类型，这节我们就同时声明变量名和变量类型，这样在函数主体中为几个变量赋值就可以了。

```Solidity
function returnNamed() public pure returns(uint256 _number, bool _bool, uint256[3] memory _array){
    _number = 1;
    _bool = true;
    _array = [uint256(1),2,3];
}
```
 
 在 Remix IDE 中编译和部署后运行返回结果如下：

 ```
0:uint256: _number 1
1:bool: _bool true
2:uint256[3]: _array 1,2,3
 ```

但在命名式返回中仍然可以使用 `return`。

```Solidity
// 命名式返回，依然支持return
function returnNamed2() public pure returns(uint256 _number, bool _bool, uint256[3] memory _array){
    return(1, true, [uint256(1),2,5]);
}
```

### 3. 解构式赋值

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract ReturnDemo{

    function returnNamed() public pure returns(uint256 _number, bool _bool, uint256[3] memory _array){
    _number = 1;
    _bool = true;
    _array = [uint256(1),2,3];
}

    function readReturn() public pure{
        uint256 _number;
        bool _bool;
        uint256[3] memory _array;
        (_number, _bool, _array) = returnNamed();

        // 读取部分返回值
        (, _bool, ) = returnNamed();

    }

}
```

其实我没有看懂「解构式赋值」这部分，但不想一直卡在一个地方，等后续碰到相关题目或者代码时再结合具体语境搞清楚。