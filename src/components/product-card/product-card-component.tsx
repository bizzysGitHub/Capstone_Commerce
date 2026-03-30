
//TODO: Refactor to use Radix UI components and styling system

// import {
//   ProductCardContainer,
//   ProductImage,
//   AddToCartButton,
//   FooterContainer,
//   ProductName,
//   ProductPrice
// } from './product-card.styles'

import { useAppDispatch } from "../../app/hooks/custom"
import { addItemToCart } from "../../features/cart-items/cartItemSlice"
import { CategoryItem } from "@/utils/types"
import { Box, Card, Inset, Text, Flex, Grid, Button } from '@radix-ui/themes'

type Props = {
  product: CategoryItem
}



const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const { name, price, imageUrl, id } = product;

  const addProductToCart = () => dispatch(addItemToCart(product))

  return (
    <Box>
      <Card size="1" variant="surface" style={{ width: "250px" }}>
        <Flex direction="column" gap="2" style={{ color: "var(--accent-9)" }}>
          <Flex justify="between" align="center" >
            <Text size="3" weight="bold" mb="2" >{name}</Text>
            <Text size="3" weight="bold" mb="2" >${price}</Text>
          </Flex>

          <Inset clip="border-box" side="all" pb="current">
            <img
              src={imageUrl}
              alt={name}
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
                height: "300px",
                backgroundColor: "var(--gray-5)",
                borderRadius: "var(--radius-2)"

              }}
            />
          </Inset>
          <Button
            onClick={addProductToCart}
            size="3"
            variant="surface"
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              backgroundColor: "var(--accent-3)",
            }}

          >
            Add to Cart
          </Button>

        </Flex>
      </Card>
    </Box>
    //     <ProductCardContainer key={id}>
    //     <ProductImage src={imageUrl} alt={name}  />
    //     <FooterContainer>
    //         <ProductName>{name}</ProductName>
    //         <ProductPrice>{price}</ProductPrice>
    //     </FooterContainer>
    //         <AddToCartButton buttonType="inverted" onClick={addProductToCart}>Add to Cart</AddToCartButton>
    // </ProductCardContainer>
  )
}


export default ProductCard