import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";

import { HomeContainer, Product } from "../styles/pages/home";
import ShirtOne from "@/assets/shirts/Variant1.png";
import ShirtTwo from "@/assets/shirts/Variant2.png";
import ShirtThree from "@/assets/shirts/Variant3.png";

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={ShirtOne} width={520} height={420} alt="" />

        <footer>
          <strong>Camiseta 1</strong>
          <span>R$ 69,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={ShirtTwo} width={520} height={420} alt="" />

        <footer>
          <strong>Camiseta 2</strong>
          <span>R$ 69,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={ShirtThree} width={520} height={420} alt="" />

        <footer>
          <strong>Camiseta 3</strong>
          <span>R$ 89,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
