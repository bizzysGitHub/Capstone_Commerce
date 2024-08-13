import IStoreItems from "./storeItems";



export default interface CartState {
    itemsInCart: IStoreItems[],
    totalItems: number,
    totalPrice: number,
    showDropdown: boolean
  
  }