import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { body } from 'express-validator';
import { validateReqSchema } from '.';

export const register = (router: Router) => {
  const ticketPutController = container.get('Apps.TicketsManagment.controllers.TicketPutController');
  const reqSchema = [body('id').exists().isString(), body('name').exists().isString()];
  router.put('/tickets/:id', reqSchema, validateReqSchema, (req: Request, res: Response) => ticketPutController.run(req, res));
};
