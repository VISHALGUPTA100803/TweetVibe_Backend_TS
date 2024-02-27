// interface Error {
//     name: string;
//     message: string;
//     stack?: string;
//   }

  // nterfaces are used to enforce a certain structure on objects

export class CustomApiError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }

