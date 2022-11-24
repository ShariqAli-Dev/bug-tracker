declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PG_PASSWORD: string;
      DB_NAME: string;
      POSTGRES_USERNAME: string;
      PASSWORD_RESET_SECRET: string;
      DATABASE_URL: string;
      REDIS_SECRET: string;
      COOKIE_NAME: string;
      DEMO_USER_PASSWORD: string;
      REDIS_URL: string;
      PORT: string;
      CORS_ORIGIN: string;
    }
  }
}

export {}
