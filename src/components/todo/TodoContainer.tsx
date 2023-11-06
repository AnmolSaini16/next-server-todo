import { getTodos } from "@/lib/todos";
import TodoItem from "./TodoItem";

type Props = {};

export default async function TodoContainer({}: Props) {
  const todos: Todo[] = await getTodos();

  return (
    <>
      <div className="mt-4 max-h-[calc(100vh-290px)] overflow-y-auto overflow-x-hidden grid grid-cols-1 divide-y">
        {!todos?.length ? (
          <p className="text-sm mt-2">No todos </p>
        ) : (
          todos?.map((todo, index) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
      <div className="mt-6">
        {todos?.length > 0 && (
          <p className="text-xs font-normal">Your Todo: {todos?.length}</p>
        )}
      </div>
    </>
  );
}
