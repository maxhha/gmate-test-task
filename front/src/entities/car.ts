export type Model = {
  id: number;
  name: string;
};

export type Car = {
  id: number;
  name: string;
  model: Model;
  color: string;
  year: number;
  image: string;
};
