import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { Vehiculo } from './entities/vehiculo.entity';
import { Repository } from 'typeorm';
import { Usado } from './entities/vehiculoUsado.entity';
export declare class VehiculoService {
    private readonly repositorioVehiculo;
    private readonly repositorioUsado;
    constructor(repositorioVehiculo: Repository<Vehiculo>, repositorioUsado: Repository<Usado>);
    create(createVehiculoDto: CreateVehiculoDto): Promise<Vehiculo>;
    findAll(): Promise<Vehiculo[]>;
    findOne(id: number): Promise<Vehiculo>;
    update(id: number, updateVehiculoDto: Partial<CreateVehiculoDto>): Promise<Vehiculo | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    search({ Id_Vehiculo, marca, dominio }: {
        Id_Vehiculo?: string;
        marca?: string;
        dominio?: string;
    }): Promise<Vehiculo[]>;
    countVehiculos(): Promise<number>;
    countVehiculosPeritados(): Promise<number>;
}
