import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
    {
      cors: true,
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  
  const options = new DocumentBuilder()
    .setTitle('API node test')
    .setDescription('API node test description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}`,
    'Bootstrap',
  );
}
bootstrap();
