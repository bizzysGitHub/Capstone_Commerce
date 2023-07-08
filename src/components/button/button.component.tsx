
import { ButtonHTMLAttributes, ReactNode } from 'react'
import './button.style.scss'


// type bizzyButton ={
//     children: ReactNode
//     onClick: () => void
// }

interface customButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    buttonType?: 'google' | 'inverted'

}

const buttonTypeClassName = { google: 'google-sign-in', inverted: 'inverted' }

const Button = ({ children, buttonType, ...otherAttributes }: customButton) => {



    return (
        <button
            className={`${buttonType ? 'button-container ' + buttonTypeClassName[buttonType]: 'button-container'}`}
            {...otherAttributes}
        >
            {children}
        </button>
    )
}

export default Button