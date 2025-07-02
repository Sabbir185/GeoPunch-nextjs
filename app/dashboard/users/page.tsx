"use server"
import UserTable from "@/app/dashboard/users/UserTable";

async function User() {
    return (
        <div className="space-y-4">
            <UserTable/>
        </div>
    );
}

export default User;
