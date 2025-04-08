import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { taskRouter } from './task';

export const appRouter = createTRPCRouter({
  tasks: taskRouter
});

export type AppRouter = typeof appRouter;