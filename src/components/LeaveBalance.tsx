import { Card } from 'antd';

const LeaveBalance = ({ balance }: { balance: { annual: number; sick: number } }) => (
  <Card title="Leave Balance" style={{ maxWidth: 300 }}>
    <p>Annual Leave: {balance.annual} days</p>
    <p>Sick Leave: {balance.sick} days</p>
  </Card>
);

export default LeaveBalance;
