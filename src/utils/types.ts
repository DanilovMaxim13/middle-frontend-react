export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
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
