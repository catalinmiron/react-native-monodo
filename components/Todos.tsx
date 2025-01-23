import { _todos } from "@/utils/mock";
import { Stagger } from "@animatereactnative/stagger";
import React from "react";
import { Todo } from "./Todo";

export function Todos({ day }: { day: string }) {
  // if (day !== dayjs().format("YYYY-MM-DD")) {
  //   return null;
  // }

  return (
    <Stagger className='gap-2 mb-4 mt-2' exitDirection={1}>
      {_todos.map((todo, index) => (
        <Todo key={todo.id.toString() + index} todo={todo} />
      ))}
    </Stagger>
  );
}
