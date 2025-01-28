type TransactionStatus = "Completed" | "Failed" | "Flagged" | "Cancelled";

type UserStatus = "Active" | "Inactive";
type VerificationStatus = "Verified" | "UnVerified" | "Pending";
type RequestStatus = "Pending" | "Approved" | "Rejected";
type TransactionStatus = "Completed" | "Failed" | "Pending";
type TransactionType = "Transfer" | "Recieved" | "Savings" | "Card recharge";
type RemarkStatus = "Processing" | "Declined" | "Good" | "Scam attempt";

type Transaction = {
  id: string;
  type: TransactionType;
  dateTime: string;
  amount: number;
  recipient: {
    name: string;
    accountId?: string;
    avatar?: string;
  };
  status: TransactionStatus;
  remark: string;
};
