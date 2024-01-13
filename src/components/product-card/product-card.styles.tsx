import styled from 'styled-components';
import Button from "../button/button.component"

export const ProductImage = styled.img`
  width: 100%;
  height: 95%;
  object-fit: cover;
  margin-bottom: 5px;
  `;
  
  export const AddToCartButton = styled(Button)`
  width: 80%;
  opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  `;

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  &:hover{
    ${ProductImage}{
        opacity: 0.8;
    }
  
      ${AddToCartButton}{
        opacity: 0.85;
        display: flex;
      }
    
  }
`;


export const FooterContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const ProductName = styled.div`
  width: 90%;
  margin-bottom: 15px;
`;

export const ProductPrice = styled.div`
  width: 10%;
`;

