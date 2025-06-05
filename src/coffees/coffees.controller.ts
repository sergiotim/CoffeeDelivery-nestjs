import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Coffee } from 'src/app.service';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) { }
    @Get('')
    findAll(): Coffee[] {
        return this.coffeesService.findAll();
    }

    @Get(':id/detalhes')
    findCoffee(@Param('id') id: string): Coffee {
        return this.coffeesService.findCoffee(id);
    }

    @Get('search-date')
    findCoffeeByDate(
        @Query('start_date') startDate: string,
        @Query('end_date') endDate: string,
    ) {
        return this.coffeesService.findCoffeeByDate(startDate, endDate);
    }

    @Post('coffee-create')
    createCoffee(@Body() coffee: Coffee): { message: string; cafe: Coffee } {
        return this.coffeesService.createCoffee(coffee);
    }
}
