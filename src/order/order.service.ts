import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderStatus } from "@prisma/client";

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrders() {
    try {
      const orders = await this.prismaService.order.findMany({
        include: {
          employee: true,
        },
      });

      return orders;
    } catch (error) {
      console.log(error);
    }
  }

  async createOrder(createOrder: CreateOrderDto) {
    try {
      const employee = await this.prismaService.employee.findUnique({
        where: {
          id: createOrder.employeeId,
        },
      });

      if (!employee) {
        throw new Error("Employee not found");
      }

      const newOrder = await this.prismaService.order.create({
        data: {
          table: createOrder.table,
          description: createOrder.description,
          employee: {
            connect: {
              id: createOrder.employeeId,
            },
          },
        },
      });

      return newOrder;
    } catch (error) {
      console.log(error);
    }
  }

  async updateOrder(orderId: string, status: string) {
    try {
      const order = await this.prismaService.order.findUnique({
        where: {
          id: orderId,
        },
      });
  
      if (!order) {
        throw new Error("Order not found");
      }
  
      const updatedOrdder = await this.prismaService.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: OrderStatus[status],
        },
      });
  
      return updatedOrdder;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOrder() {
    console.log("deleting order...");
  }
}
