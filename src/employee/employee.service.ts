import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EmployeeService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

  async register(name: string, login: string, password: string) {
    return this.prismaService.employee.create({
      data: {
        name,
        login,
        password,
      },
    });
  }

  async login(login: string, password: string) {
    try {
      const employee = await this.prismaService.employee.findUnique({
        where: {
          login,
        },
      });
      
      if (!employee) {
        throw new Error('Credenciais inválidas');
      }
  
      if (employee.password !== password) {
        throw new Error('Credenciais inválidas');
      }
  
      const payload = { sub: employee.id, type: employee.type };
      const access_token = await this.jwtService.signAsync(payload);
      
      return {
        access_token,
        employee: {
          id: employee.id,
          name: employee.name,
          login: employee.login,
          type: employee.type,
        }
      };
    } catch (error) {
      console.log(error);
    }
  }
}