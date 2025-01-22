import type { Todo } from "@/utils/mock";
import { Text, View } from "react-native";

export function Todo({ todo }: { todo: Todo }) {
  return (
    <View className='flex-row gap-2 items-center'>
      <View
        className={`w-4 h-4 border rounded-sm ${
          todo.done
            ? "bg-selected border-selected"
            : "border-black bg-transparent"
        }`}
      />
      <Text
        className={`font-barlow-400 ${
          todo.done ? "line-through decoration-selected" : ""
        }`}>
        {todo.content}
      </Text>
    </View>
  );
}
