import localFont from "next/font/local";
import "./globals.css";
import { Quicksand } from "next/font/google";



const poppins = Quicksand({
  subsets: ["latin"],
  weight: [ "300", "400", "500", "600", "700"],
});
export const metadata = {
  title: "Sparsa",
  description: "Essential oils and oleoresins for a healthier lifestyle.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
