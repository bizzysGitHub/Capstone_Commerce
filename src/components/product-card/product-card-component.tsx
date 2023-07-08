
import IStoreItems from "../../interfaces/storeItems"
import './product-card.styles.scss'
import Button from "../button/button.component"
import { useContext, useState } from "react"
import { CartContext } from "../../contexts/cart-contexts"

type Props = {
    product: IStoreItems
}




const ProductCard = ({product}:Props) => {
  const { addItemToCart } = useContext(CartContext);
  const {name, price, imageUrl, id} = product;

  const addProductToCart = () => addItemToCart(product)

  return (
    <div className="product-card-container" key={id}>
        <img src={imageUrl} alt={name}  />
        <div className="footer">
            <div className="name">{name}</div>
            <div className="price">{price}</div>
        </div>
            <Button buttonType="inverted" onClick={addProductToCart}>Add to Card</Button>
    </div>
  )
}


export default ProductCard