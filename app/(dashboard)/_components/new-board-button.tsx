"use client";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Form, FormField, FormMessage, FormItem } from "@/components/ui/form";

type NewBoardButtonProps = {
  orgId: string;
  disabled?: boolean;
};

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(60, "Title can't be longer than 60 characters"),
});

export function NewBoardButton({ orgId, disabled }: NewBoardButtonProps) {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { register, handleSubmit, reset } = form;

  const onOpenChange = () => {
    if (isOpened) {
      reset();
    }
    setIsOpened(!isOpened);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const title = values.title.trim();
    toast.promise(
      mutate({ orgId, title }).then((id) => {
        router.push(`/board/${id}`);
      }),
      {
        loading: "Creating board...",
        success: `Your board "${title}" created successfully! 🎉`,
        error: `Failed to create board "${title}"! 😔`,
      },
    );
    onOpenChange();
  };

  return (
    <Dialog open={isOpened} onOpenChange={onOpenChange}>
      <DialogTrigger
        disabled={pending || disabled}
        className={cn(
          "col-span-1 flex aspect-[100/127] flex-col items-center justify-center rounded-lg bg-amber-500 py-6 hover:bg-amber-600",
          (pending || disabled) &&
            "cursor-not-allowed opacity-75 hover:bg-amber-500",
        )}
        role={"button"}
        onClick={() => setIsOpened(true)}
      >
        <div />
        <Plus className={"h-12 w-12 stroke-1 text-white"} />
        <p className={"text-xs font-light capitalize text-white"}>new board</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <label htmlFor="newBoard"> Create a new board </label>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              {...register("title")}
              render={({ field }) => (
                <FormItem className={"space-y-6"}>
                  <Input
                    {...field}
                    id={"newBoard"}
                    placeholder={"awesome board title"}
                    autoFocus
                  />
                  <FormMessage />
                  <div className={"flex justify-between"}>
                    <Button
                      type={"button"}
                      variant={"secondary"}
                      onClick={onOpenChange}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant={"happy"}
                      type={"submit"}
                      disabled={pending}
                    >
                      {pending ? "Creating..." : "Create Board"}
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
