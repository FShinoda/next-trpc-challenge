// src/app/server-tasks/actions.ts
'use server'
import { revalidatePath } from "next/cache";
import { serverTrpc } from "./_trpc/serverClient";

export async function createTask(formData: FormData) {
  const titulo = formData.get('titulo') as string;
  const descricao = formData.get('descricao') as string;
  
  if (!titulo || typeof titulo !== 'string') {
    throw new Error('Titulo inválido');
  }

  try {
    await (await serverTrpc()).tasks.createTask({ titulo, descricao }); 

  } catch (err) {
    console.error('Error creating task:', err);
  }
}

export async function deleteTask(id: string) {
  try {
    await (await serverTrpc()).tasks.deleteTask({ id });
    
  } catch (err) {
    console.error('Error deleting task:', err);
  }
}

export async function updateTask(id: string) {
  try {
    await (await serverTrpc()).tasks.updateTask({ id });

  } catch (err) {
    console.error('Error updating task:', err);
  }
}