import { Alert, AlertTitle } from "@mui/material";

export default function SuccessAlert(props) {
  const { message } = props;
  const { severity } = props;

  if (message) {
    return (
      <Alert severity={severity || "success"} variant="outlined">
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    );
  } else {
    return null;
  }
}
