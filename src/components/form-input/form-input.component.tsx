import { InputHTMLAttributes } from "react"
import './form-input.style.scss'

interface iHateTypescriptShxt extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    value: string,

}

//fix this clean it up

export const FormInput = ({ label, ...otherInputProps }: iHateTypescriptShxt) => {
    return (
        <div className="group">
             <input
                className="form-input"
                {...otherInputProps} />
            {label && (
                <label className={
                    `${otherInputProps?.value.length ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label> 
                )}
           
        </div>

    )

}