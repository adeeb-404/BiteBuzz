/* eslint-disable react/prop-types */

function CanteenDashboard({ index }) {
  if (index === null) return <h1>No canteen</h1>;
  return <div className="w-[80%]">{index}</div>;
}

export default CanteenDashboard;
