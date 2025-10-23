import { Response } from "express";

export class HttpErrorService extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, HttpErrorService.prototype);
  }
}

export const manageErrorResponse = (error: any, res: Response) => {
    if (error instanceof HttpErrorService) {
        return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({error: error.message})
}