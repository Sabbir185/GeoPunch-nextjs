"use server"
import PlaceTable from "@/app/dashboard/place-of-presence/PlaceTable";

async function PlaceOfPresence() {
    return (
        <div className="space-y-4">
            <PlaceTable/>
        </div>
    );
}

export default PlaceOfPresence;
