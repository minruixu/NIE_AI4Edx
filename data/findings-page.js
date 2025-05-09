// Findings Page Component

// Styles defined directly in the script
const styles = {
  body: {
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#ffffff',
    color: 'black',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
  },
  logo: {
    height: '45px',
    width: 'auto',
    display: 'block',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  navLink: {
    color: '#333',
    textDecoration: 'none',
    fontSize: '1em',
    padding: '8px 0',
    position: 'relative',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#003d7c',
    }
  },
  main: {
    flex: '1',
    padding: '30px 5%',
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  pageTitle: {
    backgroundColor: '#003d7c',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    margin: '0 0 30px 0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  footer: {
    backgroundColor: '#f1f1f1',
    padding: '30px',
    textAlign: 'center',
    fontSize: '0.9em',
    borderTop: '1px solid #ddd',
    zIndex: 10,
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    marginBottom: '15px',
  },
  footerLink: {
    color: '#333',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  sectionHeading: {
    color: '#003d7c',
    marginTop: '40px',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #003d7c',
  },
  findingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
    marginTop: '30px',
  },
  findingCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  findingCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  },
  findingHeader: {
    backgroundColor: '#003d7c',
    color: 'white',
    padding: '15px 20px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  findingContent: {
    padding: '20px',
  },
  findingCategory: {
    display: 'inline-block',
    padding: '5px 10px',
    backgroundColor: '#e6f7ff',
    borderRadius: '15px',
    fontSize: '0.8em',
    marginBottom: '15px',
  },
  findingDetails: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  listContainer: {
    backgroundColor: 'white',
    padding: '15px 20px',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  chartContainer: {
    width: '100%',
    height: '400px',
    marginTop: '30px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  quoteContainer: {
    backgroundColor: '#f0f7ff',
    padding: '20px',
    borderRadius: '8px',
    borderLeft: '4px solid #003d7c',
    marginBottom: '20px',
  },
  quoteText: {
    fontStyle: 'italic',
    fontSize: '1.1em',
    lineHeight: '1.6',
    marginBottom: '15px',
  },
  quoteAuthor: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
  wordcloudContainer: {
    width: '100%',
    height: '400px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '30px',
  },
  fab: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '60px', 
    height: '60px',
    backgroundColor: '#003d7c',
    color: 'white',
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '28px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1001,
    transition: 'all 0.3s ease',
  },
  dialogPopup: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '350px',
    height: '500px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    borderRadius: '10px',
    zIndex: 1002,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  dialogHeader: {
    backgroundColor: '#003d7c',
    color: 'white',
    padding: '10px 15px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogMessages: {
    flex: 1,
    padding: '15px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#003d7c',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '18px',
    borderBottomRightRadius: '3px',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
    color: '#333',
    padding: '10px 15px',
    borderRadius: '18px',
    borderBottomLeftRadius: '3px',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  dialogInputContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderTop: '1px solid #eee',
  },
  dialogInput: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    marginRight: '10px',
    outline: 'none',
  },
  dialogSendButton: {
    backgroundColor: '#003d7c',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

// Apply body styles globally
Object.assign(document.body.style, styles.body);

// Header Component
const Header = () => {
  return (
    <header style={styles.header}>
      <a href="../index.html">
        <img 
          src="https://www.ntu.edu.sg/ResourcePackages/NTU/assets/images/NTU_Logo.png" 
          alt="NTU Logo" 
          style={styles.logo} 
        />
      </a>
      <nav style={styles.nav}>
        <a href="../index.html" style={{
          ...styles.navLink,
          fontWeight: '600',
          fontSize: '1.05em',
        }}>Home</a>
        <a href="#findings-overview" style={{
          ...styles.navLink,
          fontWeight: '600',
          fontSize: '1.05em',
        }}>Overview</a>
        <a href="#instructor-findings" style={{
          ...styles.navLink,
          fontWeight: '600',
          fontSize: '1.05em',
        }}>Instructors</a>
        <a href="#student-findings" style={{
          ...styles.navLink,
          fontWeight: '600',
          fontSize: '1.05em',
        }}>Students</a>
        <a href="#qualitative-findings" style={{
          ...styles.navLink,
          fontWeight: '600',
          fontSize: '1.05em',
        }}>Qualitative</a>
        <a href="#visualizations" style={{
          ...styles.navLink,
          fontWeight: '600',
          fontSize: '1.05em',
        }}>Visualizations</a>
      </nav>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerLinks}>
        <a href="../index.html" style={styles.footerLink}>Home</a>
        <a href="../literature-review.html" style={styles.footerLink}>Literature Review</a>
        <a href="../case-studies.html" style={styles.footerLink}>Case Studies</a>
      </div>
      <div>© {new Date().getFullYear()} Nanyang Technological University</div>
    </footer>
  );
};

