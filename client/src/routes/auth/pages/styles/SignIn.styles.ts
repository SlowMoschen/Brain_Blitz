import { BREAKPOINTS } from "../../../../configs/Breakpoints";

const stackStyles = {
  width: "100%",
  maxWidth: BREAKPOINTS.xl,
  alignItems: "center",
  justifyContent: "center",
  mt: { xs: 25, md: 0 },
};

const paperStyles = {
  p: 1,
  my: 5,
  bgcolor: "background.secondary",
  borderRadius: ".375rem",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  width: "100%",
};

const imagePaperStyles = {
  p: 2,
  bgcolor: "accent.light",
  borderRadius: ".375rem",
  width: { xs: "100%", md: "50%" },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyles = {
  maxWidth: { xs: "100%", md: "650px" },
  maxHeight: { xs: "300px", md: "100%" },
};

export { stackStyles, paperStyles, imagePaperStyles, imageStyles };
