import { Injectable } from '@nestjs/common';
import { CreateBureauDto } from './dto/create-bureau.dto';
import { UpdateBureauDto } from './dto/update-bureau.dto';

@Injectable()
export class BureauService {
  create(createBureauDto: CreateBureauDto) {
    return 'This action adds a new bureau';
  }

  findAll() {
    return `This action returns all bureau`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bureau`;
  }

  update(id: number, updateBureauDto: UpdateBureauDto) {
    return `This action updates a #${id} bureau`;
  }

  remove(id: number) {
    return `This action removes a #${id} bureau`;
  }
}
