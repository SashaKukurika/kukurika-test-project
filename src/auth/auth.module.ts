import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { Configs } from '../core/configs/constants';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: Configs.JWT_SECRET || 'jwt-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    // JwtModule.register({
    //   secret: Configs.JWT_SECRET || 'defaultSecret',
    //   signOptions: { expiresIn: '1h' },
    // }),
  ],
})
export class AuthModule {}
