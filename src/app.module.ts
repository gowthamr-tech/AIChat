import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { AiService } from './ai/ai.service';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [ChatModule, PrismaModule, AiModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, AiService],
})
export class AppModule {}
