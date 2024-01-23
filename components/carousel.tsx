import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import IonIcon from "@reacticons/ionicons";
import Next from "../public/icons/next-arrow.svg";
import Prev from "../public/icons/prev-arrow.svg";

const Carousel: React.FC = () => {
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const slider = document.querySelector(".slider");

    function activate(e: any) {
        if (isClient && slider) {
            console.log(e.target);
            const items = document.querySelectorAll(".sliderItem");
            e.target.matches(".next") && slider.append(items[0]);
            e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
            console.log(items);
        }
    }

    document.addEventListener("click", activate, false);

    return (
        <div className="sliderWrapper">
            <ul className="slider">
                <li className="sliderItem bg-[url('https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg')]">
                    <div className="sliderContent">
                        <h2 className="sliderTitle">"Lossless Youths"</h2>
                        <p className="sliderDescription">...</p>
                        <button>Read More</button>
                    </div>
                </li>
                <li className="sliderItem bg-[url('https://i.redd.it/tc0aqpv92pn21.jpg')]">
                    <div className="sliderContent">
                        <h2 className="sliderTitle">"Estrange Bond"</h2>
                        <p className="sliderDescription">...</p>
                        <button>Read More</button>
                    </div>
                </li>
                <li className="sliderItem bg-[url('https://wharferj.files.wordpress.com/2015/11/bio_north.jpg')]">
                    <div className="sliderContent">
                        <h2 className="sliderTitle">"The Gate Keeper"</h2>
                        <p className="sliderDescription">...</p>
                        <button>Read More</button>
                    </div>
                </li>
            </ul>
            <nav className="sliderNav flex">
                {/* <IonIcon className="btn prev" name="arrow-back-outline"></IonIcon>
                    <IonIcon className="btn next" name="arrow-forward-outline"></IonIcon> */}
                <Image className="btn prev w-12" src={Prev} alt="Prev"></Image>
                <Image className="btn next w-12" src={Next} alt="Next"></Image>
            </nav>
        </div>
    );
};

export default Carousel;
