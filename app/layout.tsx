import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FeedbackButton from "./components/FeedbackButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "CasusCoach | Oefen rechten slimmer",
  description:
    "Oefen MC-vragen en casussen per rechtsgebied en leerstuk. Voor rechtenstudenten die zich slimmer willen voorbereiden op tentamens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="bg-slate-50 text-slate-950 antialiased">
        <Header />

        {children}

        <Footer />
        <FeedbackButton />
      </body>
    </html>
  );
}