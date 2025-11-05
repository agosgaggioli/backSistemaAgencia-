import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SearchVehiculoDto {
  @IsOptional() @IsString() @MaxLength(50)
  Id_Vehiculo?: string;

  @IsOptional() @IsString() @MaxLength(50)
  Marca?: string;

    @IsOptional() @IsString() @MaxLength(50)
  dominio?: string;
}