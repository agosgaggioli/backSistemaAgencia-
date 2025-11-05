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
exports.ItemTrabajo = void 0;
const orden_trabajo_entity_1 = require("../../orden-trabajo/entities/orden-trabajo.entity");
const typeorm_1 = require("typeorm");
let ItemTrabajo = class ItemTrabajo {
    Id;
    Descripcion;
    Tipo;
    OrdenTrabajo;
};
exports.ItemTrabajo = ItemTrabajo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ItemTrabajo.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItemTrabajo.prototype, "Descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItemTrabajo.prototype, "Tipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => orden_trabajo_entity_1.OrdenTrabajo, (orden) => orden.itemsOrden, { onDelete: 'CASCADE', }),
    (0, typeorm_1.JoinColumn)({ name: "Orden_Trabajo" }),
    __metadata("design:type", orden_trabajo_entity_1.OrdenTrabajo)
], ItemTrabajo.prototype, "OrdenTrabajo", void 0);
exports.ItemTrabajo = ItemTrabajo = __decorate([
    (0, typeorm_1.Entity)({ name: "ITEMS-ORDEN-TRABAJO" })
], ItemTrabajo);
//# sourceMappingURL=item-trabajo.entity.js.map