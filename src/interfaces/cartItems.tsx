import CategoryItem from "./storeItems";



export default interface CartState {
    itemsInCart: CategoryItem[],
    totalItems: number,
    totalPrice: number,
    showDropdown: boolean
  
  }