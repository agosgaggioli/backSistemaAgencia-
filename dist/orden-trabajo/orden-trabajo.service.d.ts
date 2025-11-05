import { CreateOrdenTrabajoDto } from './dto/create-orden-trabajo.dto';
import { UpdateOrdenTrabajoDto } from './dto/update-orden-trabajo.dto';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Peritaje } from 'src/peritaje/entities/peritaje.entity';
import { ItemOrden } from 'src/item-orden/entities/item-orden.entity';
import { Repository } from 'typeorm';
import { OrdenTrabajo } from './entities/orden-trabajo.entity';
import { costoOrdenDto } from './dto/costo-orden-trabajo.dto';
export declare class OrdenTrabajoService {
    private readonly repositorioVehiculo;
    private readonly repositorioPeritaje;
    private readonly repositorioOrden;
    private readonly repositorioOrdenTrabajo;
    constructor(repositorioVehiculo: Repository<Vehiculo>, repositorioPeritaje: Repository<Peritaje>, repositorioOrden: Repository<ItemOrden>, repositorioOrdenTrabajo: Repository<OrdenTrabajo>);
    create(createOrdenTrabajoDto: CreateOrdenTrabajoDto): Promise<OrdenTrabajo[]>;
    findAll(): Promise<OrdenTrabajo[]>;
    findOne(id: number): Promise<OrdenTrabajo | null>;
    updateAddItems(id: number, updateOrdenTrabajoDto: UpdateOrdenTrabajoDto): Promise<OrdenTrabajo[]>;
    updateFinalizar(id: number, cos: costoOrdenDto): Promise<OrdenTrabajo[]>;
    updateCosto(id: number, cos: costoOrdenDto): Promise<OrdenTrabajo[]>;
    ordenPeligro(): Promise<{
        ordenesMasDe7: number;
        ordenesPeligro: number;
    }>;
    vehiculosAlerta(): Promise<OrdenTrabajo[]>;
}
