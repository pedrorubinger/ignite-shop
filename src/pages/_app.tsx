import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";

import LogoImg from "@/assets/Logo.svg";
import { globalStyles } from "@/styles/global";
import { Container, Header } from "@/styles/pages/app";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <Image alt="" src={LogoImg} />
        </Link>
      </Header>

      <Component {...pageProps} />
    </Container>
  );
}
