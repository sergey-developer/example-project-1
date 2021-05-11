import { CategoryStatusDto } from '../dto/CategoryDto';

export type Category = {
  id: number;
  text: string;
  status: CategoryStatusDto;
};
