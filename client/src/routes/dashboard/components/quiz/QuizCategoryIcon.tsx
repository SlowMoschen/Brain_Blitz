import { Box, Typography } from "@mui/material";
import { formatValue } from "../../../../shared/services/ValueFormatter.service";

export default function QuizCategoryIcon({ category }: { category: string }) {
  const categoryIcons: { [key: string]: string } = {
    geschichte: "🏰",
    geographie: "🌍",
    fernsehen: "📺",
    sport: "🏈",
    musik: "🎵",
    film: "🎬",
    technologie: "📡",
    biologie: "🦠",
    politik: "🏛️",
    videospiele: "🎮",
  };

  const categoryColors: { [key: string]: string } = {
    geschichte: "#f5a623",
    geographie: "#4a90e2",
    fernsehen: "#7ed321",
    sport: "#1b07d1",
    musik: "#d0021b",
    film: "#cc16a5",
    technologie: "#7ed321",
    biologie: "#cde20d",
    politik: "#d0021b",
    videospiele: "#9013fe",
  };

  const styles = {
    bgcolor: categoryColors[category] || "#4a90e2",
    fontSize: { xs: 30, lg: 50 },
    minWidth: { xs: 50, lg: 100 },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: { xs: ".375rem .375rem 0 0", lg: ".375rem 0 0 .375rem" },
    position: "relative",
  };

  return (
    <Box sx={styles}>
      {categoryIcons[category] ? (
        <>
          <Typography
            variant="caption"
            sx={{ color: "text.dark", position: "absolute", top: "0", left: 2, fontSize: 10 }}
          >
            {formatValue(category, ["capitalize"])}
          </Typography>
          <span>{categoryIcons[category]}</span>
        </>
      ) : (
        <span>❓</span>
      )}
    </Box>
  );
}
