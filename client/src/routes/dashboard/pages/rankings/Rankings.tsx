import { useContext, useState } from "react";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import { WindowContext } from "../../../../shared/context/ScreenSize.context";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";

export default function Rankings() {
  const [value, setValue] = useState(0);
  const { width } = useContext(WindowContext);
  const isMobile = width < BREAKPOINTS.lg;
  const tabs = isMobile && ["Deine Rankings", "Daily Stats"] || [];

  const handleTabChange = (_e: React.ChangeEvent<object>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <HeaderMenu tabs={tabs} value={value} onChange={handleTabChange} />
    </>
  );
}
