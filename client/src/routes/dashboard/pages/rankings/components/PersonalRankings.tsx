import { Stack, Typography } from "@mui/material";
import ContainerWithHeader from "../../../components/ContainerWithHeader";
import { IPersonalRanking } from "../../../../../shared/types/Rankings";
import PersonalRankingCard from "./PersonalRankingCard";

interface PersonalRankingsProps {
  data: IPersonalRanking[];
}

export default function PersonalRankings({ data }: PersonalRankingsProps) {

  return (
    <Stack
      width={"100%"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      height={"100%"}
      my={2}
      pb={5}
    >
      <ContainerWithHeader header="Deine Rankings">
        <Stack p={2} gap={2}>
          {
          data && data.length > 0 
          ?
          data.map((ranking, index) => {
            const { points, position, quiz_category, quiz_id, quiz_name } = ranking;
            return (
              <PersonalRankingCard
                key={index}
                points={points}
                position={position}
                quizName={quiz_name}
                quizCategory={quiz_category}
                quizId={quiz_id}
              />
            );
          })
          : <Typography variant="h6">Du hast noch keine Rankings erspielt.</Typography>
        }
        </Stack>
      </ContainerWithHeader>
    </Stack>
  );
}
