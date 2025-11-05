import { CreateListaRepuestoDto } from './dto/create-lista-repuesto.dto';
import { UpdateListaRepuestoDto } from './dto/update-lista-repuesto.dto';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Repository } from 'typeorm';
import { Peritaje } from 'src/peritaje/entities/peritaje.entity';
import { ItemRepuesto } from 'src/item-repuestos/entities/item-repuesto.entity';
import { ListaRepuesto } from './entities/lista-repuesto.entity';
import { ItemRepuestosService } from 'src/item-repuestos/item-repuestos.service';
export declare class ListaRepuestosService {
    private readonly repositorioVehiculo;
    private readonly repositorioPeritaje;
    private readonly repositorioItem;
    private readonly repositorioLista;
    private readonly serviceItems;
    constructor(repositorioVehiculo: Repository<Vehiculo>, repositorioPeritaje: Repository<Peritaje>, repositorioItem: Repository<ItemRepuesto>, repositorioLista: Repository<ListaRepuesto>, serviceItems: ItemRepuestosService);
    create(createListaRepuestoDto: CreateListaRepuestoDto): Promise<ListaRepuesto | null>;
    findAll(): string;
    findOne(id: number): Promise<ListaRepuesto | null>;
    findOneByPeritaje(id: number): Promise<ListaRepuesto | null>;
    sePidio(id: number): Promise<ItemRepuesto>;
    llego(id: number): Promise<ItemRepuesto>;
    update(id: number, updateListaRepuestoDto: UpdateListaRepuestoDto): string;
    remove(id: number): string;
}
