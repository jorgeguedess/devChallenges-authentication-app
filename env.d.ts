declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    AUTH_JWT: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    FACEBOOK_ID: string;
    FACEBOOK_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    TWITTER_CLIENT_ID: string;
    TWITTER_CLIENT_SECRET: string;
  }
}
