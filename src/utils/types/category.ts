export type CategoryItem = {
    name: string,
    imageUrl: string,
    price: number,
    id: number,
    quantity?:number

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

export type FormattedCatMap = {
    name: CategoryMap
}