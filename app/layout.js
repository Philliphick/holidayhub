import { Inter, Glory, Cabin } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const glory = Glory({ subsets: ["latin"] });
const cabin = Cabin({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cabin.className}>{children}</body>
    </html>
  );
}
