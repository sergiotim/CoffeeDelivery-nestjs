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
}

@Injectable()
export class AppService {
  private coffees: Coffee[] = [
    {
      nome: 'Espresso',
      tipo: 'Quente',
      quantidade: 10,
      preco: 5.0,
      id: '1',
      descricao: 'Café forte e encorpado',
      tags: ['forte', 'quente'],
    },
    {
      nome: 'Latte',
      tipo: 'Quente',
      quantidade: 15,
      preco: 6.5,
      id: '2',
      descricao: 'Café com leite cremoso',
      tags: ['cremoso', 'quente'],
    },
    {
      nome: 'Iced Coffee',
      tipo: 'Gelado',
      quantidade: 8,
      preco: 4.5,
      id: '3',
      descricao: 'Café gelado refrescante',
      tags: ['gelado', 'refrescante'],
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

  createCoffee(coffee: Coffee): {message:string,cafe:Coffee}{
    if (
      coffee.id === undefined ||
      coffee.tipo === undefined ||
      coffee.nome === undefined
    ) {
      throw new BadRequestException(`ID, NOME e TIPO são obrigatórios`);
    }

    this.coffees.push(coffee);
    return {
      message : "Café criado com sucesso",
      cafe : coffee 
    }
      
  }
}
