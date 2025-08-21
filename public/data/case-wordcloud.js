// Word Cloud component for case studies
window.createWordCloudViewer = function(containerId) {
  // Extract case study ID from container ID
  const caseId = containerId.split('-').pop();
  
  // Create the container div
  const container = document.createElement('div');
  container.className = 'word-cloud-container';
  container.style.cssText = `
    width: 100%;
    height: 500px;
    margin: 20px 0;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  `;

  // Create heading
  const heading = document.createElement('h4');
  heading.textContent = 'Word Cloud Visualization';
  heading.style.cssText = `
    padding: 15px;
    margin: 0;
    color: #003d7c;
    text-align: center;
    border-bottom: 1px solid #ddd;
    background-color: #f0f0f0;
  `;
  container.appendChild(heading);

  // Create the word cloud container
  const wordCloudDiv = document.createElement('div');
  wordCloudDiv.id = `wordcloud-viz-${caseId}`;
  wordCloudDiv.style.cssText = `
    width: 100%;
    height: 420px;
    padding: 10px;
  `;
  container.appendChild(wordCloudDiv);

  // Add container to the specified element
  const targetContainer = document.getElementById(containerId);
  if (targetContainer) {
    targetContainer.appendChild(container);
    
    // Since D3.js and D3-Cloud libraries are already loaded in the HTML page
    // directly load and render the word cloud data
    loadWordCloudData(caseId);
  }

  // Function to load and render the word cloud
  function loadWordCloudData(caseId) {
    fetch(`data/nie_case${caseId}_wordcloud.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(words => {
        renderWordCloud(words, caseId);
      })
      .catch(error => {
        console.error('Error loading word cloud data:', error);
        wordCloudDiv.innerHTML = '<p style="color: red; text-align: center;">Error loading word cloud data</p>';
      });
  }

  // Function to render the word cloud
  function renderWordCloud(words, caseId) {
    const width = wordCloudDiv.clientWidth;
    const height = wordCloudDiv.clientHeight;

    // Access d3 from window object
    const d3Instance = window.d3;
    
    // Set up a color scale
    const color = d3Instance.scaleOrdinal(d3Instance.schemeCategory10);
    
    // Create SVG
    const svg = d3Instance.select(`#wordcloud-viz-${caseId}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    
    // Create group element
    const group = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
    
    // Set up the word cloud layout
    const layout = d3Instance.layout.cloud()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font('Arial')
      .fontSize(d => Math.sqrt(d.value) * 10)
      .on('end', draw);
    
    // Start the layout calculation
    layout.start();
    
    // Draw the word cloud
    function draw(words) {
      group.selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => `${d.size}px`)
        .style('font-family', 'Arial')
        .style('fill', (d, i) => color(i))
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
        .text(d => d.text);
    }
  }
}; 