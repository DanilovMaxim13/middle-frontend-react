export type TOrderMessage = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
};
