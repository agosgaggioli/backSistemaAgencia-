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
exports.Usado = void 0;
const typeorm_1 = require("typeorm");
let Usado = class Usado {
    Id_Vehiculo;
    Dominio;
    Kilometros;
    Prov_Radic;
    Loc_Radic;
    Observaciones;
    año;
};
exports.Usado = Usado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usado.prototype, "Id_Vehiculo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Usado.prototype, "Dominio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usado.prototype, "Kilometros", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'prov_radic',
    }),
    __metadata("design:type", Object)
], Usado.prototype, "Prov_Radic", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'loc_radic',
    }),
    __metadata("design:type", Object)
], Usado.prototype, "Loc_Radic", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255
    }),
    __metadata("design:type", String)
], Usado.prototype, "Observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Usado.prototype, "a\u00F1o", void 0);
exports.Usado = Usado = __decorate([
    (0, typeorm_1.Entity)({ name: "VehiculoUsado" })
], Usado);
//# sourceMappingURL=vehiculoUsado.entity.js.map