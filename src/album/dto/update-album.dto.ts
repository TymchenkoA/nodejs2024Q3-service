import { IsUUID, IsString, IsInt, Min, IsOptional } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  // @IsNotEmpty({})
  name: string;

  @IsInt()
  @Min(0)
  year: number;

  @IsUUID()
  @IsOptional()
  artistId?: string | null;
}
