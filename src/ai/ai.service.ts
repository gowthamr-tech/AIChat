    import { Injectable } from '@nestjs/common';
    import OpenAI from 'openai';
    import { ChatCompletionMessageParam } from 'openai/resources';
    import * as dotenv from 'dotenv';
    dotenv.config();
    @Injectable()
    export class AiService {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async streamChat(
        messages: ChatCompletionMessageParam[],
        onToken: (partial: string) => void,
    ) {
        const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        stream: true,
        });
        let fullResponse = '';
        for await (const res of response) {
        const token = res.choices[0]?.delta?.content || '';
        fullResponse += token;
        //   if (token) {
        //     onToken(token);
        //   }
        }
        console.log('Full Response of AI Bot', fullResponse);
        return fullResponse;
    }
    }
