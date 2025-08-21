import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AiService } from 'src/ai/ai.service';

@Module({
  imports:[PrismaModule],
  providers: [ChatGateway, ChatService,AiService],
})
export class ChatModule {}
