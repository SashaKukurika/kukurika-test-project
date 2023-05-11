// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
//
// import { AuthService } from './auth.service';
//
// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private authService: AuthService) {}
//   use(req: Request, res: Response, next: NextFunction) {
//     // перевірка наявності токена авторизації у заголовку запиту
//     const token = req.headers.authorization;
//
//     if (!token) {
//       return res.status(401).send('Unauthorized');
//     }
//
//     // перевірка та визначення прав доступу користувача за його ідентифікатором
//     const userId = this.authService.validateToken(token);
//
//     if (!userId) {
//       return res.status(401).send('Unauthorized');
//     }
//
//     req.user = { id: userId };
//     next();
//   }
// }
