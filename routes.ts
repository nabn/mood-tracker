const base = process.env.NEXT_PUBLIC_ROOT_URL;
export const Routes = {
  home: `/`,
  logMood: `/log-mood`,
  login: "/login",
  api: {
    authCallback: `${base}/api/auth-callback`,
    moodLog: `${base}/api/mood-log`,
  },
};
