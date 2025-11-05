import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdenTrabajoDto } from './dto/create-orden-trabajo.dto';
import { UpdateOrdenTrabajoDto } from './dto/update-orden-trabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { PeritajeService } from 'src/peritaje/peritaje.service';
import { Peritaje } from 'src/peritaje/entities/peritaje.entity';
import { ItemOrden } from 'src/item-orden/entities/item-orden.entity';
import { Between, In, LessThan, Not, Repository } from 'typeorm';
import { OrdenTrabajo } from './entities/orden-trabajo.entity';
import { ItemTrabajo } from 'src/item-trabajo/entities/item-trabajo.entity';
import { costoOrdenDto } from './dto/costo-orden-trabajo.dto';

@Injectable()
export class OrdenTrabajoService {
  constructor(@InjectRepository(Vehiculo) private readonly repositorioVehiculo: Repository<Vehiculo>,

    @InjectRepository(Peritaje) private readonly repositorioPeritaje: Repository<Peritaje>,
    @InjectRepository(ItemOrden) private readonly repositorioOrden: Repository<ItemOrden>,
    @InjectRepository(OrdenTrabajo) private readonly repositorioOrdenTrabajo: Repository<OrdenTrabajo>
  ) { }
  async create(createOrdenTrabajoDto: CreateOrdenTrabajoDto) {
    const Peritaje = await this.repositorioPeritaje.findOne({
      where: { Id: createOrdenTrabajoDto.IdPeritaje },
    });

    if (!Peritaje) throw new NotFoundException()
    Peritaje.estado = "PROCESO"
    await this.repositorioPeritaje.save(Peritaje)

    const ordenVigente = await this.repositorioOrdenTrabajo.findOne({
      where: {
        peritaje: { Id: Peritaje.Id },
        estado: Not('FINALIZADO'),
      },
      relations: { peritaje: true },
    });

    if (ordenVigente) {
      throw new BadRequestException(
        'El peritaje ya tiene una orden en proceso. Debe finalizarse antes de crear otra.'
      );
    }

    const Vehiculo = await this.repositorioVehiculo.findOne({
      where: { Id_Vehiculo: createOrdenTrabajoDto.IdVehiculo },
    });

    if (!Vehiculo) throw new NotFoundException()
    Vehiculo.UBICACION = createOrdenTrabajoDto.responsable
    await this.repositorioVehiculo.save(Vehiculo)


    const order = new OrdenTrabajo();
    order.Fecha = new Date();
    order.peritaje = Peritaje
    order.Vehiculo = Vehiculo
    order.responsable = createOrdenTrabajoDto.responsable

    const newOrder: OrdenTrabajo = await this.repositorioOrdenTrabajo.save(order);

    const itemsArray: ItemOrden[] = await Promise.all(

      createOrdenTrabajoDto.items.map(async (Item) => {
        const item: ItemOrden | null = await this.repositorioOrden.findOne({
          where: { Id: Item.id }
        })

        if (!item) throw new NotFoundException()

        await this.repositorioOrden.update(
          { Id: Item.id },
          { estado: "PROCESO" }
        )
        return item
      }))



    newOrder.itemsOrden = itemsArray

    await this.repositorioOrdenTrabajo.save(newOrder)

    return this.repositorioOrdenTrabajo.find({
      where: { Id: newOrder.Id },
      relations: { itemsOrden: true },
    });

  }

  findAll() {
    return this.repositorioOrdenTrabajo.find({ relations: { Vehiculo: { TipoVehiculo: true }, itemsOrden: true } })
  }

  findOne(id: number) {
    return this.repositorioOrdenTrabajo.findOne({ where: { Id: id }, relations: { Vehiculo: { TipoVehiculo: true }, itemsOrden: true } })
  }

