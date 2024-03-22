import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { UserService } from './user.service';


@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class UserGateway {
    constructor(private userService: UserService) {}
    server: Server;


    async handleConnection(client: any) {
      const userId = await client.handshake.query?.userId;
      this.userService.clients[userId] = { socketId: client.id };
      client.emit('ok', 'Successfully connected to the server.');
      console.log(`User ${userId} connected with socket ID ${client.id}`);
    }

    async handleDisconnect(client: any) {
      for (const key in this.userService.clients) {
        if (this.userService.clients[key].socketId === client.id) {
          console.log(`Client with id ${key} disconnected.`);
          await delete this.userService.clients[key];
        }
      }
    }
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
      return 'Hello world!';
    }

    getSocketId(userId: number): string {
      return this.userService.clients[userId] === undefined
        ? null
        : this.userService.clients[userId].socketId;
    }
}
