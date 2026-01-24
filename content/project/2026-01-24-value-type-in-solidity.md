---
title: Solidity 中的值类型
author: 黄国政
date: '2026-01-24'
slug: value-type-in-solidity
categories: []
tags:
  - Web3
  - Solidity
---

<!--more-->

Solidity 语法的变量类型包括**值类型、引用类型、映射类型和函数类型**，这次先来介绍其中的值类型。

值类型（Value Type）主要包括**布尔型、整数型、定长字节数组型、地址型和枚举型**。

在 Solidity 中运行这些值类型的语法时，同样需要完整的合约语法，包括协议声明、编译器版本和合约定义。

## 布尔型

布尔型只有两种值：`true` 和 `false`。

布尔型的运算符则有五种：

`!`：非，取相反的逻辑。  
`==`：等于，取相等的逻辑。  
`!=`：不等于，取否定的逻辑。  
`&&`：与，根据短路规则，当第一个条件是 `false` 时，不会再判断第二个条件。  
`||`：或，根据短路规则，当第一个条件是 `true` 时，不会再判断第二个条件。  

这里直接手搓代码来进行说明：

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract BoolExample {
    bool public _bool = true; // 为 _bool 变量赋值为 true
    bool public _bool1 = !_bool; //  !_bool 与 _bool 取反，为 false
    bool public _bool2 = _bool == _bool1; // 两个变量一个为 true，一个为 false，因此最后为 false
    bool public _bool3 = _bool != _bool1; // 两个变量一个为 true，一个为 false，因此最后为 true
    bool public _bool4 = _bool && _bool1; // 第一个变量为 true，第二个变量为 false，根据短路规则最后为 false
    bool public _bool5 = _bool || _bool1; // 第一个变量为 true，第二个变量为 false，根据短路规则最后为 true
}
```

来一个看起来抽象的：

```Solidity
bool a = 1-1==0 && 1%2==1;
```

`&&` 取 false，但是两边都为 true，最后结果便也为 true。

## 整数型

整数型包括 `int` 和 `uint`，前者是有符号整数，可以存负数、0 和正数，后者是无符号整数，只能存 0 和正数。`int` 和 `uint` 后面的数字后缀则代表位数（bits）。

如果只是写 `int` 或 `uint`，Solidity 会将它们默认为最大的类型——`int` 等同于 `int256`，`uint` 则等同于 `uint256`。那么从 8 到 256 的位数都代表什么呢？

| 类型        | 位数     | 最小值 | 最大值公式    | 最大值 (十进制)                  | 典型用途                   |
| :-------- | :------- | :----- | :------------ | :------------------------------- | :------------------------- |
| `uint8`   | 8 bits   | 0      | $2^8 - 1$     | 255                              | 极小的数 (如年龄、百分比)  |
| `uint16`  | 16 bits  | 0      | $2^{16} - 1$  | 65,535                           | 小计数器                   |
| `...`     | ...      | ...    | ...           | ...                              | ...                        |
| `uint256` | 256 bits | 0      | $2^{256} - 1$ | 很大很大 ($1.15 \times 10^{77}$) | **最常用**，适合存代币余额 |

`int` 的范围则被切割为两半，一半给负数，一半给正数（包含 0）。

| 类型     | 位数     | 最小值公式 | 最大值公式    | 范围示例          |
| :------- | :------- | :--------- | :------------ | :---------------- |
| `int8`   | 8 bits   | $-2^7$     | $2^7 - 1$     | -128 到 127       |
| `int16`  | 16 bits  | $-2^{15}$  | $2^{15} - 1$  | -32,768 到 32,767 |
| `...`    | ...      | ...        | ...           | ...               |
| `int256` | 256 bits | $-2^{255}$ | $2^{255} - 1$ | 极其巨大          |

整数型的分类很细致，这对于 Gas 优化和存储很有帮助。例如，虽然 `uint256` 最为常用，但是在某些情况下需要用到更小的类型，比如 `uint8`，这可以节省 Gas。这里可以通过两种情景进行对比：

1. 单独使用数值型。Solidity 的虚拟机按照 256 位来处理数据，这时候如果单独定义一个 `uint8`，EVM 还是要用 256 位来进行处理，甚至需要进行填充操作，这可能比直接定义 `uint256` 要消耗更多 Gas。
2. 在结构体（struct）中使用数值型。如果将多个较小的数值型放在一起，Solidity 会将它们打包进同一个存储槽（Storage Slot）中，而一个槽位 256 位，在这种情况下，如果我们要处理四个 `uint64`，将它们打包起来，便可以在原来需要占用四个槽位的情况下，转变为只占用一个槽位，由此节省大量 Gas。
    ```Solidity
    // 这里的变量会打包，节省大量 Gas
    struct MiniPack {
        uint64 a;
        uint64 b;
        uint64 c;
        uint64 d; 
        // 4个64位加起来正好256位，只占1个槽
    }
    ```

整数型在运算符上包括比较运算符和算术运算符两种。

（1）比较运算符
1. 功能：返回布尔值。
2. 类型
    * `<=`
    * `<`
    * `==`
    * `!=`
    * `>=`
    * `>`

（2）算术运算符
1. 功能：返回计算后的具体数值。
2. 类型
    * `+`
    * `-`
    * `*`
    * `/`
    * `**`：幂运算
    * `%`: 除法但取余数

继续手搓代码来说明。

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract NumberExample {
    // 设置两个初始值
    uint256 public _number = 10;
    uint256 public _number1 = 100;

    // 比较运算（注意，由于返回的值属于布尔值，因此数据存储结构要写明为 bool）
    bool public _number2 = _number == _number1; // 结果为 false
    bool public _number3 = _number != _number1; // 结果为 true

    // 算术运算
    uint256 public _number4 = _number * _number1; // 结果为 1000
    uint256 public _number5 = _number % _number1; // 结果为 10 
}
```

