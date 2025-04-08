// src/app/server-tasks/actions.ts
'use server'
import { revalidatePath } from "next/cache";
import { serverTrpc } from "../_trpc/serverClient";

export async function createTask(formData: FormData) {
  const titulo = formData.get('titulo') as string;
  
  if (!titulo || typeof titulo !== 'string') {
    throw new Error('Titulo inválido');
  }

  try {
    console.log('Starting task creation');
    await (await serverTrpc()).tasks.createTask({ titulo }); 
    console.log('Task created successfully');
    
    // Be more explicit with revalidation
    revalidatePath('/', 'page');
    console.log('Revalidation triggered');
    
  } catch (err) {
    console.error('Error creating task:', err);
  }
}

export async function deleteTask(id: string) {
  await (await serverTrpc()).tasks.deleteTask({ id });
  revalidatePath('/');
}