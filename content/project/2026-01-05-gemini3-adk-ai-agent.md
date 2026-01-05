---
title: '结合 Gemini3 与 ADK 构建 AI Agent'
author: 黄国政
date: '2026-01-05'
slug: gemini3-adk-ai-agent
categories: []
tags:
  - AI
  - PowerShell
  - 技术折腾
---

<!--more-->

## 正文

让我们先创建一个存放 AI Agent 的文件夹 `Gemini3 pro`，并在 Windows 的终端 PowerShell 中打开。

使用 `uv` （一个 python 包的管理器）来初始化项目文件夹。

```PowerShell
uv init
```

然后添加项目需要的两个库，即 Google 的 ADK 和 JDI。

```PowerShell
uv add google-adk
uv add google-genai
```

接下来需要添加 [Goole AI Studio](https://aistudio.google.com/) 的 API 密钥。

{{% notice warning "说明" %}}
需要说明清楚的是，在参考资料中，关于添加密钥的代码适用于 Mac 终端，而非 Windows。

```PowerShell
export GOOGLE_API_KEY="YOUR_API_KEY"
```

事实上，在运行错误的 Mac 环境下的代码后，我又运行了 `uvx agent-starter-pack create -y --api-key YOUR_GEMINI_API_KEY`，这段代码出现在第一份参考资料中，但并未出现在第二份参考资料里。
{{% /notice %}}

以下是正确的代码。

```PowerShell
$Env:GOOGLE_API_KEY = "YOUR_API_KEY"
```

搞定后，我们还要激活 Python 环境，以创建 ADK 代理的脚手架。

{{% notice warning "说明" %}}
在参考资料中，关于激活 Python 环境的代码同样只适用于 Mac 终端，而非 Windows。

```PowerShell
source .venv/bin/activate
```
{{% /notice %}}

为了适配我们的 Windows 环境，我们需要用新的代码。

```PowerShell
. .\.venv\Scripts\Activate.ps1
```

但是运行以后报错，显示 `在此系统上禁止运行脚本`，此时可以临时允许当前会话运行本地脚本，这需要使用以下命令。

```PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

接下来继续运行 `. .\.venv\Scripts\Activate.ps1` 即可。

随后创建 AI 代理并为其命名。

```PowerShell
adk create my_agent
```

终端会让我们为代理选择模型，由于我们要使用的是 Gemini 3 pro，因此需要选择2。

```PowerShell
Choose a model for the root agent:
1. gemini-2.5-flash
2. Other models (fill later)
Choose model (1, 2): 2

Please see below guide to configure other models:
https://google.github.io/adk-docs/agents/models


Agent created in D:\Project\AI Agent\Gemini3 pro\my_agent:
- .env
- __init__.py
- agent.py
```

现在，我们可以到 Visual Studio Code 中修改相关文件的代码——打开 `Gemini3 pro > my-agent` 中的 `agent.py` 文件，可以看到文件中存在以下代码。

```python
from google.adk.agents.llm_agent import Agent

root_agent = Agent(
    model='<FILL_IN_MODEL>',
    name='root_agent',
    description='A helpful assistant for user questions.',
    instruction='Answer user questions to the best of your knowledge',
)
```

将这些模板代码全部删除，我们需要用到另一些代码代替它们。这部分代码可以在 Agent Development Kit 中的 [Google Search](https://google.github.io/adk-docs/tools/gemini-api/google-search/) 中找到，不过 [GitHub](https://github.com/GoogleCloudPlatform/devrel-demos/blob/main/ai-ml/agent-labs/gemini-3-pro-agent-demo/my_agent/agent.py) 上已经提供了源代码，复制粘贴即可。

```Python
from google.adk.agents import Agent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.adk.tools import google_search
from google.genai import types
import asyncio

# CONFIGURATION
APP_NAME = "simple_search_agent"
USER_ID = "user_default"
SESSION_ID = "session_01"

# AGENT DEFINITION
root_agent = Agent(
    name="search_agent",
    model="gemini-3-pro-preview",
    description="A helpful assistant that can search Google.",
    instruction="""
    You are a helpful assistant with access to Google Search.
    
    If the user asks a question that requires current information or facts, use the 'google_search' tool.
    Always cite your sources implicitly by providing the answer clearly based on the search results.
    """,
    # This is the only tool enabled
    tools=[google_search]
)

# Session and Runner
async def setup_session_and_runner():
    session_service = InMemorySessionService()
    session = await session_service.create_session(app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID)
    runner = Runner(agent=root_agent, app_name=APP_NAME, session_service=session_service)
    return session, runner

# Agent Interaction
async def call_agent_async(query):
    content = types.Content(role='user', parts=[types.Part(text=query)])
    session, runner = await setup_session_and_runner()
    events = runner.run_async(user_id=USER_ID, session_id=SESSION_ID, new_message=content)

    async for event in events:
        if event.is_final_response():
            final_response = event.content.parts[0].text
            print("Agent Response: ", final_response)

if __name__ == "__main__":
    asyncio.run(call_agent_async("what's the latest ai news?"))
```

当然，我们可以在这里对修改的代码进行一些解释。

* 首先，我们要使用的是 gemini 3 pro 而不是 gemini 2.0 flash，因此先用 `gemini-3-pro-preview` 代替 `gemini-2.0-flash`。

* 其次，可以改变指令集（instruction set），即 `instruction="I can answer your questions by searching the internet. Just ask me anything!"` 这部分，改成如下所示，以让 AI agent 通过提供基于搜索结果的清晰答案来明确其引用来源。

  ```python
  instruction="""
  You are a helpful assistant with access to Google Search.
  
  If the user asks a question that requires  current information or facts, use the 'google_search' tool.
  Always cite your sources implicitly by providing the answer clearly based on the search results. 
  """
  ```

* 第三步是在最后一行代码处进行修改，改成如下所示。

  ```python
  if __name__ == "__main__":
      asyncio.run(call_agent_async("what's the latest ai news?"))
  ```

* 最后，我们还需要在第 19 行代码下方导入 `asyncio`，并且保存文件。

  ```python
  import asyncio
  ```

好了，这就是我们用 Gemini 3 pro 构建的基础代理，它拥有访问谷歌搜索的权限。


现在回到终端（PowerShell），然后将 AI Agent 部署到 ADK Web，将代码运行后反馈的网址输入到浏览器中查看

```Python
adk web
```

## 参考资料

1. [Day 3：Gemini 3 + ADK](https://www.notion.so/Day-3-Gemini-3-ADK-2d26fba5a2d380409aaccdd80f3ee1a8)
2. [Build an AI Agent with Gemini 3](https://www.youtube.com/watch?v=9EGtawwvlNs)