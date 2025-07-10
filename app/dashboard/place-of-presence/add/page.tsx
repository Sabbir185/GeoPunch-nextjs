"use client";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import PlaceForm from "@/app/dashboard/place-of-presence/PlaceForm";

function AddPlace() {
    return (
        <div className="space-y-4">
            <Card className="bg-gray-50 shadow-none">
                <CardHeader className="flex justify-between items-center">
                    <div className="space-y-1">
                        <CardTitle>Place of Presence</CardTitle>
                        <CardDescription>Add new place</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <PlaceForm/>
        </div>
    );
}

export default AddPlace;
