export type TOrderMessage = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: 'done' | 'pending' | 'created';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};
