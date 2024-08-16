import { FC, ReactElement } from "react";
import { Box, Card, CardMedia, CircularProgress } from "@mui/material";

const ImageCard: FC<{ imgUrl: string; isLoading: boolean }> = ({
  imgUrl,
  isLoading,
}): ReactElement => {
  return (
    <Card
      sx={{
        width: "100%",
        backgroundColor: "#E5E5E5",
        aspectRatio: "2 / 3",
      }}
      elevation={3}
    >
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <CardMedia component="img" height="100%" image={imgUrl} />
      )}
    </Card>
  );
};

export default ImageCard;

