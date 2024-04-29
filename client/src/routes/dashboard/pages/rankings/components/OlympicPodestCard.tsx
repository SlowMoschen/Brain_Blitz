import { Stack } from "@mui/material";
import { useTimeParser } from "../../../../../shared/hooks/timer/useTimeParser.hook";
import { IGlobalRanking } from "../../../../../shared/types/Rankings";
import ContainerWithHeader from "../../../components/ContainerWithHeader";
import OlympicPodestBar from "./OlympicPodestBar";
import { formatValue } from "../../../../../shared/services/ValueFormatter.service";

type ValueType = "number" | "milliseconds";

export interface OlympicPodestCardProps {
  valueType: ValueType;
  data: IGlobalRanking[];
  title: string;
  onClick?: () => void;
}

export default function OlympicPodestCard({
  data,
  title,
  onClick,
  valueType,
}: OlympicPodestCardProps) {
  const { parseToTimeString } = useTimeParser();

  const appendEmptyData = (data: IGlobalRanking[]) => {
    if (!data) return Array.from({ length: 3 }, () => ({ name: "", value: 0, id: "" }));
    if (data.length < 3) {
      for (let i = data.length; i < 3; i++) {
        data.push({ name: "", value: 0, id: "" });
      }
    }

    return data.slice(0, 3);
  };

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
        {appendEmptyData(data).map((ranking, index) => (
          <OlympicPodestBar
            key={index}
            value={
              valueType === "milliseconds"
                ? parseToTimeString(ranking.value)
                : ranking.value > 0
                ? new Number(ranking.value).toLocaleString()
                : 0
            }
            name={formatValue(ranking.name, ["capitalize"])}
            rank={index + 1}
            id={ranking.id}
            onClick={onClick}
          />
        ))}
      </Stack>
    </ContainerWithHeader>
  );
}
