import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { DocumentData } from "firebase/firestore";

import { AppHeader, ImageCard, UploadButton } from "./components";
import { listenToDb, uploadImage } from "./firebase";

import "./App.css";

function App() {
  const [images, setImages] = useState<DocumentData[]>([]);
  const [hasListenerStarted, setHasListenerStarted] = useState<boolean>(false);

  const uploadImages = async (images: FileList): Promise<void> => {
    const promises: Promise<void>[] = [];
    for (const image of images) {
      promises.push(uploadImage(image));
    }

    await Promise.allSettled(promises);
  };

  useEffect(() => {
    const unsub = listenToDb((allImages) => {
      if (!hasListenerStarted) {
        setHasListenerStarted(true);
      }
      setImages(allImages);
    });

    return () => unsub();
  }, [hasListenerStarted]);

  return (
    <>
      <AppHeader />
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <Container
          maxWidth="lg"
          sx={{ maxHeight: "100%", paddingBlock: "3rem" }}
        >
          {!hasListenerStarted ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={54} color="primary" />
            </Box>
          ) : (
            <>
              {images.length > 0 ? (
                <Grid container spacing={3} marginBottom="3rem">
                  {images.map((image) => {
                    return (
                      <Grid item xs={3} key={image.id}>
                        <ImageCard
                          isLoading={!image?.compressedImage}
                          imgUrl={image?.compressedImage}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <Typography variant="h4" marginBlock="3rem">
                  Please upload an image!
                </Typography>
              )}
              <Box paddingBottom="3rem">
                <UploadButton onFilesRecieved={uploadImages} />
              </Box>
            </>
          )}
        </Container>
      </Box>
    </>
  );
}

export default App;

