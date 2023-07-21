import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
const ImageShower = ({ images, onDeleteImage }) => {
  return (
    <div className="imageWrraper">
      {images?.map(({ url, public_id }) => (
        <div key={public_id} className="imageContainer">
          <IconButton
            onClick={() => onDeleteImage(public_id)}
            sx={{ position: "absolute", right: "0", top: "0" }}
          >
            <CloseIcon color="error" />
          </IconButton>
          <img src={url} alt="image" />
        </div>
      ))}
    </div>
  );
};

export default ImageShower;
