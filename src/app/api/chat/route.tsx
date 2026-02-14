import { NextResponse } from 'next/server';
import { ZhipuAI } from 'zhipuai';

export const runtime = 'nodejs';

const client = new ZhipuAI({
    apiKey: process.env.ZHIPU_API_KEY,
});

type RequestBody = {
    messages: {
        role: string;
        parts?: { type: string; text?: string }[];
    }[];
};

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as RequestBody;

        const lastUserMessage =
            body.messages?.[body.messages.length - 1]?.parts?.[0]?.text ?? '';

        const systemPrompt = `
你是 Global EduAgent Hub 的 AI 教育助手。
请用中文、循序渐进地教学。

回复结构：
1. 【学习目标】
2. 【核心知识讲解】
3. 【学习建议】
4. 【一个小测验】

现在用户想学：${lastUserMessage}
    `;

        const response = await client.chat.completions.create({
            model: 'glm-4-flash',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: lastUserMessage },
            ],
            stream: true,  // 启用流式
        });

        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of response) {
                    const content = chunk.choices[0]?.delta?.content || '';
                    if (content) {
                        controller.enqueue(new TextEncoder().encode(content));
                    }
                }
                controller.close();
            },
        });

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/plain',
                'Transfer-Encoding': 'chunked',
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Zhipu error:', err.message);
            return NextResponse.json(
                { error: err.message },
                { status: 500 }
            );
        }

        console.error('Unknown error:', err);
        return NextResponse.json(
            { error: '未知服务器错误' },
            { status: 500 }
        );
    }
}