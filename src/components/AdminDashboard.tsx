
import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="container mx-auto p-6">
        <AdminTabs />
      </div>
    </div>
  );
};

export default AdminDashboard;
