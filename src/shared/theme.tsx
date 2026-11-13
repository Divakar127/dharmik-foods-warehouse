"use client";
import { createContext, useContext, useEffect, useState } from "react";
type Theme = "light" | "dark";
const Context = createContext<{theme: Theme; toggle: () => void}>({theme:"light",toggle:()=>{}});
const key = "df_color_theme";
function preference(): Theme {
  const cookie = document.cookie.match(/(?:^|;\s*)df_color_theme=(light|dark)(?:;|$)/)?.[1];
  if (cookie) return cookie as Theme;
  try { return localStorage.getItem(key) === "dark" ? "dark" : "light"; } catch { return "light"; }
}
function apply(theme: Theme) { document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme; }
export function ThemeProvider({children}:{children: React.ReactNode}) {
 const [theme,setTheme] = useState<Theme>("light");
 useEffect(()=>{const sync=()=>{const next=preference();apply(next);setTheme(next);};sync();window.addEventListener("storage",sync);window.addEventListener("focus",sync);return()=>{window.removeEventListener("storage",sync);window.removeEventListener("focus",sync);};},[]);
 function toggle(){const next=theme==="light"?"dark":"light";apply(next);setTheme(next);try{localStorage.setItem(key,next);}catch{}document.cookie=`${key}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol==="https:"?"; Secure":""}`;}
 return <Context.Provider value={{theme,toggle}}>{children}</Context.Provider>;
}
export function ThemeToggle(){const {theme,toggle}=useContext(Context);return <button type="button" className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme==="light"?"dark":"light"} theme`} title={`Switch to ${theme==="light"?"dark":"light"} theme`}><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{theme==="light"?<path d="M21 13A9 9 0 0 1 11 3 9 9 0 1 0 21 13Z"/>:<><circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></>}</svg><span>{theme==="light"?"Dark":"Light"}</span></button>;}
