import { Typography } from "@mui/material";
import RouterButton from "../../../shared/components/buttons/RouterButton";

interface SuccessScreenProps {
  title: string;
  text: string;
  caption?: string;
  button?: {
    text: string;
    to: string;
  };
}

export default function SuccessScreen({ title, text, button, caption }: SuccessScreenProps) {
  return (
    <>
      <Typography variant="h4" align="center" className="border-b-accent" my={3}>
        {title}
      </Typography>
      <Typography variant="body1" align="center">
        {text}
      </Typography>
      {caption && (
        <Typography variant="body2" align="center" mt={2} sx={{ opacity: .5 }}>
          {caption}
        </Typography>
      )}
      {button && (
        <RouterButton
          to={button.to}
          variant="outlined"
          color="primary"
          text={button.text}
          sx={{ mt: 2 }}
        />
      )}
    </>
  );
}
