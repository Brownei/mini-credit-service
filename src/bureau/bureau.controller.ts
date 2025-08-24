import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BureauService } from './bureau.service';
import { CreateBureauDto } from './dto/create-bureau.dto';

@Controller('bureau')
export class BureauController {
  constructor(private readonly bureauService: BureauService) { }

  @Get()
  create(@Body() createBureauDto: CreateBureauDto) {
    return this.bureauService.create(createBureauDto);
  }
}
