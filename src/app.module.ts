import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AiService } from './ai/ai.service';
import { AiModule } from './ai/ai.module';
import { ConversationService } from './conversation/conversation.service';

@Module({
  imports: [ChatModule, PrismaModule, AiModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService, AiService, ConversationService],
})
export class AppModule {}
