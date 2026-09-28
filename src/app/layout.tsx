import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/language-provider";
import { AppShell } from "@/components/layout/app-shell";

const interFr = Inter({ subsets: ["latin"], variable: "--font-sans-fr" });
const tajawalAr = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-sans-ar",
});

export const metadata: Metadata = {
  title: "KounKour",
  description: "Concours & Communauté Maroc",
};

// Applique le dir/lang mémorisé avant hydratation pour éviter un flash
// LTR->RTL. La valeur définitive est ensuite gérée par LanguageProvider.
const antiFlashScript = `
try {
  var lang = window.localStorage.getItem("kounkour:lang");
  if (lang === "ar") {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      dir="ltr"
      suppressHydrationWarning
      className={`${interFr.variable} ${tajawalAr.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