## 定长字节数组型

字节数组实际分为定长和不定长两种。

定长字节数组属于值类型，数组长度声明以后不可修改，根据字节数组长度可以分为 `bytes1`、`bytes8` 和 `bytes32`。其中，定长字节数组最多可以存储 32 bytes 数据，也就是 `bytes32`。

`bytesX` 代表占用 X 个字节（bytes），一个字节（bytes）等于 8 位（bits），在 16 进制中则用 2 个字符表示，比如 `0xFF`。相应地，`bytes8` 在 16 进制里有 16 个字符，`bytes32` 在 16 进制中有 64 个字符。

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract NumberExample {
    // 固定长度的字节数组
    bytes32 public _byte32 = "MiniSolidity"; 
    bytes1 public _byte = _byte32[0]; 
}
```

在上面这段代码中，本是字符串的 `MiniSolidty` 被以字节的形式——bytes32——存储进变量 `_bytes32` 之中，运行之后会发现 `_bytes32` 的值显示为 `0x4d696e69536f6c69646974790000000000000000000000000000000000000000`，正好 64 个字符。

`_byte` 的值则是取 `bytes1` 这一字节，具体是取 `_byte32` 的第一个字节，因此写成 `_byte32[0]`，运行出来结果是 `0x4d`。

不定长字节则属于引用类型，其数组长度在声明之后可以改变，包括 `bytes` 等。

## 地址型

地址型一般分为两类。

* 普通地址：存储一个 20 字节的值，这是以太坊地址的大小。
* payable address：比普通地址多出 `transfer` 和 `send`，用于接收转账。

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract NumberExample {
    // 普通地址
    address public _address = 0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71;
    address payable public _address1 = payable(_address); // payable address，可以转账、查余额
    // 地址类型的成员
    uint256 public balance = _address1.balance; // balance of address
}
```

第一段合约代码仅仅定义了基础的地址类型变量，并命名为 `_address` 和赋值，但是无法对其进行转账。第二段合约代码则通过 `payable()` 将普通的 `_address` 转换为可以收款的类型，新变量 `_address1` 不仅存有同样的地址，还可以接收转账。Solidity 为了安全，默认将地址看作不能接收转账的，如果需要往某个地址转账，则需要转化为 `payable` 类型。 
最后一段合约代码中，`.balance` 是所有 `address` 类型都自带的属性，这段代码会到以太坊的状态树中查询该地址当前持有的 ETH 数量（单位为 Wei），查询到的余额数值会被存入 `balance` 变量之中。类型则也被定义好为 `uint256`。这段代码会在合约部署时就会执行并定格，换句话说，`balance` 变量存的是合约部署时该地址的余额，而非实时的。 

## 枚举型

`enum` 可以给 `uint` 分配名称，从 0 开始，以使程序易于阅读和维护。

```Solidity
// 用enum将uint 0， 1， 2表示为Buy, Hold, Sell
enum ActionSet { Buy, Hold, Sell }
// 创建enum变量 action
ActionSet action = ActionSet.Buy;
```

```Solidity
// enum可以和uint显式的转换
function enumToUint() external view returns(uint){
    return uint(action);
}
```