declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    AUTH_JWT: string;
    FORGET_JWT: string;
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
    NEXTAUTH_SECRET: string;
    HOST_URL: string;
    NEXT_PUBLIC_API: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    FACEBOOK_ID: string;
    FACEBOOK_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    TWITTER_ID: string;
    TWITTER_SECRET: string;
  }
}
