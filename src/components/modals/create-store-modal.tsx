"use client";

import { createStore } from "@/actions/store";
import { Modal } from "@/components/global/modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateStoreModal } from "@/hooks/use-create-store-modal";
import { getErrorMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Store name must be longer than 3 chars." })
    .max(32, { message: "Store name shouldn't be longer than 32 chars." }),
  subdomain: z
    .string()
    .min(3, { message: "Store name must be longer than 4 chars." })
    .max(12, { message: "Store name shouldn't be longer than 12 chars." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Must be a valid subdomain.",
    }),
});

export const CreateStoreModal = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isOpen, onClose } = useCreateStoreModal();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      subdomain: "",
    },
  });

  const { isValid } = form.formState;

  const handleSubmit = (values: z.infer<typeof schema>) => {
    setIsSubmitting(true);

    toast.promise(createStore(values), {
      loading: "Creating your store...",
      success: ({ message, storeId }) => {
        setIsSubmitting(false);
        form.reset();
        window.location.assign(`/dashboard/${storeId}`);
        return message;
      },
      error: (error) => {
        setIsSubmitting(false);
        form.reset();
        return getErrorMessage(error);
      },
    });
  };

  return (
    <Modal
      title="Create your store"
      description="Fill the details to continue to your dashboard."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Evanto Market"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subdomain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subdomain</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. evanto"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-6 flex justify-end">
            <Button type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? (
                <Loader2
                  aria-hidden
                  className="mr-2 size-4 animate-spin text-muted-foreground"
                />
              ) : (
                <PlusCircleIcon aria-hidden className="mr-2 size-4" />
              )}
              Create
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
