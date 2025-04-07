import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { tasksRouter } from './tasks';

export const appRouter = createTRPCRouter({
  getTodos: baseProcedure
    .query(() => {
      return [10, 20, 30];
    }),
  tasks: tasksRouter
});

export type AppRouter = typeof appRouter;