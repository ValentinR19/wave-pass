import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { body } from 'express-validator';
import { validateReqSchema } from '.';

export const register = (router: Router) => {
  const eventPutController = container.get('Apps.EventManagment.controllers.EventPutController');
  const reqSchema = [body('id').exists().isString(), body('title').exists().isString()];
  router.put('/events/:id', reqSchema, validateReqSchema, (req: Request, res: Response) => eventPutController.run(req, res));
};
