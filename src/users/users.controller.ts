import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { Role } from '../core/enums/roles.enum';
import { Roles } from './decorators/roles.decorator';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  @Roles(Role.ADMINISTRATOR)
  // @UseGuards()
  async getUserList(@Req() req, @Res() res: any): Promise<User[]> {
    // req.headers.authorization.split()
    return res.status(HttpStatus.OK).json(await this.userService.getUserList());
  }

  @Post()
  async createUser(
    @Req() req: Request,
    @Body() body: User,
    @Res() res: any,
  ): Promise<User> {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }
}
