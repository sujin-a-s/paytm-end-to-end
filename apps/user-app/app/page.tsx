import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

interface SessionProps {
  user : {
    id : string
  }
}
export default async function Page() {
  const session : SessionProps | null = await getServerSession(authOptions) 
  if (session?.user?.id) {
    redirect('/transfer')
  } else {
    redirect('/api/auth/signin')
  }
}
