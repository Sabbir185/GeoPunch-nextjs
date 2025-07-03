"use client";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";
import UserForm from "@/app/dashboard/users/UserForm";

function UserAdd() {
    return (
        <div className="space-y-4">
            <Card className="bg-gray-50 shadow-none">
                <CardHeader className="flex justify-between items-center">
                    <div className="space-y-1">
                        <CardTitle>User</CardTitle>
                        <CardDescription>Please enter the user information</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <UserForm/>
        </div>
    );
}

export default UserAdd;
