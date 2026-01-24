---
title: 编译与部署「链上留言」合约代码
author: 黄国政
date: '2026-01-20'
slug: compile-and-deploy-message-contract
categories: []
tags:
  - Web3
  - Solidity
---

<!--more-->

## 理解「链上留言」的合约代码

以下是一段关于「链上留言」的智能合约代码。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; // 指定 Solidity 编译器版本为 0.8.0

contract MessageBoard {
    
    // （1）数据存储结构
    // 保存所有人的留言记录
    mapping(address => string[]) public messages; 

    // （2）事件定义
    // 留言事件，便于检索器和区块链浏览器追踪
    event NewMessage(address indexed sender, string message);  

    // （3）构造函数
    // 在部署时留言一条欢迎词
    constructor() {
        string memory initMsg = "Hello ETH Pandas";
        messages[msg.sender].push(initMsg);
        emit NewMessage(msg.sender, initMsg);
    } 

    // （4）核心功能函数
    // 发送一条留言
    function leaveMessage(string memory _msg) public {
        messages[msg.sender].push(_msg);     // 添加到发言记录
        emit NewMessage(msg.sender, _msg);   // 发出事件
    }

    // 查询某人第 n 条留言（从 0 开始）
    function getMessage(address user, uint256 index) public view returns (string memory) {
        return messages[user][index];
    }

    // 查询某人一共发了多少条
    function getMessageCount(address user) public view returns (uint256) {
        return messages[user].length;
    }
}

```

对于以上代码，我们可以拆分开来进行理解。此前，让我们[回顾一下](https://guozheng.rbind.io/project/smart-contract-development/#solidity-%e6%99%ba%e8%83%bd%e5%90%88%e7%ba%a6%e7%bc%96%e7%a8%8b)——**一个智能合约的基本结构通常由三部分组成：状态变量、构造函数和函数**。

### （1）数据存储结构部分

```solidity
// 保存所有人的留言记录
mapping(address => string[]) public messages; 
```

`mapping` 是映射类型，`mapping(address => string[])` 是数据存储结构，`messages` 是状态变量——永久存储在区块链上。数据存储结构中的 `address => string[] ` 将用户钱包地址映射到一个字符串数组， `address` 是用户的钱包地址，也就是以太坊地址，`string[]` 则是用户的留言，且由于是数组形式，因此可以有多条。外部的 `public` 则是指自动生成一个查询函数，外部可以据此读取数据。

在此我们需要区分一下「**数据存储结构**」与「**状态变量**」之间的关系。「数据存储结构」指的是数据的组织方式，「状态变量」是变量本身。**状态变量通过数据存储结构来定义其自身的类型**。以 `messages` 和 `mapping(address => string[])` 之间为例，`message` 呈现出来的正是 `mapping(address => string[])` 所表达字符串组信息，比如 `“这是第一条留言”, “这是第二条留言”`。

```solidity
以下都是数据存储结构
mapping(address => string[])   // 映射类型
uint256                        // 无符号整数
string                         // 字符串
address                        // 地址类型
string[]                       // 字符串数组
struct User { ... }            // 结构体类型
```

```solidity
contract Example {
    // 状态变量名: messages
    // 数据类型: mapping(address => string[])
    mapping(address => string[]) public messages;
    
    // 状态变量名: totalSupply
    // 数据类型: uint256
    uint256 public totalSupply;
    
    // 状态变量名: owner
    // 数据类型: address
    address public owner;
}
```

### （2）事件定义部分

```solidity
// 留言事件，便于检索器和区块链浏览器追踪
event NewMessage(address indexed sender, string message);  
```

看到这部分有一个 `event`，指的是事件。**事件**用于记录区块链上发生的重要操作，里面的 `indexed` 可以使之后的 `sender` 作为索引以进行快速检索。所以整个事件定义部分可以让 Dapp 的前端**监听该事件以实时更新界面**，区块链浏览器可以追踪谁发了什么留言，而且比直接读取存储便宜。事件定义部分就相当于区块链日志（logs）。

### （3）构造函数部分

```solidity
// 在部署时留言一条欢迎词
constructor() {
    string memory initMsg = "Hello ETH Pandas";
    messages[msg.sender].push(initMsg);
    emit NewMessage(msg.sender, initMsg);
} 
```

构造函数旨在合约部署时执行一次，`msg.sender` 是部署合约的人的地址，`emit` 用于触发事件通知，综合来看，这里的构造函数可以自动为部署合约的人留下一条欢迎消息「Hello ETH Pandas」。

### （4）核心功能函数

```solidity
// 发送一条留言
function leaveMessage(string memory _msg) 
    public 
{
    messages[msg.sender].push(_msg);     // 添加到发言记录
    emit NewMessage(msg.sender, _msg);   // 发出事件
}

