import MainLayout from "@/src/components/layout/MainLayout";
import "@/styles/globals.css";
import "@/styles/general.sass";

export default function App({ Component, pageProps }) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}
