export const preload = ({localContext, imageUrls = []}) => {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = localContext.assetUrl(`/images/${url}`);
  });
}
