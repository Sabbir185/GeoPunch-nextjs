"use client";
import React, { useState } from "react";
import Table, { TableImage } from "@/components/common/table";
import { useFetch } from "@/hooks/userAction";
import { fetchUserActivityList } from "@/utils/backend_helper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import GoogleAuthModal from "@/components/auth/GoogleAuthModal";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  image: string;
  createdAt: string;
  status: "active" | "inactive";
}

export default function ActivityPage() {
  const [data, getData, { error, loading }] = useFetch(fetchUserActivityList);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const { user, loading: authLoading } = useFirebaseAuth();

  const colors: any = {
    "Checked-Out": "text-yellow-600",
    "Checked-In": "text-teal-600",
  };

  const handleEmailClick = (email: string, name: string) => {
    if (!user) {
      toast.error("Please sign in with Google to send emails");
      setIsAuthModalOpen(true);
      return;
    }

    setSelectedUserEmail(email);
    setSelectedUserName(name);
    setIsEmailModalOpen(true);
  };

  const handleSendEmail = async () => {
    if (!user) {
      toast.error("Please sign in with Google to send emails");
      setIsAuthModalOpen(true);
      return;
    }

    if (!emailSubject.trim() || !emailBody.trim()) {
      toast.error("Please fill in both subject and message");
      return;
    }

    if (emailSubject.length > 200) {
      toast.error("Subject must be less than 200 characters");
      return;
    }

    if (emailBody.length > 1000) {
      toast.error("Message must be less than 1000 characters");
      return;
    }

    const toastId = toast.loading("Sending email...");
    setSendingEmail(true);

    try {
      // Get Firebase ID token for authentication
      const authHeaders: any = {
        "Content-Type": "application/json",
      };

      if (user) {
        try {
          const idToken = await user.getIdToken();
          authHeaders["Authorization"] = `Bearer ${idToken}`;
        } catch (tokenError) {
          console.error("Error getting Firebase token:", tokenError);
          // Continue without token - let the API handle it
        }
      }

      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          to: selectedUserEmail,
          subject: emailSubject,
          html: emailBody.replace(/\n/g, "<br>"),
        }),
      });

      const result = await response.json();

      if (result.error) {
        toast.error(result.msg || "Failed to send email", { id: toastId });
      } else {
        toast.success("Email sent successfully!", {
          id: toastId,
          duration: 10000,
        });
        setIsEmailModalOpen(false);
        setEmailSubject("");
        setEmailBody("");
      }
    } catch (error) {
      toast.error("Failed to send email. Please try again.", { id: toastId });
    } finally {
      setSendingEmail(false);
      toast.dismiss(toastId);
    }
  };

  const columns = [
    {
      text: "Image",
      dataField: "image",
      formatter: (d: string) => <TableImage url={d} />,
    },
    { text: "Name", dataField: "name" },
    {
      text: "Email",
      dataField: "email",
      formatter: (email: string, row: any) => (
        <span
          className="text-blue-600 hover:text-blue-800 cursor-pointer hover:underline flex items-center gap-1 transition-colors duration-200"
          onClick={() => handleEmailClick(email, row.name)}
        >
          <Mail size={14} />
          {email}
        </span>
      ),
    },
    // {text: "Phone", dataField: "phone"},
    { text: "Department", dataField: "department" },
    { text: "Designation", dataField: "designation" },
    {
      text: "Activity",
      dataField: "activityStatus",
      formatter: (value: string) => (
        <span className={`capitalize ${colors[value]}`}>{value}</span>
      ),
    },
    {
      text: "Active Place",
      dataField: "activityPlace",
      formatter: (value: string, data: any) => (
        <span className={`capitalize border px-2 py-1 rounded-md`}>
          {data?.activityStatus === "Checked-Out"
            ? "Unavailable"
            : value || "N/A"}
        </span>
      ),
    },
    {
      text: "Last Online",
      dataField: "lastActivity",
      formatter: (value: string) => new Date(value).toLocaleString() ?? "--",
    },
  ];

  console.log(data);

  const activeUsers = data?.docs?.filter(
    (user: any) => user?.status === "ACTIVE"
  ).length;
  const inactiveUsers = data?.docs?.filter(
    (user: any) => user?.status === "INACTIVE" || user?.status === "SUSPENDED"
  ).length;
  const totalUsers = data?.docs?.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Faculty Activity
          </h1>
          <p className="text-gray-600">
            View current faculty activities and status
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3-4a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Faculty</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {totalUsers}
                </p>
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
                <p className="text-sm text-gray-600">Total Activity</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {activeUsers}
                </p>
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
                <p className="text-sm text-gray-600">Total Inactivity</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {inactiveUsers}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800">
              Faculty Activity
            </h3>
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

        {/* Email Modal */}
        <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Send Email to {selectedUserName}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email-to">To:</Label>
                <Input
                  id="email-to"
                  value={selectedUserEmail}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-subject">Subject:</Label>
                <Input
                  id="email-subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter email subject"
                  className="h-12 !ring-[1px] !ring-gray-50 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-200"
                  maxLength={200}
                  style={{ border: "2px solid #9ca3af" }}
                />
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${emailSubject.length > 180 ? "text-red-500" : "text-gray-500"}`}
                  >
                    {emailSubject.length}/200 characters
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-body">Message:</Label>
                <Textarea
                  id="email-body"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Enter your message here..."
                  rows={8}
                  className="!ring-[1px] !ring-gray-50 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-200 !rounded-md !p-3 resize-none !min-h-[100px]"
                  maxLength={1000}
                  style={{ border: "2px solid #9ca3af", minHeight: "100px" }}
                />
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${emailBody.length > 950 ? "text-red-500" : "text-gray-500"}`}
                  >
                    {emailBody.length}/1000 characters
                  </span>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEmailModalOpen(false)}
                  disabled={sendingEmail}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendEmail}
                  disabled={sendingEmail}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {sendingEmail ? (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Sending email...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Google Auth Modal */}
        <GoogleAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => setIsAuthModalOpen(false)}
        />
      </div>
    </div>
  );
}
