"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeritajeModule = void 0;
const common_1 = require("@nestjs/common");
const peritaje_service_1 = require("./peritaje.service");
const peritaje_controller_1 = require("./peritaje.controller");
const typeorm_1 = require("@nestjs/typeorm");
const peritaje_entity_1 = require("./entities/peritaje.entity");
const vehiculo_entity_1 = require("../vehiculo/entities/vehiculo.entity");
const item_orden_service_1 = require("../item-orden/item-orden.service");
const item_orden_entity_1 = require("../item-orden/entities/item-orden.entity");
let PeritajeModule = class PeritajeModule {
};
exports.PeritajeModule = PeritajeModule;
exports.PeritajeModule = PeritajeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([peritaje_entity_1.Peritaje, vehiculo_entity_1.Vehiculo, item_orden_entity_1.ItemOrden])
        ],
        controllers: [peritaje_controller_1.PeritajeController],
        providers: [peritaje_service_1.PeritajeService, item_orden_service_1.ItemOrdenService],
    })
], PeritajeModule);
//# sourceMappingURL=peritaje.module.js.map