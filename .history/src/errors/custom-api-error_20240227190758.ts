export class CustomApiError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }

  interface Error {
    name: string;
    message: string;
    stack?: string;
  }