import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalsService } from './locals.service';

@ApiTags('Locals')
@Controller('locals')
export class LocalsController {
  constructor(private readonly localsService: LocalsService) {}

  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get()
  findAll() {
    return this.localsService.findAll();
  }
}
