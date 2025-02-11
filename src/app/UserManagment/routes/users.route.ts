import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { body } from 'express-validator';
import { validateReqSchema } from '.';

export const register = (router: Router) => {
  const reqSchema = [body('id').exists().isString(), body('username').exists().isString(), body('firstName').exists().isString(), body('lastName').exists().isString()];
  const userPutController = container.get('Apps.UserManagment.controllers.UserPutController');
  router.put('/users/:id', reqSchema, validateReqSchema, (req: Request, res: Response) => userPutController.run(req, res));
};
