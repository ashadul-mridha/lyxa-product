import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { ValidationFilter } from './common/filters/validation.filter';
import { createGlobalValidationPipe } from './common/pipes/global-validation-pipe';
import { AppConfigService } from './config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const appConfig: AppConfigService = app.get(AppConfigService);

  // validation filters and pipes
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(createGlobalValidationPipe());

  // swagger implement
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Lyxa Product API')
    .setDescription('Lyxa Product API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.port);
}
bootstrap();
