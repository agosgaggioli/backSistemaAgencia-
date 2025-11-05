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
exports.PeritajeService = void 0;
const common_1 = require("@nestjs/common");
const vehiculo_entity_1 = require("../vehiculo/entities/vehiculo.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const item_orden_entity_1 = require("../item-orden/entities/item-orden.entity");
const peritaje_entity_1 = require("./entities/peritaje.entity");
const item_orden_service_1 = require("../item-orden/item-orden.service");
const TIPOS = ['MECANICO', 'CARROCERIA', 'CRISTALERIA', 'PINTURA'];
let PeritajeService = class PeritajeService {
    repositorioVehiculo;
    repositorioPeritaje;
    repositorioOrden;
    serviceItems;
    constructor(repositorioVehiculo, repositorioPeritaje, repositorioOrden, serviceItems) {
        this.repositorioVehiculo = repositorioVehiculo;
        this.repositorioPeritaje = repositorioPeritaje;
        this.repositorioOrden = repositorioOrden;
        this.serviceItems = serviceItems;
    }
    async create(createPeritajeDto) {
        const vehiculo = await this.repositorioVehiculo.findOne({ where: { Id_Vehiculo: createPeritajeDto.Id_Vehiculo } });
        if (!vehiculo)
            throw new common_1.NotFoundException("vehiculo inexistente");
        vehiculo.Peritada = "SI";
        await this.repositorioVehiculo.save(vehiculo);
        const { itemsPeritaje, ...peritajeData } = createPeritajeDto;
        const hoja = this.repositorioPeritaje.create({ ...peritajeData });
        const hojaa = await this.repositorioPeritaje.save(hoja);
        const Items = await this.serviceItems.create(itemsPeritaje, hojaa);
        hojaa.itemsOrden = Items;
        hojaa.Vehiculo = vehiculo;
        hojaa.FechaModificacion = new Date();
        const hojasNew = await this.repositorioPeritaje.save(hojaa);
        return this.repositorioPeritaje.findOne({
            where: { Id: hojasNew.Id },
            relations: { itemsOrden: true, Vehiculo: true },
        });
    }
    async findAll() {
        return await this.repositorioPeritaje.find({
            relations: {
                itemsOrden: true, Vehiculo: {
                    TipoVehiculo: true,
                },
            }
        });
    }
    async findOne(id) {
        return await this.repositorioPeritaje.findOne({
            where: { Id: id }, relations: {
                itemsOrden: true, Vehiculo: {
                    TipoVehiculo: true,
                },
                ordenes: { itemsOrden: true }
            },
        });
    }
    async addItemsNoDup(id, dto) {
        const peritaje = await this.repositorioPeritaje.findOne({
            where: { Id: id },
            relations: { itemsOrden: true },
        });
        if (!peritaje)
            throw new common_1.NotFoundException('no existe peritaje');
        peritaje.FechaModificacion = new Date();
        await this.repositorioPeritaje.save(peritaje);
        const existentes = new Set((peritaje.itemsOrden ?? []).map((i) => `${(i.Descripcion ?? '').trim()}|${(i.Tipo ?? '').trim()}`));
        const aInsertar = (dto.itemsPeritaje ?? [])
            .map((d) => ({
            Descripcion: d.Descripcion?.trim() ?? '',
            Tipo: d.Tipo?.trim() ?? '',
        }))
            .filter((d) => d.Descripcion || d.Tipo)
            .filter((d) => !existentes.has(`${d.Descripcion}|${d.Tipo}`))
            .map((d) => this.repositorioOrden.create({
            ...d,
            hojaTrabajo: { Id: id },
        }));
        if (aInsertar.length > 0) {
            await this.repositorioOrden.save(aInsertar);
        }
        return this.repositorioPeritaje.findOne({
            where: { Id: id },
            relations: { itemsOrden: true, Vehiculo: true },
        });
    }
    async remove(id) {
        const peritaje = await this.repositorioPeritaje.findOne({ where: { Id: id } });
        if (!peritaje)
            throw new common_1.BadRequestException("no existe el peritaje");
        await this.repositorioPeritaje.delete(id);
        return { succes: "peritaje eliminado" };
    }
    async countEstados() {
        const finalizados = await this.repositorioPeritaje.count({ where: { estado: 'FINALIZADO' } });
        const enProceso = await this.repositorioPeritaje.count({ where: { estado: 'PROCESO' } });
        const pendientes = await this.repositorioPeritaje.count({ where: { estado: 'PENDIENTE' } });
        return { finalizados, enProceso, pendientes };
    }
    async peritadosPorMes(year) {
        const rows = await this.repositorioPeritaje.createQueryBuilder('p')
            .select('EXTRACT(MONTH FROM p.Fecha)', 'mes')
            .addSelect('COUNT(*)', 'cantidad')
            .where('EXTRACT(YEAR FROM p.Fecha) = :y', { y: year })
            .groupBy('mes')
            .orderBy('mes', 'ASC')
            .getRawMany();
        const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const series = Array(12).fill(0);
        for (const r of rows) {
            const m = Number(r.mes);
            series[m - 1] = Number(r.cantidad) || 0;
        }
        return { year, labels, series };
    }
    async buscarPorDominio(dominio) {
        const where = dominio
            ? {
                Vehiculo: {
                    TipoVehiculo: {
                        Dominio: (0, typeorm_2.ILike)(`%${dominio}%`),
                    },
                },
            }
            : {};
        const data = await this.repositorioPeritaje.find({
            where: where,
            relations: {
                Vehiculo: { TipoVehiculo: true },
                itemsOrden: true,
            },
            order: { Id: 'DESC' },
        });
        return data;
    }
};
exports.PeritajeService = PeritajeService;
exports.PeritajeService = PeritajeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehiculo_entity_1.Vehiculo)),
    __param(1, (0, typeorm_1.InjectRepository)(peritaje_entity_1.Peritaje)),
    __param(2, (0, typeorm_1.InjectRepository)(item_orden_entity_1.ItemOrden)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        item_orden_service_1.ItemOrdenService])
], PeritajeService);
//# sourceMappingURL=peritaje.service.js.map