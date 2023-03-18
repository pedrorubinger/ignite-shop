import { GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { useKeenSlider } from "keen-slider/react";
import Head from "next/head";
import Link from "next/link";

import { HomeContainer, Product } from "@/styles/pages/home";
import { stripe } from "@/lib/stripe";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(({ id, imageUrl, price, name }) => {
          return (
            <Link
              href={`/product/${id}`}
              key={id}
              prefetch={false}
              style={{
                margin: 0,
                padding: 0,
                width: "fit-content",
                height: "fit-content",
              }}
            >
              <Product className="keen-slider__slide">
                <Image src={imageUrl} width={520} height={420} alt="" />

                <footer>
                  <strong>{name}</strong>
                  <span>{price}</span>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

/** This function is used to request crucial information that must necessarily
 *  appear on the screen for bots, crawlers, indexers, and other similar programs.
 */
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format((price.unit_amount ?? 0) / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
