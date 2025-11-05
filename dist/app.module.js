"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = __importDefault(require("./config/typeorm"));
const vehiculo_module_1 = require("./vehiculo/vehiculo.module");
const peritaje_module_1 = require("./peritaje/peritaje.module");
const item_orden_module_1 = require("./item-orden/item-orden.module");
const orden_trabajo_module_1 = require("./orden-trabajo/orden-trabajo.module");
const item_trabajo_module_1 = require("./item-trabajo/item-trabajo.module");
const lista_repuestos_module_1 = require("./lista-repuestos/lista-repuestos.module");
const item_repuestos_module_1 = require("./item-repuestos/item-repuestos.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_2.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (Config) => Config.get('typeorm'),
            }),
            vehiculo_module_1.VehiculoModule,
            peritaje_module_1.PeritajeModule,
            item_orden_module_1.ItemOrdenModule,
            orden_trabajo_module_1.OrdenTrabajoModule,
            item_trabajo_module_1.ItemTrabajoModule,
            lista_repuestos_module_1.ListaRepuestosModule,
            item_repuestos_module_1.ItemRepuestosModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map