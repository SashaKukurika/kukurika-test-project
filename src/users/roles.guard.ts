import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../auth/decorators/roles.decorator';
import { Role } from '../core/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log(requiredRoles); admin
    if (!requiredRoles) {
      return true;
    }
    // console.log(
    //   jwtDecode(
    //     context.switchToHttp().getRequest().rawHeaders[3].split(' ')[1],
    //   ),
    // );
    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
