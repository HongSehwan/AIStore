import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Next from "../public/icons/next-arrow.svg";
import Prev from "../public/icons/prev-arrow.svg";

const Carousel: React.FC = () => {
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const slider = document.querySelector(".slider");

    let change = setInterval(() => {
        if (slider) {
            const items = document.querySelectorAll(".sliderItem");
            slider.append(items[0]);
        }
    }, 8000);

    function activate(e: any) {
        if (isClient && slider) {
            const items = document.querySelectorAll(".sliderItem");
            e.target.matches(".next") && slider.append(items[0]);
            e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
            clearInterval(change);
            change = setInterval(() => {
                if (slider) {
                    const items = document.querySelectorAll(".sliderItem");
                    slider.append(items[0]);
                }
            }, 8000);
        }
    }

    document.addEventListener("click", activate, false);

    return (
        <div className="sliderWrapper">
            <ul className="slider">
                <li className="sliderItem bg-[url('/images/main-slider-image1.webp')]">
                    <div className="sliderContent">
                        <h2 className="sliderTitle">"신상품 기간 한정 무료배송"</h2>
                        <p className="sliderDescription">2024.01.08(월) ~ 03.01(금)</p>
                        <button>상품 보기</button>
                    </div>
                </li>
                <li className="sliderItem bg-[url('/images/main-slider-image2.webp')]">
                    <div className="sliderContent">
                        <h2 className="sliderTitle">"가방 최대 30% 할인 혜택"</h2>
                        <p className="sliderDescription">마일리지 중복 적립</p>
                        <button>상품 보기</button>
                    </div>
                </li>
                <li className="sliderItem bg-[url('/images/main-slider-image3.webp')]">
                    <div className="sliderContent">
                        <h2 className="sliderTitle">"#트렌드 #데님 팬츠"</h2>
                        <p className="sliderDescription">#신상품 #데일리룩 #청바지 </p>
                        <button>상품 보기</button>
                    </div>
                </li>
                <li className="sliderItem bg-[url('/images/main-slider-image4.webp')]">
                    <div className="sliderContent">
                        <h2 className="sliderTitle">"고품격 소가죽 정장 구두"</h2>
                        <p className="sliderDescription">마일리지 더블 찬스</p>
                        <button>상품 보기</button>
                    </div>
                </li>
                <li className="sliderItem bg-[url('/images/main-slider-image5.webp')]">
                    <div className="sliderContent">
                        <h2 className="sliderTitle">"당일 / 무료 배송 자켓 모음전"</h2>
                        <p className="sliderDescription">매일 10명 한정 최대 5,000원 할인쿠폰 제공</p>
                        <button>상품 보기</button>
                    </div>
                </li>
                <li className="sliderItem bg-[url('/images/main-slider-image6.webp')]">
                    <div className="sliderContent">
                        <h2 className="sliderTitle">"남성 정장 선착순 추첨 행사"</h2>
                        <p className="sliderDescription">골드 회원 이상 응모 가능 (매주 화요일 추첨)</p>
                        <button>상품 보기</button>
                    </div>
                </li>
                <li className="sliderItem bg-[url('/images/main-slider-image7.webp')]">
                    <div className="sliderContent">
                        <h2 className="sliderTitle">"악세사리 최대 20% 세일"</h2>
                        <p className="sliderDescription">2만 원 이상 구매 시 무료배송</p>
                        <button>상품 보기</button>
                    </div>
                </li>
            </ul>
            <nav className="sliderNav flex">
                <Image className="btn prev w-12" src={Prev} alt="Prev"></Image>
                <Image className="btn next w-12" src={Next} alt="Next"></Image>
            </nav>
        </div>
    );
};

export default Carousel;
