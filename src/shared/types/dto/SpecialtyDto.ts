export type SpecialtyStatusDto = 0 | 1 | 2 | 3;

export type SpecialtyDto = {
  id: number;
  text: string;
  status: SpecialtyStatusDto;
  categoryId: number;
};
