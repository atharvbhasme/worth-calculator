import './styles.css'

interface InputBoxProps {
    headerText: string
    defaultValue?: string
    inputType?: string
    name: string
    placeholder?: string
    setState: React.Dispatch<React.SetStateAction<any>>
}

export default function InputBox(props: InputBoxProps) {
    const today = new Date().toISOString().split('T')[0]; 
    return (
        <div className="input-box">
            <h3 className="input-header">{props.headerText}</h3>
            <input className="input" type={props.inputType} defaultValue={props.inputType === 'date' ? today :props.defaultValue} name={props.name} placeholder={props.placeholder} onChange={e => props.setState(e.target.value)}/>
        </div>
    )
}
