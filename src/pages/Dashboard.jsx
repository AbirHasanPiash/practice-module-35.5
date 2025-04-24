import useAuth from "../auth/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg">Welcome back, <span className="font-semibold">{user?.first_name}</span>!</p>
    </div>
  );
};

export default Dashboard;
