'use client'

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteTask } from "../actions";

interface DeleteTaskProps {
  id: string
}

export default function DeleteTask({ id }: DeleteTaskProps){
  return(
    <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => deleteTask(id)}>
      <Trash2 className="size-5 text-red-400" />
    </Button>
  )
}