import React from "react";
import storeItem, { ClothingItem } from "@/data/dummy";
import { useRecoilValue } from "recoil";
import { cartState } from "@/store/recoil_atoms";
import Image from "next/image";
import axios from "axios";

interface CartPageProps {
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

const CartPage: React.FC<CartPageProps> = () => {
    const currentCart = useRecoilValue(cartState);

    const addComma = (price: number) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    };

    return (
        <div className="flex">
            <ul className="cart-main">
                {currentCart.length > 0 ? (
                    currentCart.map((item, idx) => (
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
                            <div className="flex justify-center mb-8">
                                <div className="flex h-3 mt-2">
                                    {item.color.map((c, idx) => (
                                        <div className={`w-3 max-h-1 mr-1 ${colorVariants[c]}`} key={idx}></div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex relative">
                                {item.status === "new" ? (
                                    <img className="cartNewIcon" src="/icons/product_new_icon.svg" alt="NEW" />
                                ) : item.status === "best" ? (
                                    <img className="cartBestIcon" src="/icons/product_best_icon.gif" alt="BEST" />
                                ) : null}
                            </div>
                        </li>
                    ))
                ) : (
                    <div></div>
                )}
            </ul>
        </div>
    );
};

export default CartPage;
