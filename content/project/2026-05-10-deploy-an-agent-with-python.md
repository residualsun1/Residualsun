---
title: 使用 Python 快速搭建一个可运行的智能体（Agent）
author: 黄国政
date: '2026-05-10'
slug: deploy-an-agent-with-python
categories: []
tags:
  - Agent
  - Python
---

<!--more-->

{{% notice content "按语" %}}

本文是一次搭建可运行智能体（Agent）的实践尝试。搭建智能体以前，我阅读了介绍智能体的相关文章，可「纸上得来终觉浅，绝知此事要躬行」，我认为要真的理解什么是智能体，必须亲手敲代码搭建并成功运行一次，完成一个完整的流程。在此基础上回过头来再次学习智能体的概念，效果应当会更好。

值得注意的是，正是在搭建智能体与回顾搭建的过程中，种种问题浮现在我眼前：**什么是智能体（Agent）？什么是大语言模型（LLM）？什么是 AI？什么是 API？智能体、大语言模型和 AI 这三者之间又是什么关系**？当然，作为一位非计算机专业学生，除了相关专业术语，我也在其间发现处处需要用到 Python，在缺乏相应基础的情况下——我在 [boot.dev](https://www.boot.dev/dashboard) 中学完了 Python 免费课程的学习，但由于内容太少，所学所得在实战中的感受也是隔靴搔痒——搭建过程磕磕绊绊，我起初竟然不知道教程提供的代码全部写在一份 Python 文件中运行即可。如果不是结合各种大模型的帮助，恐怕过程还要更加挫折。

注：文中的「智能体」即 Agent，「大语言模型」则等同于 LLM。

{{% /notice %}}


## 1.前言

让我们来跟随[教程](https://hello-agents.datawhale.cc/#/./chapter1/%E7%AC%AC%E4%B8%80%E7%AB%A0%20%E5%88%9D%E8%AF%86%E6%99%BA%E8%83%BD%E4%BD%93?id=_13-%e5%8a%a8%e6%89%8b%e4%bd%93%e9%aa%8c%ef%bc%9a5-%e5%88%86%e9%92%9f%e5%ae%9e%e7%8e%b0%e7%ac%ac%e4%b8%80%e4%b8%aa%e6%99%ba%e8%83%bd%e4%bd%93)尝试构建一个可以运行的智能旅行助手 Agent。需要指出的是，本文搭建过程未创建虚拟环境，如需配置虚拟环境，可以参考[此处](https://github.com/datawhalechina/hello-agents/blob/main/Extra-Chapter/Extra07-%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE.md#%E5%9B%9B%E9%A1%B9%E7%9B%AE%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE)。

### 1.1 环境配置

Agent 的搭建过程并不十分困难，需要满足的条件如下：

* Python 3.13.2。
* 代码编辑器软件，推荐使用 VS Code，为答疑解惑，我在 Trae 中结合国产大模型进行搭建。
* Deepseek API，需要花费 5 - 10 元充值。[教程](https://github.com/datawhalechina/hello-agents/blob/main/Extra-Chapter/Extra07-%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE.md#%E4%BA%8Capi-%E9%85%8D%E7%BD%AE)中推荐了免费的 API 配置，但我在实践过程中发现限额不足以试错，故改为充值的 Deepseek API。
* [Tavily Search API](https://app.tavily.com/home)，用于景点推荐功能。

### 1.2 具体需求

正式开始以前，让我们先明确搭建 Agent 的具体需求。

* 可以回应用户的问题：
 > 你好，请帮我查询一下今天北京的天气，然后根据天气推荐一个合适的旅游景点。
* 根据问题，Agent 需要先调用天气查询工具，查询天气状况，以此作为下一步的依据。
* 在下一轮循环中，Agent 调用景点推荐工具，最终提出建议。

## 2.搭建流程

### 2.1 基本 Python 库

在我的 D 盘 `Project` 文件夹中，我创建了子文件夹 `Agent`，本次唯一一份但可运行的 python 文件 `FirstAgenttest.py` 就放在其中。文件目录结构如下：

```ASCII
Project
└── Agent
    └── FirstAgenttest.py
```

进入代码编辑器，打开创建好的 `FirstAgenttest.py` 文件后，在下方的终端界面中下载三种 python 库，分别是 `requests`、`tavily-python` 和 `openai`。

```bash
pip install requests tavily-pthon openai
```

{{% notice warning "注意" %}}
`pip install` 属于 shell （终端）命令，不要在 python 交互式解释器中运行。
{{% /notice %}}

`requests` 是 Python 中最流行的 HTTP 库，它可以在 Python 中发送 HTTP 网络请求（包括 `GET`、`POST`、`PUT`、`DELETE` 等，我们此次将用到 `GET`），进而调用 API。

`tavily-python` 则是 Tavily API 官方的 Python SDK，它可以调用 Tavily 搜索 API，以实时获取网络搜索结果。可以把它理解为专门为 AI 应用设计的搜索 API，它会返回结构化、干净的搜索结果。

`openai` 则是 OpenAI 官方提供的 Python SDK，用于调用 GPT 等大语言模型服务的 API。

下面放一些流程图与表格以便于理解三种库之间的关系。

| 层级 | 库 | 功能 | 依赖关系 |
|------|---|------|---------|
| 应用层 | AI Agent | 整体应用 | 依赖下方所有库 |
| 服务层 | openai | 调用 GPT | 内部使用 requests |
| 服务层 | tavily-python | 搜索互联网 | 内部使用 requests |
| 基础层 | requests | HTTP 请求 | 无依赖 |

```
┌─────────────────────────────────────────────────────┐
│                    AI Agent 应用                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌──────────┐    ┌──────────────┐    ┌─────────┐   │
│   │  openai  │ ←→ │ tavily-python│ ←→ │ requests│   │
│   └──────────┘    └──────────────┘    └─────────┘   │
│        ↓                 ↓                 ↓        │
│   调用 GPT          搜索互联网        基础 HTTP       │
│   生成回答          获取信息          请求工具        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

```
用户提问 → tavily-python 搜索 → openai 处理 → 返回回答
                ↑                      ↑
            requests               requests
           (底层请求)            (底层请求)
```

完成以上步骤后，下面的每一个小节都是 `FirstAgenttest.py` 中需要的代码。我们以小节作为区分，并分别说明不同小节的代码各自发挥什么作用。

### 2.2 指令模板

要让大语言模型真正地跑起来，我们绕不开提示词——有人基于此提出了「提示词工程」（Prompt Engineering）这样的概念。在这里，我们要给智能体（Agent）提供一套提示词，让大语言模型（LLM）知道自己**扮演什么角色**、**具备什么工具**、**如何格式化其思考与行动**等，因此，也可以将这套提示词称为指令模板，它将规定智能体应该如何工作。

{{% notice warning "注意" %}}
如按语所述，这里我们自然而然地引出了大语言模型（LLM）和智能体（Agent）两个概念，那么，两者之间是什么关系？后面提到的 AI 和它们的关系呢？此处我们先按下不表，在完成智能体搭建的实战后，我们从学习与介绍智能体开始进行具体讨论。
{{% /notice %}}

下面这段指令模板代码将作为我们 `FirstAgenttest.py` 文件的一部分内容。

```Python
AGENT_SYSTEM_PROMPT = """
你是一个智能旅行助手。你的任务是分析用户的请求，并使用可用工具一步步地解决问题。

# 可用工具:
- `get_weather(city: str)`: 查询指定城市的实时天气。
- `get_attraction(city: str, weather: str)`: 根据城市和天气搜索推荐的旅游景点。

# 输出格式要求:
你的每次回复必须严格遵循以下格式，包含一对Thought和Action：

Thought: [你的思考过程和下一步计划]
Action: [你要执行的具体行动]

Action的格式必须是以下之一：
1. 调用工具：function_name(arg_name="arg_value")
2. 结束任务：Finish[最终答案]

# 重要提示:
- 每次只输出一对Thought-Action
- Action必须在同一行，不要换行
- 当收集到足够信息可以回答用户问题时，必须使用 Action: Finish[最终答案] 格式结束

请开始吧！
"""

```

下面的多行字符串将赋值给变量 `AGENT_SYSTEM_PROMPT`，这意味着其中的内容——规定了 LLM 的身份、运行工具、输出格式等——会被发送给 LLM，相当于给一份工作手册。

```Python
AGENT_SYSTEM_PROMPT = """
...
"""
```

关于 LLM 身份定义这部分，要求 Agent 先分析用户请求再使用工具解决问题，体现了 ReAct 模式，即 Reasoning + Acting（先思考，再行动）。

`get_weather(city: str)` 规定了参数类型是字符串，这意味着天气的结果汇报会以字符形式呈现，而紧随其后的 `get_attraction(city: str, weather: str)` 规定了需要 `city` 和 `weather` 两个参数，且都为字符，同时也说明 Agent 必须先查询天气再查询景点。

在 ReAct 模式中，`Thought` + `Action` 是一种核心格式，它会强制 Agent 的每次回复都包含**其思考过程**和**决定执行的动作**。这样设计的原因是防止 Agent 随意输出，固定好格式以便于程序对 Agent 返回的结果进行解析。

此外，对 `Action` 进行进一步格式上的限制，一方面确保 Agent 在调用工具的时候继续循环以获取信息，另一方面则是声明 `Finish`，确保任务会结束并将最终答案反馈给用户，而非一直循环下去。

最后的提示其实也是对 Agent 的限制——每次只输出一对 `Thought-Action` 是为了防止代码解析混乱，`Action` 需要在同一行是为了防止正则匹配失败。

### 2.3 工具函数一：查询天气

还记得我们在前面下载的 `requests` 库吗？它的作用是向网络发出请求，进而使用相关搜索工具。这里我们要通过这个 Python 库来使用免费的天气查询服务 [wttr.in](https://wttr.in/)——它会以 JSON 格式返回指定城市的天气数据。

我们将这个工具函数命名为 `get_weather`。

```Python
import requests

def get_weather(city: str) -> str:
    """
    通过调用 wttr.in API 查询真实的天气信息。
    """
    # API端点，我们请求JSON格式的数据
    url = f"https://wttr.in/{city}?format=j1"
    
    try:
        # 发起网络请求
        response = requests.get(url)
        # 检查响应状态码是否为200 (成功)
        response.raise_for_status() 
        # 解析返回的JSON数据
        data = response.json()
        
        # 提取当前天气状况
        current_condition = data['current_condition'][0]
        weather_desc = current_condition['weatherDesc'][0]['value']
        temp_c = current_condition['temp_C']
        
        # 格式化成自然语言返回
        return f"{city}当前天气:{weather_desc}，气温{temp_c}摄氏度"
        
    except requests.exceptions.RequestException as e:
        # 处理网络错误
        return f"错误:查询天气时遇到网络问题 - {e}"
    except (KeyError, IndexError) as e:
        # 处理数据解析错误
        return f"错误:解析天气数据失败，可能是城市名称无效 - {e}"

```
基本流程可以被概括如下：

```
构造URL → 发送请求 → 解析JSON → 提取数据 → 返回自然语言
```

通过 `url`，我们可以构造一个 API 地址，在链接中可以看到 `wttr.in`，它是一个免费的天气 API，在链接前加上 `f` 起到 `f-string`，也就是将 `{city}` 替换为实际城市名的作用，再往后的 `?format=j1` 则是要返回 JSON 格式数据的意思。

构造好 API 后，即可向网址发送相应请求——此处是 `GET` 请求，如果状态码不是 200 就会抛出异常。之后提取天气状况，以 JSON 格式返回，结构大致如下（JSON 格式数据还要转化为自然语言）：

```JSON
{
  "current_condition": [
    {
      "weatherDesc": [{"value": "Sunny"}],
      "temp_C": "28"
    }
  ]
}
```

这个过程中如果存在错误，则返回相应的自然语言提示，包括网络错误和城市名错误。

值得注意的是，这里工具函数返回（`return`）的都是字符串，报错亦然，这意味着不会因为出现异常而中断程序，同时也能让 AI 根据错误的信息字符串进行调整。

### 2.4 工具函数二：搜索及推荐旅游景点

下面是第二个工具函数，用于查询相关景点，我们将它命名为 `get_attraction`。

与第一个工具函数不同，这一工具函数的数据来源并非免费的 API（wttr.in），而是 Tavily 的 API——我们需要前往[官网](https://www.tavily.com/)注册获取 API。此外，由于 `get_attraction` 需要根据天气推荐城市，因此需要包括 `city` 和 `weather` 两个参数。同时，相比于第一种工具函数将数据结构化后返回，第二种工具函数返回的是 AI 总结好的文本。

```Python
import os
from tavily import TavilyClient

def get_attraction(city: str, weather: str) -> str:
    """
    根据城市和天气，使用Tavily Search API搜索并返回优化后的景点推荐。
    """
    # 1. 从环境变量中读取API密钥
    api_key = os.environ.get("TAVILY_API_KEY")
    if not api_key:
        return "错误:未配置TAVILY_API_KEY环境变量。"

    # 2. 初始化Tavily客户端
    tavily = TavilyClient(api_key=api_key)
    
    # 3. 构造一个精确的查询
    query = f"'{city}' 在'{weather}'天气下最值得去的旅游景点推荐及理由"
    
    try:
        # 4. 调用API，include_answer=True会返回一个综合性的回答
        response = tavily.search(query=query, search_depth="basic", include_answer=True)
        
        # 5. Tavily返回的结果已经非常干净，可以直接使用
        # response['answer'] 是一个基于所有搜索结果的总结性回答
        if response.get("answer"):
            return response["answer"]
        
        # 如果没有综合性回答，则格式化原始结果
        formatted_results = []
        for result in response.get("results", []):
            formatted_results.append(f"- {result['title']}: {result['content']}")
        
        if not formatted_results:
             return "抱歉，没有找到相关的旅游景点推荐。"

        return "根据搜索，为您找到以下信息:\n" + "\n".join(formatted_results)

    except Exception as e:
        return f"错误:执行Tavily搜索时出现问题 - {e}"

```

以上流程可以被概括如下：

```
读取API密钥 → 初始化客户端 → 构造查询 → 调用搜索 → 返回结果
```

在返回结果的部分中有两种方向，一种是 AI 综合总结的回答，一种是在缺乏前者的情况下格式化原始搜索结果。

### 2.5 将工具函数写入工具字典

```Python
# 将所有工具函数放入一个字典，方便后续调用
available_tools = {
    "get_weather": get_weather,
    "get_attraction": get_attraction,
}

```

工具字典是 Agent 的工具箱，它的作用是将函数名与函数对象关联起来。

我们在前两步中已经构建好了 `get_weather` 和 `get_attraction` 两种工具函数，后续主循环解析 AI 输出是拿到的是字符串的 `get_weather` 和 `get_attraction`，而非函数本身，但工具字典可以让我们通过字符串找到对应的函数——`available_tools["get_weather"]("北京")`等同于 `get_weather("北京")`。

### 2.6 接入大语言模型（LLM）

这部分可以被理解为 Agent 的大脑接口，它负责与 AI 对话。换句话说，Agent 的自主决策能力来源于 LLM。

现在许多 LLM 服务提供商（如 Azure、Deepseek 等）都遵循与 OpenAI API 相似的接口规范，对开发者而言很是便利。

这里要实现通用的客户端 `OpenAICompatibleClient`，它需要可以连接到任何兼容 OpenAI 接口规范的 LLM 服务。

```Python
from openai import OpenAI

class OpenAICompatibleClient:
    """
    一个用于调用任何兼容OpenAI接口的LLM服务的客户端。
    """
    def __init__(self, model: str, api_key: str, base_url: str):
        self.model = model
        self.client = OpenAI(api_key=api_key, base_url=base_url)

    def generate(self, prompt: str, system_prompt: str) -> str:
        """调用LLM API来生成回应。"""
        print("正在调用大语言模型...")
        try:
            messages = [
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': prompt}
            ]
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                stream=False """不用流式输出，等待完整结果"""
            )
            answer = response.choices[0].message.content
            print("大语言模型响应成功。")
            return answer
        except Exception as e:
            print(f"调用LLM API时发生错误: {e}")
            return "错误:调用语言模型服务时出错。"

```

从初始化部分（`def __init__`）的代码可以看出，我们后续需要提供 `model`（模型名称）、`api_key`（身份验证密钥）和 `base_url`（API 服务地址）的信息。

在构造部分（`def messages`）的代码部分，OpenAI 接口使用了 `messages` 数组来传递对话，具体来说，`system` 指规则/角色设定、系统指令，也就是我们在前面设定好的 LLM 是谁，如何做事，也就是前面出现过的 `AGENT_SYSTEM_PROMPT`，`user` 部分则对应用户输入的对话内容。

在 `resonse` 和 `answer` 设置的情况下， API 的返回结构会如下：

```JSON
{
  "choices": [
    {
      "message": {
        "content": "Thought: ... Action: ..."
      }
    }
  ]
}
```

### 2.7 智能体执行行动循环

最后这部分是 Agent 的核心部分，即 ReAct 循环。

这里我们需要输入前面提到的 `API_KEY`、`MODEL_ID`、`BASE_URL` 和 `TAVILY_API_KEY`。

Tavily 注册过后每人都可以生成自己的 API，不过 LLM 部分会因选择的产商的不同而不同——要选择支持 OpenAI API 接口规范的。

和教程不同，我过去在 [Deepseek API](https://platform.deepseek.com/api_keys) 中充值过 10 元，因此选择了 Deepseek。如果你也选择了 Deepseek，但不知道其 API 的具体调用信息，可以参考[此处](https://api-docs.deepseek.com/zh-cn/)。

```Python
import re

# --- 1. 配置LLM客户端 ---
# 请根据您使用的服务，将这里替换成对应的凭证和地址
API_KEY = "sk-......................"
BASE_URL = "https://api.deepseek.com"
MODEL_ID = "deepseek-v4-flash"
TAVILY_API_KEY="tvly-dev-.............................."
os.environ['TAVILY_API_KEY'] = "tvly-dev-.............................."

llm = OpenAICompatibleClient(
    model=MODEL_ID,
    api_key=API_KEY,
    base_url=BASE_URL
)

# --- 2. 初始化 ---
user_prompt = "你好，请帮我查询一下今天北京的天气，然后根据天气推荐一个合适的旅游景点。"
prompt_history = [f"用户请求: {user_prompt}"]

print(f"用户输入: {user_prompt}\n" + "="*40)

# --- 3. 运行主循环 ---
for i in range(5): # 设置最大循环次数
    print(f"--- 循环 {i+1} ---\n")
    
    # 3.1. 构建Prompt
    full_prompt = "\n".join(prompt_history)
    
    # 3.2. 调用LLM进行思考
    llm_output = llm.generate(full_prompt, system_prompt=AGENT_SYSTEM_PROMPT)
    # 模型可能会输出多余的Thought-Action，需要截断
    match = re.search(r'(Thought:.*?Action:.*?)(?=\n\s*(?:Thought:|Action:|Observation:)|\Z)', llm_output, re.DOTALL)
    if match:
        truncated = match.group(1).strip()
        if truncated != llm_output.strip():
            llm_output = truncated
            print("已截断多余的 Thought-Action 对")
    print(f"模型输出:\n{llm_output}\n")
    prompt_history.append(llm_output)
    
    # 3.3. 解析并执行行动
    action_match = re.search(r"Action: (.*)", llm_output, re.DOTALL)
    if not action_match:
        observation = "错误: 未能解析到 Action 字段。请确保你的回复严格遵循 'Thought: ... Action: ...' 的格式。"
        observation_str = f"Observation: {observation}"
        print(f"{observation_str}\n" + "="*40)
        prompt_history.append(observation_str)
        continue
    action_str = action_match.group(1).strip()

    if action_str.startswith("Finish"):
        final_answer = re.match(r"Finish\[(.*)\]", action_str).group(1)
        print(f"任务完成，最终答案: {final_answer}")
        break
    
    tool_name = re.search(r"(\w+)\(", action_str).group(1)   # 提取函数名
    args_str = re.search(r"\((.*)\)", action_str).group(1)   # 提取参数部分
    kwargs = dict(re.findall(r'(\w+)="([^"]*)"', args_str))   # 解析参数键值对

    if tool_name in available_tools:
        observation = available_tools[tool_name](**kwargs)
    else:
        observation = f"错误:未定义的工具 '{tool_name}'"

    # 3.4. 记录观察结果
    observation_str = f"Observation: {observation}"
    print(f"{observation_str}\n" + "="*40)
    prompt_history.append(observation_str)

```

简化一下上面的流程，如下所示：

```

┌─────────────────────────────────┐
│  初始化：用户问题 + 历史记录       │
└─────────────┬───────────────────┘
              ▼
┌─────────────────────────────────┐
│  循环开始（最多5次）              │
│                                 │
│  3.1 构建Prompt（拼接历史）       │
│  3.2 调用LLM → 得到Thought+Action│
│  3.3 解析Action                  │
│      ├─ Finish → 输出答案，结束   │
│      ├─ 调用工具 → 得到Observation│
│      └─ 格式错误 → 报错，继续     │
│  3.4 记录Observation到历史       │
│                                 │
│  → 回到循环开始                  │
└─────────────────────────────────┘

```

在初始化部分，`prompt_history` 是对话记忆，它用于记录 LLM 的思考过程，循环以后都会把完整历史发送给 AI，让 AI 知道之前做了什么。

来到运行主循环部分，`full_prompt = "\n".join(prompt_history)` 主要是把历史记录用换行符拼接成一段完整的文本。

值得注意的是，AI 有时会一次性输出多对 `Thought-Action`，但是正则表达式只取第一对，因此需要截断多余的部分。

解析 `Action` 时，主要用正则从 AI 输出中提取 `Action:` 后面的内容，如果找不到则说明 AI 没按格式输出。

只要 AI 输出 `Finish[...文本...]`,并且提取方括号里的文本内容，工作循环便结束了。

在关于循环结束设置的代码之后，是解析工具的调用，先是提取函数名，接着是提取参数部分，最后是解析参数键值对。举一个例子，如果 AI 输出了 get_weather(city="北京")，那么依次解析的状况如下：

* `tool_name` → `"get_weather"`
* `args_str` → `'city="北京"'`
* `kwargs` → `{"city": "北京"}`

值得一提的是，`**kwargs` 是 Python 的解包语法：`available_tools["get_weather"](**{"city": "北京"})` 等同于 `get_weather(city="北京")`。

最后是关于记录观察结果部分，这部分把工具返回的结果追加到历史记录，如此，下次循环 AI 就能看到这次的结果。

## 3.运行结果

下面是我在 VS Code 的终端中成功运行得到的结果，呈现了一个完整的 ReAct Agent 工作流：`思考 → 行动 → 观察 → 再思考`，循环往复直到解决问题。

```bash
用户输入: 你好，请帮我查询一下今天北京的天气，然后根据天气推荐一个合适的旅游景点。
========================================
--- 循环 1 ---

正在调用大语言模型...
大语言模型响应成功。
模型输出:
Thought: 用户需要查询北京今天的天气，然后根据天气推荐景点。首先调用get_weather("北京")获取天气信息。
Action: get_weather(city="北京")

Observation: 北京当前天气:Sunny，气温31摄氏度
========================================
--- 循环 2 ---

正在调用大语言模型...
大语言模型响应成功。
已截断多余的 Thought-Action 对
模型输出:
Thought: 获取到北京天气为晴天，现在根据天气查询推荐景点。
Action: get_attraction(city="北京", weather="Sunny")

Observation: On sunny days in Beijing, visit the Summer Palace and the Forbidden City for their beautiful architecture and historical significance. The Great Wall at Mutianyu offers a less crowded, scenic experience. These spots are perfect for sunny weather.
========================================
--- 循环 3 ---

正在调用大语言模型...
大语言模型响应成功。
模型输出:
Thought: 已经获取到北京天气和推荐景点，可以回答用户了。
Action: Finish[今天北京天气晴朗，气温31摄氏度，推荐您去颐和园、故宫或慕田峪长城，这些景点在晴天下非常适合游览。]

任务完成，最终答案: 今天北京天气晴朗，气温31摄氏度，推荐您去颐和园、故宫或慕田峪长城，这些景点在晴天下非常适合游览。
```

但在使用教程推荐的 [AIHubmix API](https://aihubmix.com/?aff=Igcn/) 时，根据大模型对报错信息的分析反馈，我由于免费限额不足而无法成功运行 Agent 的整个工作流程。

```bash
Sorry, to prevent abuse of free resources, accounts that have not been recharged can only try 10 times. You can increase the free quota after recharging; https://console.aihubmix.com/topup
```

总的来说，我们在这里成功运行智能旅行助手的代码，并初步分析和理解基于工具调用的智能体（Agent）的代码结构和实现原理。当然，这还是不够的，我们还可以在此基础上做出以下拓展：

1. 尝试修改 System Prompt 观察效果
2. 添加新的工具函数
3. 实现更复杂的 Agent 逻辑

## 4.完整代码示例

<details>

<summary>查看完整代码</summary>

```Python
##############
# 指令模板部分 #
##############

AGENT_SYSTEM_PROMPT = """
你是一个智能旅行助手。你的任务是分析用户的请求，并使用可用工具一步步地解决问题。

# 可用工具:
- `get_weather(city: str)`: 查询指定城市的实时天气。
- `get_attraction(city: str, weather: str)`: 根据城市和天气搜索推荐的旅游景点。

# 输出格式要求:
你的每次回复必须严格遵循以下格式，包含一对Thought和Action：

Thought: [你的思考过程和下一步计划]
Action: [你要执行的具体行动]

Action的格式必须是以下之一：
1. 调用工具：function_name(arg_name="arg_value")
2. 结束任务：Finish[最终答案]

# 重要提示:
- 每次只输出一对Thought-Action
- Action必须在同一行，不要换行
- 当收集到足够信息可以回答用户问题时，必须使用 Action: Finish[最终答案] 格式结束

请开始吧！
"""

##############
# 天气查询部分 #
##############

import requests

def get_weather(city: str) -> str:
    """
    通过调用 wttr.in API 查询真实的天气信息。
    """
    # API端点，我们请求JSON格式的数据
    url = f"https://wttr.in/{city}?format=j1"
    
    try:
        # 发起网络请求
        response = requests.get(url)
        # 检查响应状态码是否为200 (成功)
        response.raise_for_status() 
        # 解析返回的JSON数据
        data = response.json()
        
        # 提取当前天气状况
        current_condition = data['current_condition'][0]
        weather_desc = current_condition['weatherDesc'][0]['value']
        temp_c = current_condition['temp_C']
        
        # 格式化成自然语言返回
        return f"{city}当前天气:{weather_desc}，气温{temp_c}摄氏度"
        
    except requests.exceptions.RequestException as e:
        # 处理网络错误
        return f"错误:查询天气时遇到网络问题 - {e}"
    except (KeyError, IndexError) as e:
        # 处理数据解析错误
        return f"错误:解析天气数据失败，可能是城市名称无效 - {e}"

##############
# 景点查询部分 #
##############

import os
from tavily import TavilyClient

def get_attraction(city: str, weather: str) -> str:
    """
    根据城市和天气，使用Tavily Search API搜索并返回优化后的景点推荐。
    """
    # 1. 从环境变量中读取API密钥
    api_key = os.environ.get("TAVILY_API_KEY")
    if not api_key:
        return "错误:未配置TAVILY_API_KEY环境变量。"

    # 2. 初始化Tavily客户端
    tavily = TavilyClient(api_key=api_key)
    
    # 3. 构造一个精确的查询
    query = f"'{city}' 在'{weather}'天气下最值得去的旅游景点推荐及理由"
    
    try:
        # 4. 调用API，include_answer=True会返回一个综合性的回答
        response = tavily.search(query=query, search_depth="basic", include_answer=True)
        
        # 5. Tavily返回的结果已经非常干净，可以直接使用
        # response['answer'] 是一个基于所有搜索结果的总结性回答
        if response.get("answer"):
            return response["answer"]
        
        # 如果没有综合性回答，则格式化原始结果
        formatted_results = []
        for result in response.get("results", []):
            formatted_results.append(f"- {result['title']}: {result['content']}")
        
        if not formatted_results:
             return "抱歉，没有找到相关的旅游景点推荐。"

        return "根据搜索，为您找到以下信息:\n" + "\n".join(formatted_results)

    except Exception as e:
        return f"错误:执行Tavily搜索时出现问题 - {e}"

###################
# 将工具函数放入字典 #
###################

available_tools = {
  "get_weather": get_weather,
  "get_attraction": get_attraction,
}

################
# 接入大语言模型 #
################

from openai import OpenAI

class OpenAICompatibleClient:
    """
    一个用于调用任何兼容OpenAI接口的LLM服务的客户端。
    """
    def __init__(self, model: str, api_key: str, base_url: str):
        self.model = model
        self.client = OpenAI(api_key=api_key, base_url=base_url)

    def generate(self, prompt: str, system_prompt: str) -> str:
        """调用LLM API来生成回应。"""
        print("正在调用大语言模型...")
        try:
            messages = [
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': prompt}
            ]
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                stream=False
            )
            answer = response.choices[0].message.content
            print("大语言模型响应成功。")
            return answer
        except Exception as e:
            print(f"调用LLM API时发生错误: {e}")
            return "错误:调用语言模型服务时出错。"

##############
# 执行行动循环 #
##############

import re

# --- 1. 配置LLM客户端 ---
# 请根据您使用的服务，将这里替换成对应的凭证和地址
API_KEY = "sk-......................"
BASE_URL = "https://api.deepseek.com"
MODEL_ID = "deepseek-v4-flash"
TAVILY_API_KEY="tvly-dev-.............................."
os.environ['TAVILY_API_KEY'] = "tvly-dev-.............................."

llm = OpenAICompatibleClient(
    model=MODEL_ID,
    api_key=API_KEY,
    base_url=BASE_URL
)

# --- 2. 初始化 ---
user_prompt = "你好，请帮我查询一下今天北京的天气，然后根据天气推荐一个合适的旅游景点。"
prompt_history = [f"用户请求: {user_prompt}"]

print(f"用户输入: {user_prompt}\n" + "="*40)

# --- 3. 运行主循环 ---
for i in range(5): # 设置最大循环次数
    print(f"--- 循环 {i+1} ---\n")
    
    # 3.1. 构建Prompt
    full_prompt = "\n".join(prompt_history)
    
    # 3.2. 调用LLM进行思考
    llm_output = llm.generate(full_prompt, system_prompt=AGENT_SYSTEM_PROMPT)
    # 模型可能会输出多余的Thought-Action，需要截断
    match = re.search(r'(Thought:.*?Action:.*?)(?=\n\s*(?:Thought:|Action:|Observation:)|\Z)', llm_output, re.DOTALL)
    if match:
        truncated = match.group(1).strip()
        if truncated != llm_output.strip():
            llm_output = truncated
            print("已截断多余的 Thought-Action 对")
    print(f"模型输出:\n{llm_output}\n")
    prompt_history.append(llm_output)
    
    # 3.3. 解析并执行行动
    action_match = re.search(r"Action: (.*)", llm_output, re.DOTALL)
    if not action_match:
        observation = "错误: 未能解析到 Action 字段。请确保你的回复严格遵循 'Thought: ... Action: ...' 的格式。"
        observation_str = f"Observation: {observation}"
        print(f"{observation_str}\n" + "="*40)
        prompt_history.append(observation_str)
        continue
    action_str = action_match.group(1).strip()

    if action_str.startswith("Finish"):
        final_answer = re.match(r"Finish\[(.*)\]", action_str).group(1)
        print(f"任务完成，最终答案: {final_answer}")
        break
    
    tool_name = re.search(r"(\w+)\(", action_str).group(1)
    args_str = re.search(r"\((.*)\)", action_str).group(1)
    kwargs = dict(re.findall(r'(\w+)="([^"]*)"', args_str))

    if tool_name in available_tools:
        observation = available_tools[tool_name](**kwargs)
    else:
        observation = f"错误:未定义的工具 '{tool_name}'"

    # 3.4. 记录观察结果
    observation_str = f"Observation: {observation}"
    print(f"{observation_str}\n" + "="*40)
    prompt_history.append(observation_str)

```

</details>
