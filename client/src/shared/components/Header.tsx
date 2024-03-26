
interface HeaderProps {
    content: string;
    className: 'semi-big' | 'big' | 'small' | 'semi-small' | 'tiny';
}

export default function Header(props: HeaderProps): JSX.Element {

    function getHeaderClasses(classname: string): string {
        switch (classname) {
            case 'semi-big':
                return 'text-2xl font-bold';
            case 'big':
                return 'text-4xl font-bold';
            case 'small':
                return 'text-lg font-bold';
            case 'semi-small':
                return 'text-base font-bold';
            case 'tiny':
                return 'text-sm font-bold';
            default:
                return 'text-3xl font-bold';
        }
    }

    return (
        <header className={`text-center ${getHeaderClasses(props.className)}`}>
            {props.content}
        </header>
    )
}