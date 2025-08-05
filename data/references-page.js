const ReferencesPage = () => {
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#003d7c',
    },
    backLink: {
      display: 'inline-block',
      marginBottom: '20px',
      color: '#003d7c',
      textDecoration: 'none',
    },
    referenceList: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
    },
    referenceItem: {
      marginBottom: '15px',
      paddingLeft: '36px',
      textIndent: '-36px',
      lineHeight: '1.6',
    },
    sectionTitle: {
      color: '#003d7c',
      marginTop: '30px',
      marginBottom: '20px',
      borderBottom: '1px solid #eee',
      paddingBottom: '10px',
    }
  };

  return (
    <div>
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <a href="index.html">
          <img 
            src="./images/NTU_Logo.webp" 
            alt="NTU Logo" 
            style={{ height: '45px' }}
          />
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="index.html" style={{ textDecoration: 'none', color: '#333' }}>Home</a>
          <a
            href="literature-review.html"
            style={{ textDecoration: 'none', color: '#333' }}
          >
            Literature Review
          </a>
          <a
            href="references.html"
            style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}
          >
            References
          </a>
        </nav>
      </header>

      <div style={styles.container}>
        <div style={styles.header}>
          <h1>References</h1>
          <p>Complete list of references used in the literature reviews</p>
        </div>

        <a href="literature-review.html" style={styles.backLink}>← Back to Literature Reviews</a>

        <h2 style={styles.sectionTitle}>References in APA Format</h2>
        <ul style={styles.referenceList}>
          {window.references.map((reference, index) => (
            <li key={index} style={styles.referenceItem}>{reference}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Render the References Page
ReactDOM.render(
  React.createElement(ReferencesPage, null),
  document.getElementById('root')
); 