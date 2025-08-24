import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { StatementsService } from './statements.service';
import { CreateStatementDto } from './dto/create-statement.dto';
import { AuthGuard, CurrentUser } from 'src/auth/gaurd/auth.gaurd';

@Controller('statements')
export class StatementsController {
  constructor(private readonly statementsService: StatementsService) { }

  @Post('/upload')
  @UseGuards(AuthGuard)
  create(@CurrentUser('id') id: number, @Body() createStatementDto: CreateStatementDto) {
    return this.statementsService.create(id, createStatementDto);
  }
}
