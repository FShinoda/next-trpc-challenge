import { initTRPC } from "@trpc/server";
import { cache } from "react";

interface Task {
  id: string
  titulo: string
  descricao?: string
  dataCriacao: Date
}

declare global { // NÃO IDEAL PARA PROD, MAS DESSA FORMA AS TASKS SÃO PERSISTIDAS A CADA CICLO DE VIDA DO SERVIDOR
  var tasks: Task[];
}

global.tasks = global.tasks || []

export const createTRPCContext = cache(async () => {
  return { tasks: global.tasks };
});

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;