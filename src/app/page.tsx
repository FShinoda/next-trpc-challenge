'use client'

import { trpc } from "./_trpc/client";

export default function Home() {

  const todos = trpc.getTodos.useQuery()
  return (
    todos?.data?.map((task) => (
      <p>{task}</p>
    ))
  );
}
