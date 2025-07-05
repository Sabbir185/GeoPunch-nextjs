import React from "react";
import {MapPinPlus, ShieldCheck, Users} from "lucide-react";

const cardsData = [
    {
        title: "Total Users",
        description: "Total number of registered users",
        value: 59,
        color: "#9b59b6",
        icon: Users
    },
    {
        title: "Total Locations",
        description: "Total available service locations",
        value: 12,
        color: "#f1c40f",
        icon: MapPinPlus
    },
    {
        title: "Current Active Users",
        description: "Users currently using the service",
        value: 150,
        color: "#2ecc71",
        icon: ShieldCheck
    },
]

function DashboardCard() {
    return <div>
        {/*cards*/}
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
            {
                cardsData?.map((card, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-4 flex flex-col">
                        <div className={'flex gap-4 my-3'}>
                            <div className={"bg-white rounded-full w-9 h-9 flex justify-center items-center"}>
                                <card.icon style={{color: card?.color}} size={"28"}/>
                            </div>
                            <div>
                                <p className="text-[14px] text-gray-600 font-semibold">{card?.title || ""}</p>
                                <h6 className="text-gray-900 text-[20px] font-bold">{card?.value || 0}</h6>
                            </div>
                        </div>
                        <div className={"bg-white h-[2px]"}/>
                        <p className={"mt-2 text-gray-500 text-[12px]"}>
                            {card?.description || ""}
                        </p>
                    </div>
                ))
            }
        </div>
    </div>;
}

export default DashboardCard;
