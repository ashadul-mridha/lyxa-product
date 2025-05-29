import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { RabbitmqModule } from './config/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
