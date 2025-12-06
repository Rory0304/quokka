export const ApiFetch = (url: string, options?: RequestInit) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://quokka-io.vercel.app";

  return fetch(baseUrl + url, {
    ...options,
  });
};
