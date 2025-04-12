import React from "react";

import "./Footer.scss";


const sites = [
    {title: "Bday 🎂", url: "/bday"},
    {title: "404", url: "/404"},
];

const Footer = () => {
    return (
        <>
            <div className="footer__shadow"></div>

            <div className="footer">
                <div className="footer__sites">
                    <h4 className="bold-text">Links</h4>
                    {sites.map((site) => {
                        return (
                            <a className="p-text" href={site.url} key={site.title}>{site.title}</a>
                        )
                    })}
                </div>
            </div>
            <div className="copyright" style={{backgroundColor: "var(--footer-color)", paddingTop: "0"}}>
                <p>Copyright © 2024-{new Date().getFullYear()} Jenna, <a href="https://jerrydev.net/" style={{color: "inherit"}}>Jerry</a></p>
            </div>
        </>
    );
};

// do not wrap the footer
export default Footer;
