document.addEventListener('DOMContentLoaded', function() {
    // Hardcoded values
    const metrics = {
        before: {
            lines: 600,
            parameters: 600,
            size: 450 // KB
        },
        after: {
            lines: 90,
            parameters: 120,
            size: 150 // KB
        }
    };

    // Calculate reductions
    const calculations = {
        lineReduction: ((metrics.before.lines - metrics.after.lines) / metrics.before.lines * 100).toFixed(1),
        sizeReduction: ((metrics.before.size - metrics.after.size) / metrics.before.size * 100).toFixed(1),
        parameterReduction: ((metrics.before.parameters - metrics.after.parameters) / metrics.before.parameters * 100).toFixed(1)
    };

    // Update UI metrics
    document.getElementById('perfBoost').textContent = '70%';
    document.getElementById('storageOpt').textContent = `${calculations.sizeReduction}%`;

    // Update parameter counts
    document.getElementById('beforeKeys').textContent = '600+';
    document.getElementById('afterKeys').textContent = '< 120';

    // Update sizes
    document.getElementById('beforeSize').textContent = metrics.before.size;
    document.getElementById('afterSize').textContent = metrics.after.size;

    // Create chart
    const ctx = document.getElementById('reductionChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Before', 'After'],
            datasets: [{
                label: 'Data Size (KB)',
                data: [metrics.before.size, metrics.after.size],
                backgroundColor: ['#ff9900', '#146eb4'],
                borderColor: ['#ff9900', '#146eb4'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#cccccc33'
                    },
                    ticks: {
                        color: '#cccccc'
                    }
                },
                x: {
                    grid: {
                        color: '#cccccc33'
                    },
                    ticks: {
                        color: '#cccccc'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#cccccc'
                    }
                }
            }
        }
    });

    // Animate progress bars
    setTimeout(() => {
        document.getElementById('computeProgress').style.width = '70%';
        document.getElementById('energyProgress').style.width = '65%';
    }, 500);

    // Add toggle functionality for technical details
    const toggleButton = document.querySelector('.toggle-details');
    const technicalDetails = document.querySelector('.technical-details');
    
    if (toggleButton && technicalDetails) {
        toggleButton.addEventListener('click', function() {
            technicalDetails.classList.toggle('hidden');
            toggleButton.textContent = technicalDetails.classList.contains('hidden') 
                ? 'Show Technical Details' 
                : 'Hide Technical Details';
        });
    }
});