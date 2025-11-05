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
exports.ListaRepuestosController = void 0;
const common_1 = require("@nestjs/common");
const lista_repuestos_service_1 = require("./lista-repuestos.service");
const create_lista_repuesto_dto_1 = require("./dto/create-lista-repuesto.dto");
let ListaRepuestosController = class ListaRepuestosController {
    listaRepuestosService;
    constructor(listaRepuestosService) {
        this.listaRepuestosService = listaRepuestosService;
    }
    create(createListaRepuestoDto) {
        return this.listaRepuestosService.create(createListaRepuestoDto);
    }
    findAll() {
        return this.listaRepuestosService.findAll();
    }
    findPeritaje(id) {
        return this.listaRepuestosService.findOneByPeritaje(+id);
    }
    findOne(id) {
        return this.listaRepuestosService.findOne(+id);
    }
    sePidio(id) {
        return this.listaRepuestosService.sePidio(+id);
    }
    llego(id) {
        return this.listaRepuestosService.llego(+id);
    }
};
exports.ListaRepuestosController = ListaRepuestosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lista_repuesto_dto_1.CreateListaRepuestoDto]),
    __metadata("design:returntype", void 0)
], ListaRepuestosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ListaRepuestosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("ByPeritaje/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListaRepuestosController.prototype, "findPeritaje", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListaRepuestosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)("sePidio/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListaRepuestosController.prototype, "sePidio", null);
__decorate([
    (0, common_1.Put)("llego/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListaRepuestosController.prototype, "llego", null);
exports.ListaRepuestosController = ListaRepuestosController = __decorate([
    (0, common_1.Controller)('lista-repuestos'),
    __metadata("design:paramtypes", [lista_repuestos_service_1.ListaRepuestosService])
], ListaRepuestosController);
//# sourceMappingURL=lista-repuestos.controller.js.map