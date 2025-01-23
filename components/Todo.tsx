import type { Todo } from "@/utils/mock";
import { Check } from "lucide-react-native";
import { Text, View } from "react-native";

export function Todo({ todo }: { todo: Todo }) {
  return (
    <View className='flex-row gap-2 items-center'>
      <View
        className={`w-4 h-4 border rounded-sm items-center justify-center ${
          todo.done
            ? "bg-selected border-selected"
            : "border-black bg-transparent"
        }`}>
        {todo.done && (
          <Check size={10} absoluteStrokeWidth className='stroke-white' />
        )}
      </View>
      <Text
        className={`font-barlow-400 ${
          todo.done ? "line-through decoration-selected" : ""
        }`}>
        {todo.content}
      </Text>
    </View>
  );
}
