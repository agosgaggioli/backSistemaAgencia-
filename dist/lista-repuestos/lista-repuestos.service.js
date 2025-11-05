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
exports.ListaRepuestosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vehiculo_entity_1 = require("../vehiculo/entities/vehiculo.entity");
const typeorm_2 = require("typeorm");
const peritaje_entity_1 = require("../peritaje/entities/peritaje.entity");
const item_repuesto_entity_1 = require("../item-repuestos/entities/item-repuesto.entity");
const lista_repuesto_entity_1 = require("./entities/lista-repuesto.entity");
const item_repuestos_service_1 = require("../item-repuestos/item-repuestos.service");
let ListaRepuestosService = class ListaRepuestosService {
    repositorioVehiculo;
    repositorioPeritaje;
    repositorioItem;
    repositorioLista;
    serviceItems;
    constructor(repositorioVehiculo, repositorioPeritaje, repositorioItem, repositorioLista, serviceItems) {
        this.repositorioVehiculo = repositorioVehiculo;
        this.repositorioPeritaje = repositorioPeritaje;
        this.repositorioItem = repositorioItem;
        this.repositorioLista = repositorioLista;
        this.serviceItems = serviceItems;
    }
    async create(createListaRepuestoDto) {
        const peritaje = await this.repositorioPeritaje.findOne({
            where: { Id: createListaRepuestoDto.idPeritaje },
            relations: { Vehiculo: true },
        });
        if (!peritaje)
            throw new common_1.NotFoundException('Peritaje inexistente');
        const vehiculo = await this.repositorioVehiculo.findOne({
            where: { Id_Vehiculo: peritaje.Vehiculo.Id_Vehiculo },
        });
        if (!vehiculo)
            throw new common_1.NotFoundException('vehiculo inexistente');
        const { itemsRepuestos } = createListaRepuestoDto;
        let lista = await this.repositorioLista.findOne({
            where: { Peritaje: { Id: peritaje.Id } },
            relations: { itemsRepuestos: true, Vehiculo: true, Peritaje: true },
        });
        if (lista) {
            const existentes = new Set((lista.itemsRepuestos ?? []).map(it => `${(it.Descripcion || '').trim().toLowerCase()}|${(it.Tipo || '').trim().toLowerCase()}`));
            const nuevos = (itemsRepuestos ?? []).filter(dto => {
                const key = `${(dto.Descripcion || '').trim().toLowerCase()}|${(dto.Tipo || '').trim().toLowerCase()}`;
                return !existentes.has(key);
            });
            if (nuevos.length) {
                const agregados = await this.serviceItems.create(nuevos, lista);
                lista.itemsRepuestos = [...(lista.itemsRepuestos ?? []), ...agregados];
                await this.repositorioLista.save(lista);
            }
            return this.repositorioLista.findOne({
                where: { Id: Number(lista.Id) },
                relations: { itemsRepuestos: true, Vehiculo: true, Peritaje: true },
            });
        }
        lista = this.repositorioLista.create({
            fechaCreacion: new Date(),
            Vehiculo: vehiculo,
            Peritaje: peritaje,
        });
        const listaGuardada = await this.repositorioLista.save(lista);
        const items = await this.serviceItems.create(itemsRepuestos ?? [], listaGuardada);
        listaGuardada.itemsRepuestos = items;
        await this.repositorioLista.save(listaGuardada);
        return this.repositorioLista.findOne({
            where: { Id: Number(listaGuardada.Id) },
            relations: { itemsRepuestos: true, Vehiculo: true, Peritaje: true },
        });
    }
    findAll() {
        return `This action returns all listaRepuestos`;
    }
    findOne(id) {
        return this.repositorioLista.findOne({
            where: { Id: id },
            relations: { itemsRepuestos: true, Vehiculo: true },
        });
    }
    async findOneByPeritaje(id) {
        return this.repositorioLista.findOne({
            where: { Peritaje: { Id: id } },
            relations: { itemsRepuestos: true, Vehiculo: true, Peritaje: true },
        });
    }
    async sePidio(id) {
        const item = await this.repositorioItem.findOne({ where: { Id: id } });
        if (!item)
            throw new common_1.NotFoundException("Item no encontrado");
        item.estado = "PEDIDO";
        await this.repositorioItem.save(item);
        return item;
    }
    async llego(id) {
        const item = await this.repositorioItem.findOne({ where: { Id: id } });
        if (!item)
            throw new common_1.NotFoundException("Item no encontrado");
        item.estado = "RECIBIDO";
        await this.repositorioItem.save(item);
        return item;
    }
    update(id, updateListaRepuestoDto) {
        return `This action updates a #${id} listaRepuesto`;
    }
    remove(id) {
        return `This action removes a #${id} listaRepuesto`;
    }
};
exports.ListaRepuestosService = ListaRepuestosService;
exports.ListaRepuestosService = ListaRepuestosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehiculo_entity_1.Vehiculo)),
    __param(1, (0, typeorm_1.InjectRepository)(peritaje_entity_1.Peritaje)),
    __param(2, (0, typeorm_1.InjectRepository)(item_repuesto_entity_1.ItemRepuesto)),
    __param(3, (0, typeorm_1.InjectRepository)(lista_repuesto_entity_1.ListaRepuesto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        item_repuestos_service_1.ItemRepuestosService])
], ListaRepuestosService);
//# sourceMappingURL=lista-repuestos.service.js.map