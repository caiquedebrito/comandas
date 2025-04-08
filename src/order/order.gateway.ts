import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin:'*',
  }
})
export class OrderGateway {
  @WebSocketServer() 
  server: Server;

  constructor(
    private readonly orderService: OrderService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      client.data.user = decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const orders = await this.orderService.getOrders();
    this.server.emit('orders', orders);
  }

  @SubscribeMessage('createOrder')
  async handleMessage(@MessageBody() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.createOrder(createOrderDto);
    this.server.emit('order', order);
  }

  @SubscribeMessage('updateOrderStatus')
  async handleUpdateOrderStatus(@MessageBody() data: { orderId: string, status: string }, @ConnectedSocket() client: Socket) {
    const user = client.data.user;

    if (user.type !== 'CHEF') {
      throw new UnauthorizedException('Only chefs can update order status');
    }

    const updatedOrder = await this.orderService.updateOrder(data.orderId, data.status);
    this.server.emit('updateOrderStatus', updatedOrder);
  }
}
