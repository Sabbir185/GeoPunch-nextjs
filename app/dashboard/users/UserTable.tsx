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
import {useRouter} from "next/navigation";
import {useFetch} from "@/hooks/userAction";
import {delUser, fetchUserList} from "@/utils/backend_helper";
import {Select} from "antd";

function UserTable() {
    const [data, getData, {loading, error}] = useFetch(fetchUserList)
    const router = useRouter();
    const statusColors: Record<string, string> = {
        "ACTIVE": "green",
        "INACTIVE": "orange",
        "PENDING": "yellow",
        "SUSPENDED": "red",
    }
    const columns = [
        {
            text: "Image",
            dataField: "image",
            formatter: (d: string) => (
                <TableImage url={d}/>
            )
        },
        {text: "Name", dataField: "name"},
        {text: "Email", dataField: "email"},
        {text: "Phone", dataField: "phone"},
        {text: "Department", dataField: "department"},
        {text: "Designation", dataField: "designation"},
        {
            text: "Status",
            dataField: "status",
            formatter: (value: string) => <Select
                onChange={() => {
                }}
                defaultValue={value}
                options={[
                    {value: "ACTIVE", label: <span className={`text-teal-500`}>Active</span>},
                    {value: "INACTIVE", label: <span className={`text-orange-500`}>Inactive</span>},
                    {value: "PENDING", label: <span className={`text-yellow-500`}>Pending</span>},
                    {value: "SUSPENDED", label: <span className={`text-red-500`}>Suspended</span>},
                ]}
                placeholder={"Change Status"}
                className={`w-[150px] text-${statusColors[value]}`}
                size={"large"}
                allowClear
            />
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
                        <CardTitle>User</CardTitle>
                        <CardDescription>All User list</CardDescription>
                    </div>
                    <div>
                        <Button
                            size={"lg"}
                            onClick={() => router.push("/dashboard/users/add")}
                            className={"cursor-pointer"}
                        >
                            Add New User
                        </Button>
                    </div>
                </CardHeader>
            </Card>
            <Table
                columns={columns}
                data={data}
                loading={loading}
                indexed
                pagination
                onReload={getData}
                onDelete={delUser}
                onEdit={(data) => router.push(`/dashboard/users/update?id=${data.id}`)}
            />
        </div>
    );
}

export default UserTable;
