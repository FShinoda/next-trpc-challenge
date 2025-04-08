import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { randomUUID } from 'crypto';

const createTaskSchema = z.object({
  titulo: z.string(),
  descricao: z.string().optional()
})

const updateTaskSchema = z.object({
  id: z.string(),
  titulo: z.string().optional(),
  descricao: z.string().optional(),
  dataCriacao: z.date().optional()
})

export const taskRouter = createTRPCRouter({
  getTasks: baseProcedure.query(async ({ctx}) => {
    return ctx.tasks
  }),
  getTaskById: baseProcedure.input(updateTaskSchema)
  .query(async ({input, ctx}) => {
    const task = ctx.tasks.find((task) => task.id === input.id);

    if (!task) throw new Error("Essa tarefa não foi encontrada.");

    return task;
  }),
  createTask: baseProcedure
    .input(createTaskSchema)
    .mutation(({input, ctx}) => {
      const newTask = {...input, id: randomUUID(), dataCriacao: new Date()}

      ctx.tasks.push(newTask)

      return newTask
    }),
  updateTask: baseProcedure
    .input(updateTaskSchema)
    .mutation(({input, ctx}) => {
      const taskIndex = ctx.tasks.findIndex((task) => task.id === input.id)

      if (taskIndex === -1) throw new Error("Essa tarefa não foi encontrada.")

      ctx.tasks[taskIndex] = {
        titulo: input.titulo ? input.titulo : ctx.tasks[taskIndex].titulo,
        descricao: input.descricao ? input.descricao : ctx.tasks[taskIndex].descricao,
        dataCriacao: ctx.tasks[taskIndex].dataCriacao,
        id: ctx.tasks[taskIndex].id
      }
    }),
  deleteTask: baseProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({input, ctx}) => {
    const taskIndex = ctx.tasks.findIndex((task) => task.id === input.id)

    if (taskIndex === -1) { throw new Error("Essa tarefa não foi encontrada.") }

    ctx.tasks.splice(taskIndex, 1)
  })
});

export type TasksRouter = typeof taskRouter;