import { NextFunction, Request, Response, RequestHandler } from 'express';

const catchAsyncErrors = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.resolve(func(req, res, next));
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsyncErrors;