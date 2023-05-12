import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

// import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../core/orm/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(name: string): Promise<User | undefined> {
    return this.prismaService.user.findFirst({ where: { name } });
  }

  public async getUserList(): Promise<any> {
    return this.prismaService.user.findMany();
  }

  public async createUser(userData: any): Promise<any> {
    const { name, email, password, accessToken, roles } = userData;

    return this.prismaService.user.create({
      data: { email, name, password, accessToken, roles },
    });
  }

  public async findByUserEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }
}
