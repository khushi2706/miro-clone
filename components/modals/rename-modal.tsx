"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/hooks/use-rename-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useEffect } from "react";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(60, "Title can't be longer than 60 characters"),
});

export default function RenameModal() {
  const {
    isOpen,
    close,
    initialValues: { title, id },
  } = useRenameModal();

  const { mutate, pending } = useApiMutation(api.board.update);

  const form = useForm({
    defaultValues: {
      title,
    },
    resolver: zodResolver(formSchema),
  });

  const { reset, register, handleSubmit, getValues } = form;

  const onOpenChange = () => {
    if (isOpen) {
      reset();
    }
    close();
  };

  const onSubmit = () => {
    if (!id) return;
    toast.promise(mutate({ id, title: getValues("title") }), {
      loading: "Updating board...",
      success: `Board title updated successfully! 🎉`,
      error: `Failed to update board title! 😔`,
    });
    onOpenChange();
  };

  useEffect(() => {
    reset({
      title,
    });
  }, [title, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
          <DialogDescription>
            give your board new awesome title
          </DialogDescription>
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
                    placeholder={"new awesome board title"}
                    autoFocus
                    maxLength={60}
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
                      {pending ? "Updating..." : "Update"}
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
