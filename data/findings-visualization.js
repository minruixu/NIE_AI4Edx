// Functions to create visualizations for the findings page

// Generate a simple bar chart using Chart.js
window.createBarChart = function(containerId, chartData, mainTitle, yAxisTitle) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("Container not found for Chart.js bar chart:", containerId);
    return;
  }
  container.innerHTML = ''; // Clear existing content
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  if (!chartData || !chartData.labels || !chartData.values || chartData.labels.length === 0) {
    console.warn("No data or incomplete data provided for bar chart:", containerId);
    // Optionally, display a message on the canvas
    ctx.font = "16px Arial";
    ctx.fillStyle = "#666";
    ctx.textAlign = "center";
    ctx.fillText("No data available for chart.", canvas.width / 2, canvas.height / 2);
    return;
  }

  const data = {
    labels: chartData.labels,
    datasets: [{
      label: yAxisTitle, // This label is often shown in tooltips or if legend is enabled
      data: chartData.values,
      backgroundColor: '#4056A1', // NTU Blue
      borderColor: '#003d7c',     // Darker NTU Blue for border
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 5, // Assuming Likert scale 1-5
          title: {
            display: true,
            text: yAxisTitle,
            font: {
              size: 12,
              weight: 'bold'
            }
          }
        },
        x: {
          title: {
            display: true,
            text: 'Dimensions',
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          ticks: {
            autoSkip: false,
            maxRotation: 65, // Rotate labels for readability
            minRotation: 45
          }
        }
      },
      plugins: {
        legend: {
          display: false // No need for a legend with a single dataset
        },
        title: {
          display: true,
          text: mainTitle,
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y.toFixed(2);
              }
              return label;
            }
          }
        }
      }
    }
  };

  // If a chart instance already exists on this canvas, destroy it first
  if (canvas.chartInstance) {
    canvas.chartInstance.destroy();
  }
  canvas.chartInstance = new Chart(ctx, config);
  console.log(`Chart.js bar chart created for ${containerId}: ${mainTitle}`);
};

// Generate a pie chart
window.createPieChart = function(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Set dimension
  const width = container.clientWidth;
  const height = 400;
  
  // Create SVG
  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);
    
  // Add placeholder text
  svg.append("text")
    .attr("text-anchor", "middle")
    .text("Data visualization pending")
    .style("font-size", "16px")
    .style("fill", "#666");
};

