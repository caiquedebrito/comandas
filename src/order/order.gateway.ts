import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

const orders: Array<CreateOrderDto> = [];

@WebSocketGateway({
  cors: {
    oringin:'*',
  }
})
export class OrderGateway {
  @WebSocketServer() 
  server: Server;

  // constructor(private readonly orderService: OrderService) {}

  // async handleConnection(client: Socket) {
  //   console.log('client connected');
  // }

  @SubscribeMessage('createOrder')
  handleMessage(@MessageBody() createOrderDto: CreateOrderDto): void {
    console.log('createOrderDto', createOrderDto);
    orders.push(createOrderDto);
    this.server.emit('order', createOrderDto);
  }
}
