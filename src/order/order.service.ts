import { Injectable } from "@nestjs/common";

@Injectable()
export class OrderService {
  async createOrder(table: number, description: string, status: string) {
    console.log("creating order...");
  }

  async updateOrder() {
    console.log("updating order...");
  }

  async deleteOrder() {
    console.log("deleting order...");
  }
}
