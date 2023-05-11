import { Injectable } from '@nestjs/common';

// import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../core/orm/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUserList(): Promise<any> {
    return this.prismaService.user.findMany();
  }

  public async createUser(userData: any): Promise<any> {
    const { name, email, password } = userData;

    return this.prismaService.user.create({
      data: { email, name, password },
    });
  }

  public async findByUserEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }
}
