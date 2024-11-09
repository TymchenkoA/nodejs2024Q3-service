import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty({ message: 'Album name is required' })
  name: string;

  @IsInt()
  @Min(0)
  year: number;

  @IsUUID()
  @IsOptional()
  artistId?: string | null;
}
