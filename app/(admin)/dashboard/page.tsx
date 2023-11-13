import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <Link
        className="px-2 py-3 bg-pink-500 text-white "
        href="/dashboard/create"
      >
        Create
      </Link>
    </div>
  );
};

export default Dashboard;
