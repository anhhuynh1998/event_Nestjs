import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port: 3301,
    username: 'root',
    password: 'example',
    database: 'nest-event',
    entities: [Event],
    synchronize: true
  }),
  TypeOrmModule.forFeature([Event])
],
  controllers: [AppController,EventsController],
  providers: [AppService],
})
export class AppModule {}
