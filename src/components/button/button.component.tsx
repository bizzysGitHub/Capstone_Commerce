
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonContainer } from './button.style'




interface customButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    buttonType?: 'google' | 'inverted'

}

const buttonTypeClassName = { google: 'google-sign-in', inverted: 'inverted' }

const Button = ({ children, buttonType, ...otherAttributes }: customButton) => {



    return (
        <ButtonContainer
            className={`${buttonType ? 'button-container ' + buttonTypeClassName[buttonType] : 'button-container'}`}
            {...otherAttributes}
        >
            {children}
        </ButtonContainer>

    )
}

export default Button