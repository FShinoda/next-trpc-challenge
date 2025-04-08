'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createTask } from "./actions";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-6xl text-gray-700 uppercase font-semibold text-center">Tarefas</h1>
      <div className="w-[500px] space-y-2">
        <Button size="sm" variant="ghost">
          <Link href="/" className="flex gap-1 text-neutral-500 items-center text-sm">
            <ArrowLeft className="size-3"/> <p>Retornar para lista de tarefas</p>
          </Link>
        </Button>
        <form className="flex flex-col border-2 rounded-sm border-gray-100 p-8 space-y-3" action={createTask}>
          <div className="space-y-2">
            <label htmlFor="titulo">Título</label>
            <Input type="text" id="titulo" name="titulo" />
          </div>
          <div className="space-y-2">
            <label htmlFor="descricao">Descrição</label>
            <Textarea name="descricao" id="descricao"></Textarea>
          </div>
          <Button type="submit">Criar</Button>
        </form>
      </div>
    </div>
  )
}