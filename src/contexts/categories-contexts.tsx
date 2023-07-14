import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import IStoreProducts from "../interfaces/products.js"
import { addCollectionsAndDocuments, getCategoriesAndDocs, } from "../utils/firebase/firebase.js";


type Props = {
    children: ReactNode
}


export default interface ICategoryContext {
    categoriesMap:  object | IStoreProducts
    setCategoriesMap: Dispatch<SetStateAction<IStoreProducts>>
}


export const CategoriesContext = createContext<ICategoryContext>({
    categoriesMap: {},
    setCategoriesMap: () => null
});


export const CategoriesProvider = ({ children }: Props) => {

    useEffect(() => {
        const getDocs = async () => {
            const data = await getCategoriesAndDocs();
            setCategoriesMap(data);
        }

        getDocs();
    }, [])

    const [categoriesMap, setCategoriesMap] = useState({})
    const value = { categoriesMap, setCategoriesMap };


    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>


} 