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
  getHello(): string {
    return 'Hello World!';
  }
}
