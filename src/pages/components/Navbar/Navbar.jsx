import React, {useEffect, useRef, useState} from "react";

import "./Navbar.scss";
import {media} from "../../../constants/index.js";
import {HiMenuAlt4, HiX} from "react-icons/hi";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

const Navbar = ({toggleTheme, themes, theme, links, extLinks, forceShrink, icon}) => {
    icon = icon || media.favicon;
    const [showMenu, setShowMenu] = useState(false);
    const [isShrunk, setShrunk] = useState(!!forceShrink);
    const scrollThreshold = 32;

    const menuRef = useRef(null);

    useEffect(() => {
        if (forceShrink) return;
        let isScrolling = false;

        const handleScroll = () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    setShrunk(
                        document.body.scrollTop > scrollThreshold ||
                        document.documentElement.scrollTop > scrollThreshold
                    );
                    isScrolling = false;
                });
            }

            isScrolling = true;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [forceShrink]);

    // Add this useEffect hook
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [hasAnimated, setHasAnimated] = useState(true);

    useGSAP(() => {
        if (hasAnimated) {
            gsap.from([".navbar", ".navbar__shrunk"], {
                yPercent: -100,
                filter: "brightness(1.25)",
                duration: 1,
                ease: "power2.out",
                delay: 0.20,
                onComplete: () => setHasAnimated(false)
            })

            gsap.from([".navbar__nav-links", ".navbar__ext-links"], {
                yPercent: -200,
                duration: 0.90,
                ease: "power1.out",
                delay: 0.45 + 0.20,
                stagger: 0.10,
            });
        }
    }, []);

    const navbarRef = useRef(null);

    useGSAP(() => {
        if (isShrunk) {
            gsap.to(navbarRef.current, {
                backgroundColor: "var(--navbar-s-color)",
                borderBottom: "none",
                borderRadius: "20px",
                boxShadow: "0 4px 8px var(--shadow-color)",
                padding: "0.8rem 1.80rem",
                scale: 0.9,
                y: 8,
                duration: 0.65,
                ease: "sine.out"
            });
        } else {
            gsap.to(navbarRef.current, {
                backgroundColor: "var(--navbar-color)",
                borderBottom: "1px solid var(--shadow-glow-color)",
                borderRadius: 0,
                boxShadow: "none",
                padding: "1rem 2rem",
                scale: 1,
                y: 0,
                duration: 0.65,
                ease: "sine.out"
            });
        }
    }, [isShrunk]);

    return (
        <nav
            ref={navbarRef}
            className="navbar"
        >
            <div className="navbar__icon">
                <a href="/">
                    <img src={icon} alt="jerry favicon" />
                </a>
            </div>

            <ul className="navbar__nav-links">
                {links.map((dest, index) => (
                    <li className="text" key={index}>
                        <a className="text-underline" href={dest.link}>{dest.name}</a>
                    </li>
                ))}
            </ul>
            <ul className="navbar__ext-links">
                {extLinks.map((dest, index) => (
                    <li className="text" key={index}>
                        <a className="text-underline" href={dest.link} target="_blank" rel="noreferrer">{dest.name}</a>
                    </li>
                ))}
            </ul>

            <div className="navbar__theme-toggle">
                <button onClick={() => toggleTheme(Object.values(themes))}>
                    <div className="navbar__theme-container">
                        <div className="navbar__theme-circle" />
                        <p className="text navbar__theme-name">{theme.name}</p>
                    </div>
                </button>
            </div>
            {/* MOBILE */}
            <div ref={menuRef} className={`${showMenu ? "navbar__menu" : "navbar__menu-hidden"}`}>
                <HiMenuAlt4 onClick={() => setShowMenu(true)} />

                <div>
                    <HiX onClick={() => setShowMenu(false)} />
                    <ul className="navbar__ext-links-mobile">
                        {links.map((dest, index) => (
                            <li className="text" key={index}>
                                <a className="text-underline" onClick={() => setShowMenu(false)} href={dest.link}>
                                    {dest.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ul className="navbar__ext-links-mobile">
                        {extLinks.map((dest, index) => (
                            <li className="text" key={index}>
                                <a className="text-underline" onClick={() => setShowMenu(false)} href={dest.link} target="_blank" rel="noreferrer">
                                    {dest.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
