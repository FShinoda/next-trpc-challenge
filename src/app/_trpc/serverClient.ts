import { httpBatchLink } from "@trpc/client"
import { trpc } from "./client"
import { appRouter } from "@/server/trpc/routers/_app"
import { createCallerFactory, createTRPCContext } from "@/server/trpc/init"


const serverClient = createCallerFactory(appRouter);

export const serverTrpc = async () => {
  const context = await createTRPCContext();
  return serverClient(context);
};