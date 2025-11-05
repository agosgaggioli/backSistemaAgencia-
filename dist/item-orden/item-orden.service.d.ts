import { UpdateItemOrdenDto } from './dto/update-item-orden.dto';
import { ItemOrden } from './entities/item-orden.entity';
import { Repository } from 'typeorm';
import { ItemsDto } from 'src/peritaje/dto/create-peritaje.dto';
import { Peritaje } from 'src/peritaje/entities/peritaje.entity';
export declare class ItemOrdenService {
    private readonly repositorioItem;
    constructor(repositorioItem: Repository<ItemOrden>);
    create(createItemOrdenDto: ItemsDto[], Orden: Partial<Peritaje>): Promise<ItemOrden[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateItemOrdenDto: UpdateItemOrdenDto): string;
    remove(id: number): string;
}
