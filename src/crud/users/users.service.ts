import { Injectable } from '@nestjs/common';
import type { BotUser, BotUserSettings } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async create(
    dto: CreateUserDto,
  ): Promise<BotUser & { settings: BotUserSettings }> {
    return await this.database.botUser.create({
      data: {
        ...dto,
        settings: {
          create: {
            ...dto.settings,
          },
        },
      },
      include: {
        settings: true,
      },
    });
  }

  async findAll(): Promise<BotUser[] | null> {
    return await this.database.botUser.findMany();
  }

  async findById(
    id: number,
  ): Promise<(BotUser & { settings: BotUserSettings }) | null> {
    if (!id) return null;

    const user = await this.database.botUser.findUnique({
      where: { id },
      include: { settings: true },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async updateById(
    id: number,
    dto: UpdateUserDto,
  ): Promise<BotUser & { settings: BotUserSettings }> {
    return await this.database.botUser.update({
      where: { id },
      data: {
        ...dto,
        settings: {
          update: {
            ...dto.settings,
          },
        },
      },
      include: {
        settings: true,
      },
    });
  }

  async removeById(
    id: number,
  ): Promise<BotUser & { settings: BotUserSettings }> {
    return await this.database.botUser.delete({
      where: { id },
      include: { settings: true },
    });
  }

  async findAllAdmins(): Promise<
    (BotUser & { settings: BotUserSettings | null })[]
  > {
    return await this.database.botUser.findMany({
      where: { isAdmin: true },
      include: { settings: true },
    });
  }
}
