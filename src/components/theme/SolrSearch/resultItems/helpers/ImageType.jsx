export const getImageType = (mimeType) => {
  const matchImage = mimeType.match(/image\/(.*)/);
  if (matchImage) {
    switch (matchImage[1]) {
      case 'jpeg':
        return 'JPG';
      default:
        return matchImage[1].toUpperCase();
    }
  } else {
    return null;
  }
};

const ImageType = ({ mimeType }) => getImageType(mimeType);

export default ImageType;
