import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType }) => {
  const changeColorClass = changeType === 'increase' ? 'text-green-400' : 'text-red-400';
  const iconPath = changeType === 'increase' ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3";

  return (
    <div className="bg-custom-surface p-6 rounded-lg">
      <h3 className="text-sm font-medium text-custom-text-secondary">{title}</h3>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
      <p className={`text-sm flex items-center mt-2 ${changeColorClass}`}>
        <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
        </svg>
        {change}
      </p>
    </div>
  );
};

const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <StatCard title="Total Users" value="10,928" change="12% more than previous week" changeType="increase" />
      <StatCard title="Stock" value="8,236" change="less than previous week" changeType="decrease" />
      <StatCard title="Revenue" value="6,642" change="16% more than previous week" changeType="increase" />
    </div>
  );
};

export default StatsCards;