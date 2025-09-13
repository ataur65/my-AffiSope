import React from 'react';
import SearchInput from '../../components/SearchInput';
import StatsCards from '../../components/StatsCards';
import TransactionsTable from '../../components/TransactionsTable';
import WeeklyRecapChart from '../../components/WeeklyRecapChart';
import InfoCard from '../../components/InfoCard';

const DashboardPage: React.FC = () => {
  return (
    <>
      {/* Main Content: Dashboard */}
      <main id="dashboard-content" className="page-content flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="hidden lg:flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <SearchInput placeholder="Search..." />
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Latest Transactions Table */}
        <TransactionsTable />
        
        {/* Weekly Recap Chart */}
        <WeeklyRecapChart />
      </main>

      {/* Right Sidebar for Dashboard */}
      <aside id="dashboard-sidebar" className="page-content w-full xl:w-80 custom-bg p-6 flex-shrink-0">
        <div className="mt-6 xl:mt-0"> {/* Adjust margin for larger screens */}
          <InfoCard
            title="🎉 Available Now"
            subtitle="How to use the new version of the admin dashboard?"
            description="Takes 4 minutes to learn. Learn how to effectively navigate and utilize the updated features."
            buttonText="Watch"
            buttonVariant="primary"
          />
        </div>
        <div className="mt-6">
          <InfoCard
            title="🚀 Coming Soon"
            subtitle="New server actions are available, partial pre-rendering is coming up!"
            description="Boost your productivity. Discover the latest enhancements."
            buttonText="Learn"
            buttonVariant="secondary"
          />
        </div>
      </aside>
    </>
  );
};

export default DashboardPage;