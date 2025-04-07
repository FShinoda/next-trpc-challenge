import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';

export const tasksRouter = createTRPCRouter({
  getTask: baseProcedure.query(() => {
    return ['a', 'b', 'c']
  })
});

export type TasksRouter = typeof tasksRouter;