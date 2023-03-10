import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { AddressDTO } from './address-dto';
import { Type } from 'class-transformer';
import { Match } from 'src/core/constraints/match.decorator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  readonly name: string;

  @IsUrl()
  @IsString()
  @IsOptional()
  readonly profile_pic: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Password must contain at least 8 characters, containing 1 uppercase letter. 1 lowercase letter, 1 number, and 1 special character / example: @Example123',
  })
  readonly password: string;

  @IsString()
  @Match('password', { message: 'passwords do not match' })
  readonly confirm_password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @IsOptional()
  readonly phone: string;

  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO; // TODO: arrumar posteriormente tipagem
}
