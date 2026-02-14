'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type Message = {
    role: 'user' | 'assistant';
    text: string;
};

export default function Home() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input;

        // 显示用户消息
        setMessages((prev) => [...prev, { role: 'user', text: userText }]);
        setInput('');
        setLoading(true);
        setError(null);

        // 添加临时 AI 消息占位
        setMessages((prev) => [...prev, { role: 'assistant', text: '' }]);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'user',
                            parts: [{ type: 'text', text: userText }],
                        },
                    ],
                }),
            });

            if (!res.ok) {
                throw new Error('请求失败');
            }

            const reader = res.body?.getReader();
            if (!reader) {
                throw new Error('响应流不可读');
            }

            let aiText = '';

            // 逐块读取流
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = new TextDecoder().decode(value);
                aiText += chunk;

                // 实时更新 AI 消息
                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = aiText;
                    return newMessages;
                });
            }
        } catch (err: unknown) {
            setError('❌ 出错了，请稍后再试');
            // 移除临时 AI 消息
            setMessages((prev) => prev.slice(0, -1));
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => alert('已复制到剪贴板！'),
            () => alert('复制失败，请手动复制。')
        );
    };

    return (
        <div className="flex flex-col h-screen mx-auto bg-gray-50">
            <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
                🌍 Global EduAgent Hub
            </h1>

            <p className="text-center text-gray-600 mb-6">
                基于智谱开发 · 你的AI学习助手
            </p>

            {/* 聊天区 */}
            <div className="flex-1 overflow-y-auto bg-transparent">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400 mt-10">
                        例如：我想学 Python 入门
                    </div>
                )}

                {messages.map((m, idx) => (
                    <div
                        key={idx}
                        className={`mb-4 flex ${
                            m.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                            className={`max-w-[80%] p-6 rounded-2xl flex items-start justify-between ${
                                m.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            <div className="flex-1">
                                <strong>{m.role === 'user' ? '你：' : 'AI：'}</strong>
                                <div className="mt-2 whitespace-pre-wrap">
                                    <ReactMarkdown>{m.text}</ReactMarkdown>
                                </div>
                            </div>
                            <button
                                onClick={() => copyToClipboard(m.text)}
                                className="ml-2 text-gray-500 hover:text-gray-700 text-sm"
                            >
                                复制
                            </button>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="text-gray-500 italic mt-2">
                        AI 正在思考中……
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-center mt-2">{error}</div>
                )}
            </div>

            {/* 输入区 */}
            <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="例如：我想学 Python 入门"
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50"
                >
                    发送
                </button>
            </form>
        </div>
    );
}