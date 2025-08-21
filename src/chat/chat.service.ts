import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AiService } from 'src/ai/ai.service';
import { ChatCompletionMessageParam } from 'openai/resources';

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
    onStream: (partial: string) => void,
  ) {
    await this.prisma.session.upsert({
      where: {
        id: sessionId,
      },
      update: {},
      create: { id: sessionId },
    });

    await this.prisma.message.create({
      data: { sessionId, role: 'user', content: message },
    });

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
    await this.ai.streamChat(context, async (partial) => {
      onStream(partial);
    });
    console.log('message', message, 'sessionid', sessionId);

    //save final AI response
    await this.prisma.session.upsert({
      where: { id: sessionId },
      update: {},
      create: { id: sessionId },
    });

    // setTimeout(()=>2)
    // await this.prisma.message.create({
    //   data: { sessionId, role: 'user', content: message },
    // });

    // await this.prisma.message.create({
    //   data: {
    //     sessionId,
    //     role: 'assistant',
    //     content: '[final response aggregated]',
    //   },
    // });

    await this.prisma.session.upsert({
      where: { id: sessionId },
      update: {},
      create: { id: sessionId }, // add required fields
    });

    // await this.prisma.message.create({
    //   data: { sessionId, role: 'user', content: message },
    // });
  }
}
