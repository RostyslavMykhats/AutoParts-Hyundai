import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
// layouts
import Layouts from "@/layouts";
import 'swiper/css';
import { store } from "@/store";
import { Provider } from "react-redux";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Layouts>
          <Component {...pageProps}  style={{
            background: "#F5F5F5",
          }}/>
        </Layouts>
      </Provider> 
    </>
  );
}