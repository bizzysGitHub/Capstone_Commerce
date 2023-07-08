import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import SHOP_DATA from '../shop-data.json'
import IStoreItems from "./../interfaces/storeItems"

type Props = {
    children: ReactNode
}


export default interface IProductContext  {
    products:IStoreItems[],
    setProducts: Dispatch<SetStateAction<IStoreItems[]>>
}


export const ProductsContext = createContext<IProductContext>({
    products:[],
    setProducts :() => null
});


export const  ProductsProvider = ({children}:Props) => {
    const [products, setProducts] = useState(SHOP_DATA)
    const value = {products, setProducts};

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>


} 