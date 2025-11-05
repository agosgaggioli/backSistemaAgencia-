"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemTrabajoService = void 0;
const common_1 = require("@nestjs/common");
let ItemTrabajoService = class ItemTrabajoService {
    create(createItemTrabajoDto) {
        return 'This action adds a new itemTrabajo';
    }
    findAll() {
        return `This action returns all itemTrabajo`;
    }
    findOne(id) {
        return `This action returns a #${id} itemTrabajo`;
    }
    update(id, updateItemTrabajoDto) {
        return `This action updates a #${id} itemTrabajo`;
    }
    remove(id) {
        return `This action removes a #${id} itemTrabajo`;
    }
};
exports.ItemTrabajoService = ItemTrabajoService;
exports.ItemTrabajoService = ItemTrabajoService = __decorate([
    (0, common_1.Injectable)()
], ItemTrabajoService);
//# sourceMappingURL=item-trabajo.service.js.map