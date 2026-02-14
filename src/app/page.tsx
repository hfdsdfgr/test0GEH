'use client';

import { useState } from 'react';

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

        // 1️⃣ 显示用户消息
        setMessages((prev) => [...prev, { role: 'user', text: userText }]);
        setInput('');
        setLoading(true);
        setError(null);

        try {
            // 2️⃣ 调用后端
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

            const data = await res.json();

            // 3️⃣ 显示 AI 回复
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', text: data.content || '（AI 没有返回内容）' },
            ]);
        } catch (err: any) {
            setError('❌ 出错了，请稍后再试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 bg-gray-50">
            <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
                🌍 Global EduAgent Hub
            </h1>

            <p className="text-center text-gray-600 mb-6">
                国内可用 · AI 学习助手
            </p>

            {/* 聊天区 */}
            <div className="flex-1 overflow-y-auto border rounded-xl p-4 bg-white shadow-sm mb-4">
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
                            className={`max-w-[80%] p-4 rounded-2xl ${
                                m.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            <strong>{m.role === 'user' ? '你：' : 'AI：'}</strong>
                            <div className="mt-2 whitespace-pre-wrap">{m.text}</div>
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