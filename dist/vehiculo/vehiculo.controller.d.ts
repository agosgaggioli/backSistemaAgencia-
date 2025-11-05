import { VehiculoService } from './vehiculo.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
export declare class VehiculoController {
    private readonly vehiculoService;
    constructor(vehiculoService: VehiculoService);
    create(createVehiculoDto: CreateVehiculoDto): Promise<import("./entities/vehiculo.entity").Vehiculo>;
    findAll(): Promise<import("./entities/vehiculo.entity").Vehiculo[]>;
    update(id: string, updateVehiculoDto: Partial<CreateVehiculoDto>): Promise<import("./entities/vehiculo.entity").Vehiculo | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    search(Id_Vehiculo?: string, marca?: string, dominio?: string): Promise<import("./entities/vehiculo.entity").Vehiculo[]>;
    PanelGeneralVehiculo(): Promise<{
        vehiculos: number;
        vehiculosPeritados: number;
    }>;
    findOne(id: string): Promise<import("./entities/vehiculo.entity").Vehiculo>;
}
