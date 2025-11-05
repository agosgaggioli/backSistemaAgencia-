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
exports.OrdenTrabajoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vehiculo_entity_1 = require("../vehiculo/entities/vehiculo.entity");
const peritaje_entity_1 = require("../peritaje/entities/peritaje.entity");
const item_orden_entity_1 = require("../item-orden/entities/item-orden.entity");
const typeorm_2 = require("typeorm");
const orden_trabajo_entity_1 = require("./entities/orden-trabajo.entity");
let OrdenTrabajoService = class OrdenTrabajoService {
    repositorioVehiculo;
    repositorioPeritaje;
    repositorioOrden;
    repositorioOrdenTrabajo;
    constructor(repositorioVehiculo, repositorioPeritaje, repositorioOrden, repositorioOrdenTrabajo) {
        this.repositorioVehiculo = repositorioVehiculo;
        this.repositorioPeritaje = repositorioPeritaje;
        this.repositorioOrden = repositorioOrden;
        this.repositorioOrdenTrabajo = repositorioOrdenTrabajo;
    }
    async create(createOrdenTrabajoDto) {
        const Peritaje = await this.repositorioPeritaje.findOne({
            where: { Id: createOrdenTrabajoDto.IdPeritaje },
        });
        if (!Peritaje)
            throw new common_1.NotFoundException();
        Peritaje.estado = "PROCESO";
        await this.repositorioPeritaje.save(Peritaje);
        const ordenVigente = await this.repositorioOrdenTrabajo.findOne({
            where: {
                peritaje: { Id: Peritaje.Id },
                estado: (0, typeorm_2.Not)('FINALIZADO'),
            },
            relations: { peritaje: true },
        });
        if (ordenVigente) {
            throw new common_1.BadRequestException('El peritaje ya tiene una orden en proceso. Debe finalizarse antes de crear otra.');
        }
        const Vehiculo = await this.repositorioVehiculo.findOne({
            where: { Id_Vehiculo: createOrdenTrabajoDto.IdVehiculo },
        });
        if (!Vehiculo)
            throw new common_1.NotFoundException();
        Vehiculo.UBICACION = createOrdenTrabajoDto.responsable;
        await this.repositorioVehiculo.save(Vehiculo);
        const order = new orden_trabajo_entity_1.OrdenTrabajo();
        order.Fecha = new Date();
        order.peritaje = Peritaje;
        order.Vehiculo = Vehiculo;
        order.responsable = createOrdenTrabajoDto.responsable;
        const newOrder = await this.repositorioOrdenTrabajo.save(order);
        const itemsArray = await Promise.all(createOrdenTrabajoDto.items.map(async (Item) => {
            const item = await this.repositorioOrden.findOne({
                where: { Id: Item.id }
            });
            if (!item)
                throw new common_1.NotFoundException();
            await this.repositorioOrden.update({ Id: Item.id }, { estado: "PROCESO" });
            return item;
        }));
        newOrder.itemsOrden = itemsArray;
        await this.repositorioOrdenTrabajo.save(newOrder);
        return this.repositorioOrdenTrabajo.find({
            where: { Id: newOrder.Id },
            relations: { itemsOrden: true },
        });
    }
    findAll() {
        return this.repositorioOrdenTrabajo.find({ relations: { Vehiculo: { TipoVehiculo: true }, itemsOrden: true } });
    }
    findOne(id) {
        return this.repositorioOrdenTrabajo.findOne({ where: { Id: id }, relations: { Vehiculo: { TipoVehiculo: true }, itemsOrden: true } });
    }
    async updateAddItems(id, updateOrdenTrabajoDto) {
        const orden = await this.repositorioOrdenTrabajo.findOne({ where: { Id: id } });
        if (!orden)
            throw new common_1.BadRequestException("no existe la orden");
        const itemsArray = await Promise.all(updateOrdenTrabajoDto.items.map(async (Item) => {
            const item = await this.repositorioOrden.findOne({
                where: { Id: Item.id }
            });
            if (!item)
                throw new common_1.NotFoundException();
            await this.repositorioOrden.update({ Id: Item.id }, { estado: "ACTIVO" });
            return item;
        }));
        const existentes = await this.repositorioOrden.find({
            where: { orden: { Id: orden.Id } },
        });
        const idsExistentes = new Set(existentes.map(i => i.Id));
        const nuevos = itemsArray.filter(i => !idsExistentes.has(i.Id));
        for (const it of nuevos) {
            it.orden = orden;
            it.estado = 'ACTIVO';
        }
        if (nuevos.length) {
            await this.repositorioOrden.save(nuevos);
        }
        const itemsCombinados = [...existentes, ...nuevos];
        return this.repositorioOrdenTrabajo.find({
            where: { Id: orden.Id },
            relations: { itemsOrden: true },
        });
    }
    async updateFinalizar(id, cos) {
        const orden = await this.repositorioOrdenTrabajo.findOne({
            where: { Id: id },
            relations: { Vehiculo: true, itemsOrden: true, }
        });
        if (!orden)
            throw new common_1.BadRequestException("no existe la orden");
        if (orden.estado === "FINALIZADO")
            throw new common_1.BadRequestException("ya esta finalizada");
        orden.costo = cos.costo;
        orden.estado = "FINALIZADO";
        const ordenDB = await this.repositorioOrdenTrabajo.save(orden);
        const vehiculo = await this.repositorioVehiculo.findOne({
            where: { Id_Vehiculo: orden.Vehiculo.Id_Vehiculo },
        });
        if (!vehiculo)
            throw new common_1.BadRequestException("no existe el vehiculo");
        if (!vehiculo.Valor_Costo)
            vehiculo.Valor_Costo = cos.costo;
        else {
            vehiculo.Valor_Costo = vehiculo.Valor_Costo + cos.costo;
        }
        vehiculo.UBICACION = "SALON";
        await this.repositorioVehiculo.save(vehiculo);
        await this.repositorioOrden.update({ Id: (0, typeorm_2.In)(orden.itemsOrden.map(i => i.Id)) }, { estado: 'FINALIZADO' });
        await this.repositorioVehiculo.save(vehiculo);
        orden.itemsOrden.forEach(it => { it.estado = 'FINALIZADO'; });
        await this.repositorioOrden.save(orden.itemsOrden);
        const peritajeId = orden?.peritaje?.Id;
        const peritajeRefrescada = await this.repositorioPeritaje.findOne({
            where: { Id: peritajeId },
            relations: { itemsOrden: true },
        });
        if (!peritajeRefrescada) {
            throw new common_1.NotFoundException('No existe el peritaje.');
        }
        const allFinished = (peritajeRefrescada.itemsOrden?.length ?? 0) > 0 &&
            peritajeRefrescada.itemsOrden.every(it => it?.estado === 'FINALIZADO');
        await this.repositorioPeritaje.update({ Id: peritajeRefrescada.Id }, { estado: allFinished ? 'FINALIZADO' : 'PENDIENTE' });
        return this.repositorioOrdenTrabajo.find({
            where: { Id: orden.peritaje.Id },
            relations: { itemsOrden: true, Vehiculo: true },
        });
    }
    async updateCosto(id, cos) {
        const orden = await this.repositorioOrdenTrabajo.findOne({
            where: { Id: id },
            relations: { Vehiculo: true, itemsOrden: true }
        });
        if (!orden)
            throw new common_1.BadRequestException("no existe la orden");
        orden.costo = cos.costo;
        const ordenDB = await this.repositorioOrdenTrabajo.save(orden);
        const vehiculo = await this.repositorioVehiculo.findOne({
            where: { Id_Vehiculo: orden.Vehiculo.Id_Vehiculo },
        });
        if (!vehiculo)
            throw new common_1.BadRequestException("no existe el vehiculo");
        if (!vehiculo.Valor_Costo)
            vehiculo.Valor_Costo = cos.costo;
        else {
            vehiculo.Valor_Costo = vehiculo.Valor_Costo + cos.costo;
        }
        await this.repositorioVehiculo.save(vehiculo);
        return this.repositorioOrdenTrabajo.find({
            where: { Id: orden.Id },
            relations: { itemsOrden: true, Vehiculo: true },
        });
    }
    async ordenPeligro() {
        const hoy = new Date();
        const desde = new Date(hoy);
        desde.setDate(hoy.getDate() - 7);
        const hasta = new Date(hoy);
        hasta.setDate(hoy.getDate() - 3);
        const ordenesPeligro = await this.repositorioOrdenTrabajo.count({
            where: { Fecha: (0, typeorm_2.Between)(desde, hasta), estado: (0, typeorm_2.Not)('FINALIZADO') },
        });
        const umbral = new Date(hoy);
        umbral.setDate(hoy.getDate() - 7);
        const ordenesMasDe7 = await this.repositorioOrdenTrabajo.count({
            where: {
                Fecha: (0, typeorm_2.LessThan)(umbral), estado: (0, typeorm_2.Not)('FINALIZADO')
            },
        });
        return { ordenesMasDe7, ordenesPeligro };
    }
    async vehiculosAlerta() {
        const hoy = new Date();
        const desde = new Date(hoy);
        desde.setDate(hoy.getDate() - 7);
        const umbral = new Date(hoy);
        umbral.setDate(hoy.getDate() - 7);
        const ordenesMasDe7 = await this.repositorioOrdenTrabajo.find({
            where: {
                Fecha: (0, typeorm_2.LessThan)(umbral), estado: (0, typeorm_2.Not)('FINALIZADO')
            },
            relations: { Vehiculo: { TipoVehiculo: true } }
        });
        return ordenesMasDe7;
    }
};
exports.OrdenTrabajoService = OrdenTrabajoService;
exports.OrdenTrabajoService = OrdenTrabajoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehiculo_entity_1.Vehiculo)),
    __param(1, (0, typeorm_1.InjectRepository)(peritaje_entity_1.Peritaje)),
    __param(2, (0, typeorm_1.InjectRepository)(item_orden_entity_1.ItemOrden)),
    __param(3, (0, typeorm_1.InjectRepository)(orden_trabajo_entity_1.OrdenTrabajo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdenTrabajoService);
//# sourceMappingURL=orden-trabajo.service.js.map