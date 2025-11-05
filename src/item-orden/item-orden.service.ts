import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemOrdenDto } from './dto/create-item-orden.dto';
import { UpdateItemOrdenDto } from './dto/update-item-orden.dto';
import { ItemOrden } from './entities/item-orden.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemsDto } from 'src/peritaje/dto/create-peritaje.dto';
import { Peritaje } from 'src/peritaje/entities/peritaje.entity';

@Injectable()
export class ItemOrdenService {
  constructor( @InjectRepository(ItemOrden) private readonly repositorioItem: Repository<ItemOrden> ){}
async create(createItemOrdenDto: ItemsDto[], Orden: Partial<Peritaje>) {
  if (!createItemOrdenDto?.length) throw new BadRequestException('Sin items');
  if (!Orden?.Id) throw new BadRequestException('Peritaje inválido');

  const items = createItemOrdenDto.map((dto) =>
    this.repositorioItem.create({
      Descripcion: dto.Descripcion,   // ← mapeo correcto de nombres
      Tipo: dto.Tipo,                 // ← mapeo correcto de nombres
      hojaTrabajo: { Id: Orden.Id }, // o simplemente: OrdenTrabajo: Orden
    }),
  );

  return this.repositorioItem.save(items);
}



  findAll() {
    return `This action returns all itemOrden`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemOrden`;
  }

  update(id: number, updateItemOrdenDto: UpdateItemOrdenDto) {
    return `This action updates a #${id} itemOrden`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemOrden`;
  }
}
