const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

if (!API_URL){
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

export { API_URL };