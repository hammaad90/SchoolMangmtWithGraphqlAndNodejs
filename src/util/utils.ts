// src/utils/logger.ts

const log = {
    info: (message: string) => {
      console.log(`[INFO]: ${message}`);
    },
  
    warn: (message: string) => {
      console.warn(`[WARN]: ${message}`);
    },
  
    error: (message: string, error?: unknown) => {
      console.error(`[ERROR]: ${message}`);
      if (error) console.error(error);
    },
  };
  
  export default log;
  