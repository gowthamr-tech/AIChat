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
    //Response from AI
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      stream: true,
    });


    console.log("AI Returned Gowtham")
    for await (const res of response) {
      const token = res.choices[0]?.delta?.content || '';
      if (token) {
        onToken(token);
      }
    }
  }

  async completeChat(messages: ChatCompletionMessageParam[]) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        stream: false,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      //   this.logger.error('Error in AI complete chat:', error);
      throw new Error('AI service unavailable');
    }
  }
}
