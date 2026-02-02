import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/src/lib/auth";
import { getAllChannels, getUsers } from "@/src/lib/admin";
import { ChannelManagement } from "./ChannelManagement";

export default async function ChannelsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/admin");

  const [channels, users] = await Promise.all([
    getAllChannels(),
    getUsers(),
  ]);

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-z-black">Channels</h2>
      <ChannelManagement channels={channels} users={users} />
    </div>
  );
}
