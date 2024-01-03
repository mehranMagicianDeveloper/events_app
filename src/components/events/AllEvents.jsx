import Image from "next/image";
import Link from "next/link";

const AllEvents = ({ data }) => {
  return (
    <div className="events_page">
      {data?.map((ev) => (
        <Link key={ev.id} href={`/events/${ev.id}`} passHref className="card">
          <Image src={ev.image} alt={ev.title} width={500} height={500} />{" "}
          <h2>{ev.title} </h2>
        </Link>
      ))}
    </div>
  );
};

export default AllEvents;
