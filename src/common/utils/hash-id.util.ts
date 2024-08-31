import { Injectable } from '@nestjs/common';
import Hashids from 'hashids/cjs/hashids';

@Injectable()
export class HashId extends Hashids {
  constructor() {
    super(process.env.APP_SECRET, 32);
  }
}