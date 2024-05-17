import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksGateway } from './tasks.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, TasksGateway],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
