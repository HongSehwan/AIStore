import Image from "next/image";
import { useEffect, useState } from "react";
import storeItem from "../data/dummy";

function ShoesPage() {
    const [shoesItem, setShoesItem] = useState([]);

    useEffect(() => {
        let shoes = storeItem.clothing.filter((item) => item.type === "shoes");
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
                            <div className="p-2 h-1/4">{item.name}</div>
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
}

export default ShoesPage;
