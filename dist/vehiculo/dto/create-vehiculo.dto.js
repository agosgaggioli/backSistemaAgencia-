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
exports.VehiculoUsadoDto = exports.CreateVehiculoDto = void 0;
const class_validator_1 = require("class-validator");
class CreateVehiculoDto {
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
    TipoVehiculo;
}
exports.CreateVehiculoDto = CreateVehiculoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-ZÁÉÍÓÚÑ].*$/, {
        message: 'Marca debe comenzar con mayúscula',
    }),
    __metadata("design:type", String)
], CreateVehiculoDto.prototype, "Marca", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-ZÁÉÍÓÚÑ].*$/, {
        message: 'Marca debe comenzar con mayúscula',
    }),
    __metadata("design:type", String)
], CreateVehiculoDto.prototype, "Modelo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVehiculoDto.prototype, "Version", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-ZÁÉÍÓÚÑ].*$/, {
        message: 'Marca debe comenzar con mayúscula',
    }),
    __metadata("design:type", String)
], CreateVehiculoDto.prototype, "Transmision", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVehiculoDto.prototype, "Combustible", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVehiculoDto.prototype, "Color", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], CreateVehiculoDto.prototype, "Marca_Motor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], CreateVehiculoDto.prototype, "Numero_Motor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], CreateVehiculoDto.prototype, "Marca_Chasis", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], CreateVehiculoDto.prototype, "Numero_Chasis", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], CreateVehiculoDto.prototype, "Moneda", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Number)
], CreateVehiculoDto.prototype, "Valor_Venta", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Number)
], CreateVehiculoDto.prototype, "Valor_Costo", void 0);
class VehiculoUsadoDto {
    Dominio;
    Kilometros;
    Prov_Radic;
    Loc_Radic;
    Observaciones;
    año;
}
exports.VehiculoUsadoDto = VehiculoUsadoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VehiculoUsadoDto.prototype, "Dominio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VehiculoUsadoDto.prototype, "Kilometros", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], VehiculoUsadoDto.prototype, "Prov_Radic", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], VehiculoUsadoDto.prototype, "Loc_Radic", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VehiculoUsadoDto.prototype, "Observaciones", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], VehiculoUsadoDto.prototype, "a\u00F1o", void 0);
//# sourceMappingURL=create-vehiculo.dto.js.map