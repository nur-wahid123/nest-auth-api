import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: (req: Request) => req.cookies['jwt'], // Use cookies or authorization header
      secretOrKey: process.env.USER_KEY_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return this.usersService.viewUser(payload.sub);
  }
}
