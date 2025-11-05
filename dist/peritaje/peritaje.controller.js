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
exports.PeritajeController = void 0;
const common_1 = require("@nestjs/common");
const peritaje_service_1 = require("./peritaje.service");
const create_peritaje_dto_1 = require("./dto/create-peritaje.dto");
const update_peritaje_dto_1 = require("./dto/update-peritaje.dto");
let PeritajeController = class PeritajeController {
    peritajeService;
    constructor(peritajeService) {
        this.peritajeService = peritajeService;
    }
    create(createPeritajeDto) {
        return this.peritajeService.create(createPeritajeDto);
    }
    findAll() {
        return this.peritajeService.findAll();
    }
    async vehiculosPeritados(year) {
        const y = Number(year) || new Date().getFullYear();
        return this.peritajeService.peritadosPorMes(y);
    }
    async panelPeritajes() {
        return await this.peritajeService.countEstados();
    }
    findOne(id) {
        return this.peritajeService.findOne(+id);
    }
    update(id, updatePeritajeDto) {
        return this.peritajeService.addItemsNoDup(+id, updatePeritajeDto);
    }
    remove(id) {
        return this.peritajeService.remove(+id);
    }
    async find(dominio) {
        return this.peritajeService.buscarPorDominio(dominio ?? '');
    }
};
exports.PeritajeController = PeritajeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_peritaje_dto_1.CreatePeritajeDto]),
    __metadata("design:returntype", void 0)
], PeritajeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PeritajeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats/vehiculos-peritados'),
    __param(0, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PeritajeController.prototype, "vehiculosPeritados", null);
__decorate([
    (0, common_1.Get)("panel"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PeritajeController.prototype, "panelPeritajes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeritajeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_peritaje_dto_1.UpdatePeritajeDto]),
    __metadata("design:returntype", void 0)
], PeritajeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeritajeController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('dominio')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PeritajeController.prototype, "find", null);
exports.PeritajeController = PeritajeController = __decorate([
    (0, common_1.Controller)('peritaje'),
    __metadata("design:paramtypes", [peritaje_service_1.PeritajeService])
], PeritajeController);
//# sourceMappingURL=peritaje.controller.js.map