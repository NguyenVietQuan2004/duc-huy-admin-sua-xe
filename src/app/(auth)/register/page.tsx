"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log("Form data", data);
    // fetch("/api/register", { method: "POST", body: JSON.stringify(data) })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="text-4xl font-bold text-indigo-600 mb-1">M</div>
          <h1 className="text-xl font-semibold text-indigo-600">MatDash</h1>
          <p className="text-sm text-gray-500">Sign Up on MatDash</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" className="bg-indigo-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="admin@..." className="bg-indigo-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="bg-indigo-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600">
              Sign Up
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an Account?{" "}
          <Link href="/login" className="text-indigo-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
