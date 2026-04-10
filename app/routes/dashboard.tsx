import Cookies from "js-cookie";
import { redirect } from "react-router";
import type { MeResponse } from "~/modules/user/type";
import type { Route } from "./+types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { User, Fingerprint, Mail, AtSign } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard | Clothify" }];
}

export async function clientLoader() {
  // 1. Ambil Token dari Cookie
  const token = Cookies.get("token");

  // 2. Proteksi: Kalau gak ada token, usir ke login
  if (!token) return redirect("/login");

  // 3. Ambil data profil dari Backend
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/me`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  // 4. Kalau token expired atau gak valid (401), hapus cookie & suruh login ulang
  if (!response.ok) {
    Cookies.remove("token");
    return redirect("/login");
  }

  const meResponse: MeResponse = await response.json();

  return { meResponse };
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  const { meResponse } = loaderData;

  return (
    <div className="min-h-screen bg-zinc-50/50 py-16 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-orange-500/10 rounded-full mb-2">
            <User className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-2">
            Welcome, {meResponse.fullName}!
          </h1>
          <p className="text-zinc-500 font-medium">
            Manage your account information and track your orders.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="shadow-xl shadow-zinc-200/50 border-zinc-200 overflow-hidden bg-white">
          <CardHeader className="bg-zinc-900 py-6">
            <CardTitle className="text-xl font-bold text-center text-white flex items-center justify-center gap-2">
              <Fingerprint className="w-5 h-5 text-orange-500" />
              Account Overview
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* User ID */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Fingerprint className="w-4 h-4" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    User ID
                  </p>
                </div>
                <p className="font-mono text-sm bg-zinc-100 p-2 rounded border border-zinc-200 text-zinc-700">
                  {meResponse.id}
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-400">
                  <User className="w-4 h-4" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    Full Name
                  </p>
                </div>
                <p className="font-bold text-zinc-900 text-lg">
                  {meResponse.fullName}
                </p>
              </div>

              {/* Username */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-400">
                  <AtSign className="w-4 h-4" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    Username
                  </p>
                </div>
                <p className="font-bold text-zinc-900 text-lg">
                  @{meResponse.username}
                </p>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Mail className="w-4 h-4" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    Email Address
                  </p>
                </div>
                <p className="font-bold text-zinc-900 text-lg">
                  {meResponse.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Note */}
        <p className="text-center text-xs text-zinc-400 italic">
          Need to change your data? Contact our support at support@clothify.com
        </p>
      </div>
    </div>
  );
}
