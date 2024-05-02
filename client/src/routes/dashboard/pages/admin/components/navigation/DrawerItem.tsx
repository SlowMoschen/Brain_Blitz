import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, ListItemButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

interface ListItemProps {
    name: string;
    path?: string;
    children?: ListItemProps[];
    sx?: Record<string, string | number>;
    onClick?: () => void;
}

export default function DrawerItem({ name, children, path, sx, onClick }: ListItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const redirect = useNavigate();

    const handleItemClick = () => {
        if (path) {
            redirect(path);
            if (onClick) onClick();
        }
        setIsOpen(!isOpen);
    }

    const justifyContent = children ? 'space-between' : 'flex-start';

    return (
        <>
            <ListItemButton onClick={handleItemClick} sx={{ py: 1, justifyContent, ...sx }}>
                {name}
                {
                    children && (isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)
                }
            </ListItemButton>
            {
                children && <Divider orientation='horizontal' variant='fullWidth' sx={{ bgcolor: 'accent.light'}}/>
            }
            {isOpen && children && children.map((child, index) => (
                <DrawerItem key={index} {...child} sx={{ pl: 4} } onClick={onClick} />
            ))}
        </>
    )
}