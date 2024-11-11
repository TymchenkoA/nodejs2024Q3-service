import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty({ message: 'Artist name is required' })
  name: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'Grammy info is required' })
  grammy: boolean;
}
