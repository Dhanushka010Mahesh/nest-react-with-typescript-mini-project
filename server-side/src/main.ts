import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
 
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.enableCors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
});
  await app.listen(process.env.PORT || 7001);

  console.log(`Server is running on port http://localhost:${process.env.PORT || 7001}`);
}
bootstrap();
