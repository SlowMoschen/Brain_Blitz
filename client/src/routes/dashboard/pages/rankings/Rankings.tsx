import { Stack } from "@mui/material";
import { useContext, useState } from "react";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import { WindowContext } from "../../../../shared/context/ScreenSize.context";
import { useRankingsFetch } from "../../../../shared/hooks/api/useRankingsFetch.hook";
import DailyStats from "../../components/DailyStats";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import GeneralRankings from "./components/GeneralRankings";
import PersonalRankings from "./components/PersonalRankings";

export default function Rankings() {
  const [value, setValue] = useState(0);
  const { width } = useContext(WindowContext);
  const {
    personalRankings,
    overallPointsRankings,
    overallPlaytimeRankings,
    overallMostPlayedQuizzesRankings,
  } = useRankingsFetch();
  const isMobile = width < BREAKPOINTS.lg;
  const tabs = (isMobile && ["General", "Deine Rankings", "Daily Stats"]) || [];

  const handleTabChange = (_e: React.ChangeEvent<object>, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <>

      <HeaderMenu tabs={tabs} value={value} onChange={handleTabChange} />

      {/* Desktop view */}
      {!isMobile && (
        <>
          <Stack alignItems={"flex-start"} justifyContent={'flex-start'} width={"100%"} direction={"row"} pb={8}>
            <GeneralRankings
              overallMostPlayedQuizzesRankings={overallMostPlayedQuizzesRankings}
              overallPlaytimeRankings={overallPlaytimeRankings}
              overallPointsRankings={overallPointsRankings}
            />
            <PersonalRankings data={personalRankings}/>
          </Stack>
        </>
      )}

      {/* Mobile View */}
      {isMobile && 
        value === 0 
        ? <GeneralRankings
            overallMostPlayedQuizzesRankings={overallMostPlayedQuizzesRankings}
            overallPlaytimeRankings={overallPlaytimeRankings}
            overallPointsRankings={overallPointsRankings}
          />
        : value === 1
        ? <PersonalRankings data={personalRankings}/>
        : value === 2
        ? <DailyStats />
        : null
      }
    </>
  );
}
