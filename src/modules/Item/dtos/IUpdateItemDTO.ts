interface IUpdateItemDTO {
  name: string;
  quantity: number;
  cost: number;
  increaseOverCost?: number;
  price: number;
  anotherPrice: number;
  category: string;
}

export { IUpdateItemDTO };
