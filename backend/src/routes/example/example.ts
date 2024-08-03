import { Router } from 'express';

export const exampleRouter = Router();

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Returns a greeting
 *     responses:
 *       200:
 *         description: A successful response
 */
exampleRouter.get('/example', (req, res) => {
  return res.send('example');
});
