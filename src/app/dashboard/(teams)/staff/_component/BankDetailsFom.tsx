import React from 'react'
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Search} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const bankFormSchema = z.object({
    ifsc: z.string().min(11, "IFSC must be 11 characters").max(11),
    accountNumber: z.string().min(9, "Invalid account number").max(18),
    accountType: z.string(),
    accountHolder: z.string().min(1, "Account holder name is required"),
    bankName: z.string().min(1, "Bank name is required"),
    branchAddress: z.string().min(1, "Branch address is required"),
    isPrimaryAccount: z.boolean().default(false),
  });

const BankDetailsForm = () => {
    const bankForm = useForm<z.infer<typeof bankFormSchema>>({
        resolver: zodResolver(bankFormSchema),
        defaultValues: {
          ifsc: "",
          accountNumber: "",
          accountType: "",
          accountHolder: "",
          bankName: "",
          branchAddress: "",
          isPrimaryAccount: false,
        },
      });
    
      function onBankSubmit(values: z.infer<typeof bankFormSchema>) {
        console.log("Bank form values:", values);
      }
  return (
    <div>
         <Form {...bankForm}>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault(); // Prevent the default behavior
                      bankForm.handleSubmit(onBankSubmit)(event); // Call the Zod resolver and form submission handler
                    }}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={bankForm.control}
                        name="ifsc"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="IFSC"
                                  {...field}
                                  className="pr-10"
                                />
                                <button
                                  type="button"
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                  onClick={() => console.log("Search IFSC")}
                                >
                                  <Search className="h-4 w-4" />
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bankForm.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Account Number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bankForm.control}
                        name="accountType"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Account Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="savings">Savings</SelectItem>
                                <SelectItem value="current">Current</SelectItem>
                                <SelectItem value="salary">Salary</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bankForm.control}
                        name="accountHolder"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter Full Name"
                                {...field}
                                className=""
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bankForm.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Bank Name"
                                {...field}
                                className=""
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bankForm.control}
                        name="branchAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Bank Address"
                                {...field}
                                className=""
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-2 flex justify-between items-center">
                        <FormField
                          control={bankForm.control}
                          name="isPrimaryAccount"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <span className="text-sm text-gray-700">
                                Is this your Primary Account
                              </span>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700"
                        >
                          Add Account
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
    </div>
  )
}

export default BankDetailsForm;