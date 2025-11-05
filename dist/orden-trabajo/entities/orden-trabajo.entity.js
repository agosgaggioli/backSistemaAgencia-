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
exports.OrdenTrabajo = void 0;
const item_orden_entity_1 = require("../../item-orden/entities/item-orden.entity");
const peritaje_entity_1 = require("../../peritaje/entities/peritaje.entity");
const vehiculo_entity_1 = require("../../vehiculo/entities/vehiculo.entity");
const typeorm_1 = require("typeorm");
let OrdenTrabajo = class OrdenTrabajo {
    Id;
    responsable;
    Fecha;
    costo;
    estado;
    peritaje;
    Vehiculo;
    itemsOrden;
};
exports.OrdenTrabajo = OrdenTrabajo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrdenTrabajo.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrdenTrabajo.prototype, "responsable", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], OrdenTrabajo.prototype, "Fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], OrdenTrabajo.prototype, "costo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "PROCESO" }),
    __metadata("design:type", String)
], OrdenTrabajo.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => peritaje_entity_1.Peritaje, (peritaje) => peritaje.ordenes, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'peritajeId' }),
    __metadata("design:type", peritaje_entity_1.Peritaje)
], OrdenTrabajo.prototype, "peritaje", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehiculo_entity_1.Vehiculo, v => v.ordenes, {
        nullable: false,
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'Id_Vehiculo' }),
    __metadata("design:type", vehiculo_entity_1.Vehiculo)
], OrdenTrabajo.prototype, "Vehiculo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_orden_entity_1.ItemOrden, (item) => item.orden),
    __metadata("design:type", Array)
], OrdenTrabajo.prototype, "itemsOrden", void 0);
exports.OrdenTrabajo = OrdenTrabajo = __decorate([
    (0, typeorm_1.Entity)({ name: "OrdenesTrabajo" })
], OrdenTrabajo);
//# sourceMappingURL=orden-trabajo.entity.js.map