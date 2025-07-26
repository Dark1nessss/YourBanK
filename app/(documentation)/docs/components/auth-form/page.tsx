'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/docs/code-block';
import { Card } from '@/components/ui/card';
import AuthForm from '@/components/AuthForm';

export default function AuthFormPage() {
  return (
    <div className="space-y-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="font-ibm-plex-serif text-3xl font-bold text-white md:text-5xl">
          AuthForm
        </h1>
        <p className="text-lg text-gray-400">
          A flexible authentication form component supporting both sign in and
          sign up flows.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Usage
        </h2>
        <Card className="p-6 bg-white border-gray-800">
          <div className="max-w-sm mx-auto">
            <AuthForm type="sign-in" />
          </div>
        </Card>

        <CodeBlock
          code={`import AuthForm from "@/components/AuthForm"

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto">
      <AuthForm type="login" />
    </div>
  )
}`}
          showLineNumbers
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Props
        </h2>
        <div className="grid gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">variant</h3>
            <p className="text-gray-400">
              The form variant to display: &quot;login&quot; or
              &quot;register&quot;.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: &quot;login&quot; | &quot;register&quot; (optional, defaults
              to &quot;login&quot;)
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">onSubmit</h3>
            <p className="text-gray-400">
              Callback function called when the form is submitted.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: (data: AuthFormData) =&gt; Promise&lt;void&gt; (optional)
            </p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h3 className="font-semibold text-white mb-2">className</h3>
            <p className="text-gray-400">
              Additional CSS classes to apply to the form container.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Type: string (optional)
            </p>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="font-ibm-plex-serif text-2xl font-bold text-white">
          Implementation
        </h2>
        <p className="text-gray-400">
          The complete implementation of the AuthForm component:
        </p>

        <CodeBlock
          code={`"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const authFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
})

export type AuthFormData = z.infer<typeof authFormSchema>

interface AuthFormProps {
  variant?: "login" | "register"
  onSubmit?: (data: AuthFormData) => Promise<void>
  className?: string
}

export function AuthForm({
  variant = "login",
  onSubmit,
  className,
}: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function handleSubmit(data: AuthFormData) {
    setIsLoading(true)
    try {
      await onSubmit?.(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-6", className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="m@example.com"
                  type="email"
                  disabled={isLoading}
                  {...field}
                />
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
                <Input
                  placeholder="••••••••"
                  type="password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-[#39A36A] hover:bg-[#2E8754]"
          disabled={isLoading}
        >
          {variant === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </Form>
  )
}`}
          showLineNumbers
        />
      </motion.div>
    </div>
  );
}
