import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import caseStudies from './case-studies.js';
import createWordCloudViewer from './case-wordcloud.js';

const CaseStudiesPage = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  
  // Initialize word clouds after component mounts
  useEffect(() => {
    // Initialize word clouds for visible containers
    if (selectedCase && selectedCase.hasWordCloud) {
      setTimeout(() => {
        createWordCloudViewer(`wordcloud-container-${selectedCase.id}`);
      }, 100);
    }
  }, [selectedCase]);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      backgroundColor: '#003d7c',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    backLink: {
      color: '#003d7c',
      textDecoration: 'none',
      display: 'inline-block',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    caseGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
      marginTop: '20px',
    },
    caseCard: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      backgroundColor: '#f9f9f9',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    caseCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    },
    caseDetail: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      marginTop: '20px',
      backgroundColor: 'white',
    },
    caseTitle: {
      color: '#003d7c',
      marginBottom: '10px',
    },
    caseCategory: {
      display: 'inline-block',
      backgroundColor: '#e6f0ff',
      color: '#003d7c',
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '14px',
      marginBottom: '10px',
    },
    caseSummary: {
      color: '#555',
      marginBottom: '15px',
    },
    promptsContainer: {
      marginTop: '20px',
      backgroundColor: '#f5f5f5',
      padding: '15px',
      borderRadius: '8px',
    },
    promptTitle: {
      color: '#003d7c',
      marginBottom: '10px',
    },
    promptList: {
      paddingLeft: '20px',
    },
    promptItem: {
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Case Studies</h1>
        <p>Explore our collection of case studies showcasing how AI is being used in teaching and learning contexts</p>
      </div>
      
      <a href="/" style={styles.backLink}>← Back to Main Page</a>
      
      {selectedCase ? (
        <div>
          <div style={styles.caseDetail}>
            <h2 style={styles.caseTitle}>{selectedCase.title}</h2>
            <span style={styles.caseCategory}>{selectedCase.category}</span>
            <p style={styles.caseSummary}><strong>{selectedCase.summary}</strong></p>
            
            {selectedCase.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            
            {selectedCase.hasWordCloud && (
              <div id={`wordcloud-container-${selectedCase.id}`} style={{ marginTop: '30px' }}></div>
            )}
            
            <div style={styles.promptsContainer}>
              <h3 style={styles.promptTitle}>Reflection Prompts</h3>
              <ul style={styles.promptList}>
                {selectedCase.reflectionPrompts.map((prompt, index) => (
                  <li key={index} style={styles.promptItem}>{prompt}</li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => setSelectedCase(null)} 
              style={{
                marginTop: '20px',
                padding: '10px 15px',
                backgroundColor: '#003d7c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Back to All Case Studies
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Browse Case Studies</h2>
          <div style={styles.caseGrid}>
            {caseStudies.map(caseStudy => (
              <div
                key={caseStudy.id}
                style={styles.caseCard}
                onClick={() => setSelectedCase(caseStudy)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                <h3 style={styles.caseTitle}>{caseStudy.title}</h3>
                <span style={styles.caseCategory}>{caseStudy.category}</span>
                <p>{caseStudy.summary}</p>
                <div style={{ marginTop: 'auto', textAlign: 'right' }}>
                  <span style={{ color: '#003d7c', fontWeight: 'bold' }}>Read more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Render the component
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.render(<CaseStudiesPage />, root);

export default CaseStudiesPage; 