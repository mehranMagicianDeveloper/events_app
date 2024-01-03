import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Footer() {
  return (
    <div className={`${inter.className}`}>
      <footer>
        <p> © 2022 Time to Code - A Project Built with Next.js </p>
      </footer>
    </div>
  );
}
