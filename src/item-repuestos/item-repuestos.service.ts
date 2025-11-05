import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemRepuestoDto } from './dto/create-item-repuesto.dto';
import { UpdateItemRepuestoDto } from './dto/update-item-repuesto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepuesto } from './entities/item-repuesto.entity';
import { ListaRepuesto } from 'src/lista-repuestos/entities/lista-repuesto.entity';
import { Repository } from 'typeorm';
import { ItemsDto } from 'src/lista-repuestos/dto/create-lista-repuesto.dto';

@Injectable()
export class ItemRepuestosService {
    constructor( @InjectRepository(ItemRepuesto) private readonly repositorioItem: Repository<ItemRepuesto> ){}
  async create(dtos: ItemsDto[], lista: ListaRepuesto) {
  if (!dtos?.length) throw new BadRequestException('Sin items');
  if (!lista?.Id) throw new BadRequestException('Lista inválida');

  const items = dtos.map(dto =>
    this.repositorioItem.create({
      Descripcion: dto.Descripcion,
      Tipo: dto.Tipo,
      listaRepuestos: lista,           // ← la entidad, no el id
    }),
  );

  return this.repositorioItem.save(items);
}
}
