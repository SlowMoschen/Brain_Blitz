
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: 'text' | 'email' | 'password';
    placeholder: string;
    className: string;
}

export default function Input({ type, placeholder, className, name, onChange, ...rest }: InputProps) {

    const capitalize = (s: string | undefined) => {
        if (!s) return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return (
        <>
        <div className="flex flex-col w-full p-5">
            <label htmlFor={name} className="text-xl my-1">{capitalize(name)}</label>
            <input type={type} name={name} placeholder={placeholder} className={className} onChange={onChange} {...rest} />
        </div>
        </>
    );
}