"use client";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React, {useEffect} from "react";
import LocationForm from "@/app/dashboard/locations/LocationForm";
import {useFetch} from "@/hooks/userAction";
import {fetchLocationList} from "@/utils/backend_helper";
import {useSearchParams} from 'next/navigation'
import {TLocation} from "@/schemas/location.schema";

function UpdateLocation() {
    const [data, getData, {loading, error}] = useFetch(fetchLocationList)
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        if (id) {
            getData({id: id});
        }
    }, [id]);

    return (
        <div className="space-y-4">
            <Card className="bg-gray-50 shadow-none">
                <CardHeader className="flex justify-between items-center">
                    <div className="space-y-1">
                        <CardTitle>Location</CardTitle>
                        <CardDescription>Update the location information</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <LocationForm data={data}/>
        </div>
    );
}

export default UpdateLocation;
