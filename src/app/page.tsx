import { Pencil, Plus, Trash2 } from "lucide-react";
import { trpc } from "./_trpc/client";
import { serverTrpc } from "./_trpc/serverClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteTask from "./delete-task";

export default async function Home() {

  const tasks = await (await serverTrpc()).tasks.getTasks();
  return (
    <div className="space-y-6">
      <h1 className="text-6xl text-gray-700 uppercase font-semibold text-center">Tarefas</h1>
      <div className=" w-[500px] space-y-2">
        <Button size="sm" variant="ghost">
          <Link href="/create-task" className="flex gap-1 text-neutral-500 items-center text-sm">
            <Plus className="size-3"/> <p>Criar tarefa</p>
          </Link>
        </Button>
        <div className="border-2 rounded-sm border-gray-100 p-8 space-y-1">
          {tasks.map((task, index) => (
            <div className="flex items-center justify-between border border-gray-200 py-3 px-4 rounded-sm" key={index}>
              <div className="flex gap-2">
                <p className="text-xs text-gray-600 mt-1">{index + 1}.</p>
                <div>
                  <p className="text-gray-700 font-semibold leading-5">{task.titulo}</p>
                  <p className="text-gray-500 leading-5 text-xs">{task.descricao}</p>
                </div>
              </div>
              <div>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Pencil className="size-5 text-gray-500" />
                </Button>
                <DeleteTask id={task.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
