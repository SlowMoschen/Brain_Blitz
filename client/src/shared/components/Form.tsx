import Button from "./Button";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
    btnText?: string;
}

export default function Form({ onSubmit, className, children, btnText = 'Submit' }: FormProps) {


    return (
        <form className={className} onSubmit={onSubmit}>
            {children}
            <Button type="submit" className='primary w-full my-2' maxWidth="200px" onClick={() => console.log('form submit')} children={btnText} />
        </form>
    );
}