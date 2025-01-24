import { db } from "@/db/init";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Check } from "lucide-react-native";
import { Text, View } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

export function Todo({ todo }: { todo: typeof todos.$inferSelect }) {
  return (
    <View
      className='flex-row gap-2 items-center'
      onTouchStart={() => {
        db.update(todos)
          .set({
            done: Boolean(todo.done) ? 0 : 1,
          })
          .where(eq(todos.id, todo.id))
          .execute();
      }}>
      <View
        className={`w-4 h-4 border rounded-sm items-center justify-center  ${
          Boolean(todo.done)
            ? "bg-selected border-selected"
            : "border-black bg-transparent"
        } transition duration-300`}>
        {Boolean(todo.done) && (
          <Animated.View
            entering={ZoomIn.springify().duration(200)}
            exiting={ZoomOut.springify().duration(200)}>
            <Check size={10} absoluteStrokeWidth className='stroke-white' />
          </Animated.View>
        )}
      </View>
      <Text
        className={`font-barlow-400 flex-shrink ${
          Boolean(todo.done) ? "line-through decoration-selected" : ""
        }`}>
        {todo.content}
      </Text>
    </View>
  );
}
