"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaRepuestosModule = void 0;
const common_1 = require("@nestjs/common");
const lista_repuestos_service_1 = require("./lista-repuestos.service");
const lista_repuestos_controller_1 = require("./lista-repuestos.controller");
const item_repuesto_entity_1 = require("../item-repuestos/entities/item-repuesto.entity");
const vehiculo_entity_1 = require("../vehiculo/entities/vehiculo.entity");
const peritaje_entity_1 = require("../peritaje/entities/peritaje.entity");
const lista_repuesto_entity_1 = require("./entities/lista-repuesto.entity");
const typeorm_1 = require("@nestjs/typeorm");
const item_repuestos_service_1 = require("../item-repuestos/item-repuestos.service");
let ListaRepuestosModule = class ListaRepuestosModule {
};
exports.ListaRepuestosModule = ListaRepuestosModule;
exports.ListaRepuestosModule = ListaRepuestosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([peritaje_entity_1.Peritaje, vehiculo_entity_1.Vehiculo, item_repuesto_entity_1.ItemRepuesto, lista_repuesto_entity_1.ListaRepuesto])
        ],
        controllers: [lista_repuestos_controller_1.ListaRepuestosController],
        providers: [lista_repuestos_service_1.ListaRepuestosService, item_repuestos_service_1.ItemRepuestosService],
    })
], ListaRepuestosModule);
//# sourceMappingURL=lista-repuestos.module.js.map