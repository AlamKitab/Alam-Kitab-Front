import { Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import SalesCard from '../components/SalesCard';

const AdminDashboard = () => {
  // Demo data
  const salesData = {
    monthlySales: 45,
    ongoingOrders: 12,
    completedOrders: 89,
  };

  // Demo data for daily sales
  const dailySales = Array.from({ length: 31 }, (_, index) => ({
    day: index + 1,
    sales: Math.floor(Math.random() * 10),
  }));

  // Demo data for monthly sales 2024
  const monthlySales = [
    { month: 'January', sales: 35 },
    { month: 'February', sales: 42 },
    { month: 'March', sales: 38 },
    { month: 'April', sales: 45 },
    { month: 'May', sales: 55 },
    { month: 'June', sales: 48 },
    { month: 'July', sales: 52 },
    { month: 'August', sales: 49 },
    { month: 'September', sales: 58 },
    { month: 'October', sales: 62 },
    { month: 'November', sales: 65 },
    { month: 'December', sales: 70 },
  ];

  // Demo data for yearly sales
  const yearlySales = [
    { year: 2024, sales: 450 },
    { year: 2025, sales: 520 },
    { year: 2026, sales: 580 },
    { year: 2027, sales: 650 },
    { year: 2028, sales: 720 },
  ];

  // Demo data for monthly revenue
  const monthlyRevenue = [
    { month: 'Jan', revenue: 35000 },
    { month: 'Feb', revenue: 42000 },
    { month: 'Mar', revenue: 38000 },
    { month: 'Apr', revenue: 45000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 48000 },
    { month: 'Jul', revenue: 52000 },
    { month: 'Aug', revenue: 49000 },
    { month: 'Sep', revenue: 58000 },
    { month: 'Oct', revenue: 62000 },
    { month: 'Nov', revenue: 65000 },
    { month: 'Dec', revenue: 70000 },
  ];

  // Demo data for user growth
  const userGrowth = [
    { month: 'Jan', users: 800 },
    { month: 'Feb', users: 900 },
    { month: 'Mar', users: 950 },
    { month: 'Apr', users: 1000 },
    { month: 'May', users: 1100 },
    { month: 'Jun', users: 1150 },
    { month: 'Jul', users: 1200 },
  ];

  // Demo data for product categories
  const categoryData = [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Books', value: 20 },
    { name: 'Home & Garden', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Grid container spacing={3} sx={{ padding: "9px" }}>
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard 
          title="Monthly Sales" 
          total={salesData.monthlySales} 
          color="primary" 
          icon={'ant-design:carry-out-filled'} 
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard 
          title="Ongoing Orders" 
          total={salesData.ongoingOrders} 
          color="warning" 
          icon={'material-symbols:data-exploration'} 
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard 
          title="Completed Orders" 
          total={salesData.completedOrders} 
          color="info" 
          icon={'material-symbols:done-all'} 
        />
      </Grid>

      {/* Daily Sales Chart */}
      <Grid item xs={12}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h3>Daily Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={(value) => Number.isInteger(value) ? value : ''} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Grid>

      {/* Monthly Sales Chart */}
      <Grid item xs={12}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h3>Monthly Sales (2024)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => Number.isInteger(value) ? value : ''} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Grid>

      {/* Yearly Sales Chart */}
      <Grid item xs={12}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h3>Yearly Sales Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => Number.isInteger(value) ? value : ''} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#ffc658" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Grid>

      {/* Revenue Chart */}
      <Grid item xs={12} md={8}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h3>Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Grid>

      {/* Category Distribution */}
      <Grid item xs={12} md={4}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h3>Product Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Grid>

      {/* User Growth */}
      <Grid item xs={12}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h3>User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard; 