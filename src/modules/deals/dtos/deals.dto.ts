import { IsNotEmpty } from 'class-validator';

export class dealsDto {
  @IsNotEmpty()
  targetDealId: number;

  @IsNotEmpty()
  originDealId: number;
}
