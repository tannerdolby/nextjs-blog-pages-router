import '../styles/global.css';
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

export default function App({ Component, pageProps }) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const html = document.querySelector('html');
        if (theme === 'dark') {
            html.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            html.classList.remove('dark');
            document.body.classList.remove('dark');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={theme}>
            <Component {...pageProps} />
            <button
                className='theme-switcher-btn'
                title="Toggle theme"
                onClick={() => {
                    if (theme === 'light') {
                        setTheme('dark');
                    } else {
                        setTheme('light');
                    }
                }}
            >
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </ThemeContext.Provider>
    );
}
