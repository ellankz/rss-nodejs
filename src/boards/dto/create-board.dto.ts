import { CreateColumnDto } from './create-column.dto';

export class CreateBoardDto {
  title: string;
  columns: CreateColumnDto[];
}
