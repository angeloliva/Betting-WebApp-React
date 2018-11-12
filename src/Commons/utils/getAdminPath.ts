import { join } from "path"

// Add "admin-api/" before the PATH
// -> in dev will point to localhost:5000 to enable debug with "firebase serve"
export const getAdminPath = (path: string) =>
  process.env.NODE_ENV === "development"
    ? "https://engamed-app.firebaseapp.com/" + join("admin-api", path)
    : join("/", "admin-api", path)
