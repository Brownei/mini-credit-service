import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BureauService } from './bureau.service';
import { CreateBureauDto } from './dto/create-bureau.dto';
import { UpdateBureauDto } from './dto/update-bureau.dto';

@Controller('bureau')
export class BureauController {
  constructor(private readonly bureauService: BureauService) {}

  @Post()
  create(@Body() createBureauDto: CreateBureauDto) {
    return this.bureauService.create(createBureauDto);
  }

  @Get()
  findAll() {
    return this.bureauService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bureauService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBureauDto: UpdateBureauDto) {
    return this.bureauService.update(+id, updateBureauDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bureauService.remove(+id);
  }
}
