import { auth } from "@/auth.config"
import { Title } from "@/components/title/Title"
import { redirect } from "next/navigation"

export default async function ProfilePage() {

  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div>
      <Title title="Profile" />

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Welcome {session.user.name}</h1>
        <p className="text-lg">Email: {session.user.email}</p>
        <p className="text-lg">Role: {session.user.role}</p>
      </div>
    </div>
  )
}
