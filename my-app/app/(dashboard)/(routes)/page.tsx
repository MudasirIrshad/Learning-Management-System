import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
