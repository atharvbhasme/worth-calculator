import './styles.css'

interface SubmitButtonProps {
    buttonText: string
    buttonType?: "submit" | "reset" | "button" | undefined
    onClick?: () => void
}
export default function SubmitButton(props: SubmitButtonProps){
    return(
        <button className="submit-button" type={props.buttonType} onClick={props.onClick}>{props.buttonText}</button>
    )
}