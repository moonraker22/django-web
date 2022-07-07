import Typography from "@mui/material/Typography";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

export default function Title() {
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginTop: "10px",
          textAlign: "center",
          display: {
            xs: "block",
            sm: "none",
            md: "none",
            lg: "none",
            xl: "none",
          },
        }}
      >
        <DashboardCustomizeIcon fontSize="small" />
        Flashcards
      </Typography>
      <Typography
        variant="h2"
        component="h1"
        display="block"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          display: {
            xs: "none",
            sm: "block",
            md: "block",
            lg: "block",
            xl: "block",
          },
        }}
      >
        {" "}
        <DashboardCustomizeIcon fontSize="large" /> Flashcards
      </Typography>
    </>
  );
}
