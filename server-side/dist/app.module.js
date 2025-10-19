"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const product_module_1 = require("./api/product/product.module");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const isProduction = configService.get('NODE_ENV') === 'production';
                    return {
                        type: 'postgres',
                        host: configService.get('DATABASE_HOST') || 'localhost',
                        port: parseInt(configService.get('DATABASE_PORT') || '5432', 10),
                        username: configService.get('DATABASE_USER') || 'postgres',
                        password: configService.get('DATABASE_PASSWORD'),
                        database: configService.get('DATABASE_NAME') || 'nestjs_db',
                        ssl: isProduction ? {
                            rejectUnauthorized: false,
                        } : false,
                        extra: {
                            max: 20,
                            idleTimeoutMillis: 30000,
                            connectionTimeoutMillis: 2000,
                        },
                        entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
                        synchronize: !isProduction,
                        logging: !isProduction,
                        dropSchema: false,
                    };
                },
            }),
            product_module_1.ProductModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map