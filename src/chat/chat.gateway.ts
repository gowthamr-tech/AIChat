import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'http';

@WebSocketGateway({path:'/ws'})
export class ChatGateway {
  @WebSocketServer() server:Server;
  constructor(private readonly chatService: ChatService) {}


  @SubscribeMessage('message')
  async handleMessage(@MessageBody()data:{sessionId:string,messageId:string,message:string},@ConnectedSocket()client:WebSocket){
          const {sessionId,messageId,message}=data;
          console.log("Entered",data)
          await this.chatService.generateResponse(sessionId,messageId,message,(partial)=>{
              client.send(JSON.stringify({
                sessionId,
                messageId,
                response:partial,
              }))
          })
  }
}
