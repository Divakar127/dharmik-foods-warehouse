import { ThemeProvider, ThemeToggle } from "../shared/theme";
import { themeInit } from "../shared/theme-init";
import "@fontsource/instrument-sans/latin-400.css";
import "@fontsource/instrument-sans/latin-500.css";
import "@fontsource/instrument-sans/latin-600.css";
import "@fontsource/instrument-sans/latin-700.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/noto-sans-tamil/400.css";
import "@fontsource/noto-sans-tamil/600.css";
import type { Metadata } from "next";
import "./globals.css";
import "./pantry.css";
import "../shared/theme.css";
import "../shared/refinement.css";
import "../shared/controls.css";

export const metadata: Metadata = { title: "Dharmik Foods | Warehouse", description: "Manage the Dharmik Foods food catalog, warehouse inventory and publishing." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="light" suppressHydrationWarning><head><script id="theme-init" dangerouslySetInnerHTML={{__html:themeInit}}/></head><body><ThemeProvider><div className="warehouse-theme-toolbar"><span>Dharmik Foods · Warehouse</span><ThemeToggle/></div>{children}</ThemeProvider></body></html>;
}
