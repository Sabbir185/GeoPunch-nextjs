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

function Location() {
    const router = useRouter();

    const columns = [
        {
            text: "Logo",
            dataField: "logo",
            formatter: (d: string) => (
                <TableImage url={d}/>
            )
        },
        {text: "Name", dataField: "name"},
        {
            text: "Store Type",
            dataField: "type",
            formatter: (d: string) => (
                <span>
                    {d}
                </span>
            )
        },
        {
            text: "Address",
            dataField: "address",
            formatter: (value: string) => (
                <ToolTip data={value}/>
            )
        },
        {
            text: "Phone",
            dataField: "phone",
            formatter: (value: string) => value ?? "N/A"
        },
        {
            text: "Email",
            dataField: "email",
            formatter: (value: string) => value ?? "N/A"
        },
        {
            text: "Details",
            dataField: "description",
            formatter: (value: string) => (
                <ToolTip data={value}/>
            )
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
                data={[]}
                pagination
                loading={false}
                indexed
                onReload={() => {
                }}
                permission={'stores'}
            />
        </div>
    );
}

export default Location;
