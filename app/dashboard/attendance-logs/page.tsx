"use server";

import AttendanceTable from "./AttendanceTable";

async function AttendanceLogs() {
  return (
    <div className="space-y-4">
      <AttendanceTable />
    </div>
  );
}

export default AttendanceLogs;
