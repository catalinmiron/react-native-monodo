import { db } from "@/db/init";
import { todos } from "@/db/schema";
import { _todos } from "@/utils/mock";
import { Stagger } from "@animatereactnative/stagger";
import dayjs from "dayjs";
import { between } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useState } from "react";
import { Button, TextInput } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";
import { Todo } from "./Todo";

export function Todos({ day }: { day: string }) {
  const [todosLocal, setTodos] = useState(_todos);
  // if (day !== dayjs().format("YYYY-MM-DD")) {
  //   return null;
  // }

  const { data } = useLiveQuery(
    db
      .select()
      .from(todos)
      .where(
        between(
          todos.date,
          dayjs(day).startOf("day").toDate(),
          dayjs(day).endOf("day").toDate()
        )
      )
      .orderBy(todos.created_at),
    [day]
  );

  return (
    <Animated.View>
      <Stagger
        className='gap-2 mb-4 mt-2'
        exitDirection={1}
        // enterDirection={-1}
      >
        {data?.map((todo, index) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </Stagger>
      <Animated.View
        entering={FadeInDown.duration(400).delay(150)}
        exiting={FadeOutDown.duration(400).delay(150)}
        layout={LinearTransition.duration(400)}>
        <TextInput
          className='border-b border-black/30 rounded-md p-2'
          placeholder='Add todo'
        />
        <Button
          title='Add todo'
          onPress={() => {
            db.insert(todos)
              .values({
                date: dayjs(day).toDate(),
                content: `Todo ${data.length + 1}`,
              })
              .run();
          }}
        />
      </Animated.View>
    </Animated.View>
  );
}
