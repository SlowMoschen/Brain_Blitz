import logo from "../../assets/logo.png";

interface LogoProps {
    className?: string;
    maxWidth?: string;
    maxHeight?: string;
}

export default function Logo(props: LogoProps): JSX.Element {
    return (
        <>
            <img
                src={logo}
                alt="Logo"
                className={props.className}
                style={{
                    maxWidth: props.maxWidth,
                    maxHeight: props.maxHeight,
                }}
            />
        </>
    )
}