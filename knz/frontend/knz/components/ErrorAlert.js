import { Alert, AlertTitle } from "@mui/material";

export default function ErrorAlert(props) {
  const { error } = props;
  const { severity } = props;

  if (error) {
    return (
      <Alert severity={severity || "error"} variant="outlined">
        <AlertTitle>{error}</AlertTitle>
      </Alert>
    );
  } else {
    return null;
  }
}
