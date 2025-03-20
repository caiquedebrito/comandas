import { Module } from '@nestjs/common';
import { OrderGateway } from './order/order.gateway';

@Module({
  providers: [OrderGateway],
})
export class AppModule {}
