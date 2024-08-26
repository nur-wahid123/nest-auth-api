import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserLoginDto } from './dto/login-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findByUsername(username);
    if (user && bcrypt.compare(pass, user.password)) {
      // In a real application, use bcrypt to compare passwords
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: UserLoginDto, res: Response) {
    const user: User = await this.usersService.findByUsername(dto.username);
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.USER_KEY_SECRET,
    });
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return res.send({ message: 'Login successfull' });
  }
}
