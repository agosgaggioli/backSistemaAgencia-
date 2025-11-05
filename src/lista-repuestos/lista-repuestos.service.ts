import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListaRepuestoDto } from './dto/create-lista-repuesto.dto';
import { UpdateListaRepuestoDto } from './dto/update-lista-repuesto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Repository } from 'typeorm';
import { Peritaje } from 'src/peritaje/entities/peritaje.entity';
import { ItemRepuesto } from 'src/item-repuestos/entities/item-repuesto.entity';
import { ListaRepuesto } from './entities/lista-repuesto.entity';
import { ItemRepuestosService } from 'src/item-repuestos/item-repuestos.service';

@Injectable()
export class ListaRepuestosService {

   constructor(@InjectRepository(Vehiculo) private readonly repositorioVehiculo: Repository<Vehiculo>,
  
      @InjectRepository(Peritaje) private readonly repositorioPeritaje: Repository<Peritaje>,
      @InjectRepository(ItemRepuesto) private readonly repositorioItem: Repository<ItemRepuesto>,
      @InjectRepository(ListaRepuesto) private readonly repositorioLista: Repository<ListaRepuesto>,
  
      private readonly serviceItems: ItemRepuestosService
    ) { }
async create(createListaRepuestoDto: CreateListaRepuestoDto) {
  // 1) Peritaje + Vehículo (igual que ahora)
  const peritaje = await this.repositorioPeritaje.findOne({
    where: { Id: createListaRepuestoDto.idPeritaje },
    relations: { Vehiculo: true },
  });
  if (!peritaje) throw new NotFoundException('Peritaje inexistente');

  const vehiculo = await this.repositorioVehiculo.findOne({
    where: { Id_Vehiculo: peritaje.Vehiculo.Id_Vehiculo },
  });
  if (!vehiculo) throw new NotFoundException('vehiculo inexistente');

  const { itemsRepuestos } = createListaRepuestoDto;

  // 2) ¿Ya existe lista para ESTE peritaje? (OneToOne)
  let lista = await this.repositorioLista.findOne({
    where: { Peritaje: { Id: peritaje.Id } },
    relations: { itemsRepuestos: true, Vehiculo: true, Peritaje: true },
  });

  if (lista) {
    // --- UPSERT DE ÍTEMS ---
    const existentes = new Set(
      (lista.itemsRepuestos ?? []).map(
        it => `${(it.Descripcion || '').trim().toLowerCase()}|${(it.Tipo || '').trim().toLowerCase()}`
      )
    );

    const nuevos = (itemsRepuestos ?? []).filter(dto => {
      const key = `${(dto.Descripcion || '').trim().toLowerCase()}|${(dto.Tipo || '').trim().toLowerCase()}`;
      return !existentes.has(key);
    });

    if (nuevos.length) {
      const agregados = await this.serviceItems.create(nuevos, lista);
      lista.itemsRepuestos = [...(lista.itemsRepuestos ?? []), ...agregados];
      await this.repositorioLista.save(lista);
    }

    // Devolver fresco
    return this.repositorioLista.findOne({
      where: { Id: Number(lista.Id) },
      relations: { itemsRepuestos: true, Vehiculo: true, Peritaje: true },
    });
  }

  // 3) No existía → crear como siempre
  lista = this.repositorioLista.create({
    fechaCreacion: new Date(),
    Vehiculo: vehiculo,
    Peritaje: peritaje,
  });

  const listaGuardada = await this.repositorioLista.save(lista);

  const items = await this.serviceItems.create(itemsRepuestos ?? [], listaGuardada);
  listaGuardada.itemsRepuestos = items;

  await this.repositorioLista.save(listaGuardada);

  return this.repositorioLista.findOne({
    where: { Id: Number(listaGuardada.Id) },
    relations: { itemsRepuestos: true, Vehiculo: true, Peritaje: true },
  });
}


  findAll() {
    return `This action returns all listaRepuestos`;
  }

  findOne(id: number) {
     return this.repositorioLista.findOne({
          where: { Id: id },
          relations: { itemsRepuestos: true, Vehiculo: true },
        });
  }
async findOneByPeritaje(id: number) {
  return this.repositorioLista.findOne({
    where: { Peritaje: { Id: id } },   
    relations: { itemsRepuestos: true, Vehiculo: true, Peritaje: true },
  });
}


async sePidio(id: number) {
  const item = await this.repositorioItem.findOne({ where: { Id: id } });
  if (!item) throw new NotFoundException("Item no encontrado");

  item.estado = "PEDIDO";
  await this.repositorioItem.save(item); // ← guarda el cambio

  return item;
}

async llego(id: number) {
  const item = await this.repositorioItem.findOne({ where: { Id: id } });
  if (!item) throw new NotFoundException("Item no encontrado");

  item.estado = "RECIBIDO";
  await this.repositorioItem.save(item); // ← guarda el cambio

  return item;
}

  update(id: number, updateListaRepuestoDto: UpdateListaRepuestoDto) {
    return `This action updates a #${id} listaRepuesto`;
  }

  remove(id: number) {
    return `This action removes a #${id} listaRepuesto`;
  }
}
