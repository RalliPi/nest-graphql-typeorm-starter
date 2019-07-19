import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  getHello(): string {
    return "hello app";
  }
}
