"use client";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import LocationForm from "@/app/dashboard/locations/LocationForm";

function AddLocation() {
    return (
        <div className="space-y-4">
            <Card className="bg-gray-50 shadow-none">
                <CardHeader className="flex justify-between items-center">
                    <div className="space-y-1">
                        <CardTitle>Location</CardTitle>
                        <CardDescription>Add new location</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <LocationForm/>
        </div>
    );
}

export default AddLocation;
