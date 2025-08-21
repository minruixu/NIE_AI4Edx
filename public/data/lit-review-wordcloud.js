// Literature Review Word Cloud Generator
window.addEventListener('DOMContentLoaded', () => {
  // Wait for all React components to render
  setTimeout(() => {
    // Check if we're in the literature review page
    if (document.querySelector('[data-page="literature-review"]')) {
      // Get the selected literature review from the URL hash
      const urlHash = window.location.hash;
      const reviewId = urlHash ? parseInt(urlHash.replace('#', '')) : null;
      
      // If a review is selected and has a word cloud container
      if (reviewId) {
        const container = document.getElementById(`wordcloud-container-${reviewId}`);
        if (container) {
          createWordCloud(container, reviewId);
        }
      }
    }
  }, 1000);
});

// Initialize word clouds for a specific literature review
function setupWordClouds(reviewId) {
  const container = document.getElementById(`wordcloud-container-${reviewId}`);
  if (container) {
    createWordCloud(container, reviewId);
  }
}

// Create a word cloud in the specified container
function createWordCloud(container, reviewId) {
  // Clear any existing content
  container.innerHTML = '';
  
  // Create a heading for the word cloud
  const heading = document.createElement('h3');
  heading.textContent = 'Key Themes Word Cloud';
  heading.style.color = '#003d7c';
  heading.style.marginBottom = '15px';
  container.appendChild(heading);
  
  // Word cloud data based on review ID
  const words = getWordCloudData(reviewId);
  
  // Set up the word cloud dimensions
  const width = container.offsetWidth;
  const height = 400;
  
  // Create the word cloud layout
  const layout = d3.layout.cloud()
    .size([width, height])
    .words(words)
    .padding(5)
    .rotate(() => (Math.random() > 0.5 ? 0 : 90))
    .font('Arial')
    .fontSize(d => d.value * 4) // Scale font size based on value
    .on('end', draw);
  
  // Start the layout calculation
  layout.start();
  
  // Function to draw the word cloud
  function draw(words) {
    // Create SVG container
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
    
    // Add words to the layout
    svg.selectAll('text')
      .data(words)
      .enter()
      .append('text')
      .style('font-size', d => `${d.size}px`)
      .style('font-family', 'Arial')
      .style('fill', () => {
        // Generate a random color in the blue spectrum
        const hue = 210 + Math.random() * 30; // Blue hues
        const saturation = 50 + Math.random() * 50;
        const lightness = 40 + Math.random() * 30;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      })
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
      .text(d => d.text);
  }
}

// Sample word cloud data for each literature review
function getWordCloudData(reviewId) {
  const wordCloudData = {
    1: [ // RQ1: Instructors' and Students' Perceptions of Readiness
      { text: "readiness", value: 12 },
      { text: "faculty", value: 10 },
      { text: "students", value: 10 },
      { text: "institutional", value: 9 },
      { text: "support", value: 9 },
      { text: "training", value: 8 },
      { text: "infrastructure", value: 8 },
      { text: "teaching", value: 7 },
      { text: "learning", value: 7 },
      { text: "integration", value: 7 },
      { text: "acceptance", value: 6 },
      { text: "demographic", value: 6 },
      { text: "attitudes", value: 6 },
      { text: "skills", value: 6 },
      { text: "generational", value: 5 },
      { text: "cultural", value: 5 },
      { text: "self-directed", value: 5 },
      { text: "orientation", value: 5 },
      { text: "TPACK", value: 4 },
      { text: "awareness", value: 4 },
      { text: "knowledge", value: 4 },
      { text: "ability", value: 4 },
      { text: "enthusiasm", value: 3 },
      { text: "concerns", value: 3 },
      { text: "openness", value: 3 }
    ],
    2: [ // RQ2: Ethical Concerns
      { text: "academic-integrity", value: 14 },
      { text: "plagiarism", value: 12 },
      { text: "ethics", value: 11 },
      { text: "AI-literacy", value: 10 },
      { text: "framework", value: 9 },
      { text: "privacy", value: 9 },
      { text: "detection", value: 8 },
      { text: "transparency", value: 8 },
      { text: "authorship", value: 7 },
      { text: "bias", value: 7 },
      { text: "maturity", value: 6 },
      { text: "autonomy", value: 6 },
      { text: "accountability", value: 6 },
      { text: "critical-thinking", value: 6 },
      { text: "guidelines", value: 5 },
      { text: "overreliance", value: 5 },
      { text: "security", value: 5 },
      { text: "philosophical", value: 5 },
      { text: "responsibility", value: 4 },
      { text: "character", value: 4 },
      { text: "misconduct", value: 4 },
      { text: "over-confidence", value: 4 },
      { text: "fairness", value: 3 },
      { text: "data-privacy", value: 3 },
      { text: "policy", value: 3 }
    ],
    3: [ // RQ3: Current GPT Practices
      { text: "personalization", value: 14 },
      { text: "integration", value: 12 },
      { text: "frameworks", value: 11 },
      { text: "pedagogy", value: 10 },
      { text: "feedback", value: 10 },
      { text: "language-learning", value: 9 },
      { text: "academic-advising", value: 8 },
      { text: "implementation", value: 8 },
      { text: "collaboration", value: 8 },
      { text: "curriculum", value: 7 },
      { text: "metacognition", value: 7 },
      { text: "self-regulated", value: 7 },
      { text: "interactive", value: 6 },
      { text: "automation", value: 6 },
      { text: "teaching-resources", value: 6 },
      { text: "efficiency", value: 5 },
      { text: "lesson-planning", value: 5 },
      { text: "assessment", value: 5 },
      { text: "literacy", value: 5 },
      { text: "challenges", value: 5 },
      { text: "data-privacy", value: 4 },
      { text: "algorithmic-bias", value: 4 },
      { text: "misinformation", value: 4 },
      { text: "AI-resilient", value: 3 },
      { text: "context-awareness", value: 3 }
    ]
  };
  
  return wordCloudData[reviewId] || [];
} 