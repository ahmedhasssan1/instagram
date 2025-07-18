import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.enableCors({
  origin: 'http://localhost:3000/graphql',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
});
  const port=process.env.PORT ?? 3000

  await app.listen(port,()=>console.log(`running on port ${port}`));
}
bootstrap();
