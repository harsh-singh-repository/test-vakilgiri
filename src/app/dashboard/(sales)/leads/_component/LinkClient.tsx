import { MaterialInput } from "@/components/material-input";
import { Button } from "@/components/ui/button";
import { useSearchClinetQuery } from "@/hooks/clients/manage-client";
import React, { useEffect, useState } from "react";
import { clientDetailsType } from "../_types";
import { cn } from "@/lib/utils";
import { useLinkClient } from "@/hooks/leads/manage-leads";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkClientformSchema } from "../_types/zodSchema";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

const LinkClient = ({ leadId }: { leadId: string }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedClientId, setSelectedClientId] = useState<string>("");

  const queryClient = useQueryClient();

  const { data } = useSearchClinetQuery(searchQuery);

  const { mutate } = useLinkClient(leadId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const form = useForm<z.infer<typeof LinkClientformSchema>>({
    resolver: zodResolver(LinkClientformSchema),
    defaultValues: {
      clientId: "",
    },
  });

  useEffect(() => {
    form.setValue("clientId", selectedClientId);
  }, [selectedClientId, form]);

  const onSubmit = (data: z.infer<typeof LinkClientformSchema>) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Client Linked Successfully");
        queryClient.invalidateQueries({queryKey:["leadId"]});
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.message || "An unexpected error occurred.";
          toast.error(`Failed to Link Client: ${errorMessage}`);
        } else {
          toast.error(`An unexpected error occurred: ${error}`);
        }
      },
    });
  };

  return (
    <div className="p-0">
      <div className="flex flex-col justify-center items-center w-full gap-y-1">
        <span className="font-semibold text-[14px] text-[#091747]">
          Link User
        </span>
        <MaterialInput
          placeholder="Email"
          className="w-[250px]"
          onChange={handleChange}
        />
        <div className="text-xs text-[#091747] flex flex-col gap-y-2 w-full px-2 cursor-pointer">
          {data?.map((searchClient: clientDetailsType, index: number) => {
            const isSelected = searchClient.id === selectedClientId;
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col px-2 py-1 rounded-md",
                  isSelected ? "bg-[#FFD7D7]" : "bg-transparent"
                )}
                onClick={() => setSelectedClientId(searchClient.id)}
              >
                <span className="font-semibold">
                  {searchClient.firstName + " " + searchClient.lastName}
                </span>
                <div className="flex">
                  <span className="font-semibold uppercase">PAN:</span>
                  <span>{searchClient.pan}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold">[M]:</span>
                  <span>{searchClient.mobileNumber}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold">[E]:</span>
                  <span>{searchClient.email}</span>
                </div>
              </div>
            );
          })}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <div>
                  <Input
                    type="text"
                    placeholder="Enter Email"
                    {...field}
                    className="hidden"
                  />
                  <FormMessage />
                </div>
              )}
            />
            <Button
              className="bg-[#f21300] w-[250px] text-white font-[12px] hover:bg-[#f21300]"
              type="submit"
            >
              Link User
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LinkClient;
