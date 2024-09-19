import { createContext } from "react";
const ImageContext = createContext({
  images: [],
  setImages: () => {},
});
export default ImageContext;
