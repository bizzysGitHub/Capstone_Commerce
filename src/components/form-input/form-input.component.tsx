import { InputHTMLAttributes } from "react"
import {GroupContainer,
    FormComponent,
    PasswordInput,
    FormInputLabel
} from'./form-input.style'

interface formIpProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    value: string,

}

//fix this clean it up

// export const FormInput = ({ label, ...otherInputProps }: formIpProps) => {
//     return (
//         <div className="group">
//              <input
//                 className="form-input"
//                 {...otherInputProps} />
//             {label && (
//                 <label className={
//                     `${otherInputProps?.value.length ? 'shrink' : ''} form-input-label`}>
//                     {label}
//                 </label> 
//                 )}
           
//         </div>

//     )

// }

export const FormInput = ({ label, ...otherInputProps }: formIpProps) => {
    return (
      <GroupContainer>
        <FormComponent {...otherInputProps} />
        { label && (
            <FormInputLabel className={`${otherInputProps?.value.length ? 'shrink' : ''} form-input-label`}>
                {label}
            </FormInputLabel>
        )}
      </GroupContainer>
    );
  };