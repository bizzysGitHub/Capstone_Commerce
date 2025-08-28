import styled, { css } from 'styled-components';
import { Text, TextField } from '@radix-ui/themes';


const SubColor = 'hotpink';
const MainColor = 'orange';

export const ShrinkLabelMixin = css`
  top: -17px;
  font-size: 12px;
  color: ${MainColor};
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: 45px 0;
  
`;

export const FormComponent = styled.input`
  background: none;
  background-color: white;
  color: ${SubColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${SubColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ .form-input-label {
    ${ShrinkLabelMixin};
  }
`;

export const PasswordInput = styled(FormComponent)`
  letter-spacing: 0.3em;
`;

export const FormInputLabel = styled.label`
  // color: ${SubColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  &.shrink {
    ${ShrinkLabelMixin};
  }
`;


export const RdFormLabel = styled(Text)`
  font-size: 16px;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 5px;
  transition: 300ms ease all;


  &.shrink {
    top: -17px;
  font-size: 12px;
  }
}
`

export const RdInputField = styled(TextField.Root)`
//figure out on focus
// change that to focus and shrink class added 
  &:focus-within  > ${RdFormLabel}  {
    top: -17px;
  font-size: 12px;
  }
  }
`