import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";

// Global
import {Navbar} from "./pages/components/index.js";

// pages/Home
import {
    AppHeader,
    AppSocials,
    AppExperience,
    AppFooter,
} from "./pages/Home/containers/index.js";

// pages/NotFound (404)
import {NotFound} from "./pages/NotFound/index.js";


// pages/Bday
import {Bday} from "./pages/Bday/index.js";
import {AppReturnToTop} from "./pages/Home/components";
import Confetti from "react-confetti";


const theme_group = {
    localStorageKey: "color-mode",
    themes: [
        {
            name: "Pink",
            className: "theme_default",
            mode: "light"
        },
        {
            name: "Night",
            className: "theme_night",
            mode: "dark"
        },
        {
            name: "Deep Space",
            className: "theme_deep-space",
            mode: "dark"
        },
        {
            name: "Lavender",
            className: "theme_lavender",
            mode: "light"
        },
        {
            name: "Cloudy",
            className: "theme_cloudy",
            mode: "light"
        },
        {
            name: "Blue",
            className: "theme_blue",
            mode: "light"
        }
    ]
};

const App = () => {
    const getInitialColorMode = (themeGroup) => {
        const persisted_theme = window.localStorage.getItem(themeGroup.localStorageKey);
        const has_persisted_theme = typeof persisted_theme === "string";

        // Check if the device is a mobile device based on the screen width
        const isMobile = window.innerWidth <= 768;

        const is_dark_mode = window.matchMedia("(prefers-color-scheme: dark)").matches;

        // automatically set light/dark theme based on system
        const system_theme = is_dark_mode
            ? themeGroup.themes[1] // index 1 is dark mode
            : themeGroup.themes[0]; // index 0 is default (light) mode

        if (has_persisted_theme) {
            const persistedTheme = themeGroup.themes.find((theme) => theme.className === persisted_theme);
            if (persistedTheme) {
                return persistedTheme;
            }
        }

        // Only automatically set the dark mode for mobile devices
        if (isMobile) {
            return system_theme;
        } else {
            return themeGroup.themes[0]; // index 0 is default (light) mode
        }
    };

    const [theme, setTheme] = useState(() => getInitialColorMode(theme_group));

    useEffect(() => {
        document.documentElement.className = theme.className;
    }, [theme]);

    // opening animation timer
    useEffect(() => {
        const timeout = setTimeout(() => {
        }, 5000); // Show the animation for 5 seconds

        return () => clearTimeout(timeout);
    }, []);

    const toggleTheme = (themeGroup) => {
        const currentIndex = themeGroup.themes.findIndex(
            (item) => item.className === theme.className
        );
        const nextIndex = (currentIndex + 1) % themeGroup.themes.length;
        const nextTheme = themeGroup.themes[nextIndex];

        window.localStorage.setItem(themeGroup.localStorageKey, nextTheme.className);

        setTheme(nextTheme);
        document.documentElement.className = nextTheme.className; // update theme
    };

    useEffect(() => {
        const persisted_theme = window.localStorage.getItem(theme_group.localStorageKey);
        const has_persisted_theme = typeof persisted_theme === "string";

        if (!has_persisted_theme) {
            window.localStorage.setItem(theme_group.localStorageKey, theme_group.themes[0].className);
        }
    }, []);

    const [celebrate, setCelebrate] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            let now = new Date();
            let bday = new Date(now.getFullYear(), 3, 3); // April 3rd
            let endCelebration = new Date(bday.getTime() + 24 * 60 * 60 * 1000); // 1 day after the birthday

            // If the current date is after the birthday, set bday to next year's birthday
            if (now > endCelebration) {
                bday = new Date(now.getFullYear() + 1, 3, 3);
            }

            const distance = bday - now;

            if (distance <= 0 && now < endCelebration) {
                setCelebrate(true);
            } else {
                setCelebrate(false);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <BrowserRouter> <Routes>
            <Route
                path="/"
                element={
                    <>
                        {celebrate && <Confetti numberOfPieces={250} wind={0.01} />}
                        <Navbar
                            toggleTheme={() => toggleTheme(theme_group)} themes={theme_group.themes} theme={theme}
                            links={[
                                {name: "Socials", link: "#socials"},
                                {name: "Experience", link: "#experience"}
                            ]}
                            extLinks={[...(celebrate ? [{name: "Birthday 🥳", link: "/bday"}] : [])]}
                            forceShrink={false}
                        />
                        <AppReturnToTop />
                        <AppHeader />
                        <AppSocials theme={theme.mode} />
                        <AppExperience />
                        <AppFooter /> </>
                }
            />

            <Route path="/bday" element={
                <>
                    <Navbar
                        toggleTheme={() => toggleTheme(theme_group)}
                        themes={theme_group.themes}
                        theme={theme}
                        links={[]}
                        extLinks={[]}
                        forceShrink={true}
                    />
                    <Bday themeType={theme.theme} />
                </>
            } />

            <Route path="/ping" element={<p>pong</p>} />

            <Route
                path="*"
                element={
                    <>
                        <Navbar
                            toggleTheme={() => toggleTheme(theme_group)}
                            themes={theme_group.themes}
                            theme={theme}
                            links={[{name: "Take me home", link: "/"}]}
                            extLinks={[]}
                            forceShrink={false}
                        />
                        <NotFound />
                    </>
                }
            />
        </Routes> </BrowserRouter>
    );
};

export default App;