// 查询某人第 n 条留言（从 0 开始）
function getMessage(address user, uint256 index)
    public 
    view 
    returns 
    (string memory) 
{
    return messages[user][index];
}

// 查询某人一共发了多少条
function getMessageCount(address user)
    public
    view
    returns
    (uint256)
{
    return messages[user].length;
}
```

让我们再回顾以下 Solidity 中函数的标准声明格式。

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

好，接下来则需要区分一下 Solidity 函数的类型，我们主要从「状态可变性修饰符」来进行分类，主要有四种，分别是无可变性修饰符、`view`、`pure` 和 `payable`

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

| 修饰符 | 是否读取状态 | 是否修改状态 | 是否接收 ETH | Gas 费用 |
| --- | --- | --- | --- | --- |
| 无修饰符（普通） | ✅ | ✅ | ❌ | 需要 |
| view            | ✅ | ❌ | ❌ | 免费* |
| pure            | ❌ | ❌ | ❌ | 免费* |
| payable         | ✅ | ✅ | ✅ | 需要 |

*免费是指本地调用时；如果通过交易调用仍需 Gas

{{% notice warning "Tips" %}}

智能合约不一定必须含有普通函数，从语法角度来看，一个合约只包含 `view` 或 `pure` 函数也是完全合法的。但从实用角度来看，只有 `view` 或 `pure` 函数的合约由于无法改变状态，因而没有实际价值。大多数有意义的合约都会有至少一个可以修改状态的函数。

{{% /notice %}}

补充完相关知识后，可以对合约中具体的三个函数进行解释。

```solidity
function leaveMessage(string memory _msg) 
    public 
{
    messages[msg.sender].push(_msg);     // 添加到发言记录
    emit NewMessage(msg.sender, _msg);   // 发出事件
}
```

这个函数可以发送事件通知前端，`public` 意味着任何人都可以调用，`string memory` 意为参数临时存储在内存中，而非永久存储（便宜）——相对低，`storage` 则意为永久保存在区块链上（昂贵），`.push()` 是将新留言添加到该用户的留言数组末尾。

```solidity
function getMessage(address user, uint256 index)
    public 
    view 
    returns 
    (string memory) 
{
    return messages[user][index];
}
```

这个函数可用于查询指定留言，通过索引查询某用户的第 n 条留言，从 0 开始。里面的 `view` 意味着只读函数，不修改状态也不消耗 Gas。

```solidity
function getMessageCount(address user)
    public
    view
    returns
    (uint256)
{
    return messages[user].length;
}
```

这个函数可以查询用户总共发送了多少留言，配合上面的函数可以遍历所有留言。

## 理解编译与部署信息

在 Remix IDE 中创建文件 `messageboard.sol` 中，将「链上留言」合约代码粘贴到其中，之后进行编译和部署，可以查看以下消息。

```Json
status	1 Transaction mined and execution succeed
transaction hash	0x0418441077238cef2f2821fe91f3272e062fd9bb0b07297e91afd35a64eeb23d
block hash	0xc16dcb3e92161521c0751c4288f91a585b1222df7fb62b95f16d1a82c5668ca6
block number	6
contract address	0xDA0bab807633f07f013f94DD0E6A4F96F8742B53
from	0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
to	MessageBoard.(constructor)
transaction cost	669069 gas 
execution cost	558143 gas 
output	0x608060405234801561000f575f5ffd5b506004361061004a575f3560e01c80634e7f12641461004e578063570c537e1461006a578063c45d9bea1461009a578063d7363ce7146100ca575b5f5ffd5b610068600480360381019061006391906104e3565b6100fa565b005b610084600480360381019061007f91906105b7565b6101b7565b6040516100919190610655565b60405180910390f35b6100b460048036038101906100af91906105b7565b61029e565b6040516100c19190610655565b60405180910390f35b6100e460048036038101906100df9190610675565b61034e565b6040516100f191906106af565b60405180910390f35b5f5f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081908060018154018082558091505060019003905f5260205f20015f90919091909150908161016591906108c5565b503373ffffffffffffffffffffffffffffffffffffffff167f8da45d748eefefd09cc1491cd32086b6d6a0bd7063d08f05c94df9eb1404bd80826040516101ac9190610655565b60405180910390a250565b60605f5f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20828154811061020757610206610994565b5b905f5260205f2001805461021a906106f5565b80601f0160208091040260200160405190810160405280929190818152602001828054610246906106f5565b80156102915780601f1061026857610100808354040283529160200191610291565b820191905f5260205f20905b81548152906001019060200180831161027457829003601f168201915b5050505050905092915050565b5f602052815f5260405f2081815481106102b6575f80fd5b905f5260205f20015f915091505080546102cf906106f5565b80601f01602080910402602001604051908101604052809291908181526020018280546102fb906106f5565b80156103465780601f1061031d57610100808354040283529160200191610346565b820191905f5260205f20905b81548152906001019060200180831161032957829003601f168201915b505050505081565b5f5f5f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20805490509050919050565b5f604051905090565b5f5ffd5b5f5ffd5b5f5ffd5b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6103f5826103af565b810181811067ffffffffffffffff82111715610414576104136103bf565b5b80604052505050565b5f610426610396565b905061043282826103ec565b919050565b5f67ffffffffffffffff821115610451576104506103bf565b5b61045a826103af565b9050602081019050919050565b828183375f83830152505050565b5f61048761048284610437565b61041d565b9050828152602081018484840111156104a3576104a26103ab565b5b6104ae848285610467565b509392505050565b5f82601f8301126104ca576104c96103a7565b5b81356104da848260208601610475565b91505092915050565b5f602082840312156104f8576104f761039f565b5b5f82013567ffffffffffffffff811115610515576105146103a3565b5b610521848285016104b6565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6105538261052a565b9050919050565b61056381610549565b811461056d575f5ffd5b50565b5f8135905061057e8161055a565b92915050565b5f819050919050565b61059681610584565b81146105a0575f5ffd5b50565b5f813590506105b18161058d565b92915050565b5f5f604083850312156105cd576105cc61039f565b5b5f6105da85828601610570565b92505060206105eb858286016105a3565b9150509250929050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f610627826105f5565b61063181856105ff565b935061064181856020860161060f565b61064a816103af565b840191505092915050565b5f6020820190508181035f83015261066d818461061d565b905092915050565b5f6020828403121561068a5761068961039f565b5b5f61069784828501610570565b91505092915050565b6106a981610584565b82525050565b5f6020820190506106c25f8301846106a0565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061070c57607f821691505b60208210810361071f5761071e6106c8565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026107817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610746565b61078b8683610746565b95508019841693508086168417925050509392505050565b5f819050919050565b5f6107c66107c16107bc84610584565b6107a3565b610584565b9050919050565b5f819050919050565b6107df836107ac565b6107f36107eb826107cd565b848454610752565b825550505050565b5f5f905090565b61080a6107fb565b6108158184846107d6565b505050565b5b818110156108385761082d5f82610802565b60018101905061081b565b5050565b601f82111561087d5761084e81610725565b61085784610737565b81016020851015610866578190505b61087a61087285610737565b83018261081a565b50505b505050565b5f82821c905092915050565b5f61089d5f1984600802610882565b1980831691505092915050565b5f6108b5838361088e565b9150826002028217905092915050565b6108ce826105f5565b67ffffffffffffffff8111156108e7576108e66103bf565b5b6108f182546106f5565b6108fc82828561083c565b5f60209050601f83116001811461092d575f841561091b578287015190505b61092585826108aa565b86555061098c565b601f19841661093b86610725565b5f5b828110156109625784890151825560018201915060208501945060208101905061093d565b8683101561097f578489015161097b601f89168261088e565b8355505b6001600288020188555050505b505050505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffdfea2646970667358221220ab76f3500af583e8207246769bc5b6be2353ebfb10eacde893be53cd22fa235e64736f6c634300081e0033
decoded input	{}
decoded output	 - 
logs	[
	{
		"from": "0xDA0bab807633f07f013f94DD0E6A4F96F8742B53",
		"topic": "0x8da45d748eefefd09cc1491cd32086b6d6a0bd7063d08f05c94df9eb1404bd80",
		"event": "NewMessage",
		"args": {
			"0": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
			"1": "Hello ETH Pandas"
		}
	}
]
raw logs	[
  {
    "_type": "log",
    "address": "0xDA0bab807633f07f013f94DD0E6A4F96F8742B53",
    "blockHash": "0xc16dcb3e92161521c0751c4288f91a585b1222df7fb62b95f16d1a82c5668ca6",
    "blockNumber": 6,
    "data": "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001048656c6c6f204554482050616e64617300000000000000000000000000000000",
    "index": 1,
    "topics": [
      "0x8da45d748eefefd09cc1491cd32086b6d6a0bd7063d08f05c94df9eb1404bd80",
      "0x0000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc4"
    ],
    "transactionHash": "0x0418441077238cef2f2821fe91f3272e062fd9bb0b07297e91afd35a64eeb23d",
    "transactionIndex": 0
  }
]
```

照例来逐个内容来理解。

* `status` 指代交易状态码，1 = 成功，0 = 失败。此处为 1 表示合约已经成功部署并且执行。
* `transaction hash` 指代交易哈希，它是我们发起的这笔交易在区块链上的唯一 ID，可以在区块链浏览器中查询这笔交易的所有细节。
* `block hash` 指代区块哈希，是这一区块的唯一标识，`block number` 指这笔交易被打包进第 6 个区块——一个区块可以包含多笔交易。
* `contract address` 指代合约地址，是这份合约在区块链上的永久地址，后面调用合约函数都需要用到该地址，是**最重要的信息之一**，如同合约的身份证。
* `from` 后的字符是部署该合约的账户地址，我们在 Remix IDE 中进行测试部署的第一个账户，也是构造函数中 `msg.sender` 的值。
* `to` 之后的字符则是表示调用了合约的构造函数——部署合约时总是调用构造函数。
* `transaction cost` 是指部署的总费用，包括数据存储、计算等所有开销，是实际支付的 gas
* `execution cost` 是执行费用，指实际执行智能合约逻辑的成本，`transaction cost` - `execution cost` 就是数据存储的开销。
* `output` 输出的大量字节码是合约的编译后字节码，EVM 实际执行的机器码，也是 Solidity 代码编译之后的二进制表示。
* 由于构造函数没有参数，而且也没有返回值，因此 `decode input` 输入为空，`decode output` 输出为空。
* `logs` 指事件日志，证明了此次构造函数成功执行，其中，`event: "NewMessage"` 触发了在构造函数中定义的 `NewMessage` 事件，`arg[0]` 指代部署者地址，`agr[1]` 指代留言内容。总的来说，这是构造函数里 `emit NewMessage(msg.sender, initMsg)` 的结果。
* `raw logs` 指原始日志。

## 测试网与领取 Sepoia 代币

> 以太坊测试网（Ethereum Testnets）是用于开发、测试和部署智能合约的网络环境，它们模拟主网功能但使用无价值的测试代币，让开发者可以安全地进行实验而无需承担真实的经济成本。

第一周便听到测试网这个概念，同时也领取了 SepETH，但一直不清楚是什么。特别是 Sepolia，原来它和 Holesky 都是测试网的一种，两者的共识机制都是 Pos，前者特点是长期支持的主要测试网，与主网最相似，稳定性高，一般用于最终部署前测试，生产环境模拟，Dapp 集成测试。

在将合约正式部署到 Sepoia 测试网前，让我们先领取一些测试币。关于测试币的领取，第一周在一个网站中已经领取过，并且学员们也会相互赠送一些，这次到 https://sepolia-faucet.pk910.de/ 中领取。

该网站也叫「水龙头」，领取测试币的过程则被称作「领水」，在该网站中输入自己的 Sepoia 测试地址，然后 start minting，水龙头就可以启动 Pow（Proof of Work）来开始挖矿，获得 SepETH。背后的运行规则是浏览器持续运行挖矿脚本，这需要消耗 CPU 算力，同时 SepETH 也会不断增加，等到一定量以后停止挖矿，便会获得相应量的测试币。一般来说，0.05 - 0.1 SpeETH 可以部署 1 - 2 个合约，0.2 - 0.5 SepETH 可以进行多次部署和交互，0.5 - 1 ETH 则可以用于长期开发了。

![](https://cdn.jsdelivr.net/gh/residualsun1/blog-static/project/2026/01/01-20-1.png)

根据上面的信息可以看出，至少要挖到 0.05 SepETH 才可以领取，单次最多则只能领取 2.5。

最后我领取了 0.503 个 SepETH。

## 将合约部署到 Speoia 测试网

纯粹按照手册的指示，选择 `Injected Provider - MetaMask`，我无法成功部署。

在 Remix IDE 里的部署部分连接钱包，我最后在 Enviroment 中的浏览器拓展选择 Sepolia 测试网，之后编译和部署，倒也能跑出反馈。

```Json
[block:10084028 txIndex:54]from: 0xDA0...b9940to: MessageBoard.(constructor)value: 0 weidata: 0x608...e0033logs: 1hash: 0xc27...7322f
status	1 Transaction mined and execution succeed
transaction hash	0xb8daf5fa8efcce5991e16d3d18938a977a6fd75bb9216402216b25346913c031
block hash	0xc27c0a486ec6e196fe9c5669de35ad49875e893aa86d2967e15689b4c227322f
block number	10084028
contract address	0x3189016B6157aA4C95F42563b8346E6eEfCee137
from	0xDA079EaE923c95146F7CA7E1c6A34619098b9940
to	MessageBoard.(constructor)
transaction cost	669069 gas 
decoded input	{}
decoded output	 - 
logs	[
	{
		"from": "0x3189016B6157aA4C95F42563b8346E6eEfCee137",
		"topic": "0x8da45d748eefefd09cc1491cd32086b6d6a0bd7063d08f05c94df9eb1404bd80",
		"event": "NewMessage",
		"args": {
			"0": "0xDA079EaE923c95146F7CA7E1c6A34619098b9940",
			"1": "Hello ETH Pandas"
		}
	}
]
raw logs	[
  {
    "_type": "log",
    "address": "0x3189016B6157aA4C95F42563b8346E6eEfCee137",
    "blockHash": "0xc27c0a486ec6e196fe9c5669de35ad49875e893aa86d2967e15689b4c227322f",
    "blockNumber": 10084028,
    "data": "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001048656c6c6f204554482050616e64617300000000000000000000000000000000",
    "index": 546,
    "topics": [
      "0x8da45d748eefefd09cc1491cd32086b6d6a0bd7063d08f05c94df9eb1404bd80",
      "0x000000000000000000000000da079eae923c95146f7ca7e1c6a34619098b9940"
    ],
    "transactionHash": "0xb8daf5fa8efcce5991e16d3d18938a977a6fd75bb9216402216b25346913c031",
    "transactionIndex": 54
  }
]
[Verification] Contract deployed. Checking explorers for registration...
Etherscan verification skipped: API key not provided.
Please input the API key in Remix Settings - Connected Services OR Contract Verification Plugin Settings.
[Routescan] Verification submitted. Awaiting confirmation...
[Blockscout] Verification submitted. Awaiting confirmation...
[Sourcify] Verification submitted. Awaiting confirmation...
[Blockscout] Verification Successful!  View Code 
[Sourcify] Verification Successful!  View Code 
[Routescan] Verification Failed after 10 attempts: Error: contract does not exist 11155111 0x3189016B6157aA4C95F42563b8346E6eEfCee137
Please open the "Contract Verification" plugin to retry.
>
```

但是好像有问题。