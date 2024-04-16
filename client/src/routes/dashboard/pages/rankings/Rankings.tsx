import { Stack } from "@mui/material";
import { useContext, useState } from "react";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import { WindowContext } from "../../../../shared/context/ScreenSize.context";
import { useRankingQueries } from "../../../../shared/hooks/api/useRankingQueries.hook";
import DailyStats from "../../components/DailyStats";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import GeneralRankings from "./components/GeneralRankings";
import PersonalRankings from "./components/PersonalRankings";

export default function Rankings() {
  const [value, setValue] = useState(0);
  const { width } = useContext(WindowContext);
  const { personalRankings } = useRankingQueries().usePersonalRankings();
  const { overallPointsRankings } = useRankingQueries().useOverallPointsRankings();
  const { overallPlaytimeRankings } = useRankingQueries().useOverallPlaytimeRankings();
  const { overallMostPlayedQuizzesRankings } = useRankingQueries().useOverallMostPlayedQuizzesRankings();
  const isMobile = width < BREAKPOINTS.lg;
  const tabs = (isMobile && ["Global", "Deine Rankings", "Daily Stats"]) || [];

  const handleTabChange = (_e: React.ChangeEvent<object>, newValue: number) => {
    setValue(newValue);
  };

  const getMobileView = (tabValue: number) => {
    switch (tabValue) {
      case 0:
        return (
          <GeneralRankings
            overallMostPlayedQuizzesRankings={overallMostPlayedQuizzesRankings}
            overallPlaytimeRankings={overallPlaytimeRankings}
            overallPointsRankings={overallPointsRankings}
          />
        );
      case 1:
        return <PersonalRankings data={personalRankings} />;
      case 2:
        return <DailyStats />;
      default:
        return null;
    }
  };

  return (
    <>
      <HeaderMenu tabs={tabs} value={value} onChange={handleTabChange} />

      {/* Desktop view */}
      {!isMobile && (
        <>
          <Stack
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            width={"100%"}
            direction={"row"}
            pb={8}
          >
            <GeneralRankings
              overallMostPlayedQuizzesRankings={overallMostPlayedQuizzesRankings}
              overallPlaytimeRankings={overallPlaytimeRankings}
              overallPointsRankings={overallPointsRankings}
            />
            <PersonalRankings data={personalRankings} />
          </Stack>
        </>
      )}

      {/* Mobile View */}
      {isMobile ? getMobileView(value) : null}
    </>
  );
}
