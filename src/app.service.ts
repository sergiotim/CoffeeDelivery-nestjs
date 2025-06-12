import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async semearBd() {
    console.log('🌱 Iniciando a semeadura...');

    // Criar cliente
    const cliente = await this.prisma.client.create({
      data: {
        nome: 'Ana Souza',
        email: 'ana@email.com',
        cpf: '12345678900',
        telefone: '11999999999',
      },
    });

    // Criar cafés
    const cafe1 = await this.prisma.coffee.create({
      data: {
        nome: 'Expresso',
        tipo: 'Forte',
        precoUnitario: 8.5,
        descricao: 'Café expresso forte e encorpado.',
        tags: ['forte', 'expresso'],
      },
    });

    const cafe2 = await this.prisma.coffee.create({
      data: {
        nome: 'Capuccino',
        tipo: 'Suave',
        precoUnitario: 9.0,
        descricao: 'Capuccino cremoso com canela.',
        tags: ['suave', 'capuccino', 'canela'],
      },
    });

    // Criar pedido
    const pedido = await this.prisma.order.create({
      data: {
        clienteId: cliente.id,
        dataPedido: new Date(),
        total: cafe1.precoUnitario * 2 + cafe2.precoUnitario,
      },
    });

    // Criar itens do pedido
    await this.prisma.itemOrder.createMany({
      data: [
        {
          pedidoId: pedido.id,
          cafeId: cafe1.id,
          quantidade: 2,
          precoUnitario: cafe1.precoUnitario,
        },
        {
          pedidoId: pedido.id,
          cafeId: cafe2.id,
          quantidade: 1,
          precoUnitario: cafe2.precoUnitario,
        },
      ],
    });

    // Criar entrega
    await this.prisma.delivery.create({
      data: {
        pedidoId: pedido.id,
        endereco: 'Rua dos Sabores, 123',
        status: 'PENDENTE',
        dataPrevistaEntrega: new Date(Date.now() + 3 * 86400000),
      },
    });

    console.log('✅ Banco de dados semeado com sucesso!');
  }



  getHello(): string {
    return 'Hello World!';
  }
}
