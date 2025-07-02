"use client";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React, {Suspense, useEffect} from "react";
import {useFetch} from "@/hooks/userAction";
import {fetchLocationList} from "@/utils/backend_helper";
import {useSearchParams} from 'next/navigation'
import UserForm from "@/app/dashboard/users/UserForm";

function UserEditContent() {
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
                        <CardTitle>User</CardTitle>
                        <CardDescription>Update the user information</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <UserForm data={data}/>
        </div>
    );
}

function UserEdit() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserEditContent />
        </Suspense>
    );
}

export default UserEdit;
