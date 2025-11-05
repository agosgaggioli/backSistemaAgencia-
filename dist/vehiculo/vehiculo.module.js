"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiculoModule = void 0;
const common_1 = require("@nestjs/common");
const vehiculo_service_1 = require("./vehiculo.service");
const vehiculo_controller_1 = require("./vehiculo.controller");
const typeorm_1 = require("@nestjs/typeorm");
const vehiculo_entity_1 = require("./entities/vehiculo.entity");
const vehiculoUsado_entity_1 = require("./entities/vehiculoUsado.entity");
let VehiculoModule = class VehiculoModule {
};
exports.VehiculoModule = VehiculoModule;
exports.VehiculoModule = VehiculoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([vehiculo_entity_1.Vehiculo, vehiculoUsado_entity_1.Usado])
        ],
        controllers: [vehiculo_controller_1.VehiculoController],
        providers: [vehiculo_service_1.VehiculoService],
    })
], VehiculoModule);
//# sourceMappingURL=vehiculo.module.js.map