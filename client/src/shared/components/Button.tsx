const primaryButton = "btn btn-primary bg-primary font-bold py-2 px-6 mx-1 rounded transition ease-in-out duration-500";
const secondaryButton = "btn btn-secondary bg-secondary text-text-secondary font-bold py-2 px-6 mx-1 rounded transition ease-in-out duration-500";

interface ButtonProps {
    type?: "submit" | "reset";
    className: 'primary' | 'secondary';
    onClick: () => void;
    maxWidth?: string;
    maxHeight?: string;
    children: React.ReactNode;
}

export default function Button(props: ButtonProps): JSX.Element {
    return (
        <>
            <button
                className={props.className === 'primary' ? primaryButton : secondaryButton}
                onClick={props.onClick}
                style={{
                    maxWidth: props.maxWidth,
                    maxHeight: props.maxHeight,
                }}
                type={props.type || "button"}
            >
                {props.children}
            </button>
        </>
    )
}