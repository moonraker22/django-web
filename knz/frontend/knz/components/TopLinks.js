import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useTheme } from "@mui/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from "@mui/material/Divider";

export default function TopLinks({ number, buttonTitles, title }) {
  const theme = useTheme();
  const columns = number;

  return (
    <>
      <Divider sx={{ marginBottom: 1 }}>
        <MoreHorizIcon />
      </Divider>

      <Box
        sx={{
          display: { xs: "none", sm: "grid", md: "grid" },
          gridTemplateColumns: `repeat(${parseInt(number)}, 1fr)`,
          gridGap: "1rem",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          textAlign: "center",
          boxShadow: 3,
        }}
      >
        {/* {console.log(buttonTitles, title, number)} */}
        {buttonTitles.map((buttonTitle, index) => (
          <Button
            key={index}
            variant="contained"
            color="primary"
            sx={{
              color: "white",
              backgroundColor: theme.palette.primary.main,
              fontWeight: "bold",
              boxShadow: 3,
            }}
          >
            {buttonTitle}
          </Button>
        ))}
      </Box>
      <Divider sx={{ marginBottom: 4 }}>{title}</Divider>
    </>
  );
}
