import React, { useEffect, useState } from "react";
import storeItem, { ClothingItem } from "@/data/dummy";
import Image from "next/image";
import moment from "moment";

interface NewPageProps {
    // Add any necessary props
}

const colorVariants: { [key: string]: string } = {
    blue: "bg-blue-600 hover:bg-blue-500",
    red: "bg-red-600 hover:bg-red-500",
    white: "bg-slate-200 hover:bg-slate-100",
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

const NewPage: React.FC = () => {
    const [newItem, setNewItem] = useState<ClothingItem[]>([]);

    const addComma = (price: number) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    };

    useEffect(() => {
        let newProduct = storeItem.filter((item) => item.status === "new");
        setNewItem(newProduct);
    }, []);

    return (
        <div className="flex">
            <ul className="list-main">
                {newItem.length > 0 ? (
                    newItem.map((item, idx) => (
                        <li className="shadow min-h-72 rounded-md cursor-pointer" key={idx}>
                            <div className="mb-1.5">
                                <Image
                                    className="rounded-t max-h-56 min-h-56 object-fill"
                                    src={item.img}
                                    alt="Clothing"
                                    width={800}
                                    height={500}
                                />
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
                                <div className="flex h-3 mt-2 gap-1">
                                    {item.color.map((c, idx) => (
                                        <div className={`w-3 max-h-1 ${colorVariants[c]}`} key={idx}></div>
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
                <div className="banner rounded-md shadow">
                    <div>
                        <Image className="rounded-t" src="/images/banner1.webp" alt="BANNER" width={800} height={500} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPage;
