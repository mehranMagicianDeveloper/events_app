import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage({ data }) {
  return (
    <div className={`${inter.className}`}>
      <main>
        <div>
          {data.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} passHref>
              <Image
                width={200}
                height={200}
                src={`${event.image}`}
                alt={event.title}
              />
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
