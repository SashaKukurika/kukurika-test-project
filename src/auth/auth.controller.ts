import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Role } from '../core/enums/roles.enum';
import { CreateUserDto } from '../users/dto/users.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @Post('register')
  async registerUser(@Res() res: any, @Body() body: CreateUserDto) {
    let findUser;
    try {
      findUser = await this.userService.findByUserEmail(body.email.trim());
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }

    if (findUser) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'User with this email is already exist' });
    }

    const { name, email, password } = body;

    if (!body.roles) {
      body.roles = Role.SELLER;
    }

    const hashPassword = await this.authService.hash(password);

    const user = await this.userService.createUser({
      name,
      password: hashPassword,
      email,
      roles: body.roles,
    });

    if (user) {
      const token = await this.authService.signIn(
        user.name,
        hashPassword,
        body.roles,
      );
      return res.status(HttpStatus.OK).json({ token });
    }

    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Error.Register_user_failed' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  // async signIn(@Body() signInDto: Record<string, any>) {
  //   console.log(signInDto);
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }
  async login(@Res() res: any, @Body() body) {
    if (!body.email && !body.password) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Error.Check_request_params' });
    }
    const findUser = await this.userService.findByUserEmail(body.email);

    if (!findUser) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Email or password is incorrect' });
    }

    if (await this.authService.compareHash(body.password, findUser.password)) {
      const token = await this.authService.signIn(
        findUser.name,
        findUser.password,
        findUser.roles,
      );

      return res.status(HttpStatus.OK).json({ token });
    }
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Email or password is incorrect' });
  }

  @Roles(Role.ADMIN)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
