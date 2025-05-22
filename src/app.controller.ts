import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService, Coffee } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('coffees')
  findAll():Coffee[]{
    return this.appService.findAll()
  }

  @Get('coffees/:id/detalhes')
  findCoffee(@Param('id') id:string):Coffee{
    return this.appService.findCoffee(id)
  }

  @Post('coffee-create')
  createCoffee(@Body() coffee:Coffee ):{message:string,cafe:Coffee}{
    return this.appService.createCoffee(coffee)
  }

}
