import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksGateway } from './tasks.gateway';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private tasksGateway: TasksGateway,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.tasksRepository.create({ ...createTaskDto, userId });
    const savedTask = await this.tasksRepository.save(task);
    this.tasksGateway.server.emit('taskCreated', savedTask); // Emit event
    return savedTask;
  }

  async findOne(id: number, userId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException(
        `Task with ID ${id} not found or you do not have access to it`,
      );
    }
    return task;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
  ): Promise<Task> {
    const task = await this.findOne(id, userId);
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    const task = await this.findOne(id, userId);
    await this.tasksRepository.remove(task);
    this.tasksGateway.server.emit('taskDeleted', { id }); // Emit event
    return { message: `Task with ID ${id} has been successfully deleted` };
  }

  async findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { userId } });
  }
}
