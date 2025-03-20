import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  async register(login: string, password: string, type: string) {
    console.log("registering user...");
  }

  async login(login: string, password: string) {
    if (login === 'user@example.com' && password === 'password') {
      const payload = { login };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new Error('Credenciais inválidas');
  }
}