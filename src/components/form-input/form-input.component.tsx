import { InputHTMLAttributes, ReactElement } from "react"
import {
  GroupContainer,
  FormComponent,
  PasswordInput,
  FormInputLabel,
  RdFormLabel,
  RdInputField
} from './form-input.style'
import { Text, TextField, } from "@radix-ui/themes"
import { TextProps } from "@radix-ui/themes/components/callout";


interface formIpProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  value: string,

}



interface RdFormProps extends React.ComponentProps<typeof TextField.Root> {
  label: string,
  value?: string,
  RdLabelProps?: TextProps
}



export const FormInput = ({ label, ...otherInputProps }: formIpProps) => {
  return (
    <GroupContainer>
      <FormComponent {...otherInputProps} />
      {label && (
        <FormInputLabel className={`${otherInputProps?.value.length ? 'shrink' : ''} form-input-label`}>
          {label}
        </FormInputLabel>
      )}
    </GroupContainer>
  );
};

export const RdFormInput = ({ label, RdLabelProps, ...RdInputProps }: RdFormProps) => (
    <GroupContainer>
      <RdInputField  {...RdInputProps}>
        {label && (
            <RdFormLabel className={`${(RdInputProps?.value as string).length ? 'shrink' : ''} form-input-label`}{...RdLabelProps}>
              {label}
            </RdFormLabel>
        )}
      </RdInputField>
    </GroupContainer>
  );


