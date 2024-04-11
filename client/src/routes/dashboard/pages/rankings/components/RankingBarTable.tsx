import { Stack } from "@mui/material";
import {
  IMostPlayedQuizRanking,
  IPointsRanking,
  IPlaytimeRanking,
} from "../../../../../shared/types/Rankings";
import ContainerWithHeader from "../../../components/ContainerWithHeader";
import RankingBar from "./RankingBar";
import { useTimeParser } from "../../../../../shared/hooks/timer/useTimeParser.hook";

interface RankingBarTableProps<T> {
  data: T[];
  title: string;
}

/**
 * @description This function transforms the data to be used in the RankingBar component
 * - If the data is empty, it returns null
 * - If the data has only one element, it adds two more elements to the array - this is to ensure that the RankingBar component always has three elements to display
 * @param data - The data to be transformed - this can be of type IPlaytimeRanking, IMostPlayedQuizRanking, or IPointsRanking
 * @returns The transformed data
 */
function transformData(data: (IPlaytimeRanking | IMostPlayedQuizRanking | IPointsRanking)[]) {
  if (!data || data.length === 0) return null;

  const isPointsRanking = "points" in data[0];
  const isPlaytimeRanking = "playtime" in data[0];
  const isMostPlayedQuizRanking = "times_played" in data[0];

  const placeholderData = {
    points: { first_name: "", points: 0, user_id: "" },
    playtime: { first_name: "", playtime: 0, user_id: "" },
    times_played: { quiz_name: "", times_played: 0, quiz_id: "" },
  };

  const filteredData = data.filter((ranking) => {
    if ("points" in ranking) return ranking.points !== 0;
    if ("playtime" in ranking) return ranking.playtime !== 0;
    if ("times_played" in ranking) return ranking.times_played !== 0;
    return false;
  });

  if (filteredData.length === 0 || filteredData.length < 3) {
    for (let i = 0; i < 3; i++) {
      if (isPointsRanking) filteredData.push(placeholderData.points);
      if (isPlaytimeRanking) filteredData.push(placeholderData.playtime);
      if (isMostPlayedQuizRanking) filteredData.push(placeholderData.times_played);
    }
  }

  return filteredData;
}


/**
 * @description This component displays a table of RankingBar components
 * - The table has a title and displays the top three rankings
 * - If the data is empty, the component returns a RankingBar component with a value of 0
 * @param data - The data to be displayed in the table
 * @param title - The title of the table
 * @returns The RankingBarTable component
 */
export default function RankingBarTable<T>({ data, title }: RankingBarTableProps<T>) {
  const { parseMinuteString } = useTimeParser();

  const filteredData = transformData(
    data as (IPlaytimeRanking | IMostPlayedQuizRanking | IPointsRanking)[]
  );

  // If the data is empty, return a RankingBar component with a value of 0
  if (!filteredData)
    return (
      <ContainerWithHeader header={title} center>
        <Stack
          direction={"row"}
          alignItems={"flex-end"}
          justifyContent={"center"}
          height={"fit-content"}
          p={2}
          gap={2}
        >
          <RankingBar user_id="0" value={0} name={""} rank={1} />
          <RankingBar user_id="0" value={0} name={""} rank={2} />
          <RankingBar user_id="0" value={0} name={""} rank={3} />
        </Stack>
      </ContainerWithHeader>
    );

  return (
    <ContainerWithHeader header={title} center>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        alignItems={{ xs: "flex-start", lg: "flex-end" }}
        justifyContent={"center"}
        height={"fit-content"}
        py={{ xs: 2, lg: 0 }}
        pt={{ xs: 2, lg: 2 }}
        px={{ xs: 0, lg: 2 }}
        gap={2}
      >
        {filteredData.map((ranking, index) => {
          if (index > 2) return null;
          return (
            <RankingBar
              key={index}
              value={
                ("points" in ranking
                  ? ranking.points
                  : "playtime" in ranking
                  ? parseMinuteString(ranking.playtime)
                  : "times_played" in ranking
                  ? ranking.times_played
                  : 0) as number
              }
              name={
                ("first_name" in ranking
                  ? ranking.first_name
                  : "quiz_name" in ranking
                  ? ranking.quiz_name
                  : "") as string
              }
              rank={index + 1}
              user_id={
                "user_id" in ranking ? ranking.user_id : ''
              }
            />
          );
        })}
      </Stack>
    </ContainerWithHeader>
  );
}
