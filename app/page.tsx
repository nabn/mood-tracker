import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <Link href="/logs">View mood logs</Link>
        </li>
      </ul>
    </main>
  );
}
