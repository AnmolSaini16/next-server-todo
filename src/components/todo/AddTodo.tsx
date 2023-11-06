"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addTodo } from "@/lib/todos";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {};

export default function AddTodo({}: Props) {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addTodo(text);
      if (response?.status === 200) {
        toast({
          description: "Todo added.",
        });
        setText("");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleAdd}>
      <div className="flex w-full  items-center space-x-3">
        <Input
          type="text"
          value={text}
          placeholder="Add Todo"
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" disabled={!text || loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add
        </Button>
      </div>
    </form>
  );
}
