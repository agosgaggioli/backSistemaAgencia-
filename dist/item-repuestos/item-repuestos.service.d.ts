import { ItemRepuesto } from './entities/item-repuesto.entity';
import { ListaRepuesto } from 'src/lista-repuestos/entities/lista-repuesto.entity';
import { Repository } from 'typeorm';
import { ItemsDto } from 'src/lista-repuestos/dto/create-lista-repuesto.dto';
export declare class ItemRepuestosService {
    private readonly repositorioItem;
    constructor(repositorioItem: Repository<ItemRepuesto>);
    create(dtos: ItemsDto[], lista: ListaRepuesto): Promise<ItemRepuesto[]>;
}
