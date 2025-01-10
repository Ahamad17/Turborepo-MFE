import { SliderProvider } from "@/AppSlider/sliderContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SliderProvider>
      <Component {...pageProps} />
    </SliderProvider>
  );
}
