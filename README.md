# Global EduAgent Hub

**An AI Educational Assistant Powered by Zhipu GLM**

A clean, modern, and practical AI learning companion with real-time streaming responses, Markdown rendering, and a sleek Grok-style input box.

---

## ✨ Features

- Real-time streaming output (word-by-word like Grok/ChatGPT)
- Full Markdown support (headings, lists, bold, code, etc.)
- One-click copy button for AI responses
- Modern Grok-style input box with embedded send arrow
- Clean transparent chat interface
- Fully functional with Chinese model (Zhipu GLM-4-Flash)

---

## 🚀 Quick Start

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/global-eduagent-hub.git
   cd global-eduagent-hub

Install dependenciesBashnpm install
Create environment file
Create .env.local in the root directory and add:envZHIPU_API_KEY=your_zhipu_api_key_here
Run the development serverBashnpm run dev
Open http://localhost:3000


🛠 Tech Stack

Framework: Next.js 14 (App Router)
AI Model: Zhipu GLM-4-Flash (via ZhipuAI SDK)
Styling: Tailwind CSS
Markdown: react-markdown
Icons: react-icons


📁 Project Structure
textglobal-eduagent-hub/
├── src/app/
│   ├── page.tsx                 # Main chat interface
│   └── api/chat/route.ts        # API route (ZhipuAI integration)
├── .env.local                   # Environment variables (not committed)
├── package.json
└── README.md

Made with ❤️ for learners worldwide





Global EduAgent Hub
一个基于智谱 GLM 的 AI 教育助手
一个简洁、美观、实用的 AI 学习工具，支持实时流式输出、Markdown 渲染，并采用类似 Grok 的现代输入框设计。

✨ 主要功能

实时流式输出（逐字显示，像 Grok/ChatGPT 一样自然）
完整 Markdown 支持（标题、列表、粗体、代码等）
一键复制 AI 回复内容
Grok 风格圆角输入框 + 嵌入式发送箭头
全透明极简聊天界面
国内直接可用（基于智谱 GLM-4-Flash）


🚀 快速开始

克隆项目Bashgit clone https://github.com/yourusername/global-eduagent-hub.git
cd global-eduagent-hub
安装依赖Bashnpm install
配置环境变量
在项目根目录创建 .env.local 文件，内容如下：envZHIPU_API_KEY=你的智谱API密钥
启动开发服务器Bashnpm run dev
浏览器打开 http://localhost:3000


🛠 技术栈

前端框架：Next.js 14 (App Router)
AI 模型：智谱 GLM-4-Flash（通过 ZhipuAI SDK）
样式：Tailwind CSS
Markdown 渲染：react-markdown
图标库：react-icons


📁 项目结构
textglobal-eduagent-hub/
├── src/app/
│   ├── page.tsx                 # 主聊天界面
│   └── api/chat/route.ts        # API 路由（调用智谱AI）
├── .env.local                   # 环境变量（请勿提交到 GitHub）
├── package.json
└── README.md

Made with ❤️ 为学习者而生
欢迎 Star ⭐ 和 Fork！