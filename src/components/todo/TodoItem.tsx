"use client";

import { Trash, Pencil, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { deleteTodo, editTodo } from "@/lib/todos";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await deleteTodo(todo.id);
      if (response?.status === 200) {
        toast({
          description: "Todo deleted.",
        });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex p-3 items-center justify-between">
      <div className="flex items-center">
        <Checkbox
          className="mr-1"
          onCheckedChange={(e) => setChecked(e as boolean)}
          checked={checked}
        />

        <TodoDetails
          todo={todo}
          checked={checked}
          open={open}
          setOpen={setOpen}
        />
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleDelete}
          disabled={deleting}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

const TodoDetails = ({
  todo,
  checked,
  open,
  setOpen,
}: {
  todo: Todo;
  checked: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [todoTitle, setTodoTitle] = useState<string>(todo.title);
  const [editing, setEditing] = useState<boolean>(false);

  const getTitle = () => {
    if (todo.title.length > 50) return todo.title.slice(0, 50) + "...";
    return todo.title;
  };

  const handletEdit = async () => {
    setEditing(true);
    try {
      const response = await editTodo(todo.id, todoTitle);
      if (response?.status === 200) {
        toast({
          description: "Todo edited.",
        });
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEditing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <Button
        variant="link"
        className={`text-sm whitespace-normal ${checked && "line-through"}`}
        onClick={() => setOpen(true)}
      >
        {getTitle()}
      </Button>

      <DialogContent>
        <DialogHeader>
          <div className="grid w-full gap-2">
            <Label htmlFor="title">Your Todo</Label>
            <Textarea
              placeholder="Enter your todo"
              id="title"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </div>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setOpen(false)}
          >
            <X className="h-3 w-3 mr-1.5" /> Close
          </Button>

          <Button
            variant="secondary"
            type="button"
            size="sm"
            disabled={todo.title === todoTitle || editing || !todoTitle.length}
            onClick={handletEdit}
          >
            <Pencil className="h-3 w-3 mr-1.5" />
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
