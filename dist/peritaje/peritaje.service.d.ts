import { CreatePeritajeDto } from './dto/create-peritaje.dto';
import { UpdatePeritajeDto } from './dto/update-peritaje.dto';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Repository } from 'typeorm';
import { ItemOrden } from 'src/item-orden/entities/item-orden.entity';
import { Peritaje } from './entities/peritaje.entity';
import { ItemOrdenService } from 'src/item-orden/item-orden.service';
export declare class PeritajeService {
    private readonly repositorioVehiculo;
    private readonly repositorioPeritaje;
    private readonly repositorioOrden;
    private readonly serviceItems;
    constructor(repositorioVehiculo: Repository<Vehiculo>, repositorioPeritaje: Repository<Peritaje>, repositorioOrden: Repository<ItemOrden>, serviceItems: ItemOrdenService);
    create(createPeritajeDto: CreatePeritajeDto): Promise<Peritaje | null>;
    findAll(): Promise<Peritaje[]>;
    findOne(id: number): Promise<Peritaje | null>;
    addItemsNoDup(id: number, dto: UpdatePeritajeDto): Promise<Peritaje | null>;
    remove(id: number): Promise<{
        succes: string;
    }>;
    countEstados(): Promise<{
        finalizados: number;
        enProceso: number;
        pendientes: number;
    }>;
    peritadosPorMes(year: number): Promise<{
        year: number;
        labels: string[];
        series: any[];
    }>;
    buscarPorDominio(dominio: string): Promise<Peritaje[]>;
}
