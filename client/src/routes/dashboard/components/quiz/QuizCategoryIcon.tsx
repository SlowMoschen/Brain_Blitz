import { Box, Typography } from "@mui/material";

export default function QuizCategoryIcon({ category }: { category: string }) {
  const categoryIcons: { [key: string]: string } = {
    geschichte: "🏰",
    geographie: "🌍",
    wissenschaft: "🔬",
    popkultur: "💅",
    sport: "🏈",
    musik: "🎵",
    filme: "🎬",
    technologie: "📡",
    biologie: "🦠",
    politik: "🏛️",
  };

  const getColor = (category: string) => {
    switch (category.trim().toLowerCase()) {
      case "geschichte":
        return "#f5a623"; 
      case "geographie":
        return "#4a90e2"; 
      case "wissenschaft":
        return "#7ed321"; 
      case "popkultur":
        return "#d0021b"; 
      case "sport":
        return "#1b07d1"; 
      case "musik":
        return "#9013fe"; 
      case "filme":
        return "#cc16a5"; 
      case "technologie":
        return "#7ed321"; 
      case "biologie":
        return "#cde20d"; 
      case "politik":
        return "#d0021b"; 
      default:
        return "#4a90e2";
    }
  };

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const styles = {
    bgcolor: getColor(category),
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
      {categoryIcons[category.toLowerCase()] ? (
        <>
          <Typography
            variant="caption"
            sx={{ color: "text.dark", position: "absolute", top: "0", left: 2, fontSize: 10 }}
          >
            {capitalize(category)}
          </Typography>
          <span>{categoryIcons[category.toLowerCase()]}</span>
        </>
      ) : (
        <span>❓</span>
      )}
    </Box>
  );
}
