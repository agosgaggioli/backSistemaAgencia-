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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaRepuesto = void 0;
const item_repuesto_entity_1 = require("../../item-repuestos/entities/item-repuesto.entity");
const peritaje_entity_1 = require("../../peritaje/entities/peritaje.entity");
const vehiculo_entity_1 = require("../../vehiculo/entities/vehiculo.entity");
const typeorm_1 = require("typeorm");
let ListaRepuesto = class ListaRepuesto {
    Id;
    fechaCreacion;
    itemsRepuestos;
    Vehiculo;
    Peritaje;
};
exports.ListaRepuesto = ListaRepuesto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ListaRepuesto.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ListaRepuesto.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_repuesto_entity_1.ItemRepuesto, (item) => item.listaRepuestos),
    __metadata("design:type", Array)
], ListaRepuesto.prototype, "itemsRepuestos", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => vehiculo_entity_1.Vehiculo),
    (0, typeorm_1.JoinColumn)({ name: "Vehiculo" }),
    __metadata("design:type", vehiculo_entity_1.Vehiculo)
], ListaRepuesto.prototype, "Vehiculo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => peritaje_entity_1.Peritaje),
    (0, typeorm_1.JoinColumn)({ name: "HojaTrabajo" }),
    __metadata("design:type", peritaje_entity_1.Peritaje)
], ListaRepuesto.prototype, "Peritaje", void 0);
exports.ListaRepuesto = ListaRepuesto = __decorate([
    (0, typeorm_1.Entity)({ name: "listaRepuestos" })
], ListaRepuesto);
//# sourceMappingURL=lista-repuesto.entity.js.map