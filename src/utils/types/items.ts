export type CategoryItem = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity?: number;
};

export type CartState = {
    itemsInCart: CategoryItem[];
    totalItems: number;
    totalPrice: number;
    showDropdown: boolean;
};

export type IStoreProducts = {
    title: string;
    items: CategoryItem[];
};