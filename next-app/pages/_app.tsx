import { AppProps } from "next/app";
import "./styles/globalStyles.css";
import { Provider } from "../lib/context";
import { Middleware } from "../lib/Middleware";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <Middleware>
        <Component {...pageProps} />
      </Middleware>
    </Provider>
  );
};

export default App;
