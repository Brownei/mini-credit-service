import { Injectable } from '@nestjs/common';
import { CreateBureauDto } from './dto/create-bureau.dto';

@Injectable()
export class BureauService {
  create(createBureauDto: CreateBureauDto) {
    return 'This action adds a new bureau';
  }
}
