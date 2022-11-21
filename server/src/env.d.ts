declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PG_PASSWORD: string;
      DB_NAME: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      PASSWORD_RESET_SECRET: string;
      REDIS_SECRET: string;
      COOKIE_NAME: string;
      DEMO_USER_PASSWORD: string;
      DATABASE_URL: string;
      REDIS_URL: string;
      PORT: string;
      POSTGRES_USERNAME: string;
    }
  }
}

export {}
