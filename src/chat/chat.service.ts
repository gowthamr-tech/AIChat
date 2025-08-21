import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AiService } from 'src/ai/ai.service';
import { ChatCompletionMessageParam } from 'openai/resources';
import { MODE } from 'src/shared/shared.entity';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private ai: AiService,
  ) {}

  async generateResponse(
    sessionId: string,
    messageId: string,
    message: string,
    mode: string,
    onStream?: (partial: string) => void,
  ) {
    //session creation or update
    await this.prisma.session.upsert({
      where: {
        id: sessionId,
      },
      update: {},
      create: { id: sessionId },
    });

    //message save
    await this.prisma.message.create({
      data: { sessionId, role: 'user', content: message },
    });

    //get history latest 5 messages
    const history = await this.prisma.message.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    //Reverse(oldest first)
    const context: ChatCompletionMessageParam[] = history
      .reverse()
      .map((m) => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content,
      }));

    //Call AI
    if (mode == MODE.STREAM) {
      await this.ai.streamChat(context, async (partial) => {
        if (onStream) onStream(partial);
      });
    }
    if (mode == MODE.COMPLETE) return await this.ai.completeChat(context);
  }
}
