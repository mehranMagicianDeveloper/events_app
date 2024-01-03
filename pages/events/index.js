import AllEvents from "@/src/components/events/AllEvents";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Page = ({ data }) => {
  return <AllEvents data={data} />;
};

export default Page;

export async function getStaticProps() {
  const { events_categories } = await import("../../data/data.json");

  return {
    props: {
      data: events_categories,
    },
  };
}
