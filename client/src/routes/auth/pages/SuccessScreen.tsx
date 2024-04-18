import { Box, Typography } from "@mui/material";
import RouterButton from "../../../shared/components/buttons/RouterButton";

interface SuccessScreenProps {
  title: string;
  text: string;
  button?: {
    text: string;
    to: string;
  };
}

export default function SuccessScreen({ title, text, button }: SuccessScreenProps) {
  return (
    <>
      <Typography variant="h4" align="center" className="border-b-accent" my={3}>
        {title}
      </Typography>
      <Typography variant="body1" align="center">
        {text}
      </Typography>
        {button && (
            <Box mt={2}>
                <RouterButton to={button.to} variant="outlined" color="primary" text={button.text} />

            </Box>
        )}
    </>
  );
}
