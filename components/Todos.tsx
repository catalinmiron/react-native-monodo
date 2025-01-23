import { _todos } from "@/utils/mock";
import { Stagger } from "@animatereactnative/stagger";
import { useState } from "react";
import { Button, View } from "react-native";
import { Todo } from "./Todo";

export function Todos({ day }: { day: string }) {
  const [todos, setTodos] = useState(_todos);
  // if (day !== dayjs().format("YYYY-MM-DD")) {
  //   return null;
  // }

  return (
    <View>
      <Stagger
        className='gap-2 mb-4 mt-2'
        exitDirection={1}
        enterDirection={-1}>
        {todos.map((todo, index) => (
          <Todo key={todo.id.toString() + index} todo={todo} />
        ))}
      </Stagger>
      <Button
        title='Add todo'
        onPress={() => {
          setTodos([
            ...todos,
            {
              id: todos.length + 1,
              content: `Todo ${todos.length + 1}`,
              done: false,
            },
          ]);
        }}
      />
    </View>
  );
}
