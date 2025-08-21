import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'http';
import { MODE } from 'src/shared/shared.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway({ path: '/ws' })
export class ChatGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody()
    data: CreateChatDto,
    @ConnectedSocket() client: WebSocket,
  ) {
    const { sessionId, messageId, message, mode } = data;
    if (mode == MODE.STREAM) {
      await this.chatService.generateResponse(
        sessionId,
        messageId,
        message,
        mode,
        (partial) => {
          client.send(
            JSON.stringify({
              sessionId,
              messageId,
              response: partial,
            }),
          );
        },
      );
    } else {
      const fullResponse = await this.chatService.generateResponse(
        sessionId,
        messageId,
        message,
        mode,
      );

      client.send(
        JSON.stringify({
          sessionId,
          messageId,
          response: fullResponse,
        }),
      );
    }
  }
}
