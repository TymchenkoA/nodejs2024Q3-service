import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty({ message: 'Track name is required' })
  name: string;

  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @IsUUID()
  @IsOptional()
  albumId?: string | null;

  @IsInt()
  @Min(0)
  duration: number;
}
