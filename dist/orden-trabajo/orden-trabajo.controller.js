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
exports.OrdenTrabajoController = void 0;
const common_1 = require("@nestjs/common");
const orden_trabajo_service_1 = require("./orden-trabajo.service");
const create_orden_trabajo_dto_1 = require("./dto/create-orden-trabajo.dto");
const update_orden_trabajo_dto_1 = require("./dto/update-orden-trabajo.dto");
const costo_orden_trabajo_dto_1 = require("./dto/costo-orden-trabajo.dto");
let OrdenTrabajoController = class OrdenTrabajoController {
    ordenTrabajoService;
    constructor(ordenTrabajoService) {
        this.ordenTrabajoService = ordenTrabajoService;
    }
    async create(createOrdenTrabajoDto) {
        return await this.ordenTrabajoService.create(createOrdenTrabajoDto);
    }
    async findAll() {
        return await this.ordenTrabajoService.findAll();
    }
    async panelOrdenes() {
        const ordenesRetrasadas = await this.ordenTrabajoService.ordenPeligro();
        return ordenesRetrasadas;
    }
    async vehiculosAlerta() {
        return await this.ordenTrabajoService.vehiculosAlerta();
    }
    async findOne(id) {
        return await this.ordenTrabajoService.findOne(+id);
    }
    update(id, updateOrdenTrabajoDto) {
        return this.ordenTrabajoService.updateAddItems(+id, updateOrdenTrabajoDto);
    }
    updateFinalizar(id, updateOrdenTrabajoDto) {
        return this.ordenTrabajoService.updateFinalizar(+id, updateOrdenTrabajoDto);
    }
    updateCosto(id, updateOrdenTrabajoDto) {
        return this.ordenTrabajoService.updateCosto(+id, updateOrdenTrabajoDto);
    }
};
exports.OrdenTrabajoController = OrdenTrabajoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_orden_trabajo_dto_1.CreateOrdenTrabajoDto]),
    __metadata("design:returntype", Promise)
], OrdenTrabajoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdenTrabajoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("panel"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdenTrabajoController.prototype, "panelOrdenes", null);
__decorate([
    (0, common_1.Get)("vehiculosAlerta"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdenTrabajoController.prototype, "vehiculosAlerta", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdenTrabajoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_orden_trabajo_dto_1.UpdateOrdenTrabajoDto]),
    __metadata("design:returntype", void 0)
], OrdenTrabajoController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('finalizar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, costo_orden_trabajo_dto_1.costoOrdenDto]),
    __metadata("design:returntype", void 0)
], OrdenTrabajoController.prototype, "updateFinalizar", null);
__decorate([
    (0, common_1.Put)('costo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, costo_orden_trabajo_dto_1.costoOrdenDto]),
    __metadata("design:returntype", void 0)
], OrdenTrabajoController.prototype, "updateCosto", null);
exports.OrdenTrabajoController = OrdenTrabajoController = __decorate([
    (0, common_1.Controller)('orden-trabajo'),
    __metadata("design:paramtypes", [orden_trabajo_service_1.OrdenTrabajoService])
], OrdenTrabajoController);
//# sourceMappingURL=orden-trabajo.controller.js.map