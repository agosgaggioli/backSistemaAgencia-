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
exports.ItemRepuesto = void 0;
const lista_repuesto_entity_1 = require("../../lista-repuestos/entities/lista-repuesto.entity");
const typeorm_1 = require("typeorm");
let ItemRepuesto = class ItemRepuesto {
    Id;
    Descripcion;
    Tipo;
    estado;
    listaRepuestos;
};
exports.ItemRepuesto = ItemRepuesto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ItemRepuesto.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItemRepuesto.prototype, "Descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItemRepuesto.prototype, "Tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "PENDIENTE" }),
    __metadata("design:type", String)
], ItemRepuesto.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lista_repuesto_entity_1.ListaRepuesto, (lista) => lista.itemsRepuestos, { onDelete: 'CASCADE', }),
    (0, typeorm_1.JoinColumn)({ name: "ListaRepuestos" }),
    __metadata("design:type", lista_repuesto_entity_1.ListaRepuesto)
], ItemRepuesto.prototype, "listaRepuestos", void 0);
exports.ItemRepuesto = ItemRepuesto = __decorate([
    (0, typeorm_1.Entity)({ name: "itemRepuesto" })
], ItemRepuesto);
//# sourceMappingURL=item-repuesto.entity.js.map