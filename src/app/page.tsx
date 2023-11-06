import AddTodo from "@/components/todo/AddTodo";
import TodoContainer from "@/components/todo/TodoContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="mt-10">
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>TODO</CardTitle>
          </CardHeader>
          <CardContent>
            <AddTodo />
            <Suspense fallback={<Loading />}>
              <TodoContainer />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const Loading = () => {
  return (
    <p className="flex p-2 mt-4 text-s font-small">
      <Loader2 className="mr-2 animate-spin" />
      Loadig your todos...
    </p>
  );
};
