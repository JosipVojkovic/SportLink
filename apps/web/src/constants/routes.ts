type Routes = {
  LOGIN: string;
  REGISTER: string;
  HOME: string;
  PAGE_NOT_FOUND: string;
};

export const routes: Routes = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  PAGE_NOT_FOUND: "/*",
};
