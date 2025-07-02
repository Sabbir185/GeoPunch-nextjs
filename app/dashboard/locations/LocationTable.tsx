"use client";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import Table, {TableImage} from "@/components/common/table";
import ToolTip from "@/components/common/toolTip";
import {useRouter} from "next/navigation";
import {useFetch} from "@/hooks/userAction";
import {delLocation, fetchLocationList} from "@/utils/backend_helper";

function LocationTable() {
    const [data, getData, {loading, error}] = useFetch(fetchLocationList)
    const router = useRouter();
    const columns = [
        {
            text: "Image",
            dataField: "image",
            formatter: (d: string) => (
                <TableImage url={d}/>
            )
        },
        {text: "Name", dataField: "name"},
        {
            text: "Address",
            dataField: "address",
            formatter: (value: string) => (
                <ToolTip data={value || ""}/>
            )
        },
        {
            text: "Latitude",
            dataField: "lat",
            formatter: (value: string) => value ?? "N/A"
        },
        {
            text: "Longitude",
            dataField: "lng",
            formatter: (value: string) => value ?? "N/A"
        },
        {
            text: "Max Radius",
            dataField: "maxRadius",
            formatter: (value: string) => value ?? "N/A"
        },
        {
            text: "Created At",
            dataField: "createdAt",
            formatter: (value: string) => new Date(value).toDateString() ?? "--"
        },
    ];
    return (
        <div className="space-y-4">
            <Card className="bg-gray-50 shadow-none">
                <CardHeader className="flex justify-between items-center">
                    <div className="space-y-1">
                        <CardTitle>Locations</CardTitle>
                        <CardDescription>Available location list</CardDescription>
                    </div>
                    <div>
                        <Button
                            size={"lg"}
                            onClick={() => router.push("/dashboard/locations/add")}
                            className={"cursor-pointer"}
                        >
                            Add New Location
                        </Button>
                    </div>
                </CardHeader>
            </Card>
            <Table
                columns={columns}
                data={data}
                loading={loading}
                indexed
                onReload={getData}
                onDelete={delLocation}
                onEdit={(data) => router.push(`/dashboard/locations/update?id=${data.id}`)}
            />
        </div>
    );
}

export default LocationTable;
