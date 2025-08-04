type Routes = {
  LOGIN: string;
  REGISTER: string;
  HOME: string;
  GAMES: string;
  MY_GAMES: string;
  PROFILE: string;
  PAGE_NOT_FOUND: string;
};

export const routes: Routes = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  GAMES: "/games",
  MY_GAMES: "/my-games",
  PROFILE: "/profile",
  PAGE_NOT_FOUND: "/*",
};
