import { IsNotEmpty } from 'class-validator';

export class SignDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
