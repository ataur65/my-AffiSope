import React from 'react';

interface Transaction {
  name: string;
  status: 'pending' | 'done' | 'cancelled';
  date: string;
  amount: string;
}

const transactions: Transaction[] = [
  { name: 'Josephine Zimmerman', status: 'pending', date: '14.01.2024', amount: '$ 3,200' },
  { name: 'Cecilia Harriet', status: 'done', date: '13.01.2024', amount: '$ 2,800' },
  { name: 'Dennis Thomas', status: 'cancelled', date: '12.01.2024', amount: '$ 2,600' },
  { name: 'Lula Neal', status: 'pending', date: '11.01.2024', amount: '$ 3,200' },
  { name: 'Jeff Montgomery', status: 'done', date: '10.01.2024', amount: '$ 4,800' }
];

const TransactionsTable: React.FC = () => {
  const getStatusClasses = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'done':
        return 'bg-green-500/20 text-green-300';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300';
      default:
        return '';
    }
  };

  return (
    <div className="bg-custom-surface p-6 rounded-lg mt-8 overflow-x-auto">
      <h3 className="text-xl font-semibold text-white">Latest Transactions</h3>
      <table className="w-full mt-4 text-left min-w-[600px]">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 font-semibold text-sm text-custom-text-secondary">Name</th>
            <th className="py-3 font-semibold text-sm text-custom-text-secondary">Status</th>
            <th className="py-3 font-semibold text-sm text-custom-text-secondary">Date</th>
            <th className="py-3 font-semibold text-sm text-custom-text-secondary">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="py-4 px-4 text-white">{transaction.name}</td>
              <td className="py-4 px-4">
                <span className={`${getStatusClasses(transaction.status)} py-1 px-3 rounded-full text-xs font-medium`}>
                  {transaction.status}
                </span>
              </td>
              <td className="py-4 px-4 text-custom-text-secondary">{transaction.date}</td>
              <td className="py-4 px-4 text-white font-medium">{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;