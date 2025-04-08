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
  createTask: baseProcedure
    .input(createTaskSchema)
    .mutation(({input, ctx}) => {
      const newTask = {...input, id: randomUUID(), dataCriacao: new Date()}
      console.log(ctx.tasks)
      ctx.tasks.push(newTask)
      console.log(ctx.tasks)
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

    console.log('aaaa')
    
    const filteredTasks = ctx.tasks.filter((task) => task.id !== input.id)

    console.log('aaa:', ctx.tasks)
    ctx.tasks = filteredTasks
    console.log('bbb:', ctx.tasks)
  })
});

export type TasksRouter = typeof taskRouter;