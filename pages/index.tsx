import Image from "next/image";
import storeItem, { ClothingItem } from "@/data/dummy";
import Carousel from "@/components/Carousel";
import { useEffect, useState } from "react";
import moment from "moment";

interface StartPageProps {
    // Add any necessary props
}

const colorVariants: { [key: string]: string } = {
    blue: "bg-blue-600 hover:bg-blue-500",
    red: "bg-red-600 hover:bg-red-500",
    white: "bg-white-600 hover:bg-white-500",
    gray: "bg-gray-600 hover:bg-gray-500",
    pink: "bg-pink-600 hover:bg-pink-500",
    cyan: "bg-cyan-600 hover:bg-cyan-500",
    sky: "bg-sky-600 hover:bg-sky-500",
    indigo: "bg-indigo-600 hover:bg-indigo-500",
    stone: "bg-stone-900 hover:bg-stone-800",
    emerald: "bg-emerald-600 hover:bg-emerald-500",
    amber: "bg-amber-100 hover:bg-amber-50",
    orange: "bg-orange-800 hover:bg-orange-700",
};

const StartPage: React.FC<StartPageProps> = () => {
    const [month, setMonth] = useState<string>("");

    useEffect(() => {
        setMonth(moment().format("YYYY-MM"));
        console.log(moment().format("YYYY-MM"));
    }, []);

    const addComma = (price: number) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    };

    return (
        <>
            <Carousel />
            <div className="flex">
                <ul className="list-main">
                    {storeItem.length > 0 ? (
                        storeItem.map((item: ClothingItem, idx: number) => (
                            <li className="shadow min-h-72 rounded-md" key={idx}>
                                <div className="mb-px">
                                    <Image
                                        className="rounded-t max-h-56 min-h-56 object-fill"
                                        src={item.img}
                                        alt="Clothing"
                                        width={800}
                                        height={500}
                                    />
                                    <div className="flex relative">
                                        {item.goodsDate.slice(0, 7) === moment().format("YYYY-MM") ? (
                                            <img className="absolute w-8 right-1.5 bottom-3" src="/icons/product_new_icon.svg" alt="NEW" />
                                        ) : item.status === "best" ? (
                                            <img className="absolute w-14 right-1 bottom-0" src="/icons/product_best_icon.gif" alt="BEST" />
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full text-center">
                                        <div className="pt-px">
                                            <p className="text-sm font-serif">{item.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center mb-2">
                                    <div className="h-3 text-base font-serif">
                                        <p>{addComma(item.price)} 원</p>
                                    </div>
                                </div>
                                <div className="flex justify-center mb-2">
                                    <div className="flex h-3 mt-2">
                                        {item.color.map((c, idx) => (
                                            <div className={`w-3 border max-h-3 ${colorVariants[c]}`} key={idx}></div>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div></div>
                    )}
                </ul>
                <div className="banner-main-home my-5 mr-5">
                    <div className="banner-home rounded-md shadow">
                        <div>
                            <Image className="rounded-t" src="/images/banner1.webp" alt="BANNER" width={800} height={500} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StartPage;
