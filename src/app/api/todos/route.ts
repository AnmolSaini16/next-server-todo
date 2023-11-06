import { NextResponse } from "next/server";

const todos: Todo[] = [];

export async function GET() {
  return Response.json(todos);
}

export async function POST(req: Request) {
  const { title }: Partial<Todo> = await req.json();
  if (!title) {
    return NextResponse.json({ error: "title is required" });
  }

  const newTodo: Todo = {
    id: (todos[todos.length - 1]?.id ?? 0) + 1,
    title,
    completed: false,
  };

  todos.push(newTodo);

  return NextResponse.json(todos);
}

export async function DELETE(req: Request) {
  const { id }: Partial<Todo> = await req.json();
  if (!id) {
    return NextResponse.json({ error: "id is required" });
  }

  const index = todos.map((i) => i.id).indexOf(id);
  if (index !== -1) {
    todos.splice(index, 1);
  }
  return NextResponse.json(todos);
}

export async function PUT(req: Request) {
  const { id, title }: Partial<Todo> = await req.json();
  if (!id || !title) {
    return NextResponse.json({ error: "id and title is required" });
  }

  todos.forEach((todo) => {
    if (todo.id === id && title) {
      todo.title = title;
    }
  });

  return NextResponse.json(todos);
}
