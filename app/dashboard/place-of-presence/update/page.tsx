"use client";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React, {Suspense, useEffect} from "react";
import {useFetch} from "@/hooks/userAction";
import {fetchPlaceList} from "@/utils/backend_helper";
import {useSearchParams} from 'next/navigation'
import PlaceForm from "@/app/dashboard/place-of-presence/PlaceForm";

function UpdatePlaceContent() {
    const [data, getData, {loading, error}] = useFetch(fetchPlaceList)
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
                        <CardTitle>Place of Presence</CardTitle>
                        <CardDescription>Update the place</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <PlaceForm data={data}/>
        </div>
    );
}

function UpdatePlace() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdatePlaceContent/>
        </Suspense>
    );
}

export default UpdatePlace;
