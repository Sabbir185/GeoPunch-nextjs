"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import Table, { TableImage } from "@/components/common/table";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/userAction";
import { fetchActivityListAdmin } from "@/utils/backend_helper";

function AttendanceTable() {
  const [data, getData, { loading, error }] = useFetch(fetchActivityListAdmin);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  
  const handleViewDetails = (record: any) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      text: "User Photo",
      dataField: "user.image",
      formatter: (d: string, entity: any) => <TableImage url={entity.user?.image} />,
    },
    { 
      text: "User Info", 
      dataField: "user.name",
      formatter: (d: string, entity: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">{entity.user?.name || "--"}</span>
          <span className="text-xs text-gray-500">{entity.user?.email || "--"}</span>
        </div>
      )
    },
    { 
      text: "Department", 
      dataField: "user.department",
      formatter: (d: string, entity: any) => entity.user?.department || "--"
    },
    {
      text: "Check-in Time",
      dataField: "checkedInTime",
      formatter: (value: string) => 
        value ? new Date(value).toLocaleString() : "--",
    },
    {
      text: "Check-out Time",
      dataField: "checkedOutTime",
      formatter: (value: string) => 
        value ? new Date(value).toLocaleString() : "Not checked out",
    },
    {
      text: "Total Active Time",
      dataField: "activeTime",
      formatter: (value: string, entity: any) => {
        if (!entity.checkedInTime) return "--";
        
        const checkInTime = new Date(entity.checkedInTime);
        const checkOutTime = entity.checkedOutTime ? new Date(entity.checkedOutTime) : new Date();
        
        const diffMs = checkOutTime.getTime() - checkInTime.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (diffHours > 0) {
          return `${diffHours}h ${diffMinutes}m`;
        } else {
          return `${diffMinutes}m`;
        }
      },
    },
    {
      text: "Action",
      dataField: "action",
      formatter: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "Checked-In" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {value}
        </span>
      ),
    },
    {
      text: "Details",
      dataField: "details",
      formatter: (value: string, entity: any) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewDetails(entity)}
          className="h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  console.log({ data });

  return (
    <div className="space-y-4">
      <Card className="bg-gray-50 shadow-none">
        <CardHeader className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle>Attendance Logs</CardTitle>
            <CardDescription>
              View check-in and check-out records for all users
            </CardDescription>
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
        noActions
      />

      {/* Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Attendance Details</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <TableImage url={selectedRecord.user?.image} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedRecord.user?.name}</h3>
                  <p className="text-sm text-gray-600">{selectedRecord.user?.email}</p>
                  <p className="text-sm text-gray-600">{selectedRecord.user?.department}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Status:</span>
                <Badge 
                  variant={selectedRecord.action === "Checked-In" ? "default" : "secondary"}
                  className={selectedRecord.action === "Checked-In" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                  }
                >
                  {selectedRecord.action}
                </Badge>
              </div>

              {/* Check-in Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-green-700">Check-in Information</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Time:</span>
                      <p className="text-sm text-gray-600">
                        {selectedRecord.checkedInTime 
                          ? new Date(selectedRecord.checkedInTime).toLocaleString() 
                          : "--"
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Location:</span>
                      <p className="text-sm text-gray-600">
                        {selectedRecord.checkedInPlace?.address || "--"}
                      </p>
                    </div>
                    {selectedRecord.checkedInPlace?.position && (
                      <div>
                        <span className="text-sm font-medium">Coordinates:</span>
                        <p className="text-sm text-gray-600">
                          Lat: {selectedRecord.checkedInPlace.position.lat}, 
                          Lng: {selectedRecord.checkedInPlace.position.lng}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Check-out Details */}
                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-red-700">Check-out Information</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Time:</span>
                      <p className="text-sm text-gray-600">
                        {selectedRecord.checkedOutTime 
                          ? new Date(selectedRecord.checkedOutTime).toLocaleString() 
                          : "Not checked out"
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Location:</span>
                      <p className="text-sm text-gray-600">
                        {selectedRecord.checkedOutPlace?.address || "Not checked out"}
                      </p>
                    </div>
                    {selectedRecord.checkedOutPlace?.position && (
                      <div>
                        <span className="text-sm font-medium">Coordinates:</span>
                        <p className="text-sm text-gray-600">
                          Lat: {selectedRecord.checkedOutPlace.position.lat}, 
                          Lng: {selectedRecord.checkedOutPlace.position.lng}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Total Time */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Active Time:</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {(() => {
                      if (!selectedRecord.checkedInTime) return "--";
                      
                      const checkInTime = new Date(selectedRecord.checkedInTime);
                      const checkOutTime = selectedRecord.checkedOutTime 
                        ? new Date(selectedRecord.checkedOutTime) 
                        : new Date();
                      
                      const diffMs = checkOutTime.getTime() - checkInTime.getTime();
                      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                      
                      if (diffHours > 0) {
                        return `${diffHours}h ${diffMinutes}m`;
                      } else {
                        return `${diffMinutes}m`;
                      }
                    })()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AttendanceTable;
