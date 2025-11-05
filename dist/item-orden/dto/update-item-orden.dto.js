"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateItemOrdenDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_item_orden_dto_1 = require("./create-item-orden.dto");
class UpdateItemOrdenDto extends (0, mapped_types_1.PartialType)(create_item_orden_dto_1.CreateItemOrdenDto) {
}
exports.UpdateItemOrdenDto = UpdateItemOrdenDto;
//# sourceMappingURL=update-item-orden.dto.js.map