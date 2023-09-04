import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        <li>
          <Link href="/logs">Mood logs</Link>
        </li>
      </ul>
    </main>
  );
}
