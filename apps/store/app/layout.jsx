
import Footer from "../components/Fotear";
import Header from "../components/Header";
import "../styles/globals.css";
import CartProviderWrapper from "./CartProviderWrapper";
import SessionWrapper from "./SessionWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>
        <SessionWrapper>
          <CartProviderWrapper>
            <Header />
            {children}
            <Footer/>
          </CartProviderWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
