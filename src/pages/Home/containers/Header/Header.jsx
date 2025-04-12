import React from "react";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

import "./Header.scss";

const Header = () => {
    const tl = gsap.timeline({
        // repeat: -1,
        // yoyo: true,
    });

    useGSAP(() => {
        tl.to(".header__line", {
            width: "125%",
            opacity: 1,
            ease: "power1.out",
            duration: 1.20
        });
    });

    useGSAP(() => {
        tl.from([".header__hero-text"], {
            yPercent: 100,
            ease: "power1.out",
            duration: 1.10
        }, 0.40);
    });

    useGSAP(() => {
        tl.from([".header__text-small"], {
            yPercent: -100,
            ease: "power1.out",
            duration: 0.9
        }, 0.80);
    });

    useGSAP(() => {
        tl.from(".header__about", {
            yPercent: 100,
            y: 50,
            ease: "power2.out",
            duration: 1,
            stagger: 0.15
        }, 1.20);
    });
    return (
        <>
            <div className="header">
                <div className="header__container">
                    <div className="text-line">
                        <h1 className="header__hero-text"> Hello</h1>
                    </div>

                    <div className="header__line" />

                    <div className="text-line">
                        <h2 className="header__text-small">I'm Jenna 🎀</h2>
                    </div>
                </div>
                <div
                    className="p-text header__about-container"
                >
                    <div className="text-line"><p className="header__about">
                        Hey there, I'm Jenna! My name is Jenna, and I'm here to tell you a bit about myself.
                    </p></div>
                    <div className="text-line"><p className="header__about">
                        🎀 You guessed it, I'm Jenna! Just wanted to make sure you know: I'm the ultimate <i>gurly</i>, Jenna.
                    </p></div>
                    <div className="text-line"><p className="header__about">
                        🚀 Buckle up, because here comes Jenna, telling you all about Jenna!
                    </p></div>
                </div>
            </div>
            <div className="header__shadow"></div>
        </>
    );
};

export default Header;
