"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiculoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vehiculo_entity_1 = require("./entities/vehiculo.entity");
const typeorm_2 = require("typeorm");
const vehiculoUsado_entity_1 = require("./entities/vehiculoUsado.entity");
function escILike(s) {
    return s.replace(/[%_]/g, (m) => '\\' + m);
}
let VehiculoService = class VehiculoService {
    repositorioVehiculo;
    repositorioUsado;
    constructor(repositorioVehiculo, repositorioUsado) {
        this.repositorioVehiculo = repositorioVehiculo;
        this.repositorioUsado = repositorioUsado;
    }
    async create(createVehiculoDto) {
        const existe = await this.repositorioVehiculo.findOne({
            where: { TipoVehiculo: { Dominio: createVehiculoDto.TipoVehiculo.Dominio } },
        });
        if (existe) {
            throw new common_1.BadRequestException('ya existe un vehiculo con ese dominio');
        }
        const { TipoVehiculo, ...vehiculoData } = createVehiculoDto;
        const usado = this.repositorioUsado.create({ ...TipoVehiculo });
        await this.repositorioUsado.save(usado);
        const newVehiculo = this.repositorioVehiculo.create({
            ...vehiculoData,
            TipoVehiculo: usado,
        });
        const vehiculoSave = await this.repositorioVehiculo.save(newVehiculo);
        return vehiculoSave;
    }
    async findAll() {
        const vehiculos = await this.repositorioVehiculo.find({ relations: { TipoVehiculo: true } });
        if (!vehiculos)
            throw new common_1.NotFoundException("no hay vehiculos");
        return vehiculos;
    }
    async findOne(id) {
        const vehiculo = await this.repositorioVehiculo.findOne({
            where: { Id_Vehiculo: id },
            relations: { TipoVehiculo: true }
        });
        ;
        if (!vehiculo)
            throw new common_1.NotFoundException("vehiculo no encontrado");
        return vehiculo;
    }
    async update(id, updateVehiculoDto) {
        const vehiculo = await this.repositorioVehiculo.findOneBy({ Id_Vehiculo: id });
        if (!vehiculo)
            throw new common_1.NotFoundException("vehiculo no encontrado");
        const { TipoVehiculo, ...vehiculoData } = updateVehiculoDto;
        await this.repositorioVehiculo.update(id, vehiculoData);
        if (TipoVehiculo) {
            const raw = await this.repositorioVehiculo
                .createQueryBuilder('v')
                .select('v."Tipo-Vehiculo"', 'usadoId')
                .where('v."Id_Vehiculo" = :id', { id })
                .getRawOne();
            const usadoId = raw?.usadoId ?? null;
            if (usadoId) {
                await this.repositorioUsado.update(usadoId, TipoVehiculo);
            }
            else {
                const nuevo = await this.repositorioUsado.save({
                    ...TipoVehiculo,
                });
                await this.repositorioVehiculo.update(id, {
                    ['Tipo-Vehiculo']: nuevo.Id_Vehiculo,
                });
            }
        }
        const vehiculoDb = await this.repositorioVehiculo.findOne({
            where: { Id_Vehiculo: id },
            relations: ['TipoVehiculo'],
        });
        return vehiculoDb;
    }
    async remove(id) {
        const vehiculoFound = await this.repositorioVehiculo.findOne({ where: { Id_Vehiculo: id } });
        if (!vehiculoFound)
            throw new common_1.NotFoundException("vehiculo no encontrado");
        const vehiculoDelete = await this.repositorioVehiculo.delete(id);
        return vehiculoDelete;
    }
    async search({ Id_Vehiculo, marca, dominio }) {
        if (Id_Vehiculo && /^\d+$/.test(Id_Vehiculo) && !marca && !dominio) {
            return this.repositorioVehiculo.find({
                where: { Id_Vehiculo: parseInt(Id_Vehiculo, 10) },
                order: { Id_Vehiculo: 'ASC' },
                relations: ['TipoVehiculo'],
            });
        }
        const qb = this.repositorioVehiculo
            .createQueryBuilder('v')
            .leftJoin('v.TipoVehiculo', 'u');
        if (Id_Vehiculo) {
            qb.andWhere(`CAST(v."Id_Vehiculo" AS TEXT) ILIKE :id`, {
                id: `%${escILike(Id_Vehiculo)}%`,
            });
        }
        if (marca) {
            qb.andWhere(`v."Marca" ILIKE :marca`, { marca: `%${escILike(marca)}%` });
        }
        if (dominio) {
            qb.andWhere(`u."Dominio" ILIKE :dominio`, {
                dominio: `%${escILike(dominio)}%`,
            });
        }
        qb.orderBy(`v."Id_Vehiculo"`, 'ASC');
        return qb.getMany();
    }
    async countVehiculos() {
        const vehiculos = await this.repositorioVehiculo.count();
        return vehiculos;
    }
    async countVehiculosPeritados() {
        const vehiculosPeritados = await this.repositorioVehiculo.count({ where: { Peritada: "SI" } });
        return vehiculosPeritados;
    }
};
exports.VehiculoService = VehiculoService;
exports.VehiculoService = VehiculoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehiculo_entity_1.Vehiculo)),
    __param(1, (0, typeorm_1.InjectRepository)(vehiculoUsado_entity_1.Usado)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VehiculoService);
//# sourceMappingURL=vehiculo.service.js.map