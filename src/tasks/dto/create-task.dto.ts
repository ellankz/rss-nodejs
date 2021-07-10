import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsInt()
  order: number;
  @IsString()
  description: string;
  @IsUUID()
  @IsOptional()
  userId: string | null;
  @IsOptional()
  @IsUUID()
  boardId: string;
  @IsOptional()
  @IsUUID()
  columnId: string;
}