  async updateAddItems(id: number, updateOrdenTrabajoDto: UpdateOrdenTrabajoDto) {
    const orden = await this.repositorioOrdenTrabajo.findOne({ where: { Id: id } })
    if (!orden) throw new BadRequestException("no existe la orden")
    const itemsArray: ItemOrden[] = await Promise.all(

      updateOrdenTrabajoDto.items.map(async (Item) => {
        const item: ItemOrden | null = await this.repositorioOrden.findOne({
          where: { Id: Item.id }
        })

        if (!item) throw new NotFoundException()

        await this.repositorioOrden.update(
          { Id: Item.id },
          { estado: "ACTIVO" }
        )
        return item
      }))

    const existentes = await this.repositorioOrden.find({
      where: { orden: { Id: orden.Id } },
    });


    const idsExistentes = new Set(existentes.map(i => i.Id));
    const nuevos = itemsArray.filter(i => !idsExistentes.has(i.Id));


    for (const it of nuevos) {
      it.orden = orden;
      it.estado = 'ACTIVO';
    }
    if (nuevos.length) {
      await this.repositorioOrden.save(nuevos);
    }


    const itemsCombinados = [...existentes, ...nuevos];

    return this.repositorioOrdenTrabajo.find({
      where: { Id: orden.Id },
      relations: { itemsOrden: true },
    });

  }
  async updateFinalizar(id: number, cos: costoOrdenDto) {
    const orden = await this.repositorioOrdenTrabajo.findOne({
      where: { Id: id },
      relations: { Vehiculo: true, itemsOrden: true, }
    });
    if (!orden) throw new BadRequestException("no existe la orden")
    if (orden.estado === "FINALIZADO") throw new BadRequestException("ya esta finalizada")
    orden.costo = cos.costo
    orden.estado = "FINALIZADO"

    const ordenDB = await this.repositorioOrdenTrabajo.save(orden)

    const vehiculo = await this.repositorioVehiculo.findOne({
      where: { Id_Vehiculo: orden.Vehiculo.Id_Vehiculo },
    });
    if (!vehiculo) throw new BadRequestException("no existe el vehiculo")

    if (!vehiculo.Valor_Costo) vehiculo.Valor_Costo = cos.costo
    else {
      vehiculo.Valor_Costo = vehiculo.Valor_Costo + cos.costo
    }

    vehiculo.UBICACION = "SALON"
    await this.repositorioVehiculo.save(vehiculo)
    await this.repositorioOrden.update(
      { Id: In(orden.itemsOrden.map(i => i.Id)) },
      { estado: 'FINALIZADO' }
    );



    await this.repositorioVehiculo.save(vehiculo)

    orden.itemsOrden.forEach(it => { it.estado = 'FINALIZADO'; });
    await this.repositorioOrden.save(orden.itemsOrden);

    //aca
    const peritajeId = orden?.peritaje?.Id // si la orden viene con la relación cargada
    // o si tenés FK en la entidad


// 2) Refrescar el peritaje con sus items/ordenes (ajustá relations según tu modelo)
const peritajeRefrescada = await this.repositorioPeritaje.findOne({
  where: { Id: peritajeId },
  relations: { itemsOrden: true }, // o { ordenes: true } / { itemsPeritaje: true } según tu entidad
});

if (!peritajeRefrescada) {
  throw new NotFoundException('No existe el peritaje.');
}

// 3) Calcular estado y actualizar
const allFinished =
  (peritajeRefrescada.itemsOrden?.length ?? 0) > 0 &&
  peritajeRefrescada.itemsOrden.every(it => it?.estado === 'FINALIZADO');

await this.repositorioPeritaje.update(
  { Id: peritajeRefrescada.Id },
  { estado: allFinished ? 'FINALIZADO' : 'PENDIENTE' },
);
    return this.repositorioOrdenTrabajo.find({
      where: { Id: orden.peritaje.Id },
      relations: { itemsOrden: true, Vehiculo: true },
    });

  }
  async updateCosto(id: number, cos: costoOrdenDto) {
    const orden = await this.repositorioOrdenTrabajo.findOne({
      where: { Id: id },
      relations: { Vehiculo: true, itemsOrden: true }
    });
    if (!orden) throw new BadRequestException("no existe la orden")

    orden.costo = cos.costo

    const ordenDB = await this.repositorioOrdenTrabajo.save(orden)

    const vehiculo = await this.repositorioVehiculo.findOne({
      where: { Id_Vehiculo: orden.Vehiculo.Id_Vehiculo },
    });
    if (!vehiculo) throw new BadRequestException("no existe el vehiculo")

    if (!vehiculo.Valor_Costo) vehiculo.Valor_Costo = cos.costo
    else {
      vehiculo.Valor_Costo = vehiculo.Valor_Costo + cos.costo
    }

    await this.repositorioVehiculo.save(vehiculo)

    return this.repositorioOrdenTrabajo.find({
      where: { Id: orden.Id },
      relations: { itemsOrden: true, Vehiculo: true },
    });

  }

  async ordenPeligro() {
    const hoy = new Date();

    // desde hace 7 días (inclusive)
    const desde = new Date(hoy);
    desde.setDate(hoy.getDate() - 7);

    // hasta hace 3 días (inclusive)
    const hasta = new Date(hoy);
    hasta.setDate(hoy.getDate() - 3);

    // solo por fecha
    const ordenesPeligro = await this.repositorioOrdenTrabajo.count({
      where: { Fecha: Between(desde, hasta), estado: Not('FINALIZADO') },
    });
    const umbral = new Date(hoy);
    umbral.setDate(hoy.getDate() - 7); // hace 7 días exactos

    const ordenesMasDe7 = await this.repositorioOrdenTrabajo.count({
      where: {
        Fecha: LessThan(umbral), estado: Not('FINALIZADO')
      },
    });
    return { ordenesMasDe7, ordenesPeligro }
  }

  async vehiculosAlerta() {
    const hoy = new Date();

    // desde hace 7 días (inclusive)
    const desde = new Date(hoy);
    desde.setDate(hoy.getDate() - 7);

    const umbral = new Date(hoy);
    umbral.setDate(hoy.getDate() - 7); // hace 7 días exactos

    const ordenesMasDe7 = await this.repositorioOrdenTrabajo.find({
      where: {
        Fecha: LessThan(umbral), estado: Not('FINALIZADO')
      },
      relations: { Vehiculo: { TipoVehiculo: true } }
    });

    return ordenesMasDe7

  }
}
