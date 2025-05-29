import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

export interface Coffee {
  nome: string; // obrigatório
  tipo: string; // obrigatório
  quantidade?: number;
  preco?: number;
  id: string; // obrigatório
  descricao?: string;
  tags?: string[];
  date: Date;
}

@Injectable()
export class AppService {
  private convertDate(date: string): Date {
    const [d, m, y] = date.split('/').map(Number);

    return new Date(y, m - 1, d);
  }

  private coffees: Coffee[] = [
    {
      nome: 'Espresso',
      tipo: 'Quente',
      quantidade: 10,
      preco: 5.0,
      id: '1',
      descricao: 'Café forte e encorpado',
      tags: ['forte', 'quente'],
      date: new Date(2025, 4, 1), // 01/05/2025 (mês é 0-based: 4 = maio)
    },
    {
      nome: 'Latte',
      tipo: 'Quente',
      quantidade: 15,
      preco: 6.5,
      id: '2',
      descricao: 'Café com leite cremoso',
      tags: ['cremoso', 'quente'],
      date: new Date(2025, 4, 10), // 10/05/2025
    },
    {
      nome: 'Iced Coffee',
      tipo: 'Gelado',
      quantidade: 8,
      preco: 4.5,
      id: '3',
      descricao: 'Café gelado refrescante',
      tags: ['gelado', 'refrescante'],
      date: new Date(2025, 4, 20), // 20/05/2025
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  findAll(): Coffee[] {
    return this.coffees;
  }

  findCoffee(id: string): Coffee {
    const existsCoffee: Coffee | undefined = this.coffees.find(
      (coffee) => coffee.id === id,
    );

    if (!existsCoffee) {
      throw new NotFoundException(`Café com ID ${id} não encontrado`);
    }

    return existsCoffee;
  }

  createCoffee(coffee: Coffee): { message: string; cafe: Coffee } {
    if (!coffee.id || !coffee.tipo || !coffee.nome) {
      throw new BadRequestException(`ID, NOME e TIPO são obrigatórios`);
    }
    coffee.date = new Date()

    this.coffees.push(coffee);
    return {
      message: 'Café criado com sucesso',
      cafe: coffee,
    };
  }

  findCoffeeByDate(start: string, end: string): Coffee[] {
    const startDate = this.convertDate(start);
    const endDate = this.convertDate(end);

    return this.coffees.filter(
      (coffee) => coffee.date >= startDate && coffee.date <= endDate,
    );
  }
}
