import { Controller, Post, Body } from '@nestjs/common';

import { DealsService } from './deals.service';

import { dealsDto } from './dtos/deals.dto';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post('merge')
  update(@Body() dealsToMerge: dealsDto) {
    return this.dealsService.mergeDeals(dealsToMerge);
  }
}
