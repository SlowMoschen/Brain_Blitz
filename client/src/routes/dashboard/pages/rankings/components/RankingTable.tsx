import {
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { useUserContext } from "../../../../../shared/hooks/context/useUserContext.hook";
import { useTimeParser } from "../../../../../shared/hooks/timer/useTimeParser.hook";
import { formatValue } from "../../../../../shared/services/ValueFormatter.service";
import ContainerWithHeader from "../../../components/ContainerWithHeader";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../../../configs/Links";
import { useDocumentTitle } from "../../../../../shared/hooks/api/useDocumentTitle.hook";
import { DEFAULT_DOCUMENT_TITLE } from "../../../../../configs/Application";

interface ITableRow {
  id: string;
  name: string;
  value: number;
  additionalInfo: string;
}

export interface ITableProps {
  data: ITableRow[];
  valueString: string;
  additionalInfoString: string;
  tableHeader: string;
  type: "player" | "quiz";
}

export default function RankingTable({
  data,
  additionalInfoString,
  valueString,
  tableHeader,
  type,
}: ITableProps) {
  useDocumentTitle(
    tableHeader
    ? tableHeader
    : DEFAULT_DOCUMENT_TITLE
  );
  const { parseMinuteString } = useTimeParser();
  const redirect = useNavigate();
  const user = useUserContext();

  const handleRowClick = (id: string) => {
    switch (type) {
      case "player":
        redirect(URLS.PROFILE + id);
        break;
      case "quiz":
        redirect(URLS.QUIZ_RANKING + id);
        break;
      default:
        break;
    }
  };

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
            <TableRow>
              <TableCell>
                <Typography variant="h6">Platz</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">{formatValue(valueString, ["capitalize"])}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">
                  {formatValue(additionalInfoString, ["capitalize"])}
                </Typography>
              </TableCell>
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
              const formatedName = formatValue(ranking.name, ["capitalize"]);
              const isUser = user.id === ranking.id;
              const bgcolor = isUser
                ? "#C200C2"
                : !isUser && index % 2 !== 0
                ? "secondary.dark"
                : "";

              const hoverStyles = { cursor: "pointer", "&:hover": { filter: "brightness(0.9)" } }

              if (new Date(ranking.additionalInfo).toString() !== "Invalid Date") {
                const date = new Date(ranking.additionalInfo);
                const dateString = date.toLocaleDateString("de-DE");
                const timeString = date.toLocaleTimeString("de-DE");

                ranking.additionalInfo = `${dateString} ${timeString}`;
              }

              return (
                <TableRow
                  key={index}
                  sx={{
                    bgcolor,
                    "&:last-child td, &:last-child th": { border: 0 },
                    ...hoverStyles,
                  }}
                  onClick={() => handleRowClick(ranking.id)}
                >
                  <TableCell sx={{ fontSize: { xs: 20, md: 25, lg: 30 }, textAlign: "left" }}>
                    <Typography variant="h5">
                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : `${index + 1}.`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">
                      {isUser ? <strong>{formatedName}(Du)</strong> : formatedName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">
                      {valueString === "spielzeit"
                        ? parseMinuteString(ranking.value)
                        : ranking.value}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: 12, md: 13 } }}>
                    <Typography variant="subtitle1">{ranking.additionalInfo}</Typography>
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
