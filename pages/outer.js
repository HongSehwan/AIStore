import Image from "next/image";
import { useEffect, useState } from "react";
import storeItem from "../data/dummy";

function OuterPage() {
    const [outerItem, setOuterItem] = useState([]);

    useEffect(() => {
        let outer = storeItem.clothing.filter((item) => item.type === "outerwear");
        setOuterItem(outer);
    }, []);

    return (
        <div className="flex">
            <ul className="list-main">
                {outerItem.length > 0 ? (
                    outerItem.map((item, idx) => (
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

export default OuterPage;
