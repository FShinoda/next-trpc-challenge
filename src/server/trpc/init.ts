import { initTRPC } from "@trpc/server";
import { cache } from "react";

interface Task {
  id: string
  titulo: string
  descricao?: string
  dataCriacao: Date
}

export const createTRPCContext = cache(async () => {
  return { tasks: [{id: 'abcd', titulo: 'teste', descricao: 'fazer teste', dataCriacao: new Date()}] as Task[] };
});

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;