import { TaskBoard } from "@/components/task-board"
import { UserRegistration } from "@/components/user-registration"
import { cookies } from "next/headers"

export default function Home() {
  const cookieStore = cookies()
  const isLoggedIn = cookieStore.has("user")

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Mini Task Tracker</h1>

      {!isLoggedIn ? (
        <div className="max-w-md mx-auto">
          <UserRegistration />
        </div>
      ) : (
        <TaskBoard />
      )}
    </main>
  )
}
