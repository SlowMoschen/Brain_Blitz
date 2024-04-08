import { AppBar, Tab, Tabs } from "@mui/material";
import Logo from "../../../../shared/components/Logo";

interface HeaderMenuProps {
  tabs?: string[];
  onChange?: (_e: React.ChangeEvent<object>, newValue: number) => void;
  value?: number;
}

export default function HeaderMenu({ tabs = [], onChange, value }: HeaderMenuProps) {
  return (
    <AppBar position="sticky" sx={{ bgcolor: "background.secondary", p: 1 }}>
      <Logo maxWidth="120px" maxHeight="50px" />
      {tabs.length > 0 && (
        <Tabs value={value} onChange={onChange} textColor="secondary">
          {tabs.map((tab, index) => (
              <Tab key={index} label={tab} sx={{ color: 'text.main'}}/>
          ))}
        </Tabs>
      )}
    </AppBar>
  );
}
