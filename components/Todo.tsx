import { todos } from "@/db/schema";
import { Check } from "lucide-react-native";
import { Text, View } from "react-native";

export function Todo({ todo }: { todo: typeof todos.$inferSelect }) {
  return (
    <View className='flex-row gap-2 items-center'>
      <View
        className={`w-4 h-4 border rounded-sm items-center justify-center ${
          Boolean(todo.done)
            ? "bg-selected border-selected"
            : "border-black bg-transparent"
        }`}>
        {Boolean(todo.done) && (
          <Check size={10} absoluteStrokeWidth className='stroke-white' />
        )}
      </View>
      <Text
        className={`font-barlow-400 ${
          Boolean(todo.done) ? "line-through decoration-selected" : ""
        }`}>
        {todo.content}
      </Text>
    </View>
  );
}
