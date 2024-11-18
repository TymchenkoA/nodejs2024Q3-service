import { IsUUID, IsString, IsInt, Min, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  // @IsNotEmpty({})
  @IsOptional()
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
