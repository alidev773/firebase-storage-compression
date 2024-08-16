import { ChangeEventHandler, FC, ReactElement, useCallback } from "react";
import { Button, styled } from "@mui/material";
import { IoCloudUploadOutline } from "react-icons/io5";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadButton: FC<{ onFilesRecieved: (images: FileList) => void }> = ({
  onFilesRecieved,
}): ReactElement => {
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const uploadedFiles = event.target.files;

      if (uploadedFiles !== null) {
        onFilesRecieved(uploadedFiles);
      }
    },
    [onFilesRecieved]
  );

  return (
    <Button
      component="label"
      variant="contained"
      tabIndex={-1}
      sx={{ color: "white" }}
      startIcon={<IoCloudUploadOutline />}
    >
      Upload file
      <VisuallyHiddenInput
        type="file"
        onChange={onChange}
        multiple
        accept="image/*"
      />
    </Button>
  );
};

export default UploadButton;

