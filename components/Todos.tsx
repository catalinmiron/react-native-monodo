import { db } from "@/db/init";
import { todos } from "@/db/schema";
import { hitSlop } from "@/utils/misc";
import { Stagger } from "@animatereactnative/stagger";
import dayjs from "dayjs";
import { between } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Plus } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";
import { Todo } from "./Todo";
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Todos({ day }: { day: string }) {
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

  const [content, setContent] = useState("");
  const inputRef = useRef<TextInput>(null);

  const addTodo = () => {
    inputRef.current?.clear();
    inputRef.current?.blur();
    db.insert(todos)
      .values({
        date: dayjs(day).toDate(),
        content: content,
      })
      .run();
    setContent("");
  };
  const isDisabled = !content || content === "";

  return (
    <Animated.View className='gap-2'>
      <Stagger
        className='gap-2 mb-4 mt-2 '
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
        layout={LinearTransition.duration(400)}
        className='gap-2 flex-row mb-4 items-end'>
        <TextInput
          ref={inputRef}
          defaultValue={content}
          multiline
          submitBehavior='blurAndSubmit'
          onSubmitEditing={(e) => {
            if (!isDisabled) {
              addTodo();
            }
          }}
          onChangeText={(text) => {
            setContent(text.trim());
          }}
          className='flex-1 border-b border-black/50 rounded-md p-2 font-barlow-400'
          placeholder='What needs to be done?'
        />
        <AnimatedPressable
          disabled={isDisabled}
          onPress={addTodo}
          layout={LinearTransition}
          hitSlop={hitSlop}
          style={{ opacity: isDisabled ? 0.5 : 1 }}>
          <View className='bg-black/50 px-2 py-1 rounded-lg flex-row gap-0.5 items-center'>
            <Plus size={14} className='stroke-white' />
            <Text className='font-barlow-500 uppercase color-white text-sm leading-none'>
              Add
            </Text>
          </View>
        </AnimatedPressable>
      </Animated.View>
    </Animated.View>
  );
}
