import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from 'generated/prisma';
import { time } from 'console';

@Injectable()
export class CoffeesService {

    constructor(private prisma: PrismaService) { }

    private convertDate(date: string): Date {
        const [d, m, y] = date.split('/').map(Number);

        return new Date(y, m - 1, d);
    }

    createCoffee(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
        return this.prisma.coffee.create({
            data: createCoffeeDto
        })
    }

    findAll() {
        return this.prisma.coffee.findMany({
            select: {
                id: true,
                nome: true,
                tags: true

            }
        });
    }

    findOrdersByCoffeeId(coffeeId: number) {
        return this.prisma.itemOrder.findMany({
            where: { cafeId: coffeeId },
            select: {
                quantidade: true,
                precoUnitario: true,
                cafe: {
                    select: {
                        id: true,
                        nome: true,
                        tags: true
                    }
                }

            }
        })
    }


    async findTop3CoffeesBySales(filter: { name?: string, type?: string }) {
        return await this.prisma.itemOrder.groupBy({
            by: ['cafeId'],
            _sum: {
                quantidade: true
            },
            where:{
                cafe:{
                    nome: filter.name,
                    tipo: filter.type
                }
            },
            orderBy:{
                _sum:{
                    quantidade:'desc'
                }
            },
            
            take:3,
            
        })
        
    }


    async deleteCoffee(coffeeId:number){

        await this.prisma.itemOrder.deleteMany({
            where:{
                cafeId:coffeeId
            }
        })

        return this.prisma.coffee.delete({
            where:{
                id:coffeeId
            }
        })
    }

    // findCoffee(id: string): Coffee {
    //     const existsCoffee: Coffee | undefined = this.coffees.find(
    //         (coffee) => coffee.id === id,
    //     );

    //     if (!existsCoffee) {
    //         throw new NotFoundException(`Café com ID ${id} não encontrado`);
    //     }

    //     return existsCoffee;
    // }


    // findCoffeeByDate(start: string, end: string): Coffee[] {
    //     const startDate: Date | undefined = start ? this.convertDate(start) : undefined;
    //     const endDate: Date | undefined = end ? this.convertDate(end) : undefined;

    //     return this.coffees.filter((coffee) => {
    //         if (startDate && endDate) {
    //             return coffee.date >= startDate && coffee.date <= endDate;
    //         }

    //         if (startDate) {
    //             return coffee.date >= startDate;
    //         }

    //         if (endDate) {
    //             return coffee.date <= endDate;
    //         }

    //         return false;
    //     });
    // }

}
