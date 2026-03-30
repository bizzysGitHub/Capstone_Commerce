import styled from "styled-components";


export const CartItemContainer = styled.div`
width: 100%;
display: flex;
height: 80px;
margin-bottom: 15px;
border: solid 1px var(--accent-12);


img {
  width: 30%;
}

`;
export const ItemDetails = styled.div`
width: 70%;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding: 10px 20px;

`;

export const ItemName = styled.span`
  font-size: 14px;
 color: var(--accent-12)
 `;


export const ItemCount = styled.div`
  color: var(--accent-12) ;
  font-size: 14px;
`;

/*
.cart-item-container {
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;

  img {
    width: 30%;
  }

  .item-details {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px 20px;

    .name {
      font-size: 16px;
    }
  }
}
*/