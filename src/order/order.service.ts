import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(createOrder: CreateOrderDto) {
    this.prismaService.order.create({
      data: {
        table: createOrder.table,
        description: createOrder.description,
        employee: {
          connect: {
            id: createOrder.employeeId,
          },
        },
      },
    })
  }

  async updateOrder() {
    console.log("updating order...");
  }

  async deleteOrder() {
    console.log("deleting order...");
  }
}
