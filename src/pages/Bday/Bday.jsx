import React, {useState, useEffect} from "react";
import "./Bday.scss";
import Confetti from "react-confetti";

const Bday = () => {
    useEffect(() => {
        document.title = "Jenna 🎂 " + countdown;
    });

    const [countdown, setCountdown] = useState("Loading...");
    const [celebrate, setCelebrate] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            let now = new Date();
            let bday = new Date(now.getFullYear(), 2, 13); // April 3rd
            let endCelebration = new Date(bday.getTime() + 24 * 60 * 60 * 1000); // 1 day after the birthday

            // If the current date is after the birthday, set bday to next year's birthday
            if (now > endCelebration) {
                bday = new Date(now.getFullYear() + 1, 2, 13);
            }

            const distance = bday - now;

            if (distance <= 0 && now < endCelebration) {
                setCelebrate(true);
                setCountdown("🥳 Happy birthday! 🎉");
            } else {
                setCelebrate(false);
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setCountdown("T- " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="c__container">
            <h2 className="ctext">🎂 Birthday countdown ⌛</h2>
            <p className="ctext">{countdown}</p>
            {celebrate && <Confetti numberOfPieces={350} wind={0.01} />}
        </div>
    );
};

export default Bday;
