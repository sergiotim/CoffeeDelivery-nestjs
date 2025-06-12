import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('seed')
  seed(){
    this.appService.semearBd()
    return 'BD Semeado'
  }


}
