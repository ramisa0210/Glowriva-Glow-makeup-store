const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/images/default-product.jpg'; // Fallback image
  }

  // If already a full URL, return it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Remove any leading slashes, "images/", or "public/images/"
  let sanitizedPath = imagePath.replace(/^\/?(public\/)?images\//, '').replace(/^\/+/, '');

  // Final URL from static server
  return `/images/${sanitizedPath}`;
};

export default getImageUrl;
