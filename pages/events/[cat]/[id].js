import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const Page = ({ data }) => {
  const inputEmail = useRef();
  const router = useRouter();

  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const eventId = router?.query.id;

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue.match(validRegex) && emailValue === "") {
      setMessage("Invalid email address");
    } else {
      setMessage("");
      try {
        const res = await fetch("../../api/email_registration", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: emailValue, eventId: eventId }),
        });

        if (!res.ok) throw new Error(`Error : ${res.status}`);

        const data = await res.json();
        console.log(data);
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  function handleChange(e) {
    const emailValue = e.target.value;

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (emailValue === "") {
      setMessage("");
    } else {
      if (!emailValue.match(validRegex)) {
        setMessage("Invalid email address");
      } else {
        setMessage("");
      }
    }
  }

  return (
    <div className="event_single_page">
      <Image src={data.image} width={1000} height={500} alt={data.id} />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <form onSubmit={handleSubmit} className="email_registration">
        <label>Please insert your email to purchasing the ticket </label>
        <input
          ref={inputEmail}
          type="text"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Page;

export async function getStaticPaths(context) {
  const { allEvents } = await import("../../../data/data.json");
  const allPaths = allEvents.map((event) => {
    return {
      params: {
        cat: event.city.toString(),
        id: event.id.toString(),
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { allEvents } = await import("../../../data/data.json");
  const data = allEvents.find((event) => event.id === context.params.id);

  return {
    props: {
      data: data,
    },
  };
}
