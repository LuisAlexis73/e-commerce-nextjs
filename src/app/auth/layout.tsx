import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {

  const session = await auth();

  if (session?.user) {
    redirect('/');
  }


  return (
    <main className="min-h-flex">
      <div className="w-full sm:w-[350px] px-10 mx-auto">
        {children}
      </div>
    </main>
  );

}