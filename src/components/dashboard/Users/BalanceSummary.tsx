import React from "react";

type Balance = {
  label: string;
  amount: string;
  currency: string;
};

type AccountSection = {
  title: string;
  titleColor?: string;
  balances: Balance[];
};

type BalanceSummaryProps = {
  sections: AccountSection[];
};

const BalanceSummary: React.FC<BalanceSummaryProps> = ({ sections }) => {
  return (
    <div className="w-full bg-white rounded-3xl p-6 space-y-8">
      {sections.map((section, index) => (
        <div key={index}>
          <h2 className={`text-lg mb-4 font-semibold ${section.titleColor}`}>
            {section.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {section.balances.map((balance, balanceIndex) => (
              <div
                key={balanceIndex}
                className="bg-gray-50 rounded-xl p-4 hover:shadow-sm transition-shadow"
              >
                <p className="text-gray-600 text-sm mb-2">{balance.label}</p>
                <p className="text-gray-900 font-semibold">
                  {balance.amount} {balance.currency}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BalanceSummary;
