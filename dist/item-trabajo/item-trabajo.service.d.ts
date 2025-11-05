import { CreateItemTrabajoDto } from './dto/create-item-trabajo.dto';
import { UpdateItemTrabajoDto } from './dto/update-item-trabajo.dto';
export declare class ItemTrabajoService {
    create(createItemTrabajoDto: CreateItemTrabajoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateItemTrabajoDto: UpdateItemTrabajoDto): string;
    remove(id: number): string;
}
