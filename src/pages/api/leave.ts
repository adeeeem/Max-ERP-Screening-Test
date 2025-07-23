import type { NextApiRequest, NextApiResponse } from "next";

// In-memory mock storage for leave requests
let leaveRequests: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { dates, type, notes } = req.body;

    // Validation
    if (!dates || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newRequest = {
      id: leaveRequests.length + 1,
      dates,
      type,
      notes,
      status: "Pending",
    };

    leaveRequests.push(newRequest);

    return res.status(200).json({ message: "Leave request submitted", newRequest });
  }

  if (req.method === "GET") {
    return res.status(200).json(leaveRequests);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
