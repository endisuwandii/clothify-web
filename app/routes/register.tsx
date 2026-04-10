import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/register";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { RegisterResponse } from "~/modules/user/type";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register" }];
}

export default function RegisterRoute({}: Route.ComponentProps) {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Register
        </h1>

        <Form method="POST">
          {/* Username */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              className="focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          {/* Email */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="example@mail.com"
              className="focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          {/* Full Name */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              type="text"
              name="fullName"
              placeholder="Your full name"
              className="focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          {/* Password */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter a strong password"
              className="focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          {/* Button */}
          <Button type="submit" className="w-full">
            Register User
          </Button>
        </Form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account ?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const registerBody = {
    username: formData.get("username")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
    fullName: formData.get("fullName")?.toString(),
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerBody),
    },
  );

  const registerResponse: RegisterResponse = await response.json();
  console.log(registerResponse);
  return redirect("/login");
}
