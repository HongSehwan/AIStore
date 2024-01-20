import Image from "next/image";
import storeItem from "../data/dummy";
import colorVariants from "../data/color";

function StartPage() {
    return (
        <div className="flex">
            <ul className="list-main">
                {storeItem.clothing.length > 0 ? (
                    storeItem.clothing.map((item, idx) => (
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
}

export default StartPage;
