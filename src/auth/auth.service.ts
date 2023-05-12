import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Configs } from '../core/configs/constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, Number(Configs.BCRYPT_SALT));
  }
  async compareHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  // async singIn(userId: string, roles: Role) {
  //   return this.jwtService.sign({ id: userId, roles });
  // }

  async signIn(username, pass, roles) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.name, sub: user.id, roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
