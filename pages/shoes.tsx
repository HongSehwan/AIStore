import React, { useEffect, useState } from "react";
import Image from "next/image";
import storeItem, { ClothingItem } from "../data/dummy";

interface ShoesPageProps {
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

const ShoesPage: React.FC<ShoesPageProps> = () => {
    const [shoesItem, setShoesItem] = useState<ClothingItem[]>([]);

    useEffect(() => {
        let shoes = storeItem.filter((item) => item.type === "shoes");
        setShoesItem(shoes);
    }, []);

    return (
        <div className="flex">
            <ul className="list-main">
                {shoesItem.length > 0 ? (
                    shoesItem.map((item, idx) => (
                        <li className="border-2 min-h-60 rounded-md" key={idx}>
                            <div className="h-3/4">
                                <Image className="rounded-t max-h-44" src={item.img} alt="Clothing" width={800} height={500} />
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <div className="pl-2 pt-px h-1/4">
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="flex px-2 pt-3.5">
                                        <span className="mr-2 text-sm">SIZE:</span>
                                        {item.size.slice(0, 3).map((s, idx) => (
                                            <span className="mr-2 text-sm" key={idx}>
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex pr-2 pt-2">
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
            <div className="banner-main my-5 mr-5">
                <div className="banner border-2 rounded-md">
                    <div>
                        <Image className="rounded-t" src="/images/banner1.jpeg" alt="BANNER" width={800} height={500} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoesPage;
