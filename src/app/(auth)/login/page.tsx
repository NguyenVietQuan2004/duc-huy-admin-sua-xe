"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { authApi } from "../../../api-request/authAPI";
import { useAppDispatch } from "@/store/hook";
import * as authActions from "@/store/slices/authSlice";
import { useState } from "react";
import { Loader } from "lucide-react";
const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const gradientStyle = {
  background:
    "linear-gradient(45deg, rgb(238, 119, 82,0.2), rgb(231, 60, 126,0.2), rgb(35, 166, 213,0.2), rgb(35, 213, 171,0.2))",
  backgroundSize: "400% 400%",
  animation: "gradient 15s ease infinite",
  height: "100vh",
};

export default function LoginPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormSchema) => {
    try {
      setIsLoading(true);
      const response = await authApi.login({ email: data.email, password: data.password });
      const accessToken = response.data.access_token;
      dispatch(authActions.login(accessToken));

      await authApi.sendCookieToServer(accessToken);

      router.push("/");
    } catch (error) {
      form.setError("email", { type: "manual", message: "Thông tin tài khoản hoặc mật khẩu không chính xác" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={gradientStyle} className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl  h-[482px] shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="text-4xl font-bold text-indigo-600 mb-1">M</div>
          <h1 className="text-xl font-semibold text-indigo-600">MatDash</h1>
          <p className="text-sm text-gray-500">Sign In on MatDash</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="bg-indigo-50" type="email" {...field} />
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
                    <Input className="bg-indigo-50" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600">
              {isLoading ? <Loader className="animate-spin" /> : "Sign in"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-gray-600 mt-6"> Matdash </p>
      </div>
    </div>
  );
}