// Finding Card Component
const FindingCard = ({ finding, onExpand, onCollapse, isExpanded }) => {
  const [hover, setHover] = React.useState(false);
  
  React.useEffect(() => {
    if (isExpanded) {
      finding.content.forEach(contentItem => {
        if (contentItem.type === 'customHTML' && contentItem.scriptToRun && contentItem.targetContainerId) {
          const targetElement = document.getElementById(contentItem.targetContainerId);
          if (targetElement && typeof window[contentItem.scriptToRun] === 'function') {
            setTimeout(() => {
              if(document.getElementById(contentItem.targetContainerId) && typeof window[contentItem.scriptToRun] === 'function'){
                window[contentItem.scriptToRun](contentItem.targetContainerId);
              }
            }, 0);
          }
        }
      });
      if (window.setupVisualizations) {
        setTimeout(() => {
            window.setupVisualizations();
        }, 0);
      }
    }
  }, [isExpanded, finding]);

  const baseButtonStyle = {
    padding: '8px 15px',
    backgroundColor: '#003d7c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9em',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#002855',
  };

  const collapseButtonStyle = {
    ...baseButtonStyle,
    position: 'sticky',
    top: '20px',
    right: '20px',
    zIndex: 1001, // High z-index to be above other card content
    float: 'right', // Ensure it aligns to the right, letting content flow below if necessary
    marginBottom: '10px' // Add some space below it before content starts
  };

  const expandButtonStyle = {
    ...baseButtonStyle,
    marginTop: '15px',
    display: 'inline-block',
  };

  const [isExpandButtonHovered, setIsExpandButtonHovered] = React.useState(false);
  const [isCollapseButtonHovered, setIsCollapseButtonHovered] = React.useState(false);

  return (
    <div 
      style={{
        ...styles.findingCard,
        ...(hover && !isExpanded ? styles.findingCardHover : {}),
        ...(isExpanded ? { gridColumn: '1 / -1' } : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={styles.findingHeader}>
        <h3 style={{ margin: 0 }}>{finding.title}</h3>
      </div>
      <div style={styles.findingContent}>
        <div style={{
          ...styles.findingCategory,
          backgroundColor: finding.category === 'quantitative' ? '#e6f7ff' : '#f6ffed'
        }}>
          {finding.category.charAt(0).toUpperCase() + finding.category.slice(1)}
        </div>
        <p>{finding.summary}</p>
        
        {isExpanded && (
          <div style={styles.findingDetails}>
            <button 
              style={{...collapseButtonStyle, ...(isCollapseButtonHovered ? buttonHoverStyle : {})}}
              onClick={onCollapse} 
              onMouseEnter={() => setIsCollapseButtonHovered(true)}
              onMouseLeave={() => setIsCollapseButtonHovered(false)}
            >
              Collapse
            </button>
            <div style={{clear: 'both'}}></div> {/* Clear float for subsequent content */}
            {finding.content.map((contentItem, index) => (
              <div key={index}>
                {contentItem.type === 'list' && (
                  <div style={styles.listContainer}>
                    <h4>{contentItem.title}</h4>
                    <ul>
                      {contentItem.items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {contentItem.type === 'customHTML' && (
                  <div style={styles.customHTMLContainer || {}} dangerouslySetInnerHTML={{ __html: contentItem.html }}></div>
                )}
                
                {contentItem.type === 'quote' && (
                  <div style={styles.quoteContainer}>
                    <h4>{contentItem.title}</h4>
                    <p style={styles.quoteText}>{contentItem.text}</p>
                    <p style={styles.quoteAuthor}>{contentItem.author}</p>
                  </div>
                )}
              </div>
            ))}
            
            {finding.chartType && (
              <div style={styles.chartContainer} id={`chart-${finding.id}`}></div>
            )}
            {/* Collapse button moved to the top of this block */}
          </div>
        )}
        
        {!isExpanded && (
          <div style={{ textAlign: 'right' }}>
            <button 
              style={{...expandButtonStyle, ...(isExpandButtonHovered ? buttonHoverStyle : {})}} 
              onClick={onExpand}
              onMouseEnter={() => setIsExpandButtonHovered(true)}
              onMouseLeave={() => setIsExpandButtonHovered(false)}
            >
              Expand
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Content Component
const MainContent = () => {
  const [expandedFinding, setExpandedFinding] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('all'); // 'all', 'instructors', 'students'
  
  // Effect to setup visualizations after content is rendered
  React.useEffect(() => {
    // Call the setupVisualizations function if it exists
    if (window.setupVisualizations) {
      window.setupVisualizations();
    }
  }, [expandedFinding]);
  
  const renderTabButton = (tabId, label) => (
    <button 
      onClick={() => setActiveTab(tabId)}
      style={{
        padding: '10px 20px',
        backgroundColor: activeTab === tabId ? '#003d7c' : '#f5f5f5',
        color: activeTab === tabId ? 'white' : '#333',
        border: 'none',
        borderRadius: '4px',
        margin: '0 10px 20px 0',
        cursor: 'pointer',
        fontWeight: activeTab === tabId ? 'bold' : 'normal',
        boxShadow: activeTab === tabId ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
        transition: 'all 0.2s ease'
      }}
    >
      {label}
    </button>
  );
  
  return (
    <main style={styles.main}>
      <h1 style={styles.pageTitle}>Research Findings: Investigating GPT for Teaching and Learning</h1>
      
      <section id="findings-overview">
        <h2 style={styles.sectionHeading}>Overview</h2>
        <p>This page presents the comprehensive findings from our research on Generative Pre-trained Transformer (GPT) technologies in higher education. The study surveyed 480 students and 128 instructors across multiple disciplines to understand perceptions, experiences, and applications of AI in teaching and learning contexts.</p>
        
        <p>The findings are organized into three major categories:</p>
        <ul>
          <li><strong>Instructor Findings:</strong> Data on instructor readiness, usage patterns, ethical concerns, and training needs.</li>
          <li><strong>Student Findings:</strong> Data on student readiness, usage patterns, ethical awareness, and perceived benefits.</li>
          <li><strong>Qualitative Findings:</strong> Thematic analysis of implementation challenges, innovative applications, pedagogical shifts, emerging themes, and evidence-based recommendations.</li>
        </ul>
        
        <p>Each finding includes supporting data, key insights, and visualizations to help interpret the results. Click on any finding card to expand and view the detailed information.</p>
        
        <div style={styles.wordcloudContainer} id="wordcloud-container">
          <h3>Key Themes Word Cloud</h3>
          {/* Word cloud will be inserted here by the visualization script */}
        </div>
      </section>
      
      <section id="instructor-findings">
        <h2 style={styles.sectionHeading}>Instructor Findings</h2>
        <p>Our study surveyed 128 instructors across various disciplines to understand their readiness, usage patterns, concerns, and needs regarding GenAI technologies in educational contexts.</p>
        
        <div style={styles.findingsGrid}>
          {window.findingsData.instructors.map(finding => (
            <FindingCard 
              key={finding.id}
              finding={finding}
              onExpand={() => setExpandedFinding(finding.id)}
              onCollapse={() => setExpandedFinding(null)}
              isExpanded={expandedFinding === finding.id}
            />
          ))}
        </div>
      </section>
      
      <section id="student-findings">
        <h2 style={styles.sectionHeading}>Student Findings</h2>
        <p>We surveyed 480 students to understand their experiences, perspectives, and usage patterns of GenAI tools in learning contexts.</p>
        
        <div style={styles.findingsGrid}>
          {window.findingsData.students.map(finding => (
            <FindingCard 
              key={finding.id}
              finding={finding}
              onExpand={() => setExpandedFinding(finding.id)}
              onCollapse={() => setExpandedFinding(null)}
              isExpanded={expandedFinding === finding.id}
            />
          ))}
        </div>
      </section>
      
      <section id="qualitative-findings">
        <h2 style={styles.sectionHeading}>Qualitative Findings</h2>
        <p>Our qualitative analysis revealed key themes across student and instructor experiences with GenAI.</p>
        
        <div style={styles.findingsGrid}>
          {window.findingsData.qualitative.map(finding => (
            <FindingCard 
              key={finding.id}
              finding={finding}
              onExpand={() => setExpandedFinding(finding.id)}
              onCollapse={() => setExpandedFinding(null)}
              isExpanded={expandedFinding === finding.id}
            />
          ))}
        </div>
      </section>
      
      <section id="visualizations">
        <h2 style={styles.sectionHeading}>Research Timeline</h2>
        <p>Our research project on GPT in higher education has been conducted over the following timeline:</p>
        <ul style={{ marginBottom: '30px' }}>
          {window.findingsVisualData.timeline.map((item, index) => (
            <li key={index} style={{ 
              padding: '10px 0', 
              borderBottom: index < window.findingsVisualData.timeline.length - 1 ? '1px solid #eee' : 'none',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <strong style={{ color: '#003d7c', width: '120px' }}>{item.date}</strong>
              <span style={{ flex: 1 }}>{item.event}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

// Dialog Component
const Dialog = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [messages, setMessages] = React.useState([
    { text: 'Welcome to the Findings Assistant! How can I help you explore our research findings?', sender: 'bot' }
  ]);
  const messagesEndRef = React.useRef(null);

  // Auto-scroll to bottom when messages update
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse;
      const userText = inputValue.toLowerCase();
      
      if (userText.includes('instructor readiness') || userText.includes('teacher readiness') || userText.includes('faculty readiness') || userText.includes('readiness dimension')) {
        botResponse = { 
          text: 'Our data on instructor readiness (N=128) shows varied scores across dimensions: Ethics (3.72) and Vision (3.69) scored highest, followed by Cognition (3.46) and Innovation (3.29), with Ability (3.06) and Perceived Threats (2.96) scoring lowest. This suggests instructors recognize ethical implications and future potential of AI, but may need more practical training.', 
          sender: 'bot' 
        };
      } else if (userText.includes('instructor') || userText.includes('faculty') || userText.includes('teacher')) {
        botResponse = { 
          text: 'Our instructor findings (N=128) show that 42% incorporate GenAI into teaching. They rated Ethics (3.72) and Vision (3.69) highest in readiness dimensions. Their top concerns were academic integrity (4.8/5) and skill atrophy (4.2/5). 76% expressed need for additional AI training, particularly for discipline-specific use cases. Would you like more specific instructor-related information?', 
          sender: 'bot' 
        };
      } else if (userText.includes('student')) {
        botResponse = { 
          text: 'Our student findings (N=480) show 78% use GenAI weekly (32% daily). Students rated higher on overall readiness (3.67/5) than instructors (3.21/5). They primarily use GenAI for research (73%) and content creation (68%). Their top perceived benefits were time savings (4.5/5) and learning assistance (4.2/5). Students showed less concern about academic integrity (4.1/5) compared to instructors (4.8/5). Would you like more specific student-related information?', 
          sender: 'bot' 
        };
      } else if (userText.includes('instructor ethics') || userText.includes('faculty ethics') || userText.includes('teacher ethics')) {
        botResponse = { 
          text: 'Instructors expressed strong ethical concerns, with academic integrity rated highest (4.8/5), followed by dependency/skill atrophy (4.2/5) and information accuracy (4.1/5). They ranked ethical concerns consistently higher than students across all dimensions, with a particularly significant gap in academic integrity concerns (4.8 vs 4.1).', 
          sender: 'bot' 
        };
      } else if (userText.includes('student ethics') || userText.includes('student ethical')) {
        botResponse = { 
          text: 'Students showed moderate ethical concerns, with academic integrity rated highest (4.1/5), followed by information accuracy (3.9/5) and dependency/skill atrophy (3.6/5). They consistently ranked ethical concerns lower than instructors did, suggesting different perspectives on ethical implications of AI in education.', 
          sender: 'bot' 
        };
      } else if (userText.includes('compare') || userText.includes('difference') || userText.includes('versus') || userText.includes('vs')) {
        botResponse = { 
          text: 'Key differences between instructors and students include: 1) Readiness: students rated higher (3.67 vs 3.21), 2) Usage: 78% of students use GenAI weekly vs 42% of instructors incorporating it into teaching, 3) Ethics: instructors showed stronger concerns about academic integrity (4.8 vs 4.1), 4) Benefits: students valued time savings most (4.5/5), 5) Training: 76% of instructors wanted more training while 83% of students wanted AI literacy in curriculum.', 
          sender: 'bot' 
        };
      } else if (userText.includes('quantitative') || userText.includes('statistics') || userText.includes('numbers')) {
        botResponse = { 
          text: 'Our quantitative findings are now organized by stakeholder groups. For instructors (N=128), we measured readiness dimensions, usage patterns, ethical concerns, and training needs. For students (N=480), we examined readiness, usage patterns, ethical awareness, and perceived benefits. Would you like to explore instructor or student findings specifically?', 
          sender: 'bot' 
        };
      } else if (userText.includes('qualitative') || userText.includes('themes') || userText.includes('interviews')) {
        botResponse = { 
          text: 'The qualitative analysis revealed several key themes: implementation challenges, innovative applications, pedagogical shifts, and emerging institutional strategies. Faculty roles are evolving from content delivery to helping students critically evaluate AI outputs. Would you like details on any of these themes?', 
          sender: 'bot' 
        };
      } else if (userText.includes('recommend') || userText.includes('suggest') || userText.includes('best practice')) {
        botResponse = { 
          text: 'Based on our findings, we recommend: (1) Developing institution-wide AI policies with consistent guidelines, (2) Implementing targeted AI training programs for faculty, (3) Incorporating AI literacy as a cross-disciplinary component in undergraduate and graduate education, (4) Creating AI-resilient assessment strategies, and (5) Establishing clear standards for responsible AI use in academic contexts.', 
          sender: 'bot' 
        };
      } else {
        botResponse = { 
          text: 'I can help you explore our research findings on GPT in higher education. We have separate data for instructors and students, as well as qualitative themes. Would you like to learn about instructor findings, student findings, or qualitative themes? Or you can ask about specific topics like ethics, readiness, or usage patterns.', 
          sender: 'bot' 
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div style={styles.dialogPopup}>
      <div style={styles.dialogHeader}>
        <h3 style={{ margin: 0 }}>Findings Assistant</h3>
        <button 
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          ×
        </button>
      </div>
      
      <div style={styles.dialogMessages}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div style={styles.dialogInputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
          placeholder="Type your question..."
          style={styles.dialogInput}
        />
        <button
          onClick={handleSendMessage}
          style={styles.dialogSendButton}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

// Floating Action Button Component
const FloatingButton = ({ onClick }) => (
  <button style={styles.fab} onClick={onClick}>
    💬
  </button>
);

// Main App Component
const App = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Header />
      <MainContent />
      <Footer />
      <FloatingButton onClick={handleOpenDialog} />
      {isDialogOpen && <Dialog isOpen={true} onClose={handleCloseDialog} />}
    </>
  );
};

// Render the App
ReactDOM.render(
  <App />,
  document.getElementById('root')
); 