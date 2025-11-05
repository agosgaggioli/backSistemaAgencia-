import { ItemTrabajoService } from './item-trabajo.service';
import { CreateItemTrabajoDto } from './dto/create-item-trabajo.dto';
import { UpdateItemTrabajoDto } from './dto/update-item-trabajo.dto';
export declare class ItemTrabajoController {
    private readonly itemTrabajoService;
    constructor(itemTrabajoService: ItemTrabajoService);
    create(createItemTrabajoDto: CreateItemTrabajoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateItemTrabajoDto: UpdateItemTrabajoDto): string;
    remove(id: string): string;
}
