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
exports.Vehiculo = void 0;
const typeorm_1 = require("typeorm");
const vehiculoUsado_entity_1 = require("./vehiculoUsado.entity");
const orden_trabajo_entity_1 = require("../../orden-trabajo/entities/orden-trabajo.entity");
let Vehiculo = class Vehiculo {
    Id_Vehiculo;
    Marca;
    Modelo;
    Version;
    Transmision;
    Combustible;
    Color;
    Marca_Motor;
    Numero_Motor;
    Marca_Chasis;
    Numero_Chasis;
    Moneda;
    Valor_Venta;
    Valor_Costo;
    Peritada;
    UBICACION;
    TipoVehiculo;
    ordenes;
};
exports.Vehiculo = Vehiculo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vehiculo.prototype, "Id_Vehiculo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Vehiculo.prototype, "Marca", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Vehiculo.prototype, "Modelo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Vehiculo.prototype, "Version", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Vehiculo.prototype, "Transmision", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Vehiculo.prototype, "Combustible", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Vehiculo.prototype, "Color", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'marca_motor',
    }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "Marca_Motor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'numero_motor',
    }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "Numero_Motor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'marca_chasis',
    }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "Marca_Chasis", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'numero_chasis',
    }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "Numero_Chasis", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'moneda',
    }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "Moneda", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Number)
], Vehiculo.prototype, "Valor_Venta", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Number)
], Vehiculo.prototype, "Valor_Costo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "NO" }),
    __metadata("design:type", String)
], Vehiculo.prototype, "Peritada", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "SALON" }),
    __metadata("design:type", String)
], Vehiculo.prototype, "UBICACION", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => vehiculoUsado_entity_1.Usado),
    (0, typeorm_1.JoinColumn)({ name: "TipoVehiculo" }),
    __metadata("design:type", vehiculoUsado_entity_1.Usado)
], Vehiculo.prototype, "TipoVehiculo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orden_trabajo_entity_1.OrdenTrabajo, o => o.Vehiculo),
    __metadata("design:type", Array)
], Vehiculo.prototype, "ordenes", void 0);
exports.Vehiculo = Vehiculo = __decorate([
    (0, typeorm_1.Entity)({ name: "Vehiculos" })
], Vehiculo);
//# sourceMappingURL=vehiculo.entity.js.map