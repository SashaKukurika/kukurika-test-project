import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { PrismaService } from '../core/orm/prisma.service';
import { RolesGuard } from './roles.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
