import type { Metadata } from "next";
import {
  Atkinson_Hyperlegible,
  Schibsted_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/Footer";

/* -------------------------------------------------------------------------- */
/*  Fonts — self-hosted via next/font/google                                  */
/* -------------------------------------------------------------------------- */

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Eyelink — One platform for all accessibility needs",
  description:
    "ASL translation, audio navigation, book assistance, and wheelchair accessibility — unified in one platform.",
};

/* -------------------------------------------------------------------------- */
/*  Root Layout                                                               */
/* -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${atkinson.variable} ${schibsted.variable} ${jetbrains.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
