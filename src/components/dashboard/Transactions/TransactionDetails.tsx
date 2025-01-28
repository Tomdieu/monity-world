// components/TransactionDetails.tsx
import { DetailsSection } from './DetailsSection';
import { KeyValueRow } from './KeyValueRow';

export interface TransactionData {
  id: string;
  type: string;
  status: string;
  currency: string;
  date: string;
  time: string;
  amount: string;
  fees: string;
  total: string;
  reference: string;
}

interface TransactionDetailsProps {
  transaction: TransactionData;
}

export const TransactionDetails = ({ transaction }: TransactionDetailsProps) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <DetailsSection title="General Information">
        <KeyValueRow label="Transaction ID" value={`#${transaction.id}`} />
        <KeyValueRow label="Transaction Type" value={transaction.type} />
        <KeyValueRow 
          label="Transaction Status" 
          value={transaction.status}
          valueClassName="text-orange-500 font-medium" 
        />
        <KeyValueRow label="Currency" value={transaction.currency} />
        <KeyValueRow label="Date" value={transaction.date} />
        <KeyValueRow label="Time" value={transaction.time} />
      </DetailsSection>

      <DetailsSection title="Amount Details">
        <KeyValueRow label="Transaction Amount" value={transaction.amount} />
        <KeyValueRow label="Transaction Fees" value={transaction.fees} />
        <KeyValueRow 
          label="Total Debited" 
          value={transaction.total}
          valueClassName="font-bold text-blue-600" 
        />
      </DetailsSection>

      <div className="space-y-2">
        <h3 className="text-lg font-bold mb-4">Reference</h3>
        <div className="p-4 bg-gray-50 rounded-md text-gray-700 whitespace-pre-wrap">
          {transaction.reference}
        </div>
      </div>
    </div>
  );
};