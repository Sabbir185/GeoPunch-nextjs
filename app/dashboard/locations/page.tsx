"use server"
import LocationTable from "@/app/dashboard/locations/LocationTable";

async function Location() {
    return (
        <div className="space-y-4">
            <LocationTable/>
        </div>
    );
}

export default Location;
