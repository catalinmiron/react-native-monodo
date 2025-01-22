import { _todos } from "@/utils/mock";
import dayjs from "dayjs";
import React from "react";
import { View } from "react-native";
import { Todo } from "./Todo";

export function Todos({ day }: { day: string }) {
  if (day !== dayjs().format("YYYY-MM-DD")) {
    return null;
  }

  return (
    <View className='gap-2'>
      {_todos.map((todo, index) => (
        <Todo key={todo.id.toString() + index} todo={todo} />
      ))}
    </View>
  );
}
