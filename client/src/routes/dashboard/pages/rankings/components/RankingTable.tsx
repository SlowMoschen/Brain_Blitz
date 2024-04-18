import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../../../../shared/types/User";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow as ITableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { formatValue } from "../../../../../shared/services/ValueFormatter.service";
import ContainerWithHeader from "../../../components/ContainerWithHeader";

interface ITableRow {
    user_id?: string;
  name: string;
  value: number;
  additionalInfo: string;
}

interface RankingTableProps {
  data: ITableRow[];
  valueString: string;
  additionalInfoString: string;
  tableHeader: string;
}

export default function RankingTable({
  data,
  additionalInfoString,
  valueString,
  tableHeader
}: RankingTableProps) {
  const { user } = useOutletContext<UserContext>();

  if (!data || data.length === 0)
    return (
      <ContainerWithHeader header="Quiz Rangliste" center>
        <Typography variant="h6">
          Es gibt entweder keine Daten oder die Daten konnten nicht geladen werden.
        </Typography>
      </ContainerWithHeader>
    );

  return (
    <ContainerWithHeader header={tableHeader} center sx={{ mt: 5, mb: 10 }}>
      <TableContainer sx={{ overflow: "auto" }}>
        <Table size="medium" stickyHeader>
          <TableHead>
            <ITableRow>
              <TableCell>Platz</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>{formatValue(valueString, ["capitalize"])}</TableCell>
              <TableCell>{formatValue(additionalInfoString, ["capitalize"])}</TableCell>
            </ITableRow>
          </TableHead>
          <TableBody>
            {data.map((ranking, index) => {
              /**
               * Conditional background color for Rows
               * Highlight logged in user - purple
               * Highlight every second row - grey
               * (no css nth-type-of in use, because we would overwrite the bgcolor of the highlighted user)
               */
              const formatedName = formatValue(ranking.name, ["capitalize"]);
              const isUser = user.id === ranking.user_id;
              const bgcolor = isUser
                ? "#C200C2"
                : !isUser && index % 2 !== 0
                ? "secondary.dark"
                : "";

              if (new Date(ranking.additionalInfo).toString() !== "Invalid Date") {
                const date = new Date(ranking.additionalInfo);
                const dateString = date.toLocaleDateString("de-DE");
                const timeString = date.toLocaleTimeString("de-DE");

                ranking.additionalInfo = `${dateString} ${timeString}`;
              }

              return (
                <ITableRow
                  key={index}
                  sx={{
                    bgcolor,
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell sx={{ fontSize: { xs: 20, md: 25, lg: 30 }, textAlign: "left" }}>
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`}
                  </TableCell>
                  <TableCell>
                    {isUser ? <strong>{formatedName}(Du)</strong> : formatedName}
                  </TableCell>
                  <TableCell>{ranking.value}</TableCell>
                  <TableCell sx={{ fontSize: { xs: 12, md: 13 } }}>
                    {ranking.additionalInfo}
                  </TableCell>
                </ITableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </ContainerWithHeader>
  );
}
