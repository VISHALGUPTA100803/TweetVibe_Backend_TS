declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT: number;
      MONGO_URI: string;
      JWT_SECRET: string;
      JWT_EXPIRES: string;
      REFRESH_SECRET: string;
      REFRESH_EXPIRES: string;
      JWT_ISSUER: string;
    }
  }
}

// convert this to a module
export {};

// 
//In TypeScript, the environment.d.ts file is often used to declare global variables and their types, especially when dealing with environment variables.
// If you're working with an environment file (e.g., .env file) and want TypeScript to recognize these variables globally without 
//having to import them in every file, you can declare them in the environment.d.ts file.
