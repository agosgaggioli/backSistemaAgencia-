import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeritajeDto } from './dto/create-peritaje.dto';
import { UpdatePeritajeDto } from './dto/update-peritaje.dto';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Not, Repository } from 'typeorm';
import { ItemOrden } from 'src/item-orden/entities/item-orden.entity';
import { Peritaje } from './entities/peritaje.entity';
import { ItemOrdenService } from 'src/item-orden/item-orden.service';

const TIPOS = ['MECANICO', 'CARROCERIA', 'CRISTALERIA', 'PINTURA'];
@Injectable()
export class PeritajeService {
  constructor(@InjectRepository(Vehiculo) private readonly repositorioVehiculo: Repository<Vehiculo>,

    @InjectRepository(Peritaje) private readonly repositorioPeritaje: Repository<Peritaje>,
    @InjectRepository(ItemOrden) private readonly repositorioOrden: Repository<ItemOrden>,

    private readonly serviceItems: ItemOrdenService
  ) { }

  async create(createPeritajeDto: CreatePeritajeDto) {
    const vehiculo: Vehiculo | null = await this.repositorioVehiculo.findOne({ where: { Id_Vehiculo: createPeritajeDto.Id_Vehiculo } })
    if (!vehiculo) throw new NotFoundException("vehiculo inexistente")
    vehiculo.Peritada = "SI"
    await this.repositorioVehiculo.save(vehiculo)

    const { itemsPeritaje, ...peritajeData } = createPeritajeDto;
    const hoja = this.repositorioPeritaje.create({ ...peritajeData })

    const hojaa = await this.repositorioPeritaje.save(hoja)

    const Items: ItemOrden[] = await this.serviceItems.create(itemsPeritaje, hojaa)
    hojaa.itemsOrden = Items
    hojaa.Vehiculo = vehiculo
   hojaa.FechaModificacion = new Date();

    const hojasNew = await this.repositorioPeritaje.save(hojaa)
    return this.repositorioPeritaje.findOne({
      where: { Id: hojasNew.Id },
      relations: { itemsOrden: true, Vehiculo: true },
    });
  }

  async findAll() {
    return await this.repositorioPeritaje.find({
      relations: {
        itemsOrden: true, Vehiculo: {
          TipoVehiculo: true,
        },
      }
    })
  }

  async findOne(id: number) {
    return await this.repositorioPeritaje.findOne({
      where: { Id: id }, relations: {
        itemsOrden: true, Vehiculo: {
          TipoVehiculo: true,
        },
        ordenes: {itemsOrden:true}
      },
    })
  }
async addItemsNoDup(id: number, dto: UpdatePeritajeDto) {
  const peritaje = await this.repositorioPeritaje.findOne({
    where: { Id: id },
    relations: { itemsOrden: true },
  });
  if (!peritaje) throw new NotFoundException('no existe peritaje');
   peritaje.FechaModificacion =  new Date();
  await this.repositorioPeritaje.save(peritaje)

  const existentes = new Set(
    (peritaje.itemsOrden ?? []).map(
      (i) => `${(i.Descripcion ?? '').trim()}|${(i.Tipo ?? '').trim()}`
    ),
  );

  const aInsertar = (dto.itemsPeritaje ?? [])
    .map((d) => ({
      Descripcion: d.Descripcion?.trim() ?? '',
      Tipo: d.Tipo?.trim() ?? '',
    }))
    .filter((d) => d.Descripcion || d.Tipo)
    .filter((d) => !existentes.has(`${d.Descripcion}|${d.Tipo}`))
    .map((d) =>
      this.repositorioOrden.create({
        ...d,
        hojaTrabajo: { Id: id } as any,
      }),
    );

  if (aInsertar.length > 0) {
    await this.repositorioOrden.save(aInsertar);
  }
 

  return this.repositorioPeritaje.findOne({
    where: { Id : id},
    relations: { itemsOrden: true, Vehiculo: true },
  });
}


  async remove(id: number) {
    const peritaje = await this.repositorioPeritaje.findOne({ where: { Id: id } })
    if (!peritaje) throw new BadRequestException("no existe el peritaje")

    await this.repositorioPeritaje.delete(id)
    return { succes: "peritaje eliminado" }

  }

  async countEstados() {
    const finalizados = await this.repositorioPeritaje.count({ where: { estado: 'FINALIZADO' } });
    const enProceso = await this.repositorioPeritaje.count({ where: { estado: 'PROCESO' } });
    const pendientes = await this.repositorioPeritaje.count({ where: { estado: 'PENDIENTE' } });

    return { finalizados, enProceso, pendientes };
  }
    async peritadosPorMes(year: number) {
    const rows = await this.repositorioPeritaje.createQueryBuilder('p')
      .select('EXTRACT(MONTH FROM p.Fecha)', 'mes')
      .addSelect('COUNT(*)', 'cantidad')
      .where('EXTRACT(YEAR FROM p.Fecha) = :y', { y: year })
      // si solo querés finalizados, mantené esta línea:
      //.andWhere('p.estado = :fin', { fin: 'FINALIZADO' })
      .groupBy('mes')
      .orderBy('mes', 'ASC')
      .getRawMany<{ mes: string; cantidad: string }>();

    const labels = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const series = Array(12).fill(0);
    for (const r of rows) {
      const m = Number(r.mes);            // 1..12
      series[m - 1] = Number(r.cantidad) || 0;
    }

    return { year, labels, series };
  }

  async buscarPorDominio(dominio: string) {
    const where = dominio
      ? {
          Vehiculo: {
            TipoVehiculo: {
              // 👇 coincidencia parcial y case-insensitive
              Dominio: ILike(`%${dominio}%`),
            },
          },
        }
      : {};

    const data = await this.repositorioPeritaje.find({
      where: where as any,
      relations: {
        Vehiculo: { TipoVehiculo: true },
        itemsOrden: true,
      },
      order: { Id: 'DESC' },
    });

    return data;
  }

}
