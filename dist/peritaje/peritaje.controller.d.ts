import { PeritajeService } from './peritaje.service';
import { CreatePeritajeDto } from './dto/create-peritaje.dto';
import { UpdatePeritajeDto } from './dto/update-peritaje.dto';
export declare class PeritajeController {
    private readonly peritajeService;
    constructor(peritajeService: PeritajeService);
    create(createPeritajeDto: CreatePeritajeDto): Promise<import("./entities/peritaje.entity").Peritaje | null>;
    findAll(): Promise<import("./entities/peritaje.entity").Peritaje[]>;
    vehiculosPeritados(year?: string): Promise<{
        year: number;
        labels: string[];
        series: any[];
    }>;
    panelPeritajes(): Promise<{
        finalizados: number;
        enProceso: number;
        pendientes: number;
    }>;
    findOne(id: string): Promise<import("./entities/peritaje.entity").Peritaje | null>;
    update(id: string, updatePeritajeDto: UpdatePeritajeDto): Promise<import("./entities/peritaje.entity").Peritaje | null>;
    remove(id: string): Promise<{
        succes: string;
    }>;
    find(dominio: string): Promise<import("./entities/peritaje.entity").Peritaje[]>;
}
