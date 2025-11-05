import { ListaRepuestosService } from './lista-repuestos.service';
import { CreateListaRepuestoDto } from './dto/create-lista-repuesto.dto';
export declare class ListaRepuestosController {
    private readonly listaRepuestosService;
    constructor(listaRepuestosService: ListaRepuestosService);
    create(createListaRepuestoDto: CreateListaRepuestoDto): Promise<import("./entities/lista-repuesto.entity").ListaRepuesto | null>;
    findAll(): string;
    findPeritaje(id: string): Promise<import("./entities/lista-repuesto.entity").ListaRepuesto | null>;
    findOne(id: string): Promise<import("./entities/lista-repuesto.entity").ListaRepuesto | null>;
    sePidio(id: string): Promise<import("../item-repuestos/entities/item-repuesto.entity").ItemRepuesto>;
    llego(id: string): Promise<import("../item-repuestos/entities/item-repuesto.entity").ItemRepuesto>;
}
