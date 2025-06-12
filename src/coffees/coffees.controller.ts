import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { identity, retry } from 'rxjs';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) { }
    @Post('coffee-create')
    createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeesService.createCoffee(createCoffeeDto);
    }
    @Get('')
    findAll() {
        return this.coffeesService.findAll();
    }

    @Get(':id/order')
    findOrdersByCoffeeId(@Param('id') id: string) {
        return this.coffeesService.findOrdersByCoffeeId(+id)

    }

    @Get('plus-order-coffee')
    findTop3CoffeesBySales(@Query('name') name?: string, @Query('type') type?: string) {
        return this.coffeesService.findTop3CoffeesBySales({name,type})
    }

    @Delete(":id")
    deleteCoffee(@Param('id') coffeeId:string){
        return this.coffeesService.deleteCoffee(+coffeeId)
    }


    // @Get(':id/detalhes')
    // findCoffee(@Param('id') id: string): Coffee {
    //     return this.coffeesService.findCoffee(id);
    // }

    // @Get('search-date')
    // findCoffeeByDate(
    //     @Query('start_date') startDate: string,
    //     @Query('end_date') endDate: string,
    // ) {
    //     return this.coffeesService.findCoffeeByDate(startDate, endDate);
    // }

}
