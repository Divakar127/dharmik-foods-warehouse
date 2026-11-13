// Runs before the body is painted. Cookie scope shares the preference across
// storefront and warehouse ports; localStorage supports persistence per origin.
export const themeInit = `(function(){var t='light';var m=document.cookie.match(/(?:^|;\\s*)df_color_theme=(light|dark)(?:;|$)/);if(m)t=m[1];else try{if(localStorage.getItem('df_color_theme')==='dark')t='dark'}catch(e){}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t})()`;
