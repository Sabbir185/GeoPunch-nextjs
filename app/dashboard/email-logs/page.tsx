"use client";
import React, { useState } from "react";
import Table from "@/components/common/table";
import { useFetch } from "@/hooks/userAction";
import { fetchEmailLogList } from "@/utils/backend_helper";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Eye, Calendar, User, AtSign } from "lucide-react";

interface EmailLog {
  id: number;
  recipientEmail: string;
  recipientName: string | null;
  subject: string;
  body: string;
  senderEmail: string;
  senderName: string | null;
  senderType: string;
  emailId: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function EmailLogsPage() {
  const [data, getData, { error, loading }] = useFetch(fetchEmailLogList);
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewDetails = (email: EmailLog) => {
    setSelectedEmail(email);
    setIsDetailModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSenderTypeColor = (senderType: string) => {
    switch (senderType) {
      case "firebase":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const columns = [
    {
      text: "Recipient",
      dataField: "recipientEmail",
      formatter: (email: string, row: EmailLog) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{row.recipientName || "Unknown"}</span>
          <span className="text-sm text-gray-500">{email}</span>
        </div>
      ),
    },
    {
      text: "Subject",
      dataField: "subject",
      formatter: (subject: string) => (
        <span className="font-medium text-gray-900 max-w-xs truncate block" title={subject}>
          {subject}
        </span>
      ),
    },
    {
      text: "Sender",
      dataField: "senderEmail",
      formatter: (email: string, row: EmailLog) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{row.senderName || "Unknown"}</span>
          <span className="text-sm text-gray-500">{email}</span>
        </div>
      ),
    },
    {
      text: "Type",
      dataField: "senderType",
      formatter: (type: string) => (
        <Badge className={`${getSenderTypeColor(type)} capitalize`}>
          {type}
        </Badge>
      ),
    },
    {
      text: "Status",
      dataField: "status",
      formatter: (status: string) => (
        <Badge className={`${getStatusColor(status)} capitalize`}>
          {status}
        </Badge>
      ),
    },
    {
      text: "Date",
      dataField: "createdAt",
      formatter: (date: string) => new Date(date).toLocaleString(),
    },
    {
      text: "Actions",
      dataField: "actions",
      formatter: (value: any, row: EmailLog) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewDetails(row)}
          className="flex items-center gap-1"
        >
          <Eye size={14} />
          View
        </Button>
      ),
    },
  ];

  const totalEmails = data?.totalDocs || 0;
  const sentEmails = data?.docs?.filter((email: EmailLog) => email.status === "sent").length || 0;
  const failedEmails = data?.docs?.filter((email: EmailLog) => email.status === "failed").length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Email Logs</h1>
          <p className="text-gray-600">
            Track and investigate all emails sent through the system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Emails</p>
                <p className="text-2xl font-semibold text-gray-800">{totalEmails}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Sent Successfully</p>
                <p className="text-2xl font-semibold text-gray-800">{sentEmails}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-semibold text-gray-800">{failedEmails}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Logs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800">Email History</h3>
          </div>
          <Table
            columns={columns}
            data={data}
            indexed
            pagination
            noActions={true}
            onReload={getData}
            loading={loading}
          />
        </div>

        {/* Email Detail Modal */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Details
              </DialogTitle>
            </DialogHeader>
            {selectedEmail && (
              <div className="space-y-6 pt-4">
                {/* Header Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Recipient</span>
                    </div>
                    <div className="pl-6">
                      <p className="font-medium">{selectedEmail.recipientName || "Unknown"}</p>
                      <p className="text-sm text-gray-600">{selectedEmail.recipientEmail}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AtSign className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Sender</span>
                    </div>
                    <div className="pl-6">
                      <p className="font-medium">{selectedEmail.senderName || "Unknown"}</p>
                      <p className="text-sm text-gray-600">{selectedEmail.senderEmail}</p>
                      <Badge className={`${getSenderTypeColor(selectedEmail.senderType)} capitalize mt-1`}>
                        {selectedEmail.senderType}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Status and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Status</span>
                    </div>
                    <Badge className={`${getStatusColor(selectedEmail.status)} capitalize`}>
                      {selectedEmail.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Sent Date</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedEmail.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-700">Subject</span>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedEmail.subject}
                  </p>
                </div>

                {/* Email Body */}
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-700">Message</span>
                  <div 
                    className="text-gray-900 bg-gray-50 p-4 rounded-lg border max-h-64 overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                  />
                </div>

                {/* Email ID */}
                {selectedEmail.emailId && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">Email Service ID</span>
                    <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded font-mono">
                      {selectedEmail.emailId}
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
