import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@WebSocketGateway({
  cors: {
    oringin:'*',
  }
})
export class OrderGateway {
  @WebSocketServer() 
  server: Server;

  constructor(private readonly orderService: OrderService) {}

  async handleConnection(client: Socket) {
    console.log('client connected');
    const orders = await this.orderService.getOrders();
    this.server.emit('orders', orders);
  }

  @SubscribeMessage('createOrder')
  async handleMessage(@MessageBody() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.createOrder(createOrderDto);
    this.server.emit('order', order);
  }

  @SubscribeMessage('updateOrderStatus')
  async handleUpdateOrderStatus(@MessageBody() data: { orderId: string, status: string }) {
    const updatedOrder = await this.orderService.updateOrder(data.orderId, data.status);
    this.server.emit('updateOrderStatus', updatedOrder);
  }
}
