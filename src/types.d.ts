// src/types.d.ts

declare namespace Express {
    export interface Request {
      user?: string; // user ID from JWT
    }
  }
  