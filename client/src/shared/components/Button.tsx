const primaryButton = "btn btn-primary bg-primary font-bold py-2 px-6 m-1 rounded transition ease-in-out duration-400";
const secondaryButton = "btn btn-secondary bg-secondary text-text-secondary font-bold py-2 px-6 m-1 rounded transition ease-in-out duration-400";

interface ButtonProps {
    type?: "submit" | "reset";
    className: 'primary' | 'secondary' | string;
    onClick: () => void;
    maxWidth?: string;
    maxHeight?: string;
    height?: string;
    width?: string;
    children: React.ReactNode;
}

export default function Button(props: ButtonProps): JSX.Element {
    return (
        <>
            <button
                className={props.className + " " + (props.className.includes("primary") ? primaryButton : secondaryButton)}
                onClick={props.onClick}
                style={{
                    maxWidth: props.maxWidth,
                    maxHeight: props.maxHeight,
                    height: props.height,
                    width: props.width
                }}
                type={props.type || "button"}
            >
                {props.children}
            </button>
        </>
    )
}