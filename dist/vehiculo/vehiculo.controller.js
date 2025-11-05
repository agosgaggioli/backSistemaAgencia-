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
exports.VehiculoController = void 0;
const common_1 = require("@nestjs/common");
const vehiculo_service_1 = require("./vehiculo.service");
const create_vehiculo_dto_1 = require("./dto/create-vehiculo.dto");
let VehiculoController = class VehiculoController {
    vehiculoService;
    constructor(vehiculoService) {
        this.vehiculoService = vehiculoService;
    }
    async create(createVehiculoDto) {
        return await this.vehiculoService.create(createVehiculoDto);
    }
    async findAll() {
        return await this.vehiculoService.findAll();
    }
    async update(id, updateVehiculoDto) {
        return await this.vehiculoService.update(+id, updateVehiculoDto);
    }
    async remove(id) {
        return await this.vehiculoService.remove(+id);
    }
    async search(Id_Vehiculo, marca, dominio) {
        Id_Vehiculo = Id_Vehiculo?.trim();
        marca = marca?.trim();
        dominio = dominio?.trim();
        if (!Id_Vehiculo && !marca && !dominio) {
            throw new common_1.BadRequestException('Enviá al menos Id_Vehiculo o marca o dominio.');
        }
        return this.vehiculoService.search({ Id_Vehiculo, marca, dominio });
    }
    async PanelGeneralVehiculo() {
        const vehiculos = await this.vehiculoService.countVehiculos();
        const vehiculosPeritados = await this.vehiculoService.countVehiculosPeritados();
        return { vehiculos, vehiculosPeritados };
    }
    async findOne(id) {
        return await this.vehiculoService.findOne(+id);
    }
};
exports.VehiculoController = VehiculoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vehiculo_dto_1.CreateVehiculoDto]),
    __metadata("design:returntype", Promise)
], VehiculoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VehiculoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VehiculoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiculoController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('Id_Vehiculo')),
    __param(1, (0, common_1.Query)('marca')),
    __param(2, (0, common_1.Query)('dominio')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], VehiculoController.prototype, "search", null);
__decorate([
    (0, common_1.Get)("Panel"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VehiculoController.prototype, "PanelGeneralVehiculo", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiculoController.prototype, "findOne", null);
exports.VehiculoController = VehiculoController = __decorate([
    (0, common_1.Controller)('vehiculo'),
    __metadata("design:paramtypes", [vehiculo_service_1.VehiculoService])
], VehiculoController);
//# sourceMappingURL=vehiculo.controller.js.map