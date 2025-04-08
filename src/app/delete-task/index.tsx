'use client'

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteTask } from "../actions";
import { useTransition } from "react";
import { toast } from "sonner";

interface DeleteTaskProps {
  id: string
}

export default function DeleteTask({ id }: DeleteTaskProps){
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTask(id);
      toast.info("Tarefa deletada")
    })
  }

  return(
    <Button variant="ghost" size="icon" className="cursor-pointer" onClick={handleDelete} disabled={isPending}>
      <Trash2 className="size-5 text-red-400" />
    </Button>
  )
}