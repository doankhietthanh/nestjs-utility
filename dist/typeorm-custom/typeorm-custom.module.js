"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var TypeOrmCustomModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmCustomModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let TypeOrmCustomModule = TypeOrmCustomModule_1 = class TypeOrmCustomModule {
    static forFeature(repoClasses) {
        const providers = repoClasses.map((repoClass) => {
            return {
                inject: [core_1.ModuleRef],
                provide: repoClass,
                useFactory(moduleRef) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let repo = moduleRef.get(repoClass, { strict: false });
                        if (!repo)
                            repo = yield moduleRef.create(repoClass);
                        return repo;
                    });
                },
            };
        });
        return {
            module: TypeOrmCustomModule_1,
            providers,
            exports: [...repoClasses],
        };
    }
};
TypeOrmCustomModule = TypeOrmCustomModule_1 = __decorate([
    (0, common_1.Module)({})
], TypeOrmCustomModule);
exports.TypeOrmCustomModule = TypeOrmCustomModule;
