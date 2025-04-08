'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createTask, updateTask } from "../actions";
import { startTransition } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";



export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  
  const utils = trpc.useUtils();
  const { data: taskinfo } = idParam ? 
    trpc.tasks.getTaskById.useQuery({ id: idParam }) : 
    { data: undefined };

  const handleSubmit = (data: FormData) => {
    startTransition(async () => {
      if (idParam) {
        try {
          await updateTask(idParam, data);

          utils.tasks.getTasks.invalidate();
          utils.tasks.getTaskById.invalidate({ id: idParam });
          toast.success('Tarefa atualizada com sucesso!');

          router.push('/');
        } catch (err) {
          toast.error('Algo deu errado.');
        }

      } else {
        try {
          await createTask(data);
          utils.tasks.getTasks.invalidate();
          toast.success('Tarefa criada com sucesso!');
          router.push('/');
        } catch (err) {
          toast.error('Algo deu errado.');
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-6xl text-gray-700 uppercase font-semibold text-center">Tarefas</h1>
      <div className="w-[500px] space-y-2">
        <Button size="sm" variant="ghost">
          <Link href="/" className="flex gap-1 text-neutral-500 items-center text-sm">
            <ArrowLeft className="size-3"/> <p>Retornar para lista de tarefas</p>
          </Link>
        </Button>
        <form className="flex flex-col border-2 rounded-sm border-gray-100 p-8 space-y-3" action={(data) => handleSubmit(data)}>
          <div className="space-y-2">
            <label htmlFor="titulo">Título</label>
            <Input type="text" id="titulo" name="titulo" defaultValue={typeof taskinfo === 'object' && taskinfo?.titulo || undefined} required/>
          </div>
          <div className="space-y-2">
            <label htmlFor="descricao" >Descrição</label>
            <Textarea name="descricao" id="descricao" defaultValue={typeof taskinfo === 'object' && taskinfo?.descricao || undefined}></Textarea>
          </div>
          <Button type="submit">{idParam ? "Editar" : "Criar"}</Button>
        </form>
      </div>
    </div>
  )
}