import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OrderModule } from './order/order.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [OrderModule, EmployeeModule],
  providers: [PrismaService],
})
export class AppModule {}
