import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { CobaDto } from './user/dto/coba.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('coba')
  async coba(@Query() cobaDto: CobaDto) {
    const pw = await this.appService.generate(cobaDto.name);
    return { message: pw };
    // console.log('User');
  }
}
