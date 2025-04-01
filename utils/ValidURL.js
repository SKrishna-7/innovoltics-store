export const isValidUrl = (url) => {
    try {
      return Boolean(new URL(url));
    } catch (e) {
      return false;
    }
  };
  