import { Module } from "@nestjs/common";
import { OrderGateway } from "./order.gateway";
import { PrismaService } from "src/prisma.service";
import { OrderService } from "./order.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule],
  providers: [OrderGateway, PrismaService, OrderService],
})
export class OrderModule {}