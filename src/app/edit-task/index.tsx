import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

interface EditTaskProps {
  id: string
}

export default function EditTask({ id } : EditTaskProps) {
  return (
    <Button variant="ghost" size="icon" className="cursor-pointer">
      <Link href={`/form?id=${id}`}>
        <Pencil className="size-5 text-gray-500" />
      </Link>
    </Button>
  )
}