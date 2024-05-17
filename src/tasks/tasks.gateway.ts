import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@WebSocketGateway()
export class TasksGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly tasksService: TasksService) {}

  @SubscribeMessage('createTask')
  async handleCreateTask(
    @MessageBody() data: { createTaskDto: CreateTaskDto; userId: number },
  ) {
    const { createTaskDto, userId } = data;
    const task = await this.tasksService.create(createTaskDto, userId);
    this.server.emit('taskCreated', task);
    return task;
  }
}
