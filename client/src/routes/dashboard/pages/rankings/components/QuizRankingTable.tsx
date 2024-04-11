import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { IQuizRanking } from "../../../../../shared/types/Rankings";
import ContainerWithHeader from "../../../components/ContainerWithHeader";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../../../../shared/types/User";

interface QuizRankingTableProps {
  data: IQuizRanking[];
}

export default function QuizRankingTable({ data }: QuizRankingTableProps) {
  const { user } = useOutletContext<UserContext>();

  if (!data || data.length === 0)
    return (
      <ContainerWithHeader header="Quiz Rangliste" center>
        <Typography variant="h6">Beim Laden der Rangliste ist ein fehler unterlaufen.</Typography>
      </ContainerWithHeader>
    );

  return (
    <ContainerWithHeader header={`${data[0].quiz_name}`} center sx={{ mt: 5, mb: 10 }}>
      <TableContainer sx={{ overflow: "hidden" }}>
        <Table size="medium" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Platz</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Punkte</TableCell>
              <TableCell>Erspielt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ranking, index) => {

              /**             
               * Conditional background color for Rows
               * Highlight logged in user - purple
               * Highlight every second row - grey
               * (no css nth-type-of in use, because we would overwrite the bgcolor of the highlighted user)
              */
              const isUser = user.id === ranking.user_id;
              const bgcolor = isUser
                ? "#C200C2"
                : !isUser && index % 2 !== 0
                ? "secondary.main"
                : "";

              const date = new Date(ranking.created_at);
              const dateString = date.toLocaleDateString("de-DE");
              const timeString = date.toLocaleTimeString("de-DE");

              return (
                <TableRow
                  key={ranking.user_id}
                  sx={{
                    bgcolor,
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell sx={{ fontSize: { xs: 20, md: 25, lg: 30 }, textAlign: "left" }}>
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`}
                  </TableCell>
                  <TableCell>
                    {isUser ? <strong>{ranking.first_name}(Du)</strong> : ranking.first_name}
                  </TableCell>
                  <TableCell>{ranking.points}</TableCell>
                  <TableCell sx={{ fontSize: { xs: 12, md: 13 } }}>
                    {dateString} {timeString}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </ContainerWithHeader>
  );
}