// Generate Correlation Heatmap for Instructor Readiness
window.createInstructorCorrelationHeatmap = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Empty correlation matrix data template
  const correlationData = [
    {"dimension": "Dimension 1", "Dimension 1": 1.0, "Dimension 2": 0, "Dimension 3": 0},
    {"dimension": "Dimension 2", "Dimension 1": 0, "Dimension 2": 1.0, "Dimension 3": 0},
    {"dimension": "Dimension 3", "Dimension 1": 0, "Dimension 2": 0, "Dimension 3": 1.0}
  ];

  // Clear any existing SVG to prevent duplicates on re-render
  d3.select(`#${containerId}`).select("svg").remove();

  let width = container.clientWidth;
  let height = container.clientHeight;
  if (height === 0) height = 450; // Default height if container has no explicit height yet
  
  // Create SVG
  const svg = d3.select(`#${containerId}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');

  // Add placeholder text
  svg.append("text")
    .attr("text-anchor", "middle")
    .text("Correlation heatmap pending")
    .style("font-size", "16px")
    .style("fill", "#666");
};

// Generate a heatmap for student correlation matrix
window.createStudentCorrelationHeatmap = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Student correlation matrix data template
  const correlationData = [
    {"dimension": "Cognition", "Cognition": 1.000, "Ability": 0.702, "Vision": 0.653, "Ethics": 0.611, "Perceived Threats": 0.197, "AI-enhanced Innovation": 0.480},
    {"dimension": "Ability", "Cognition": 0.702, "Ability": 1.000, "Vision": 0.623, "Ethics": 0.556, "Perceived Threats": 0.184, "AI-enhanced Innovation": 0.621},
    {"dimension": "Vision", "Cognition": 0.653, "Ability": 0.623, "Vision": 1.000, "Ethics": 0.599, "Perceived Threats": 0.220, "AI-enhanced Innovation": 0.492},
    {"dimension": "Ethics", "Cognition": 0.611, "Ability": 0.556, "Vision": 0.599, "Ethics": 1.000, "Perceived Threats": 0.198, "AI-enhanced Innovation": 0.462},
    {"dimension": "Perceived Threats", "Cognition": 0.197, "Ability": 0.184, "Vision": 0.220, "Ethics": 0.198, "Perceived Threats": 1.000, "AI-enhanced Innovation": 0.190},
    {"dimension": "AI-enhanced Innovation", "Cognition": 0.480, "Ability": 0.621, "Vision": 0.492, "Ethics": 0.462, "Perceived Threats": 0.190, "AI-enhanced Innovation": 1.000}
  ];

  // Clear any existing SVG to prevent duplicates on re-render
  d3.select(`#${containerId}`).select("svg").remove();

  let width = container.clientWidth;
  let height = container.clientHeight;
  if (height === 0) height = 450; // Default height if container has no explicit height yet
  
  // Create SVG
  const svg = d3.select(`#${containerId}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');

  // Add placeholder text
  svg.append("text")
    .attr("text-anchor", "middle")
    .text("Student correlation heatmap pending")
    .style("font-size", "16px")
    .style("fill", "#666");
};

// Generate Factor Analysis visualization
window.createFactorAnalysisChart = function(containerId, group) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Set dimension and margins
  const margin = { top: 30, right: 30, bottom: 70, left: 60 };
  const width = container.clientWidth - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  // Create SVG
  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
    
  // Add placeholder text
  svg.append("text")
    .attr("x", width/2)
    .attr("y", height/2)
    .attr("text-anchor", "middle")
    .text(`${group} factor analysis visualization pending`)
    .style("font-size", "16px")
    .style("fill", "#666");
};

// Generate Cronbach's Alpha visualization
window.createCronbachAlphaChart = function(containerId, group) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Set dimension and margins
  const margin = { top: 30, right: 30, bottom: 70, left: 60 };
  const width = container.clientWidth - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  // Create SVG
  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
    
  // Add placeholder text
  svg.append("text")
    .attr("x", width/2)
    .attr("y", height/2)
    .attr("text-anchor", "middle")
    .text(`${group} reliability analysis visualization pending`)
    .style("font-size", "16px")
    .style("fill", "#666");
};

// Generate Descriptive Analysis Chart
window.createInstructorDescriptiveChart = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const instructorMeanData = [
    { label: "Cognition", value: 3.46 },
    { label: "Ability", value: 3.06 },
    { label: "Vision", value: 3.69 },
    { label: "Ethics", value: 3.72 },
    { label: "Perceived Threats", value: 2.96 },
    { label: "AI-Enhanced Innovation", value: 3.46 }
  ];
  
  const chartData = {
    labels: instructorMeanData.map(d => d.label),
    values: instructorMeanData.map(d => d.value)
  };

  window.createBarChart(containerId, chartData, "Instructor Descriptive Statistics", "Mean Score");
};

// Generate Student Descriptive Chart
window.createStudentDescriptiveChart = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const studentMeanData = [
    { label: "Cognition", value: 3.48 },
    { label: "Ability", value: 3.47 },
    { label: "Vision", value: 3.58 },
    { label: "Ethics", value: 3.70 },
    { label: "Perceived Threats", value: 3.28 },
    { label: "AI-Enhanced Innovation", value: 3.69 }
  ];

  const chartData = {
    labels: studentMeanData.map(d => d.label),
    values: studentMeanData.map(d => d.value)
  };

  window.createBarChart(containerId, chartData, "Student Descriptive Statistics", "Mean Score");
};

// Generate Word Cloud for qualitative analysis dimensions
window.createDimensionWordCloud = function(containerId, dimension, group) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const width = container.clientWidth;
  const height = 300;
  
  // Create SVG
  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);
    
  // Add placeholder text
  svg.append("text")
    .attr("text-anchor", "middle")
    .text(`${group} "${dimension}" word cloud pending`)
    .style("font-size", "16px")
    .style("fill", "#666");
};

// Initialize visualizations based on findingsData
window.initializeVisualizations = function() {
  // Placeholder for future visualization initialization
  console.log('Visualizations framework ready - data pending');
  
  // Initialize Dimension Word Clouds for qualitative findings
  const dimensions = ["Cognition", "Ability", "Vision", "Ethics", "Perceived Threats", 
                      "AI-enhanced Innovation", "Satisfaction", "Attitude"];
  
  // For Instructors
  dimensions.forEach(dimension => {
    const containerId = `instructor-${dimension.toLowerCase().replace(' ', '-')}-wordcloud`;
    const container = document.getElementById(containerId);
    if (container) {
      window.createDimensionWordCloud(containerId, dimension, "Instructor");
    }
  });
  
  // For Students
  dimensions.forEach(dimension => {
    const containerId = `student-${dimension.toLowerCase().replace(' ', '-')}-wordcloud`;
    const container = document.getElementById(containerId);
    if (container) {
      window.createDimensionWordCloud(containerId, dimension, "Student");
    }
  });
};

// Create readiness visualization
window.createReadinessVisualization = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Set dimension
  const width = container.clientWidth;
  const height = 400;
  
  // Create SVG
  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);
    
  // Add placeholder text
  svg.append("text")
      .attr("text-anchor", "middle")
    .text("Readiness visualization pending")
    .style("font-size", "16px")
    .style("fill", "#666");
};

// Create Ethics Radar Chart for School Classification Comparison
window.createEthicsRadarChart = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Clear any existing content
  d3.select(`#${containerId}`).selectAll("*").remove();
  
  // Set dimension
  const width = container.clientWidth;
  const height = 400;
  const margin = { top: 30, right: 80, bottom: 30, left: 80 };
  
  // Ethics data from the table
  const ethicsData = [
    {
      group: "NIE Instructors",
      ET1: 3.88,
      ET2: 3.90,
      ET3: 3.47,
      ET4: 3.56,
      mean: 3.70
    },
    {
      group: "NTU Instructors",
      ET1: 3.92,
      ET2: 3.97,
      ET3: 3.56,
      ET4: 3.62,
      mean: 3.77
    }
  ];
  
  // Features for the radar chart
  const features = ["ET1", "ET2", "ET3", "ET4"];
  
  // Create SVG
  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width/2},${height/2})`);
  
  // Scales
  const radialScale = d3.scaleLinear()
    .domain([1, 5])  // Likert scale range
    .range([0, height/3]);
  
  // Create circles for the scales
  const ticks = [1, 2, 3, 4, 5];
  
  // Add circles
  svg.selectAll(".radial-circle")
    .data(ticks)
    .join("circle")
    .attr("class", "radial-circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", d => radialScale(d))
    .attr("fill", "none")
    .attr("stroke", "#ddd")
    .attr("stroke-dasharray", "4,4")
    .attr("stroke-width", 1);
  
  // Add scale labels
  svg.selectAll(".radial-label")
    .data(ticks)
    .join("text")
    .attr("class", "radial-label")
    .attr("x", 5)
    .attr("y", d => -radialScale(d))
    .attr("font-size", "10px")
    .attr("fill", "#666")
    .text(d => d.toString());
  
  // Calculate angle for each feature
  const angleSlice = (Math.PI * 2) / features.length;
  
  // Function to calculate coordinates
  function getCoordinates(data_point, i) {
    const angle = angleSlice * i - Math.PI / 2;
    return {
      x: radialScale(data_point) * Math.cos(angle),
      y: radialScale(data_point) * Math.sin(angle)
    };
  }
  
  // Draw feature axes
  features.forEach((feature, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    
    // Create axis line
    const lineCoord = getCoordinates(5, i);
    svg.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", lineCoord.x)
      .attr("y2", lineCoord.y)
      .attr("stroke", "#ddd")
      .attr("stroke-width", 1);
    
    // Add feature labels
    svg.append("text")
      .attr("x", lineCoord.x * 1.15)
      .attr("y", lineCoord.y * 1.15)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#003d7c")
      .text(feature);
  });
  
  // Colors for the schools
  const colorScale = d3.scaleOrdinal()
    .domain(["NIE Instructors", "NTU Instructors"])
    .range(["#4056A1", "#D13525"]);
  
  // Draw the radar paths
  ethicsData.forEach((d, i) => {
    // Create points array
    const points = features.map((feature, j) => {
      const coord = getCoordinates(d[feature], j);
      return [coord.x, coord.y].join(",");
    });
    
    // Draw path
    svg.append("polygon")
      .attr("points", points.join(" "))
      .attr("fill", colorScale(d.group))
      .attr("fill-opacity", 0.3)
      .attr("stroke", colorScale(d.group))
      .attr("stroke-width", 2);
    
    // Add dots at each point
    features.forEach((feature, j) => {
      const coord = getCoordinates(d[feature], j);
      svg.append("circle")
        .attr("cx", coord.x)
        .attr("cy", coord.y)
        .attr("r", 4)
        .attr("fill", colorScale(d.group));
    });
  });

  // Add legend
  const legend = svg.append("g")
    .attr("transform", `translate(${width/3 - 30}, ${-height/3 + 30})`);
  
  ethicsData.forEach((d, i) => {
    legend.append("rect")
      .attr("x", 0)
      .attr("y", i * 25)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", colorScale(d.group));
    
    legend.append("text")
      .attr("x", 20)
      .attr("y", i * 25 + 12)
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text(`${d.group} (M = ${d.mean})`);
  });
  
  // Add title
  svg.append("text")
    .attr("x", 0)
    .attr("y", -height/2.5)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .attr("fill", "#003d7c")
    .text("Ethics Dimension Comparison");
};

// Create Readiness Radar Chart comparing all dimensions between instructors and students
window.createReadinessRadarChart = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Clear any existing content
  d3.select(`#${containerId}`).selectAll("*").remove();
  
  // Set dimension
  const width = container.clientWidth;
  const height = 450;
  const margin = { top: 40, right: 80, bottom: 40, left: 80 };
  
  // Readiness dimensions data from the tables
  const readinessData = [
    {
      group: "Instructors (N=128)",
      Cognition: 3.46,
      Ability: 3.06,
      Vision: 3.69,
      Ethics: 3.72,
      "Perceived Threats": 2.96,
      "AI-Enhanced Innovation": 3.46
    },
    {
      group: "Students (N=496)",
      Cognition: 3.48,
      Ability: 3.47,
      Vision: 3.58,
      Ethics: 3.70,
      "Perceived Threats": 3.28,
      "AI-Enhanced Innovation": 3.69
    }
  ];
  
  // Features for the radar chart
  const features = ["Cognition", "Ability", "Vision", "Ethics", "Perceived Threats", "AI-Enhanced Innovation"];
  
  // Create SVG
  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width/2},${height/2})`);
  
  // Scales
  const radialScale = d3.scaleLinear()
    .domain([1, 5])  // Likert scale range
    .range([0, height/3]);
  
  // Create circles for the scales
  const ticks = [1, 2, 3, 4, 5];
  
  // Add circles
  svg.selectAll(".radial-circle")
    .data(ticks)
    .join("circle")
    .attr("class", "radial-circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", d => radialScale(d))
    .attr("fill", "none")
    .attr("stroke", "#ddd")
    .attr("stroke-dasharray", "4,4")
    .attr("stroke-width", 1);
  
  // Add scale labels
  svg.selectAll(".radial-label")
    .data(ticks)
    .join("text")
    .attr("class", "radial-label")
    .attr("x", 5)
    .attr("y", d => -radialScale(d))
    .attr("font-size", "10px")
    .attr("fill", "#666")
    .text(d => d.toString());
  
  // Calculate angle for each feature
  const angleSlice = (Math.PI * 2) / features.length;
  
  // Function to calculate coordinates
  function getCoordinates(data_point, i) {
    const angle = angleSlice * i - Math.PI / 2;
    return {
      x: radialScale(data_point) * Math.cos(angle),
      y: radialScale(data_point) * Math.sin(angle)
    };
  }
  
  // Draw feature axes
  features.forEach((feature, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    
    // Create axis line
    const lineCoord = getCoordinates(5, i);
    svg.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", lineCoord.x)
      .attr("y2", lineCoord.y)
      .attr("stroke", "#ddd")
      .attr("stroke-width", 1);
    
    // Add feature labels
    svg.append("text")
      .attr("x", lineCoord.x * 1.15)
      .attr("y", lineCoord.y * 1.15)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#003d7c")
      .attr("font-weight", "bold")
      .text(feature);
  });
  
  // Colors for the groups
  const colorScale = d3.scaleOrdinal()
    .domain(["Instructors (N=128)", "Students (N=496)"])
    .range(["#1E88E5", "#FF5722"]);
  
  // Draw the radar paths
  readinessData.forEach((d, i) => {
    // Create points array
    const points = features.map((feature, j) => {
      const coord = getCoordinates(d[feature], j);
      return [coord.x, coord.y].join(",");
    });
    
    // Draw path
    svg.append("polygon")
      .attr("points", points.join(" "))
      .attr("fill", colorScale(d.group))
      .attr("fill-opacity", 0.3)
      .attr("stroke", colorScale(d.group))
      .attr("stroke-width", 2);
    
    // Add dots at each point
    features.forEach((feature, j) => {
      const coord = getCoordinates(d[feature], j);
      svg.append("circle")
        .attr("cx", coord.x)
        .attr("cy", coord.y)
        .attr("r", 4)
        .attr("fill", colorScale(d.group));
      
      // Add value labels
      svg.append("text")
        .attr("x", coord.x * 1.05)
        .attr("y", coord.y * 1.05)
        .attr("text-anchor", "middle")
        .attr("font-size", "9px")
        .attr("fill", colorScale(d.group))
        .attr("font-weight", "bold")
        .text(d[feature].toFixed(2));
    });
  });
  
  // Add legend
  const legend = svg.append("g")
    .attr("transform", `translate(${width/3 - 40}, ${-height/3 + 40})`);
  
  readinessData.forEach((d, i) => {
    legend.append("rect")
      .attr("x", 0)
      .attr("y", i * 25)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", colorScale(d.group));
    
    legend.append("text")
      .attr("x", 20)
      .attr("y", i * 25 + 12)
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text(d.group);
  });
  
  // Add title
  svg.append("text")
    .attr("x", 0)
    .attr("y", -height/2.5)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .attr("fill", "#003d7c")
    .text("AI Readiness Dimension Comparison");
};

// NEW: Create Instructor Ethics Items (ET1-ET4) Radar Chart using Chart.js
window.createInstructorEthicsItemsChart_ChartJS = function(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error('Canvas element not found for Instructor Chart.js:', canvasId);
    return;
  }
  const ctx = canvas.getContext('2d');

  // Instructor Ethics Items data (ET1-ET4)
  const instructorEthicsItemsData = [
    {
      group: "NIE Instructors (N=89)",
      ET1: 3.88,
      ET2: 3.90,
      ET3: 3.47,
      ET4: 3.56
    },
    {
      group: "NTU Instructors (N=39)",
      ET1: 3.92,
      ET2: 3.97,
      ET3: 3.56,
      ET4: 3.62
    }
  ];

  const labels = ["ET1", "ET2", "ET3", "ET4"];

  const datasets = instructorEthicsItemsData.map((d, i) => {
    return {
      label: d.group,
      data: labels.map(label => d[label]),
      fill: true,
      backgroundColor: i === 0 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)', // Matched student chart colors
      borderColor: i === 0 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)', // Matched student chart colors
      pointBackgroundColor: i === 0 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)', // Matched student chart colors
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: i === 0 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)' // Matched student chart colors
    };
  });

  const data = {
    labels: labels,
    datasets: datasets
  };

  const config = {
    type: 'radar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0
      },
      elements: {
        line: {
          borderWidth: 3
        }
      },
      scales: {
        r: {
          angleLines: { display: true },
          suggestedMin: 3,
          suggestedMax: 4,
          ticks: { stepSize: 0.2, backdropColor: 'rgba(255, 255, 255, 0.75)', font: { size: 10 } },
          pointLabels: { font: { size: 12, weight: 'bold' } }
        }
      },
      plugins: {
        title: {
          display: false,
          text: 'Instructor Ethics Items Comparison (ET1-ET4) by School',
          font: { size: 16, weight: 'bold' },
          color: '#003d7c',
          padding: { top: 10, bottom: 20 }
        },
        legend: { position: 'top', labels: { font: { size: 12 } } },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) { label += ': '; }
              if (context.parsed.r !== null) { label += context.parsed.r.toFixed(2); }
              return label;
            }
          }
        }
      }
    }
  };

  if (canvas.chartInstance) {
    canvas.chartInstance.destroy();
  }
  canvas.chartInstance = new Chart(ctx, config);
  console.log('Instructor Ethics Items (ET1-ET4) radar chart (Chart.js) created/updated.');
};

// Create School Classification Mean Radar Chart for students
window.createStudentClassificationRadarChart = function(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Clear any existing content
  d3.select(`#${containerId}`).selectAll("*").remove();
  
  // Set dimension
  const width = container.clientWidth;
  const height = 450;
  const margin = { top: 40, right: 80, bottom: 40, left: 80 };
  
  // Student Classification data from the table (only the mean values)
  const studentData = [
    {
      group: "NIE Students (N=264)",
      ET1: 3.95,
      ET2: 3.94,
      ET3: 3.43,
      ET4: 3.47,
      mean: 3.70
    },
    {
      group: "NTU Students (N=106)",
      ET1: 4.00,
      ET2: 3.97,
      ET3: 3.41,
      ET4: 3.63,
      mean: 3.71
    }
  ];
  
  // Features for the radar chart
  const features = ["ET1", "ET2", "ET3", "ET4", "Mean"];
  
  // Create SVG
  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width/2},${height/2})`);
  
  // Scales
  const radialScale = d3.scaleLinear()
    .domain([1, 5])  // Likert scale range
    .range([0, height/3]);
  
  // Create circles for the scales
  const ticks = [1, 2, 3, 4, 5];
  
  // Add circles
  svg.selectAll(".radial-circle")
    .data(ticks)
    .join("circle")
    .attr("class", "radial-circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", d => radialScale(d))
    .attr("fill", "none")
    .attr("stroke", "#ddd")
    .attr("stroke-dasharray", "4,4")
    .attr("stroke-width", 1);
  
  // Add scale labels
  svg.selectAll(".radial-label")
    .data(ticks)
    .join("text")
    .attr("class", "radial-label")
    .attr("x", 5)
    .attr("y", d => -radialScale(d))
    .attr("font-size", "10px")
    .attr("fill", "#666")
    .text(d => d.toString());
  
  // Calculate angle for each feature
  const angleSlice = (Math.PI * 2) / features.length;
  
  // Function to calculate coordinates
  function getCoordinates(data_point, i) {
    const angle = angleSlice * i - Math.PI / 2;
    return {
      x: radialScale(data_point) * Math.cos(angle),
      y: radialScale(data_point) * Math.sin(angle)
    };
  }
  
  // Draw feature axes
  features.forEach((feature, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    
    // Create axis line
    const lineCoord = getCoordinates(5, i);
    svg.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", lineCoord.x)
      .attr("y2", lineCoord.y)
      .attr("stroke", "#ddd")
      .attr("stroke-width", 1);
    
    // Add feature labels
    svg.append("text")
      .attr("x", lineCoord.x * 1.15)
      .attr("y", lineCoord.y * 1.15)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#003d7c")
      .attr("font-weight", "bold")
      .text(feature);
  });
  
  // Colors for the student groups
  const colorScale = d3.scaleOrdinal()
    .domain(["NIE Students (N=264)", "NTU Students (N=106)"])
    .range(["#4056A1", "#D13525"]);
  
  // Draw the radar paths
  studentData.forEach((d, i) => {
    // Create points array
    const points = features.map((feature, j) => {
      const value = feature === "Mean" ? d.mean : d[feature];
      const coord = getCoordinates(value, j);
      return [coord.x, coord.y].join(",");
    });
    
    // Draw path
    svg.append("polygon")
      .attr("points", points.join(" "))
      .attr("fill", colorScale(d.group))
      .attr("fill-opacity", 0.3)
      .attr("stroke", colorScale(d.group))
      .attr("stroke-width", 2);
    
    // Add dots at each point
    features.forEach((feature, j) => {
      const value = feature === "Mean" ? d.mean : d[feature];
      const coord = getCoordinates(value, j);
      svg.append("circle")
        .attr("cx", coord.x)
        .attr("cy", coord.y)
        .attr("r", 4)
        .attr("fill", colorScale(d.group));
      
      // Add value labels
      svg.append("text")
        .attr("x", coord.x * 1.05)
        .attr("y", coord.y * 1.05)
        .attr("text-anchor", "middle")
        .attr("font-size", "9px")
        .attr("fill", colorScale(d.group))
        .attr("font-weight", "bold")
        .text(value.toFixed(2));
    });
  });
  
  // Add legend
  const legend = svg.append("g")
    .attr("transform", `translate(${width/3 - 40}, ${-height/3 + 40})`);
  
  studentData.forEach((d, i) => {
    legend.append("rect")
      .attr("x", 0)
      .attr("y", i * 25)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", colorScale(d.group));
    
    legend.append("text")
      .attr("x", 20)
      .attr("y", i * 25 + 12)
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text(`${d.group} (Mean = ${d.mean})`);
  });
  
  // Add title
  svg.append("text")
    .attr("x", 0)
    .attr("y", -height/2.5)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .attr("fill", "#003d7c")
    .text("Student Classification Ethics Comparison");
};

// NEW: Create Student School Classification Ethics Mean Radar Chart using Chart.js
window.createStudentSchoolClassificationEthicsRadarChart_ChartJS = function(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error('Canvas element not found for Chart.js:', canvasId);
    return;
  }
  const ctx = canvas.getContext('2d');

  // Student Classification data (ET1-ET4)
  const studentEthicsItemsData = [
    {
      group: "NIE Students (N=264)",
      ET1: 3.95,
      ET2: 3.94,
      ET3: 3.43,
      ET4: 3.47
    },
    {
      group: "NTU Students (N=106)",
      ET1: 4.00,
      ET2: 3.97,
      ET3: 3.41,
      ET4: 3.63
    }
  ];

  const labels = ["ET1", "ET2", "ET3", "ET4"];

  const datasets = studentEthicsItemsData.map((d, i) => {
    return {
      label: d.group,
      data: labels.map(label => d[label]),
      fill: true,
      backgroundColor: i === 0 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)',
      borderColor: i === 0 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)',
      pointBackgroundColor: i === 0 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: i === 0 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)'
    };
  });

  const data = {
    labels: labels,
    datasets: datasets
  };

  const config = {
    type: 'radar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0
      },
      elements: {
        line: {
          borderWidth: 3
        }
      },
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 3,
          suggestedMax: 4,
          ticks: {
            stepSize: 0.2,
            backdropColor: 'rgba(255, 255, 255, 0.75)',
             font: {
                size: 10
            }
          },
           pointLabels: {
            font: {
              size: 12,
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        title: {
          display: false,
          text: 'Student Ethics Items Comparison (ET1-ET4) by School',
          font: {
            size: 16,
            weight: 'bold'
          },
          color: '#003d7c',
          padding: {
            top: 10,
            bottom: 20
          }
        },
        legend: {
          position: 'top',
           labels: {
             font: {
                size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.r !== null) {
                label += context.parsed.r.toFixed(2);
              }
              return label;
            }
          }
        }
      }
    }
  };

  if (canvas.chartInstance) {
    canvas.chartInstance.destroy();
  }
  canvas.chartInstance = new Chart(ctx, config);
  console.log('Student Ethics Items (ET1-ET4) radar chart (Chart.js) created/updated.');
}; 