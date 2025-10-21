export type TIngredient = {
  __v: number;
  _id: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  uuid: string;
};

export type TOrder = {
  name: string;
  order: {
    number: number;
  };
};

export type TResponseIngredient = {
  success: boolean;
  data: TIngredient[];
};

export type TResponseOrders = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type TUser = {
  email: string;
  password: string;
};
