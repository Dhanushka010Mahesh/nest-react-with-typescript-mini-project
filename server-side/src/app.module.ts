import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './api/product/product.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Connect PostgreSQL using TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';
        
        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST') || 'localhost',
          port: parseInt(configService.get('DATABASE_PORT') || '5432', 10),
          username: configService.get('DATABASE_USER') || 'postgres',
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME') || 'postgres',
          
          // SSL configuration based on environment
          ssl: isProduction ? {
            rejectUnauthorized: false,
          } : false,
          
          // Connection pool configuration
          extra: {
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
          },
          
          // Entity configuration
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          
          // Development settings
          synchronize: !isProduction, // Only in development
          logging: !isProduction, // Enable logging in development
          dropSchema: false, // Never drop schema automatically
        };
      },
    }),

    ProductModule,
  ],
})
export class AppModule {}