const base = "http://localhost:3000";
export const Routes = {
  home: `${base}/`,
  logMood: `${base}/log-mood`,
  api: {
    authCallback: `${base}/api/auth-callback`,
    moodLog: `${base}/api/mood-log`,
  },
};
