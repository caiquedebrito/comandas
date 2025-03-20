import { Controller, Get, Post, Request } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("login")
  login(@Request() loginDto: LoginDto) {
    return "logged in";
  }

  @Post("register")
  register(@Request() registerUserDto: RegisterUserDto) {
    this.userService.register(registerUserDto.login, registerUserDto.password, registerUserDto.type);
  }
}