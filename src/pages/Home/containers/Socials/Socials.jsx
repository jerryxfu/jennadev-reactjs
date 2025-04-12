import React from "react";
import {motion} from "framer-motion";

import {media} from "../../../../constants";
import {AppWrap} from "../../../components/index.js";

import "./Socials.scss";
import SectionTitle from "../../../components/SectionTitle";

// color: H, S:35%, V: 100%
const socials = [
    {name: "⭐ Instagram", color: "#ffa6c3", description: "jenna._png", iconUrl: media.instagram_gradient, url: "https://www.instagram.com/jenna._png/"},
    // {name: "Snapchat", color: "#fffea6", description: "jenna_bottoni", iconUrl: media.placeholder, url: "https://t.snapchat.com/6M6UTjKk"},
];

const texts = [
    {title: "Public Email", description: <>📧 <a href="mailto:@.">jenna.bottoni@gmail.com</a></>, imageUrl: ""},
    {title: "", description: "✨ Let's build something magic together!", imageUrl: ""},
];

const Socials = () => {
    return (
        <>
            <SectionTitle raw="Socials">
                <span>So</span>cials
            </SectionTitle>

            <div className="socials__container">
                <motion.div className="socials__grid">
                    {socials.map((social) => {
                        return (
                            <div className="socials__item" key={social.name}>
                                <motion.a
                                    href={social.url}
                                    rel="noreferrer"
                                    whileHover={{boxShadow: `0 0 30px ${social.color}`}}
                                >
                                    <img src={social.iconUrl} alt={`${social.name} img`} />
                                </motion.a>
                                <p className="bold-text">{social.name}</p>
                                <p className="p-text">{social.description}</p>
                            </div>
                        )
                    })}
                </motion.div>
                <motion.div className="socials__texts">
                    {texts.map((text, index) => {
                        return (
                            <motion.div
                                whileInView={{opacity: [0, 1], x: [50, 0]}}
                                transition={{duration: 0.65, ease: "easeInOut"}}
                                className="socials__text"
                                key={index}
                            >
                                <h4 className="bold-text">{text.title}</h4>
                                <p className="p-text">{text.description}</p>
                                <div className="socials__text-image">
                                    {text.imageUrl ? <img src={text.imageUrl} alt={text.title} /> : ""}
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </>
    );
};

export default AppWrap(Socials, "socials");
