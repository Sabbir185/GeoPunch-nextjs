"use client";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import Table from "@/components/common/table";
import {useRouter} from "next/navigation";
import {useFetch} from "@/hooks/userAction";
import {delPlace, fetchPlaceList} from "@/utils/backend_helper";

function PlaceTable() {
    const [data, getData, {loading, error}] = useFetch(fetchPlaceList)
    const router = useRouter();
    const colors: any = {
        'common': 'text-yellow-600',
        'additional': 'text-teal-600',
    }
    const columns = [
        {text: "Name", dataField: "name"},
        {
            text: "Created At",
            dataField: "createdAt",
            formatter: (value: string) => new Date(value).toDateString() ?? "--"
        },
        {
            text: "Type",
            dataField: "type",
            formatter: (value: string) => <span className={`capitalize ${colors[value]}`}>{value}</span>
        },
        {
            text: "Updated At",
            dataField: "updatedAt",
            formatter: (value: string) => new Date(value).toDateString() ?? "--"
        },
    ];
    return (
        <div className="space-y-4">
            <Card className="bg-gray-50 shadow-none">
                <CardHeader className="flex justify-between items-center">
                    <div className="space-y-1">
                        <CardTitle>Place of Presence</CardTitle>
                        <CardDescription>Manage all places</CardDescription>
                    </div>
                    <div>
                        <Button
                            size={"lg"}
                            onClick={() => router.push("/dashboard/place-of-presence/add")}
                            className={"cursor-pointer"}
                        >
                            Add New Place
                        </Button>
                    </div>
                </CardHeader>
            </Card>
            <Table
                title={"GeoPunch Place List"}
                columns={columns}
                data={data}
                loading={loading}
                indexed
                onReload={getData}
                onDelete={delPlace}
                onEdit={(data) => router.push(`/dashboard/place-of-presence/update?id=${data.id}`)}
            />
        </div>
    );
}

export default PlaceTable;
