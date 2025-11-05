import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { ILike, Repository } from 'typeorm';
import { verify } from 'crypto';
import { Usado } from './entities/vehiculoUsado.entity';

type SearchArgs = { Id_Vehiculo?: string; marca?: string, dominio?: string };

function escILike(s: string) {
  return s.replace(/[%_]/g, (m) => '\\' + m);
}

@Injectable()
export class VehiculoService {
  constructor(@InjectRepository(Vehiculo) private readonly repositorioVehiculo: Repository<Vehiculo>,
    @InjectRepository(Usado) private readonly repositorioUsado: Repository<Usado>) { }
  async create(createVehiculoDto: CreateVehiculoDto) {

    const existe = await this.repositorioVehiculo.findOne({
      where: { TipoVehiculo: { Dominio: createVehiculoDto.TipoVehiculo.Dominio } },
    });
    if (existe) {
      throw new BadRequestException('ya existe un vehiculo con ese dominio');
    }

    const { TipoVehiculo, ...vehiculoData } = createVehiculoDto;


    const usado = this.repositorioUsado.create({ ...TipoVehiculo });
    await this.repositorioUsado.save(usado);

    const newVehiculo = this.repositorioVehiculo.create({
      ...vehiculoData,
      TipoVehiculo: usado,
    });


    const vehiculoSave = await this.repositorioVehiculo.save(newVehiculo);
    return vehiculoSave;
  }


  async findAll(): Promise<Vehiculo[]> {
    const vehiculos: Vehiculo[] | null = await this.repositorioVehiculo.find({relations: {TipoVehiculo: true}})
    if (!vehiculos) throw new NotFoundException("no hay vehiculos")
    return vehiculos
  }

  async findOne(id: number) {
    const vehiculo = await this.repositorioVehiculo.findOne({
  where: { Id_Vehiculo: id },
  relations: { TipoVehiculo: true }
});;
    if (!vehiculo) throw new NotFoundException("vehiculo no encontrado")
    return vehiculo
  }

  async update(id: number, updateVehiculoDto: Partial<CreateVehiculoDto>) {
  const vehiculo = await this.repositorioVehiculo.findOneBy({ Id_Vehiculo: id });
  if (!vehiculo) throw new NotFoundException("vehiculo no encontrado");

  const { TipoVehiculo, ...vehiculoData } = updateVehiculoDto as any;

  await this.repositorioVehiculo.update(id, vehiculoData);

  if (TipoVehiculo) {

    const raw = await this.repositorioVehiculo
      .createQueryBuilder('v')
      .select('v."Tipo-Vehiculo"', 'usadoId')
      .where('v."Id_Vehiculo" = :id', { id })
      .getRawOne<{ usadoId: number | null }>();

    const usadoId = raw?.usadoId ?? null;

    if (usadoId) {
  
      await this.repositorioUsado.update(usadoId, TipoVehiculo as any);
    } else {

      const nuevo = await this.repositorioUsado.save({
        ...TipoVehiculo,
      } as any);

      await this.repositorioVehiculo.update(id, {
        ['Tipo-Vehiculo']: nuevo.Id_Vehiculo as any,
      } as any);
    }
  }

  // 4) Devolver con la relación cargada
  const vehiculoDb = await this.repositorioVehiculo.findOne({
    where: { Id_Vehiculo: id },
    relations: ['TipoVehiculo'],
  });
  return vehiculoDb;
}


  async remove(id: number) {
    const vehiculoFound = await this.repositorioVehiculo.findOne({ where: { Id_Vehiculo: id } })
    if (!vehiculoFound) throw new NotFoundException("vehiculo no encontrado")

    const vehiculoDelete = await this.repositorioVehiculo.delete(id)

    return vehiculoDelete
  }

async search({ Id_Vehiculo, marca, dominio }: { Id_Vehiculo?: string; marca?: string; dominio?: string }) {
  // Caso A: solo Id_Vehiculo numérico → igualdad exacta (rápido)
  if (Id_Vehiculo && /^\d+$/.test(Id_Vehiculo) && !marca && !dominio) {
    return this.repositorioVehiculo.find({
      where: { Id_Vehiculo: parseInt(Id_Vehiculo, 10) },
      order: { Id_Vehiculo: 'ASC' },
      relations: ['TipoVehiculo'], // opcional si querés traer el usado
    });
  }

  const qb = this.repositorioVehiculo
    .createQueryBuilder('v')
    .leftJoin('v.TipoVehiculo', 'u'); // <- Dominio vive acá

  if (Id_Vehiculo) {
    qb.andWhere(`CAST(v."Id_Vehiculo" AS TEXT) ILIKE :id`, {
      id: `%${escILike(Id_Vehiculo)}%`,
    });
  }

  if (marca) {
    qb.andWhere(`v."Marca" ILIKE :marca`, { marca: `%${escILike(marca)}%` });
  }

  if (dominio) {
    qb.andWhere(`u."Dominio" ILIKE :dominio`, {
      dominio: `%${escILike(dominio)}%`,
    });
  }

  qb.orderBy(`v."Id_Vehiculo"`, 'ASC');
  return qb.getMany();
}

async countVehiculos (){
  const vehiculos : number = await this.repositorioVehiculo.count()
  return vehiculos
}
async countVehiculosPeritados(){

  const vehiculosPeritados= await this.repositorioVehiculo.count({where : {Peritada :"SI"}})
  return vehiculosPeritados
}



}
