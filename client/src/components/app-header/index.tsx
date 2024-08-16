import { FC, ReactElement } from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { BsImage } from "react-icons/bs";

const AppHeader: FC = (): ReactElement => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box mr={1}>
            <BsImage color="white" size={32} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: "white",
            }}
          >
            Compress Image
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;

