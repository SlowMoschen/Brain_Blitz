import { Box, Typography } from "@mui/material";

export default function QuizCategoryIcon({ category }: { category: string }) {
  const categoryIcons: { [key: string]: string } = {
    history: "🏛️",
    science: "🔬",
    sports: "🏈",
    music: "🎵",
    movies: "🎥",
    geography: "🌍",
    general: "📚",
    math: "🧮",
    technology: "💻",
    animals: "🐾",
  };

  const getColor = (category: string) => {
    switch (category.trim().toLowerCase()) {
      case "history":
        return "violet";
      case "science":
        return "secondary.main";
      case "sports":
        return "success.main";
      case "music":
        return "info.main";
      case "movies":
        return "warning.main";
      case "geography":
        return "error.main";
      case "general":
        return "accent.main";
      case "math":
        return "yellow";
      case "technology":
        return "secondary.light";
      case "animals":
        return "success.light";
      default:
        return "info.light";
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
