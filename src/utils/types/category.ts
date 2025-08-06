export type CategoryItem = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity?: number;

};
export type CategoryData = {
    previewImg: string,
    items: CategoryItem[],
};

export type CategoryMap = {
    [title: string]: CategoryData
};

export type Categories = {
    categoriesMap: CategoryMap[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string

}

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