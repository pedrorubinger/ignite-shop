import { useEffect, useState } from "react";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import Stripe from "stripe";

import {
  CartDrawerContainer,
  CartItemContainer,
  CartItemImageContainer,
  CartItemInfo,
  CartItemsListContainer,
  CartRemoveItemButton,
  CartReviewAmountContainer,
  CartReviewPriceContainer,
  CustomButton,
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { stripe } from "@/lib/stripe";
import { convertCurrencyStringToNumber, formatCurrency } from "@/utils";
import { CustomDrawer } from "@/components/Drawer";

interface CartItem {
  id: string;
  priceId: string;
  formattedPrice: string;
  price: number;
  quantity: number;
  imageUrl: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  defaultPriceId: string;
}

interface ProductProps {
  product: Product;
}

interface LineItem {
  price: string;
  quantity: number;
}

const CART_STORAGE_NAME = "cart";

export default function Product({ product }: ProductProps) {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  const { isFallback } = useRouter();

  useEffect(() => {
    try {
      const cartItemsString: string | null =
        localStorage?.getItem?.(CART_STORAGE_NAME);

      setCartItems(cartItemsString ? JSON.parse(cartItemsString) ?? [] : []);
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  const totalPrice = cartItems?.reduce((acc, item) => acc + item.price, 0);
  const totalAmount = cartItems?.length;

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true);

      // line_items: []
      const response = await axios.post("/api/checkout", {
        lineItems: cartItems.map((item) => ({
          price: item.priceId,
          quantity: 1,
        })),
      });
      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      // Conectar com ferramente de observabilidade (Sentry / Datadog)

      alert("Falha ao redirecionar ao checkout!");
    }
  };

  const onRemoveCartItem = (item: CartItem) => {
    const newArray = cartItems.filter((cartItem) => cartItem.id !== item.id);
    const cartItemsString = JSON.stringify(newArray);

    localStorage.setItem(CART_STORAGE_NAME, cartItemsString);
    setCartItems(newArray);

    if (cartItems.length === 1) {
      setIsDrawerVisible(false);
    }
  };

  const addItemToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      priceId: product.defaultPriceId,
      formattedPrice: product.price,
      imageUrl: product.imageUrl,
      price: convertCurrencyStringToNumber(product.price),
      quantity: 1,
    };

    if (cartItems) {
      if (cartItems.find((item) => item.id === cartItem.id)) return;

      cartItems.push(cartItem);

      const cartItemsString = JSON.stringify(cartItems);

      localStorage.setItem(CART_STORAGE_NAME, cartItemsString);
    }
  };

  const handleAddToCart = async () => {
    addItemToCart();
    setIsDrawerVisible(true);
  };

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <CustomDrawer
        title="Sacola de compras"
        onClose={() => setIsDrawerVisible(false)}
        isVisible={isDrawerVisible}
        width={500}
      >
        <CartDrawerContainer>
          <CartItemsListContainer>
            {cartItems?.map((item) => {
              return (
                <CartItemContainer key={item.id}>
                  <CartItemImageContainer>
                    <Image src={item.imageUrl} width={80} height={80} alt="" />
                  </CartItemImageContainer>

                  <CartItemInfo>
                    <h4>{item.name}</h4>
                    <span>{item.formattedPrice}</span>
                    <CartRemoveItemButton
                      onClick={() => onRemoveCartItem(item)}
                    >
                      Remover
                    </CartRemoveItemButton>
                  </CartItemInfo>
                </CartItemContainer>
              );
            })}
          </CartItemsListContainer>

          <CartReviewAmountContainer>
            <h4>Quantidade</h4>
            <span>{totalAmount} produto(s)</span>
          </CartReviewAmountContainer>

          <CartReviewPriceContainer>
            <h4>Valor total</h4>
            <span>{formatCurrency(totalPrice ?? 0, true)}</span>
          </CartReviewPriceContainer>

          <CustomButton width="full" onClick={handleBuyProduct}>
            Finalizar compra
          </CustomButton>
        </CartDrawerContainer>
      </CustomDrawer>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <CustomButton
            onClick={handleAddToCart}
            disabled={isCreatingCheckoutSession}
          >
            Colocar na sacola
          </CustomButton>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = String(params?.id);
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });
  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format((price.unit_amount ?? 0) / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
