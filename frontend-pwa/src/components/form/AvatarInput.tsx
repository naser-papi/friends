import React, { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { useField } from "formik";
import { Avatar, Badge, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IFormInputType } from "../../models/FormTypes";
import useNotifyBar from "../../hooks/useNotifyBar";

const AvatarInput: React.FC<IFormInputType> = (props) => {
  const [image, setImage] = useState("/assets/profile.png");
  const [field, , helpers] = useField(props.name);
  const [openToast, , snackBar] = useNotifyBar();
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    //minFileSize: 0.5, // in megabytes
    maxFileSize: 2,
    imageSizeRestrictions: {
      maxHeight: 1024, // in pixels
      maxWidth: 1600,
      minHeight: 400,
      minWidth: 400
    }
  });
  useEffect(() => {
    //console.log("error", errors);
    if (filesContent.length) {
      setImage(filesContent[0].content);
      helpers.setValue(filesContent[0].content);
    }
    if (errors.length) {
      let message = errors[0].fileSizeTooSmall
        ? "File size is too small!"
        : errors[0].fileSizeToolarge
        ? "File size is too large!"
        : errors[0].readerError
        ? "Problem occurred while reading file!"
        : errors[0].maxLimitExceeded
        ? "Too many files"
        : errors[0].minLimitNotReached
        ? "Not enough files"
        : errors[0].imageHeightTooSmall
        ? "image height too small"
        : errors[0].imageWidthTooBig
        ? "image width too big"
        : "unknown error, please select another file";

      openToast({ message: message, type: "error" });
      helpers.setError(message);
      helpers.setTouched(true);
    }
  }, [errors]);

  return (
    <>
      <input
        type={"file"}
        style={{ visibility: "hidden" }}
        data-cy={`${props.name}-fileSelector`}
        onChange={(event) => {
          // setImage(event..content);
          // helpers.setValue(filesContent[0].content);
          const { files } = event.target;
          if (files) {
            helpers.setValue(files[0]);
            setImage(URL.createObjectURL(files[0]));
          }
        }}
      />
      <Badge
        overlap="circular"
        sx={{ alignSelf: "center" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <IconButton
            onClick={openFileSelector}
            color="primary"
            disabled={loading}
            aria-label="upload-image"
          >
            <EditIcon />
          </IconButton>
        }
      >
        <Avatar alt="Profile Image" data-cy={props.name} src={image} sx={props.sx as any} />
      </Badge>
      {snackBar}
    </>
  );
};

export default AvatarInput;
