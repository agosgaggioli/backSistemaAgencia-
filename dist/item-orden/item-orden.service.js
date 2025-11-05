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
exports.ItemOrdenService = void 0;
const common_1 = require("@nestjs/common");
const item_orden_entity_1 = require("./entities/item-orden.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ItemOrdenService = class ItemOrdenService {
    repositorioItem;
    constructor(repositorioItem) {
        this.repositorioItem = repositorioItem;
    }
    async create(createItemOrdenDto, Orden) {
        if (!createItemOrdenDto?.length)
            throw new common_1.BadRequestException('Sin items');
        if (!Orden?.Id)
            throw new common_1.BadRequestException('Peritaje inválido');
        const items = createItemOrdenDto.map((dto) => this.repositorioItem.create({
            Descripcion: dto.Descripcion,
            Tipo: dto.Tipo,
            hojaTrabajo: { Id: Orden.Id },
        }));
        return this.repositorioItem.save(items);
    }
    findAll() {
        return `This action returns all itemOrden`;
    }
    findOne(id) {
        return `This action returns a #${id} itemOrden`;
    }
    update(id, updateItemOrdenDto) {
        return `This action updates a #${id} itemOrden`;
    }
    remove(id) {
        return `This action removes a #${id} itemOrden`;
    }
};
exports.ItemOrdenService = ItemOrdenService;
exports.ItemOrdenService = ItemOrdenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(item_orden_entity_1.ItemOrden)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ItemOrdenService);
//# sourceMappingURL=item-orden.service.js.map