export const _todos = [
  { content: "5km run", done: true, id: 1 },
  { content: "Read 10 pages", done: false, id: 2 },
  { content: "Walk the dog", done: false, id: 3 },
  { content: "Get groceries", done: false, id: 4 },
  { content: "Design a to-do app (?)", done: false, id: 4 },
];

export type Todo = (typeof _todos)[0];
