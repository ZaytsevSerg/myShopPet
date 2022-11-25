export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
  }
  
  export enum Status {
    LOADING = 'loading',
    SUCCES = 'succes',
    ERROR = 'error',
  
  }
  
  export type SearchPizzaParams = {
    order: string;
    sortBy: string;
    category: string;
    search: string;
    currentPage: string;
  }

 export interface pizzaSliceState{
    items: Pizza[];
    status: Status
  }