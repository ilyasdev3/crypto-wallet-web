export const ensureHttps = (url: string | undefined): string => {
  if (!url) {
    return "https://via.placeholder.com/150";
  }
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
};
