import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserLoginDto } from './dto/login-user.dto';
import { Response } from 'express';
import { Token } from 'src/common/types/token.type';
import { JwtPayload } from './jwt-payload.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  register(createUserDto: CreateUserDto): Promise<User> {
    this.usersService.isUsernameAndEmailExist(
      createUserDto.username,
      createUserDto.email,
    );
    return this.usersService.createUser(createUserDto);
  }
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findByUsername(username);
    if (user && bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: UserLoginDto): Promise<Token> {
    const user: User = await this.usersService.findByUsername(dto.username);

    const token = this.getToken(user);

    return token;
  }

  async getToken(user: User): Promise<Token> {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.USER_KEY_SECRET,
    });
    return { access_token: token };
  }
}
