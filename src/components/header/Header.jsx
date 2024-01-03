import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/din_djarin.svg";

const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  return (
    <header>
      <div>
        <div className="topNav">
          <Image alt="logo" src={logo} width={100} height={100} />
          <nav>
            <ul>
              <li>
                <Link href="/" passHref>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" passHref>
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about-us" passHref>
                  About us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="title"> Sed ut perspiciatis unde omnis</p>
      </div>
    </header>
  );
}
