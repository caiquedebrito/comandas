import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterEmployeeDto } from "./dto/register-employee.dto";
import { EmployeeService } from "./employee.service";

@Controller("employee")
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post("login")
  login(@Body() loginDto: LoginDto) {
    this.employeeService.login(loginDto.login, loginDto.password);
  }

  @Post("register")
  register(@Body() registerEmployeeDto: RegisterEmployeeDto) {
    console.log("register:", registerEmployeeDto);
    this.employeeService.register(registerEmployeeDto.name, registerEmployeeDto.login, registerEmployeeDto.password,);
  }
}