// export type CategoryStatusDto = 0 | 1 | 2 | 3;

export enum CategoryStatusDto {
  Draft,
  Active,
  Move,
  Remove
}

export type CategoryDto = {
  id: number;
  text: string;
  status: CategoryStatusDto;
};
