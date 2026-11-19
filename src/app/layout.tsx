import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"], variable: "--font-navigation", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-heading", display: "swap" });

export const metadata: Metadata = {
  title: "Akara Bakery | Glasgow",
  description: "Akara Cafe & Bakery in Glasgow, Scotland.",
  icons: {
    icon: { url: "/favicon.jpg", type: "image/jpeg" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} ${instrumentSerif.variable} ${dmSans.variable}`}>
        <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
          <defs>
            <filter id="brand-teal-tint" colorInterpolationFilters="sRGB">
              <feFlood floodColor="var(--brand-teal)" />
              <feComposite in2="SourceAlpha" operator="in" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
