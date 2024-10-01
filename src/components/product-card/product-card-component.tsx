
import IStoreItems from "../../interfaces/storeItems"
import {ProductCardContainer,
  ProductImage,
  AddToCartButton,
  FooterContainer,
  ProductName,
  ProductPrice} from './product-card.styles'
import { useAppDispatch } from "../../app/hooks/custom"
import { addItemToCart } from "../../features/cart-items/cartItemSlice"

type Props = {
    product: IStoreItems
}



const ProductCard = ({product}:Props) => {
    const dispatch = useAppDispatch();
  const {name, price, imageUrl, id} = product;

  const addProductToCart = () => dispatch(addItemToCart(product))

  return (
    <ProductCardContainer key={id}>
    <ProductImage src={imageUrl} alt={name}  />
    <FooterContainer>
        <ProductName>{name}</ProductName>
        <ProductPrice>{price}</ProductPrice>
    </FooterContainer>
        <AddToCartButton buttonType="inverted" onClick={addProductToCart}>Add to Cart</AddToCartButton>
</ProductCardContainer>
  )
}


export default ProductCard