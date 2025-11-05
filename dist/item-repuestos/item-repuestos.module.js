"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepuestosModule = void 0;
const common_1 = require("@nestjs/common");
const item_repuestos_service_1 = require("./item-repuestos.service");
const item_repuesto_entity_1 = require("./entities/item-repuesto.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ItemRepuestosModule = class ItemRepuestosModule {
};
exports.ItemRepuestosModule = ItemRepuestosModule;
exports.ItemRepuestosModule = ItemRepuestosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([item_repuesto_entity_1.ItemRepuesto])
        ],
        controllers: [],
        providers: [item_repuestos_service_1.ItemRepuestosService],
    })
], ItemRepuestosModule);
//# sourceMappingURL=item-repuestos.module.js.map