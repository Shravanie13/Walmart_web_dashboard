// Static data for dashboard (no backend needed)
const data = {
  total_revenue: "1,250,000",
  total_orders: 2340,
  transport_cost: "45,000",
  fulfillment_rate: 98,
  sales_labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  sales_data: [1500000, 1700000, 1600000, 1800000]
};

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('revenue')) {
    document.getElementById('revenue').textContent = '$' + data.total_revenue;
  }
  if (document.getElementById('orders')) {
    document.getElementById('orders').textContent = data.total_orders;
  }
  if (document.getElementById('transport')) {
    document.getElementById('transport').textContent = '$' + data.transport_cost;
  }
  if (document.getElementById('fulfillment')) {
    document.getElementById('fulfillment').textContent = data.fulfillment_rate + '%';
  }

  if (document.getElementById('salesChart')) {
    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.sales_labels,
        datasets: [{
          label: 'Weekly Sales',
          data: data.sales_data,
          backgroundColor: 'rgba(0,113,206,0.1)',
          borderColor: '#0071ce',
          borderWidth: 2,
          pointBackgroundColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  }
});