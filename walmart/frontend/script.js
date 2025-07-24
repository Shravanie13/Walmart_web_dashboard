fetch('http://localhost:5000/dashboard')
  .then(response => response.json())
  .then(data => {
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

    // Use sales trend data from backend if available, else fallback to example
    const salesLabels = data.sales_labels || ["Week 1", "Week 2", "Week 3", "Week 4"];
    const salesData = data.sales_data || [1500000, 1700000, 1600000, 1800000];

    if (document.getElementById('salesChart')) {
      const ctx = document.getElementById('salesChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: salesLabels,
          datasets: [{
            label: 'Weekly Sales',
            data: salesData,
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
  })
  .catch(error => {
    console.error('Error fetching dashboard data:', error);
    // Optionally show an error message on the page
  });