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
exports.Peritaje = void 0;
const item_orden_entity_1 = require("../../item-orden/entities/item-orden.entity");
const orden_trabajo_entity_1 = require("../../orden-trabajo/entities/orden-trabajo.entity");
const vehiculo_entity_1 = require("../../vehiculo/entities/vehiculo.entity");
const typeorm_1 = require("typeorm");
let Peritaje = class Peritaje {
    Id;
    responsable;
    Fecha;
    FechaModificacion;
    estado;
    ordenes;
    itemsOrden;
    Vehiculo;
};
exports.Peritaje = Peritaje;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Peritaje.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Peritaje.prototype, "responsable", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Peritaje.prototype, "Fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Peritaje.prototype, "FechaModificacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "PENDIENTE" }),
    __metadata("design:type", String)
], Peritaje.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orden_trabajo_entity_1.OrdenTrabajo, (orden) => orden.peritaje, {
        cascade: ['insert', 'update'],
    }),
    __metadata("design:type", Array)
], Peritaje.prototype, "ordenes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_orden_entity_1.ItemOrden, (item) => item.hojaTrabajo),
    __metadata("design:type", Array)
], Peritaje.prototype, "itemsOrden", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => vehiculo_entity_1.Vehiculo),
    (0, typeorm_1.JoinColumn)({ name: "Vehiculo" }),
    __metadata("design:type", vehiculo_entity_1.Vehiculo)
], Peritaje.prototype, "Vehiculo", void 0);
exports.Peritaje = Peritaje = __decorate([
    (0, typeorm_1.Entity)({ name: "Peritajes" })
], Peritaje);
//# sourceMappingURL=peritaje.entity.js.map