import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FeedbackButton from "./components/FeedbackButton";
import TableMobileCards from "./components/TableMobileCards";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://casuscoach.vercel.app"),
  title: {
    default: "CasusCoach | Oefen rechten slimmer",
    template: "%s | CasusCoach",
  },
  description:
    "Oefen MC-vragen en casussen per rechtsgebied en leerstuk. Voor rechtenstudenten die zich slimmer willen voorbereiden op tentamens.",
  applicationName: "CasusCoach",
  authors: [{ name: "CasusCoach" }],
  creator: "CasusCoach",
  publisher: "CasusCoach",
  openGraph: {
    title: "CasusCoach | Oefen rechten slimmer",
    description:
      "Oefen MC-vragen en casussen per rechtsgebied en leerstuk.",
    url: "https://casuscoach.vercel.app",
    siteName: "CasusCoach",
    locale: "nl_NL",
    type: "website",
  },
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
        <TableMobileCards />
        <FeedbackButton />
      </body>
    </html>
  );
}