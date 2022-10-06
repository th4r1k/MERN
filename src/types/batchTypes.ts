export interface BatchTypes {
  id?: string;
  aviary: string;
  batch: string;
  arrived: { quantity: number; date: string };
  departure: { quantity: number; date: string };
  mortality: [
    { natural: number; locomotor: number; cachectic: number; date: string }
  ];
  weight: [{ value: number; date: string }];
  food: [{ date: string; quantity: number }];
  cost: [{ date: string; value: number }];
  payment: number;
}
