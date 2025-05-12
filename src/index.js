import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import caseStudies from './data/case-studies.js';
import createWordCloudViewer from './data/case-wordcloud.js';

// Import images for slideshow
import img1 from './figs/IMG_20250220_145552_00_003-min.jpg';
import img2 from './figs/IMG_20250220_150253_00_008-min.jpg';
import img3 from './figs/IMG_20250220_150920_00_013-min.jpg';

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
    backgroundColor: '#f8f8f8', // Light background for better contrast
  },
  header: {
    backgroundColor: '#ffffff',
    color: 'black',
    padding: '15px 20px', // Increased padding
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)', // Lighter shadow
    position: 'sticky', // Make header sticky
    top: 0, // Stick to top
  },
  logo: {
    height: '45px', // Slightly larger logo
    width: 'auto',
    display: 'block',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px', // Increased spacing between nav items
  },
  navLink: {
    color: '#333',
    textDecoration: 'none',
    fontSize: '1em',
    padding: '8px 0', // Increased padding
    position: 'relative',
    cursor: 'pointer',
    fontWeight: '500', // Medium weight for better readability
    transition: 'color 0.2s ease', // Smooth color transition
    '&:hover': {
      color: '#003d7c', // NTU blue on hover
    }
  },
  // Styles for the dropdown menu
  dropdownContainer: {
      position: 'relative',
      display: 'inline-block',
  },
  dropdownContent: {
      display: 'block',
      position: 'absolute',
      backgroundColor: '#ffffff',
      minWidth: '200px', // Wider dropdown
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)', // Softer shadow
      zIndex: 11,
      top: '100%',
      left: 0,
      borderRadius: '4px', // Rounded corners
      overflow: 'hidden', // Ensure content respects border radius
      border: '1px solid #eee', // Subtle border
  },
  dropdownLink: {
      color: '#333',
      padding: '12px 16px',
      textDecoration: 'none',
      display: 'block',
      fontSize: '0.95em',
      transition: 'background-color 0.2s ease', // Smooth transition
  },
  dropdownLinkHover: {
     backgroundColor: '#f0f0f0', // Lighter hover color
  },
  // --- End Dropdown Styles ---
  main: {
    flex: '1',
    padding: '30px 5%', // Percentage-based padding for responsiveness
    position: 'relative',
    maxWidth: '1200px', // Max width for better readability
    margin: '0 auto', // Center content
  },
  pageTitle: {
    backgroundColor: '#003d7c',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    margin: '0 0 30px 0',
    borderRadius: '8px', // More rounded corners
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Subtle shadow for depth
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
     gap: '25px', // Increased spacing
     marginBottom: '15px',
  },
   footerLink: {
      color: '#333',
      textDecoration: 'none',
      transition: 'color 0.2s ease', // Smooth color transition
      '&:hover': {
        textDecoration: 'underline', // Underline on hover
      }
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
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      zIndex: 100,
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
      }
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
   dialogCloseButton: {
      position: 'absolute',
      top: '10px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      lineHeight: 1,
      color: '#fff',
      zIndex: 1,
   },
   dialogInput: {
      width: 'calc(100% - 20px)',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '20px',
      marginRight: '10px',
      outline: 'none',
   },
  videoContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: '30px', // Add spacing after video
    borderRadius: '8px', // Rounded corners for video container
    overflow: 'hidden', // Ensure video respects border radius
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Subtle shadow
    lineHeight: 0,
  },
  videoOverlayText: {
    position: 'absolute',
    bottom: '30px',
    left: '30px',
    color: 'white',
    backgroundColor: 'rgba(0, 61, 124, 0.8)',
    padding: '12px 24px',
    borderRadius: '4px',
    fontSize: '1.5rem',
    fontWeight: '500',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    cursor: 'default',
    zIndex: 5,
  },
  // Styles for image slider navigation
  sliderNavigation: {
    position: 'absolute',
    width: '100%',
    bottom: '15px',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 5,
  },
  sliderDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    margin: '0 8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  sliderDotActive: {
    backgroundColor: 'white',
    width: '14px',
    height: '14px',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
  },
  sliderArrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    cursor: 'pointer',
    zIndex: 5,
    transition: 'all 0.3s ease',
  },
  sliderArrowLeft: {
    left: '20px',
  },
  sliderArrowRight: {
    right: '20px',
  },
  collapsibleHeading: {
    cursor: 'pointer',
    userSelect: 'none',
    margin: 0,
    padding: '20px', // More padding
    display: 'flex',
    justifyContent: 'space-between', // Position arrow to the right
    alignItems: 'center',
    transition: 'background-color 0.2s ease', // Smooth background transition
    fontWeight: '600', // Bolder font for headings
    '&:hover': {
      backgroundColor: '#f5f5f5', // Light grey on hover
    },
    '&:after': {
      content: 'attr(data-arrow)', // Dynamic arrow content from data attribute
      fontSize: '0.8em',
      marginLeft: '10px',
    }
  },
  collapsibleSectionBox: {
    backgroundColor: '#ffffff', // White background
    border: '1px solid #eaeaea', // Lighter border
    borderRadius: '8px',
    marginBottom: '25px', // More spacing between sections
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // Very subtle shadow
    transition: 'box-shadow 0.2s ease', // Smooth shadow transition
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Enhanced shadow on hover
    }
  },
  collapsibleContent: {
    padding: '0 20px 20px 20px', // More padding
    lineHeight: '1.6', // Improved line height for readability
  },
};

// Apply body styles globally (alternative to index.css)
Object.assign(document.body.style, styles.body);

// Header Component
const Header = () => {
  const [isFindingsOpen, setIsFindingsOpen] = useState(false);
  const [isResearchFocusDropdownOpen, setIsResearchFocusDropdownOpen] = useState(false);
  const [isLiteratureReviewDropdownOpen, setIsLiteratureReviewDropdownOpen] = useState(false);
  // Add state for Methods and Gen AI Tools dropdowns
  const [isMethodsDropdownOpen, setIsMethodsDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isCaseStudiesDropdownOpen, setIsCaseStudiesDropdownOpen] = useState(false);
  const [isAboutUsDropdownOpen, setIsAboutUsDropdownOpen] = useState(false);

  return (
    <header style={{
      ...styles.header,
      padding: '12px 30px',
      backgroundColor: '#f9f9f9',
      borderBottom: '1px solid #e0e0e0'
    }}>
      <img 
        src={`${process.env.PUBLIC_URL}/images/NTU_Logo.webp`}
        alt="Logo" 
        style={styles.logo} 
      />
      <nav style={{
        ...styles.nav,
        gap: '25px',
      }}>
        {/* About Us Dropdown - New Item */}
        <div
          style={styles.dropdownContainer}
          onMouseEnter={() => setIsAboutUsDropdownOpen(true)}
          onMouseLeave={() => setIsAboutUsDropdownOpen(false)}
        >
          <a href="#who-we-are" style={{
            ...styles.navLink,
            fontWeight: '600',
            fontSize: '1.05em',
            color: '#003d7c',
            padding: '10px 0',
            borderBottom: isAboutUsDropdownOpen ? '2px solid #003d7c' : '2px solid transparent',
            transition: 'all 0.3s ease',
          }}>About Us</a>
          {isAboutUsDropdownOpen && (
            <div style={{
              ...styles.dropdownContent,
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              border: 'none',
              borderRadius: '8px',
              marginTop: '5px',
            }}>
              <a href="#who-we-are" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Research Team</a>
              <a href="#research-focus" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Research Direction</a>
            </div>
          )}
        </div>

        {/* Research Focus Dropdown */}
        <div
          style={styles.dropdownContainer}
          onMouseEnter={() => setIsResearchFocusDropdownOpen(true)}
          onMouseLeave={() => setIsResearchFocusDropdownOpen(false)}
        >
          <a href="#research-focus" style={{
            ...styles.navLink,
            fontWeight: '600',
            fontSize: '1.05em',
            borderBottom: isResearchFocusDropdownOpen ? '2px solid #003d7c' : '2px solid transparent',
            transition: 'all 0.3s ease',
          }}>Research Focus</a>
          {isResearchFocusDropdownOpen && (
            <div style={{
              ...styles.dropdownContent,
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              border: 'none',
              borderRadius: '8px',
              marginTop: '5px',
            }}>
              <a href="#research-aims" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Aims</a>
              <a href="#research-problems" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Problems</a>
              <a href="#research-questions" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Research Questions</a>
            </div>
          )}
        </div>

        {/* Methods Dropdown - Moved up in order */}
        <div
          style={styles.dropdownContainer}
          onMouseEnter={() => setIsMethodsDropdownOpen(true)}
          onMouseLeave={() => setIsMethodsDropdownOpen(false)}
        >
          <a href="#methods" style={{
            ...styles.navLink,
            fontWeight: '600',
            fontSize: '1.05em',
            borderBottom: isMethodsDropdownOpen ? '2px solid #003d7c' : '2px solid transparent',
            transition: 'all 0.3s ease',
          }}>Methods</a>
          {isMethodsDropdownOpen && (
            <div style={{
              ...styles.dropdownContent,
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              border: 'none',
              borderRadius: '8px',
              marginTop: '5px',
            }}>
              <a href="#research-design" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Research Design</a>
              <a href="#participants" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Participants</a>
              <a href="#data-analysis" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Data Analysis</a>
            </div>
          )}
        </div>

        {/* Literature Review Dropdown */}
        <div
          style={styles.dropdownContainer}
          onMouseEnter={() => setIsLiteratureReviewDropdownOpen(true)}
          onMouseLeave={() => setIsLiteratureReviewDropdownOpen(false)}
        >
          <a 
            href="#" 
            style={{
              ...styles.navLink,
              fontWeight: '600',
              fontSize: '1.05em',
              borderBottom: isLiteratureReviewDropdownOpen ? '2px solid #003d7c' : '2px solid transparent',
              transition: 'all 0.3s ease',
            }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `${process.env.PUBLIC_URL}/literature-review.html`;
            }}
          >Literature Review</a>
          {isLiteratureReviewDropdownOpen && (
            <div style={{
              ...styles.dropdownContent,
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              border: 'none',
              borderRadius: '8px',
              marginTop: '5px',
            }}>
              <a href="#lit-rq1" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>RQ1: Readiness (Main Page)</a>
              <a href="#lit-rq2" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>RQ2: Ethics (Main Page)</a>
              <a href="#lit-rq3" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>RQ3: Practices (Main Page)</a>
              <a href="#" style={styles.dropdownLink} onClick={(e) => {e.preventDefault(); window.location.href = `${process.env.PUBLIC_URL}/literature-review.html`;}} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Detailed Literature Review Page</a>
            </div>
          )}
        </div>
        
        {/* Findings Dropdown */}
        <div
          style={styles.dropdownContainer}
          onMouseEnter={() => setIsFindingsOpen(true)}
          onMouseLeave={() => setIsFindingsOpen(false)}
        >
          <a 
            href="#" 
            style={{
              ...styles.navLink,
              fontWeight: '600',
              fontSize: '1.05em',
              borderBottom: isFindingsOpen ? '2px solid #003d7c' : '2px solid transparent',
              transition: 'all 0.3s ease',
            }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `${process.env.PUBLIC_URL}/findings.html`;
            }}
          >Findings</a>
          {isFindingsOpen && (
            <div style={{
              ...styles.dropdownContent,
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              border: 'none',
              borderRadius: '8px',
              marginTop: '5px',
            }}>
              <a href="#quantitative" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Quantitative (Main Page)</a>
              <a href="#qualitative" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Qualitative (Main Page)</a>
              <a href="#" style={styles.dropdownLink} onClick={(e) => {e.preventDefault(); window.location.href = `${process.env.PUBLIC_URL}/findings.html`;}} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Detailed Findings Page</a>
            </div>
          )}
        </div>
        
        {/* Case Studies Dropdown */}
        <div
          style={styles.dropdownContainer}
          onMouseEnter={() => setIsCaseStudiesDropdownOpen(true)}
          onMouseLeave={() => setIsCaseStudiesDropdownOpen(false)}
        >
          <a href="#" style={{
            ...styles.navLink,
            fontWeight: '600',
            fontSize: '1.05em',
            borderBottom: isCaseStudiesDropdownOpen ? '2px solid #003d7c' : '2px solid transparent',
            transition: 'all 0.3s ease',
          }} onClick={(e) => {e.preventDefault(); window.location.href = `${process.env.PUBLIC_URL}/case-studies.html`;}}>Case Studies</a>
          {isCaseStudiesDropdownOpen && (
            <div style={{
              ...styles.dropdownContent,
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              border: 'none',
              borderRadius: '8px',
              marginTop: '5px',
            }}>
              <a href="#browse-cases" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Browse Cases (Main Page)</a>
              <a href="#" style={styles.dropdownLink} onClick={(e) => {e.preventDefault(); window.location.href = `${process.env.PUBLIC_URL}/case-studies.html`;}} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Detailed Case Studies Page</a>
            </div>
          )}
        </div>
        
        {/* Resources Dropdown (previously Gen AI Tools) */}
        <div
          style={styles.dropdownContainer}
          onMouseEnter={() => setIsResourcesDropdownOpen(true)}
          onMouseLeave={() => setIsResourcesDropdownOpen(false)}
        >
          <a href="#resources" style={{
            ...styles.navLink,
            fontWeight: '600',
            fontSize: '1.05em',
            borderBottom: isResourcesDropdownOpen ? '2px solid #003d7c' : '2px solid transparent',
            transition: 'all 0.3s ease',
          }}>Resources</a>
          {isResourcesDropdownOpen && (
            <div style={{
              ...styles.dropdownContent,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              minWidth: '350px',
              padding: '15px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              border: 'none',
              borderRadius: '8px',
              marginTop: '5px',
            }}>
              <div style={{ borderRight: '1px solid #eee', padding: '0 10px' }}>
                <h4 style={{ margin: '5px 0 10px 0', color: '#003d7c', fontSize: '0.95em', textAlign: 'center' }}>Tools for Teaching</h4>
                <a href="#instructor-tools" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Instructor Resources</a>
                <a href="#ai-assessment" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>AI for Assessment</a>
                <a href="#teaching-activities" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Teaching Activities</a>
              </div>
              <div style={{ padding: '0 10px' }}>
                <h4 style={{ margin: '5px 0 10px 0', color: '#e74c3c', fontSize: '0.95em', textAlign: 'center' }}>Tools for Learning</h4>
                <a href="#student-tools" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Student Resources</a>
                <a href="#learning-ai" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Learning with AI</a>
                <a href="#student-research" style={styles.dropdownLink} onMouseOver={e => e.currentTarget.style.backgroundColor=styles.dropdownLinkHover.backgroundColor} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Research Materials</a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

// Main Content Component
const MainContent = () => {
  const [isWhoWeAreOpen, setIsWhoWeAreOpen] = useState(false);
  const [isResearchFocusOpen, setIsResearchFocusOpen] = useState(false);
  const [isLiteratureReviewOpen, setIsLiteratureReviewOpen] = useState(false);
  // Add state for the new sections
  const [isMethodsOpen, setIsMethodsOpen] = useState(false);
  const [isFindingsOpenSection, setIsFindingsOpenSection] = useState(false); // Renamed state for clarity
  const [isResourcesOpen, setIsResourcesOpen] = useState(false); // Renamed from isGenAIToolsOpen
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false); // New state for Case Studies
  
  // State for image slideshow
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [img1, img2, img3];

  // Add useEffect to handle hash navigation
  useEffect(() => {
    // Function to handle hash changes and opening relevant sections
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      if (hash.includes('who-we-are')) {
        setIsWhoWeAreOpen(true);
      } else if (hash.includes('research-')) {
        setIsResearchFocusOpen(true);
      } else if (hash.includes('lit-')) {
        // This will handle lit-rq1, lit-rq2, lit-rq3
        setIsLiteratureReviewOpen(true);
      } else if (hash.includes('research-design') || hash.includes('participants') || hash.includes('data-analysis')) {
        setIsMethodsOpen(true);
      } else if (hash.includes('qualitative') || hash.includes('quantitative')) {
        setIsFindingsOpenSection(true);
      } else if (hash.includes('-tools') || hash.includes('resources') || hash.includes('teaching-activities') || 
                hash.includes('learning-ai') || hash.includes('ai-assessment') || hash.includes('student-research')) {
        setIsResourcesOpen(true);
      } else if (hash.includes('case-studies') || hash.includes('browse-cases') || hash.includes('random-case')) {
        setIsCaseStudiesOpen(true);
      }
      
      // Scroll to the element after a short delay to ensure the section is open
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
      // Signal to parent app component that we've navigated to a new page section
      // Custom event to trigger post-page interaction
      window.dispatchEvent(new CustomEvent('pageNavigated', { detail: { section: hash } }));
    };

    // Handle hash on initial page load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Set up slideshow rotation
    const slideInterval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    
    // Clean up event listener and interval
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearInterval(slideInterval);
    };
  }, [images.length]);

  const toggleWhoWeAre = () => {
    setIsWhoWeAreOpen(!isWhoWeAreOpen);
  };
  const toggleResearchFocus = () => {
    setIsResearchFocusOpen(!isResearchFocusOpen);
  };
  const toggleLiteratureReview = () => {
    setIsLiteratureReviewOpen(!isLiteratureReviewOpen);
  };
  // Add toggle functions for the new sections
  const toggleMethods = () => {
    setIsMethodsOpen(!isMethodsOpen);
  };
  const toggleFindingsSection = () => {
    setIsFindingsOpenSection(!isFindingsOpenSection);
  };
  const toggleResources = () => {
    setIsResourcesOpen(!isResourcesOpen);
  };
  const toggleCaseStudies = () => {
    setIsCaseStudiesOpen(!isCaseStudiesOpen);
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.pageTitle}>Investigating GPT for Enhancing Teaching and Learning: User Readiness and Strategies</h1>
      {/* Image Slideshow Section (replacing video) */}
      <div style={styles.videoContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slideshow image ${index + 1}`}
            style={{ 
              width: '100%', 
              height: '450px', 
              objectFit: 'cover',
              display: index === currentImageIndex ? 'block' : 'none',
              transition: 'opacity 0.5s ease-in-out'
            }}
          />
        ))}
        <div 
          style={styles.videoOverlayText} 
          onClick={() => {
            document.getElementById('who-we-are').scrollIntoView({ behavior: 'smooth' });
            setIsWhoWeAreOpen(true);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 61, 124, 0.9)';
            e.currentTarget.style.cursor = 'pointer';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 61, 124, 0.8)';
          }}
        >
          About the project
          <span style={{ 
            display: 'block', 
            fontSize: '0.8rem', 
            fontWeight: 'normal',
            marginTop: '5px',
            textTransform: 'none',
            opacity: 0.9 
          }}>Click to learn more</span>
        </div>
        {/* Add navigation dots */}
        <div style={styles.sliderNavigation}>
          {images.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.sliderDot,
                ...(index === currentImageIndex ? styles.sliderDotActive : {})
              }}
              onClick={() => setCurrentImageIndex(index)}
            ></div>
          ))}
        </div>
        {/* Add navigation arrows */}
        <div
          style={{...styles.sliderArrow, ...styles.sliderArrowLeft}}
          onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))}
        >
          &#10094;
        </div>
        <div
          style={{...styles.sliderArrow, ...styles.sliderArrowRight}}
          onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)}
        >
          &#10095;
        </div>
      </div>

      {/* Who We Are Collapsible Section Box */}
      <div style={styles.collapsibleSectionBox}>
        <h2 id="who-we-are" onClick={toggleWhoWeAre} style={styles.collapsibleHeading}>
          Who we are <span style={{ marginLeft: 'auto' }}>{isWhoWeAreOpen ? '▲' : '▼'}</span>
        </h2>
        {isWhoWeAreOpen && (
          <div style={styles.collapsibleContent}>
            <p>
            We are a research team from the National Institute of

Education at Nanyang Technological University, exploring

the transformative potential of Generative Pre-trained

Transformer (GPT) in higher education. Led by Associate

Professor Quek Choon Lang Gwendoline with the

collaboration of Associate Professor Wang Qiyun, our project

"Investigating GPT for enhancing teaching and learning: User

Readiness and Strategies" examines how AI technologies are

reshaping educational practices.
              <br></br>
              <br></br>
              Our research focuses on understanding instructor and student perceptions of GPT as a pedagogical tool in university teaching and learning. We survey their readiness, ethical concerns, and experiences across diverse disciplines including Humanities, Science, Mathematics, Engineering, Art and Music. By identifying current knowledge application gaps and ethical considerations, we aim to develop practical use cases that support faculty professional development and enhance curriculum resources in the evolving AI landscape.
            </p>
            <p>
              This study surveys the instructor and student perceptions of Generative Pre-trained Transformer (GPT) and its applications in higher education teaching and learning. The findings aim to serve as an input to identify the current knowledge application gaps and the ethical concerns. Three research questions are:
            </p>
            <ul>
              <li>What are the instructors' and students' perceptions of their readiness to use GPT in teaching and learning?</li>
              <li>What are the instructors' and students' ethical concerns of adopting GPT for teaching and learning in NIE and NTU?</li>
              <li>What are the instructors' and students' current reported GPT related practices that pose as (a) threats? and (b) benefits to themselves in the context of teaching and learning?</li>
            </ul>
            <p>
              A modified 31-item AI survey (five-point Likert Scale) will be administered separately to the instructors and students to gain an insight into their perceptions on their AI-readiness, threats, innovations, teaching and learning satisfactions in the university. The modified AI survey was obtained and adapted from Wang, Li, Tan, Yang and Lei (2023). Following the collection of the quantitative and qualitative data from 1000 participants (500 instructors and 500 students). Descriptive statistics and inferential statistics will be calculated to answer the research questions. Qualitative data from the open-ended section of the survey will be coded and developed into use cases. The deliverables will include:
            </p>
          </div>
        )}
      </div>

      {/* Research Focus Collapsible Section Box */}
      <div style={styles.collapsibleSectionBox}>
        <h2 id="research-focus" onClick={toggleResearchFocus} style={styles.collapsibleHeading}>
           Research Focus <span style={{ marginLeft: 'auto' }}>{isResearchFocusOpen ? '▲' : '▼'}</span>
        </h2>
        {isResearchFocusOpen && (
          <div style={styles.collapsibleContent}>
            {/* Add IDs to paragraphs */}
            <h3 id="research-aims">Aims</h3>
            <p>This project explores the instructors' and students' perceptions of GPT as a pedagogical tool in university teaching and learning. The findings aim to clarify the role of GPT in teaching and learning and then use the survey findings as an input to identify the current knowledge application gaps and the ethical concerns. Such ground up findings will be developed into use cases for faculty professional development and for teaching and learning curriculum resources.</p>

            <h3 id="research-problems">Problems</h3>
            <p>Instructors and students are faced with the reality that AI generative tools (also called GPT) will be increasingly present in everyday lives. The fast development of AI models (e.g., GPT-3, GPT-4) have already accomplished learning tasks such as translation, solving mathematics problems, generate stories and coding. However, currently, as instructors explore the applications of AI tools in education, there has yet to have a widely unified guideline articulated regarding the use of AI generative tools in student assessment. In the current landscape, the instructors' rationale for using AI tools for effective teaching and students' use of AI tools for meaningful learning have yet to be articulated clearly.</p>

            <p>By Investigation the perceptions of both instructors and students, the administrators can support the instructors and students in charting the professional development needs and learning needs for the instructors and students respectively in the current AI landscape. The perceptual information, the cases faced in integrating AI tools into teaching would serve as useful resources for faculty professional development (PD) and student learning. For example,</p>
            <ul>
              <li>conduct PD for faculty (only those who need) to develop their repertoire of using GPT in their classes.</li>
              <li>infuse appropriate GPT use (AI tools) through discussion forum in lesson designs</li>
            </ul>

            <h3 id="research-questions">Research Questions</h3>
            <ul>
              <li>What are the instructors' and students' perceptions of their readiness to use GPT in teaching and learning?</li>
              <li>What are the instructors' and students' ethical concerns for adopting GPT in NTU and NIE?</li>
              <li>What are the instructors' and students' reported cases of using GPT that pose as (a) threats? (b) benefits to their teaching and learning?</li>
            </ul>
          </div>
        )}
      </div>

      {/* Literature Review Collapsible Section Box */}
      <div style={styles.collapsibleSectionBox}>
        <h2 id="literature-review" onClick={toggleLiteratureReview} style={styles.collapsibleHeading}>
           Literature Review <span style={{ marginLeft: 'auto' }}>{isLiteratureReviewOpen ? '▲' : '▼'}</span>
        </h2>
        {isLiteratureReviewOpen && (
          <div style={styles.collapsibleContent}>
            {/* Add IDs to h3 headings */}
            <h3 id="lit-rq1">RQ1: Readiness</h3>
            <p>Research reveals varying levels of readiness among faculty and students regarding GPT adoption. Studies by Sanders & Mukhari (2024) highlight that successful integration requires robust institutional support, training opportunities, and reliable infrastructure. Demographic factors, teaching modalities, generational differences, and cross-cultural backgrounds significantly influence attitudes toward AI adoption. Wang et al. (2023) emphasize that AI readiness is distinct from general technological competence and requires specific preparation.</p>
            
            <h3 id="lit-rq2">RQ2: Ethics</h3>
            <p>Studies identify diverse ethical concerns across academic disciplines. Perkins (2023) and Dehouche (2021) highlight risks of undetectable AI-generated plagiarism. Research by Chan (2023) and Kooli (2023) emphasizes the need for comprehensive ethical frameworks addressing data privacy, bias, transparency, and over-reliance. Both Miljkovic Krecar et al. (2024) and Biagini et al. (2024) reveal concerning gaps in AI literacy, with professors struggling to distinguish AI-generated content and students showing overconfidence despite limited AI knowledge.</p>
            
            <h3 id="lit-rq3">RQ3: Practices</h3>
            <p>Recent literature documents innovative educational applications alongside implementation challenges. Sonderegger (2022) demonstrated enhanced interactive learning through social robots with LLMs, while Bonner et al. (2023) highlighted language education applications. Frameworks like Su & Yang's (2023) "IDEE" model guide implementation. Pedagogical innovations include Dai's (2024) dual-contrast pedagogy for AI literacy and Van den Berg & du Plessis's (2023) approach to democratizing lesson planning. Implementation challenges documented by Perkins (2023) and Van Wyk (2024) emphasize the need for clear policies, ethical guidelines, and AI-resilient assessments.</p>
            
            <div style={{marginTop: '20px', textAlign: 'center'}}>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: '#003d7c',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `${process.env.PUBLIC_URL}/literature-review.html`;
                }}
              >
                Explore Complete Literature Review
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Methods Collapsible Section Box */}
      <div style={styles.collapsibleSectionBox}>
        <h2 id="methods" onClick={toggleMethods} style={styles.collapsibleHeading}>
           Methods <span style={{ marginLeft: 'auto' }}>{isMethodsOpen ? '▲' : '▼'}</span>
        </h2>
        {isMethodsOpen && (
          <div style={styles.collapsibleContent}>
            <h3 id="research-design">Research Design and Data Collection</h3>
            <ul>
              <li>A modified 31-item AI survey (five-point Likert Scale) administered to instructors and students</li>
              <li>Survey adapted from Wang, Li, Tan, Yang and Lei (2023)</li>
            </ul>

            <h3 id="participants">Participants</h3>
            <ul>
              <li>Initial invitation: 500 students and 500 instructors</li>
              <li>Final participation after screening: 
                <ul>
                  <li>480 students</li>
                  <li>128 instructors</li>
                </ul>
              </li>
            </ul>

            <h3 id="data-analysis">Data Analysis</h3>
            <ul>
              <li>Quantitative Analysis:
                <ul>
                  <li>Using SPSS (V28)</li>
                  <li>Descriptive statistics (mean, standard deviation)</li>
                  <li>Inferential statistics (t-test, correlation and multiple regression)</li>
                </ul>
              </li>
              <li>Qualitative Analysis:
                <ul>
                  <li>Analysis of open-ended survey responses</li>
                  <li>Coding and development of use cases</li>
                </ul>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Findings Collapsible Section Box - Note: ID added for potential future linking */}
      <div style={styles.collapsibleSectionBox}>
        <h2 id="findings" onClick={toggleFindingsSection} style={styles.collapsibleHeading}>
           Findings <span style={{ marginLeft: 'auto' }}>{isFindingsOpenSection ? '▲' : '▼'}</span>
        </h2>
        {isFindingsOpenSection && (
          <div style={styles.collapsibleContent}>
            <h3 id="quantitative">Quantitative Findings Overview</h3>
            <p>Our quantitative analysis involved surveys with <strong>128 instructors</strong> and <strong>496 students</strong>. Key dimensions explored include Cognition, Ability, Vision, Ethics, Perceived Threats, and AI-Enhanced Innovation, all rated on a 1-5 scale.</p>
            
            <div style={{ marginTop: '15px', marginBottom: '20px' }}>
              <h4>Instructors (N=128)</h4>
              <ul>
                <li><strong>Average Scores:</strong> Cognition (M=3.46), Ability (M=3.06), Vision (M=3.69), Ethics (M=3.72), Perceived Threats (M=2.96), AI-Enhanced Innovation (M=3.46).</li>
                <li><strong>Correlations:</strong> Strong positive links between Cognition, Ability, and Vision. Perceived Threats generally correlated negatively with other readiness dimensions.</li>
                <li><strong>Factor Analysis:</strong> Suggested a two-factor structure for readiness: general AI readiness and threat perception.</li>
                <li><strong>Institutional Comparison (Ethics):</strong> All NTU and NIE lecturers showed high ethical awareness (M=3.72).</li>
              </ul>
            </div>
            
            <div style={{ marginTop: '15px', marginBottom: '20px' }}>
              <h4>Students (N=496)</h4>
              <ul>
                <li><strong>Average Scores:</strong> Cognition (M=3.48), Ability (M=3.47), Vision (M=3.58), Ethics (M=3.70), Perceived Threats (M=3.28), AI-Enhanced Innovation (M=3.69).</li>
                <li><strong>Correlations:</strong> Generally stronger correlations between dimensions compared to instructors. Perceived Threats also showed negative correlations.</li>
                <li><strong>Factor Analysis:</strong> Indicated a more complex, potentially 7-dimension structure, with a strong general AI readiness factor.</li>
                <li><strong>Institutional Comparison (Ethics):</strong> All NTU and NIE students showed high ethical awareness (M=3.70).</li>
              </ul>
            </div>

            <h3 id="qualitative">Qualitative Findings Overview</h3>
            <p>Thematic analysis of open-ended responses provided deeper insights into user experiences and perspectives.</p>
            
            <div style={{ marginTop: '15px', marginBottom: '20px' }}>
              <h4>Instructors</h4>
              <ul>
                <li><strong>Cognition & Ability:</strong> Moderately knowledgeable, grasping AI's importance but often seeking more training for practical application and pedagogical redesign.</li>
                <li><strong>Vision & Innovation:</strong> Positive outlook on AI's future role, though personal ideation for new AI uses is less developed. Innovation is often grassroots.</li>
                <li><strong>Ethics & Threats:</strong> High awareness of ethical principles (especially data privacy), but less certainty in applying them. Concerns exist about cognitive/relational erosion due to AI, rather than job displacement.</li>
              </ul>
            </div>
            
            <div style={{ marginTop: '15px', marginBottom: '20px' }}>
              <h4>Students</h4>
              <ul>
                <li><strong>Cognition & Ability:</strong> Actively use AI for learning tasks (info retrieval, brainstorming). Confident in using AI feedback but seek to improve skill transfer and collaborative AI use.</li>
                <li><strong>Vision & Innovation:</strong> See AI as a long-term learning companion, especially for content comprehension and lifelong growth. Less clear on AI's role in boosting higher-order thinking.</li>
                <li><strong>Ethics & Threats:</strong> Intuitive sense of right/wrong regarding plagiarism and privacy. Desire clearer guidelines for nuanced ethical situations. Main perceived threat is AI dulling critical thinking.</li>
              </ul>
            </div>

            {/* Add dedicated findings page link */}
            <div style={{ 
              textAlign: 'center', 
              margin: '30px 0 10px 0', 
              padding: '15px', 
              backgroundColor: '#f0f7ff', 
              borderRadius: '8px',
              border: '1px solid #c9d9ec'
            }}>
              <h3 style={{ color: '#003d7c', margin: '0 0 10px 0' }}>Detailed Findings Available</h3>
              <p>Explore comprehensive data, visualizations, and analysis on our dedicated findings page, complete with an interactive chatbot assistant.</p>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: '#003d7c',
                  color: 'white',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  marginTop: '10px',
                  fontWeight: 'bold'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `${process.env.PUBLIC_URL}/findings.html`;
                }}
              >
                Explore Complete Findings
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Case Studies Collapsible Section Box */}
      <div style={styles.collapsibleSectionBox}>
        <h2 id="case-studies" onClick={toggleCaseStudies} style={styles.collapsibleHeading}>
           Case Studies <span style={{ marginLeft: 'auto' }}>{isCaseStudiesOpen ? '▲' : '▼'}</span>
        </h2>
        {isCaseStudiesOpen && (
          <div style={styles.collapsibleContent}>
            <p>Explore our collection of case studies showcasing how AI is being used in teaching and learning contexts.</p>
            
            <div style={{ 
              textAlign: 'center', 
              margin: '20px 0', 
              padding: '15px', 
              backgroundColor: '#f0f7ff', 
              borderRadius: '8px',
              border: '1px solid #c9d9ec'
            }}>
              <h3 style={{ color: '#003d7c', margin: '0 0 10px 0' }}>Dedicated Case Studies Page Now Available</h3>
              <p>We've created a dedicated page for all our case studies with improved browsing experience and visualization.</p>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: '#003d7c',
                  color: 'white',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  marginTop: '10px',
                  fontWeight: 'bold'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `${process.env.PUBLIC_URL}/case-studies.html`;
                }}
              >
                Visit Full Case Studies Page
              </a>
            </div>
            
            <div id="browse-cases">
              <h3>Featured Case Studies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '20px' }}>
                {caseStudies.slice(0, 4).map(caseStudy => (
                  <div key={caseStudy.id} style={{ 
                    width: 'calc(25% - 15px)', 
                    minWidth: '250px',
                    border: '1px solid #ddd', 
                    borderRadius: '8px',
                    padding: '15px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    backgroundColor: '#f9f9f9',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onClick={() => {
                    // Open case study detail in a modal or expand in place
                    const caseElement = document.getElementById(`case-${caseStudy.id}`);
                    if (caseElement) {
                      const allCases = document.querySelectorAll('[id^="case-"]');
                      allCases.forEach(el => {
                        if (el.id !== `case-${caseStudy.id}`) {
                          el.style.display = 'none';
                        }
                      });
                      caseElement.style.display = 'block';
                      caseElement.scrollIntoView({ behavior: 'smooth' });
                      
                      // Initialize word cloud if this case study has one
                      if (caseStudy.hasWordCloud) {
                        setTimeout(() => {
                          createWordCloudViewer(`wordcloud-container-${caseStudy.id}`);
                        }, 500);
                      }
                      
                      // Trigger chatbot interaction after viewing a case
                      setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('pageNavigated', { 
                          detail: { 
                            section: `case-study-${caseStudy.id}`,
                            caseTitle: caseStudy.title
                          } 
                        }));
                      }, 30000); // Show after 30 seconds of reading
                    }
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <h4 style={{ color: '#003d7c', marginTop: 0 }}>{caseStudy.title}</h4>
                    <div style={{ 
                      display: 'inline-block',
                      backgroundColor: caseStudy.category === 'Teaching' ? '#e6f7ff' : 
                                      caseStudy.category === 'Learning' ? '#f6ffed' :
                                      caseStudy.category === 'Assessment' ? '#fff7e6' :
                                      caseStudy.category === 'Ethics' ? '#fff1f0' :
                                      caseStudy.category === 'Research' ? '#f9f0ff' : '#e6fffb',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8em',
                      marginBottom: '10px'
                    }}>
                      {caseStudy.category}
                    </div>
                    <p style={{ color: '#555', flex: 1 }}>{caseStudy.summary}</p>
                    <div style={{ 
                      marginTop: '10px', 
                      textAlign: 'right',
                      color: '#003d7c',
                      fontWeight: 'bold',
                      fontSize: '0.9em'
                    }}>
                      Read Case Study →
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <button 
                style={{
                  backgroundColor: '#003d7c',
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  margin: '0 auto'
                }}
                onClick={() => {
                  const randomCaseId = Math.floor(Math.random() * caseStudies.length) + 1;
                  const caseElement = document.getElementById(`case-${randomCaseId}`);
                  if (caseElement) {
                    const allCases = document.querySelectorAll('[id^="case-"]');
                    allCases.forEach(el => {
                      if (el.id !== `case-${randomCaseId}`) {
                        el.style.display = 'none';
                      }
                    });
                    caseElement.style.display = 'block';
                    caseElement.scrollIntoView({ behavior: 'smooth' });
                    
                    // Initialize word cloud if this case study has one
                    if (caseStudies[randomCaseId-1].hasWordCloud) {
                      setTimeout(() => {
                        createWordCloudViewer(`wordcloud-container-${randomCaseId}`);
                      }, 500);
                    }
                    
                    // Trigger chatbot interaction after viewing a case
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent('pageNavigated', { 
                        detail: { 
                          section: `case-study-${randomCaseId}`,
                          caseTitle: caseStudies[randomCaseId-1].title
                        } 
                      }));
                    }, 30000); // Show after 30 seconds of reading
                  }
                }}
              >
                <span>Random Case Study</span>
                <span style={{ fontSize: '1.2em' }}>🎲</span>
              </button>
            </div>

            {/* Case Study Detail Views (Hidden by Default) */}
            {caseStudies.map(caseStudy => (
              <div 
                key={`case-${caseStudy.id}`} 
                id={`case-${caseStudy.id}`} 
                style={{ 
                  display: 'none', 
                  marginTop: '30px',
                  backgroundColor: 'white',
                  padding: '20px',
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <button 
                    onClick={() => {
                      const allCases = document.querySelectorAll('[id^="case-"]');
                      allCases.forEach(el => el.style.display = 'none');
                      document.getElementById('browse-cases').scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#003d7c',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px'
                    }}
                  >
                    ← Back to All Cases
                  </button>
                  <div style={{ 
                    display: 'inline-block',
                    backgroundColor: caseStudy.category === 'Teaching' ? '#e6f7ff' : 
                                    caseStudy.category === 'Learning' ? '#f6ffed' :
                                    caseStudy.category === 'Assessment' ? '#fff7e6' :
                                    caseStudy.category === 'Ethics' ? '#fff1f0' :
                                    caseStudy.category === 'Research' ? '#f9f0ff' : '#e6fffb',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8em'
                  }}>
                    {caseStudy.category}
                  </div>
                </div>
                <h3 style={{ color: '#003d7c', marginBottom: '20px' }}>{caseStudy.title}</h3>
                <p style={{ fontSize: '1.1em', fontWeight: 'bold', color: '#444' }}>{caseStudy.summary}</p>
                <div style={{ 
                  backgroundColor: '#f9f9f9', 
                  padding: '15px', 
                  borderRadius: '8px',
                  marginTop: '15px',
                  lineHeight: '1.6'
                }}>
                  {caseStudy.content}
                </div>
                
                {/* Word Cloud Visualization - Only for Case Study 1 */}
                {caseStudy.hasWordCloud && (
                  <div id={`wordcloud-container-${caseStudy.id}`} style={{ marginTop: '30px' }}></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resources Collapsible Section Box */}
      <div style={styles.collapsibleSectionBox}>
        <h2 id="resources" onClick={toggleResources} style={styles.collapsibleHeading}>
           Resources <span style={{ marginLeft: 'auto' }}>{isResourcesOpen ? '▲' : '▼'}</span>
        </h2>
        {isResourcesOpen && (
          <div style={styles.collapsibleContent}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Left column - Tools for Teaching */}
              <div>
                <h3 id="instructor-tools" style={{ color: '#003d7c', borderBottom: '2px solid #003d7c', paddingBottom: '8px' }}>Tools for Teaching</h3>
                <ul>
                  <li><strong>Copilot</strong> - For course material development</li>
                  <li><a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer"><strong>ChatGPT</strong></a> - For creating assessments and activities</li>
                  <li><strong>School AI</strong> - For personalized instruction</li>
                  <li><strong>TeacherGAIA</strong> - For personalized learning design</li>
                </ul>
                
                <h3 id="ai-assessment" style={{ color: '#003d7c', borderBottom: '1px solid #003d7c', paddingBottom: '5px', marginTop: '20px' }}>AI for Assessment</h3>
                <ul>
                  <li><strong>Gradescope</strong> - Automated grading assistant</li>
                  <li><strong>Turnitin</strong> - AI writing detection</li>
                  <li><strong>Feedback Studio</strong> - Assessment feedback generation</li>
                </ul>
                
                <h3 id="teaching-activities" style={{ color: '#003d7c', borderBottom: '1px solid #003d7c', paddingBottom: '5px', marginTop: '20px' }}>Teaching Activities</h3>
                <ul>
                  <li><strong>Prompt engineering exercises</strong></li>
                  <li><strong>Collaborative AI projects</strong></li>
                  <li><strong>AI-enhanced lesson plans</strong></li>
                </ul>
              </div>
              
              {/* Right column - Tools for Learning */}
              <div>
                <h3 id="student-tools" style={{ color: '#e74c3c', borderBottom: '2px solid #e74c3c', paddingBottom: '8px' }}>Tools for Learning</h3>
                <ul>
                  <li><strong>Gemini</strong> - For brainstorming and research</li>
                  <li><strong>Claude</strong> - For essay feedback and refinement</li>
                  <li><strong>Perplexity.ai</strong> - For in-depth research with citations</li>
                  <li><strong>Grammarly</strong> - For writing improvement</li>
                  <li><strong>Edpuzzle</strong> - For interactive video learning</li>
                  <li><strong>Google NotebookLM</strong> - For organizing research notes</li>
                </ul>
                
                <h3 id="learning-ai" style={{ color: '#e74c3c', borderBottom: '1px solid #e74c3c', paddingBottom: '5px', marginTop: '20px' }}>Learning with AI</h3>
                <ul>
                  <li><strong>Study companions</strong> - AI tutors for personalized learning</li>
                  <li><strong>Explanation tools</strong> - For breaking down complex concepts</li>
                  <li><strong>Practice generators</strong> - For creating custom exercises</li>
                </ul>
                
                <h3 id="student-research" style={{ color: '#e74c3c', borderBottom: '1px solid #e74c3c', paddingBottom: '5px', marginTop: '20px' }}>Research Materials</h3>
                <ul>
                  <li><strong>Citation generators</strong> - For academic references</li>
                  <li><strong>Literature summarizers</strong> - For research papers</li>
                  <li><strong>Data visualization tools</strong> - For presenting findings</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

// Footer Component
const Footer = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const toggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerLinks}>
        <a href="#contact" style={styles.footerLink}>Contact Us</a>
        <a href="#careers" style={styles.footerLink}>Careers</a>
        <a href="#privacy" style={styles.footerLink}>Privacy Statement</a>
        <a onClick={toggleAdminPanel} style={{...styles.footerLink, cursor: 'pointer'}}>Admin</a>
      </div>
      <div>© {new Date().getFullYear()} NIE_AI4Edx</div>
      
      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}
    </footer>
  );
};

// Admin Panel Component to view stored data
const AdminPanel = ({ onClose }) => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('sessions');
  const [backupSettings, setBackupSettings] = useState(UserExperienceDB.getBackupSettings());
  const [showBackupSettings, setShowBackupSettings] = useState(false);
  const [showServerSettings, setShowServerSettings] = useState(false);
  const [storageMode, setStorageMode] = useState(UserExperienceDB.getStorageMode());
  const [serverStatus, setServerStatus] = useState('unknown');
  const [autoDownloadSessions, setAutoDownloadSessions] = useState(
    localStorage.getItem('ntu_auto_download_sessions') === 'true'
  );
  const fileInputRef = React.useRef(null);
  
  useEffect(() => {
    // Load data when panel opens
    const loadData = async () => {
      const allData = await UserExperienceDB.getAllData();
      setData(allData);
    };
    
    loadData();
    
    // Check server status
    const checkServer = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data-files', { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
          setServerStatus('online');
        } else {
          setServerStatus('error');
        }
      } catch (error) {
        setServerStatus('offline');
      }
    };
    
    checkServer();
  }, []);
  
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all stored data? This cannot be undone.')) {
      UserExperienceDB.clearAllData().then(() => {
        setData(UserExperienceDB.getAllData());
      });
    }
  };
  
  const handleExportData = () => {
    UserExperienceDB.exportToFile();
  };
  
  const handleImportData = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const success = UserExperienceDB.importFromFile(content);
      
      if (success) {
        alert('Data imported successfully');
        UserExperienceDB.getAllData().then(setData);
      } else {
        alert('Failed to import data. Please check file format.');
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = null;
  };
  
  const handleBackupSettingsChange = (setting, value) => {
    const newSettings = { ...backupSettings, [setting]: value };
    setBackupSettings(newSettings);
    UserExperienceDB.setBackupSettings(newSettings);
  };
  
  const handleStorageModeChange = (mode) => {
    UserExperienceDB.setStorageMode(mode);
    setStorageMode(mode);
  };
  
  const handleAutoDownloadChange = (checked) => {
    setAutoDownloadSessions(checked);
    localStorage.setItem('ntu_auto_download_sessions', checked.toString());
  };
  
  const renderDataTable = () => {
    if (!data) return <div>Loading data...</div>;
    
    const tabData = data[activeTab] || [];
    
    if (tabData.length === 0) {
      return <div style={{ padding: '20px', textAlign: 'center' }}>No data available for this category</div>;
    }
    
    // Determine columns from the first item
    const columns = tabData.length > 0 ? Object.keys(tabData[0]).filter(key => key !== 'storedAt') : [];
    
    return (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column} style={{ 
                  padding: '8px', 
                  textAlign: 'left', 
                  borderBottom: '2px solid #ddd',
                  backgroundColor: '#f5f5f5'
                }}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tabData.map((item, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                {columns.map(column => (
                  <td key={`${index}-${column}`} style={{ 
                    padding: '8px', 
                    textAlign: 'left',
                    borderBottom: '1px solid #ddd',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {typeof item[column] === 'object' ? 
                      JSON.stringify(item[column]).substring(0, 50) + '...' : 
                      String(item[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      maxWidth: '1000px',
      maxHeight: '80vh',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 5px 25px rgba(0,0,0,0.25)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '15px 20px',
        borderBottom: '1px solid #eaeaea',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#003d7c',
        color: 'white'
      }}>
        <h2 style={{ margin: 0 }}>User Experience Data</h2>
        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          fontSize: '1.5em',
          cursor: 'pointer',
          color: 'white'
        }}>×</button>
      </div>
      
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #eaeaea',
        backgroundColor: '#f5f5f5'
      }}>
        {['sessions', 'feedback', 'navigation', 'conversations'].map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setShowBackupSettings(false);
              setShowServerSettings(false);
            }}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: activeTab === tab && !showBackupSettings && !showServerSettings ? 'white' : 'transparent',
              cursor: 'pointer',
              fontWeight: activeTab === tab && !showBackupSettings && !showServerSettings ? 'bold' : 'normal',
              borderBottom: activeTab === tab && !showBackupSettings && !showServerSettings ? '2px solid #003d7c' : 'none'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        <button
          onClick={() => {
            setShowBackupSettings(true);
            setShowServerSettings(false);
          }}
          style={{
            padding: '12px 20px',
            border: 'none',
            background: showBackupSettings ? 'white' : 'transparent',
            cursor: 'pointer',
            fontWeight: showBackupSettings ? 'bold' : 'normal',
            borderBottom: showBackupSettings ? '2px solid #003d7c' : 'none'
          }}
        >
          Backup Settings
        </button>
        <button
          onClick={() => {
            setShowServerSettings(true);
            setShowBackupSettings(false);
          }}
          style={{
            padding: '12px 20px',
            border: 'none',
            background: showServerSettings ? 'white' : 'transparent',
            cursor: 'pointer',
            fontWeight: showServerSettings ? 'bold' : 'normal',
            borderBottom: showServerSettings ? '2px solid #003d7c' : 'none',
            marginLeft: 'auto'
          }}
        >
          Server Settings
        </button>
      </div>
      
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {showServerSettings ? (
          <div style={{ padding: '20px' }}>
            <h3>Server Storage Settings</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ 
                padding: '10px', 
                backgroundColor: serverStatus === 'online' ? '#d4edda' : 
                                  serverStatus === 'offline' ? '#f8d7da' : '#fff3cd',
                borderRadius: '4px',
                marginBottom: '15px'
              }}>
                <strong>Server Status: </strong>
                {serverStatus === 'online' ? 'Online' : 
                 serverStatus === 'offline' ? 'Offline' : 'Unknown'}
                 
                {serverStatus !== 'online' && (
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>
                    To enable server storage, start the Node.js server by running:
                    <br />
                    <code>node src/server-data-handler.js</code>
                  </p>
                )}
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '10px' }}>
                  Data Storage Location:
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleStorageModeChange('local')}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: storageMode === 'local' ? '#003d7c' : '#f0f0f0',
                      color: storageMode === 'local' ? 'white' : '#333',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Browser Storage
                  </button>
                  <button
                    onClick={() => handleStorageModeChange('server')}
                    disabled={serverStatus !== 'online'}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: storageMode === 'server' ? '#003d7c' : '#f0f0f0',
                      color: storageMode === 'server' ? 'white' : '#333',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: serverStatus === 'online' ? 'pointer' : 'not-allowed',
                      opacity: serverStatus === 'online' ? 1 : 0.6
                    }}
                  >
                    Server Storage
                  </button>
                </div>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <h4>Storage Location Information</h4>
                <p><strong>Browser Storage:</strong> Data is saved in your browser's localStorage and will persist until cleared. Data can be exported to JSON files.</p>
                <p><strong>Server Storage:</strong> Data is saved directly to JSON files in the server's data directory at: <code>/Users/yiruixu/ntu-webpage/ntu-clone/data/</code></p>
              </div>
            </div>
            
            <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
              <h4>Session Data Settings</h4>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  <input 
                    type="checkbox" 
                    checked={autoDownloadSessions}
                    onChange={(e) => handleAutoDownloadChange(e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  自动下载评分时的会话数据
                </label>
                <p style={{ margin: '5px 0 0 24px', color: '#666', fontSize: '0.9em' }}>
                  启用后，当用户提交评分时会自动下载完整会话数据
                </p>
              </div>
            </div>
          </div>
        ) : showBackupSettings ? (
          <div style={{ padding: '20px' }}>
            <h3>Local File Backup Settings</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                <input 
                  type="checkbox" 
                  checked={backupSettings.autoBackup}
                  onChange={(e) => handleBackupSettingsChange('autoBackup', e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Automatically backup data to local file
              </label>
              <p style={{ margin: '5px 0 0 24px', color: '#666', fontSize: '0.9em' }}>
                Enables periodic saving of user experience data to your computer
              </p>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Backup threshold (number of new records):
              </label>
              <input 
                type="number" 
                value={backupSettings.backupThreshold}
                onChange={(e) => handleBackupSettingsChange('backupThreshold', parseInt(e.target.value) || 20)}
                min="1"
                style={{ 
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  width: '100px'
                }}
              />
              <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.9em' }}>
                Automatically export data after this many new records are collected
              </p>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <button
                onClick={() => UserExperienceDB.exportToFile()}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#003d7c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Backup Now
              </button>
              
              <p style={{ margin: '10px 0 0 0', color: '#666', fontSize: '0.9em' }}>
                Last backup: {backupSettings.lastBackup ? new Date(backupSettings.lastBackup).toLocaleString() : 'Never'}
              </p>
            </div>
          </div>
        ) : (
          renderDataTable()
        )}
      </div>
      
      <div style={{
        padding: '15px',
        borderTop: '1px solid #eaeaea',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5'
      }}>
        <div>
          <strong>Total Records:</strong> {data ? data[activeTab]?.length || 0 : 0}
          {storageMode === 'server' && serverStatus === 'online' && (
            <span style={{ marginLeft: '15px', color: '#28a745' }}>● Server Connected</span>
          )}
          {storageMode === 'server' && serverStatus !== 'online' && (
            <span style={{ marginLeft: '15px', color: '#dc3545' }}>● Server Offline</span>
          )}
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".json"
            onChange={handleFileChange}
          />
          <button
            onClick={handleImportData}
            style={{
              padding: '8px 16px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Import Data
          </button>
          <button
            onClick={handleExportData}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Export Data
          </button>
          <button
            onClick={handleClearData}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Data
          </button>
        </div>
      </div>
    </div>
  );
};

// Floating Action Button Component
const FloatingButton = ({ onClick }) => (
  <div
    style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '65px',
      height: '65px',
      backgroundColor: '#0056b3',
      backgroundImage: 'linear-gradient(135deg, #003d7c 0%, #0056b3 100%)',
      color: 'white',
      borderRadius: '50%',
      border: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '28px',
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
      zIndex: 100,
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}
    onClick={onClick}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.25)';
    }}
    title="Open Chat Assistant"
    aria-label="Open chat assistant"
  >
    💬
  </div>
);

// Database service for storing user experience
const UserExperienceDB = {
  // Storage mode - 'local' or 'server'
  _storageMode: localStorage.getItem('ntu_storage_mode') || 'local',
  
  // Set storage mode
  setStorageMode: (mode) => {
    if (mode !== 'local' && mode !== 'server') {
      console.error('Invalid storage mode. Must be "local" or "server"');
      return false;
    }
    
    UserExperienceDB._storageMode = mode;
    localStorage.setItem('ntu_storage_mode', mode);
    console.log(`Storage mode set to: ${mode}`);
    return true;
  },
  
  // Get current storage mode
  getStorageMode: () => {
    return UserExperienceDB._storageMode;
  },
  
  // Helper methods for localStorage
  _getStoredData: (key) => {
    try {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return [];
    }
  },
  
  _storeData: (key, data) => {
    try {
      // Get existing data
      const existingData = UserExperienceDB._getStoredData(key);
      // Add new data
      existingData.push({...data, storedAt: new Date().toISOString()});
      // Store updated array
      localStorage.setItem(key, JSON.stringify(existingData));
      
      // Check if auto-backup is enabled
      const backupSettings = localStorage.getItem('ntu_backup_settings');
      if (backupSettings) {
        const { autoBackup, backupThreshold } = JSON.parse(backupSettings);
        if (autoBackup && existingData.length >= backupThreshold) {
          UserExperienceDB.exportToFile();
          
          // Update last backup timestamp
          const updatedSettings = JSON.parse(backupSettings);
          updatedSettings.lastBackup = new Date().toISOString();
          localStorage.setItem('ntu_backup_settings', JSON.stringify(updatedSettings));
        }
      }
      
      return true;
    } catch (error) {
      console.error(`Error storing ${key} in localStorage:`, error);
      return false;
    }
  },
  
  // Server API methods
  _sendToServer: async (endpoint, data) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      return await response.json();
    } catch (error) {
      console.error(`Error sending data to server (${endpoint}):`, error);
      
      // Fallback to localStorage if server is unavailable
      console.log('Falling back to localStorage for storage');
      UserExperienceDB.setStorageMode('local');
      
      return { success: false, error: error.message };
    }
  },
  
  // Store user feedback
  storeUserFeedback: async (feedbackData) => {
    try {
      console.log('Storing user feedback:', feedbackData);
      
      if (UserExperienceDB._storageMode === 'server') {
        // Send to server
        return await UserExperienceDB._sendToServer('save-data', {
          dataType: 'feedback',
          data: feedbackData
        });
      } else {
        // Store in localStorage
        UserExperienceDB._storeData('ntu_user_feedback', feedbackData);
        return { success: true, id: `feedback_${Date.now()}` };
      }
    } catch (error) {
      console.error('Error storing user feedback:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Log navigation events
  logNavigation: async (navigationData) => {
    try {
      console.log('Logging user navigation:', navigationData);
      
      if (UserExperienceDB._storageMode === 'server') {
        // Send to server
        return await UserExperienceDB._sendToServer('save-data', {
          dataType: 'navigation',
          data: navigationData
        });
      } else {
        // Store in localStorage
        UserExperienceDB._storeData('ntu_navigation_logs', navigationData);
        return { success: true, id: `nav_${Date.now()}` };
      }
    } catch (error) {
      console.error('Error logging navigation:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Store conversation messages
  storeConversation: async (conversationData) => {
    try {
      console.log('Storing chat conversation:', conversationData);
      
      if (UserExperienceDB._storageMode === 'server') {
        // Send to server
        return await UserExperienceDB._sendToServer('save-data', {
          dataType: 'conversation',
          data: conversationData
        });
      } else {
        // Store in localStorage
        UserExperienceDB._storeData('ntu_conversations', conversationData);
        return { success: true, id: `conv_${Date.now()}` };
      }
    } catch (error) {
      console.error('Error storing conversation:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Store session data
  storeSession: async (sessionData) => {
    try {
      console.log('Storing user session data:', sessionData);
      
      if (UserExperienceDB._storageMode === 'server') {
        // Send to server
        return await UserExperienceDB._sendToServer('save-data', {
          dataType: 'session',
          data: sessionData
        });
      } else {
        // Check if this is an update to an existing session
        if (sessionData.endTime) {
          // This is session end data - update the existing session
          const sessions = UserExperienceDB._getStoredData('ntu_sessions');
          const sessionIndex = sessions.findIndex(s => s.sessionId === sessionData.sessionId);
          
          if (sessionIndex >= 0) {
            // Update existing session
            sessions[sessionIndex] = {...sessions[sessionIndex], ...sessionData, updatedAt: new Date().toISOString()};
            localStorage.setItem('ntu_sessions', JSON.stringify(sessions));
          } else {
            // Store as new if not found
            UserExperienceDB._storeData('ntu_sessions', sessionData);
          }
        } else {
          // New session - store as new
          UserExperienceDB._storeData('ntu_sessions', sessionData);
        }
        
        return { success: true, id: sessionData.sessionId || `session_${Date.now()}` };
      }
    } catch (error) {
      console.error('Error storing session data:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Get all stored data (useful for debugging or exporting)
  getAllData: async () => {
    try {
      if (UserExperienceDB._storageMode === 'server') {
        // Get from server
        try {
          const response = await fetch('http://localhost:3001/api/data-files');
          const fileList = await response.json();
          
          if (!fileList.success) {
            throw new Error('Failed to get file list from server');
          }
          
          // Get data from each file
          const data = {
            sessions: [],
            feedback: [],
            navigation: [],
            conversations: []
          };
          
          for (const file of fileList.files) {
            const fileResponse = await fetch(`http://localhost:3001/api/data-files/${file.filename}`);
            const fileData = await fileResponse.json();
            
            if (fileData.success) {
              if (file.filename.startsWith('session_')) {
                data.sessions.push(fileData.data);
              } else if (file.filename.startsWith('feedback_')) {
                data.feedback.push(fileData.data);
              } else if (file.filename.startsWith('navigation_')) {
                data.navigation.push(fileData.data);
              } else if (file.filename.startsWith('conversation_')) {
                data.conversations.push(fileData.data);
              }
            }
          }
          
          return data;
        } catch (error) {
          console.error('Error getting data from server:', error);
          console.log('Falling back to localStorage for data retrieval');
          UserExperienceDB.setStorageMode('local');
          
          // Fallback to localStorage
          return {
            sessions: UserExperienceDB._getStoredData('ntu_sessions'),
            feedback: UserExperienceDB._getStoredData('ntu_user_feedback'),
            navigation: UserExperienceDB._getStoredData('ntu_navigation_logs'),
            conversations: UserExperienceDB._getStoredData('ntu_conversations')
          };
        }
      } else {
        // Get from localStorage
        return {
          sessions: UserExperienceDB._getStoredData('ntu_sessions'),
          feedback: UserExperienceDB._getStoredData('ntu_user_feedback'),
          navigation: UserExperienceDB._getStoredData('ntu_navigation_logs'),
          conversations: UserExperienceDB._getStoredData('ntu_conversations')
        };
      }
    } catch (error) {
      console.error('Error retrieving all data:', error);
      return null;
    }
  },
  
  // Clear all stored data (for privacy or debugging)
  clearAllData: async () => {
    try {
      if (UserExperienceDB._storageMode === 'server') {
        // Clear from server
        try {
          const response = await fetch('http://localhost:3001/api/clear-data', {
            method: 'POST'
          });
          return (await response.json()).success;
        } catch (error) {
          console.error('Error clearing data from server:', error);
          return false;
        }
      } else {
        // Clear from localStorage
        localStorage.removeItem('ntu_sessions');
        localStorage.removeItem('ntu_user_feedback');
        localStorage.removeItem('ntu_navigation_logs');
        localStorage.removeItem('ntu_conversations');
        return true;
      }
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  },
  
  // Export data to file
  exportToFile: (filename) => {
    try {
      const getAllDataPromise = UserExperienceDB.getAllData();
      
      getAllDataPromise.then(allData => {
        const dataStr = JSON.stringify(allData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        // Create filename with timestamp if not provided
        const defaultFilename = `ntu-user-experience-data-${new Date().toISOString().split('T')[0]}.json`;
        
        // Create download link and trigger click
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || defaultFilename;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      });
      
      return true;
    } catch (error) {
      console.error('Error exporting data to file:', error);
      return false;
    }
  },
  
  // Import data from file
  importFromFile: (fileContent) => {
    try {
      const data = JSON.parse(fileContent);
      
      // Validate data structure
      if (!data.sessions || !data.feedback || !data.navigation || !data.conversations) {
        throw new Error('Invalid data structure in import file');
      }
      
      if (UserExperienceDB._storageMode === 'server') {
        // Import to server
        // This would be implemented with multiple API calls to the server
        console.warn('Server import not implemented. Defaulting to localStorage');
        UserExperienceDB.setStorageMode('local');
      }
      
      // Store each data category
      localStorage.setItem('ntu_sessions', JSON.stringify(data.sessions));
      localStorage.setItem('ntu_user_feedback', JSON.stringify(data.feedback));
      localStorage.setItem('ntu_navigation_logs', JSON.stringify(data.navigation));
      localStorage.setItem('ntu_conversations', JSON.stringify(data.conversations));
      
      return true;
    } catch (error) {
      console.error('Error importing data from file:', error);
      return false;
    }
  },
  
  // Set backup settings
  setBackupSettings: (settings) => {
    try {
      localStorage.setItem('ntu_backup_settings', JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error setting backup settings:', error);
      return false;
    }
  },
  
  // Get backup settings
  getBackupSettings: () => {
    try {
      const settings = localStorage.getItem('ntu_backup_settings');
      return settings ? JSON.parse(settings) : {
        autoBackup: false,
        backupThreshold: 20,
        lastBackup: null
      };
    } catch (error) {
      console.error('Error getting backup settings:', error);
      return {
        autoBackup: false,
        backupThreshold: 20,
        lastBackup: null
      };
    }
  },
  
  // Specialized method to save complete session data when user submits rating
  saveCompleteSession: async (sessionData) => {
    try {
      console.log('准备保存完整会话数据:', sessionData);
      
      if (UserExperienceDB._storageMode === 'server') {
        // Send to server using dedicated endpoint
        try {
          console.log('使用服务器存储模式，准备发送到API');
          // 打印完整的请求信息
          console.log('API端点:', 'http://localhost:3001/api/save-session');
          console.log('请求方法:', 'POST');
          console.log('请求体:', JSON.stringify({ sessionData }, null, 2));
          
          const response = await fetch('http://localhost:3001/api/save-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionData }),
          });
          
          if (!response.ok) {
            throw new Error(`服务器返回错误: ${response.status} ${response.statusText}`);
          }
          
          const result = await response.json();
          console.log('服务器响应:', result);
          return result;
        } catch (error) {
          console.error('发送会话数据到服务器时出错:', error);
          
          // 创建备份文件作为应急措施
          try {
            console.log('创建本地备份文件');
            const sessionFilename = `user-session-backup-${sessionData.sessionId}-${new Date().toISOString().split('T')[0]}.json`;
            const dataStr = JSON.stringify(sessionData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = sessionFilename;
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            setTimeout(() => {
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }, 100);
          } catch (backupError) {
            console.error('创建备份文件失败:', backupError);
          }
          
          // Fallback to localStorage if server is unavailable
          console.log('回退到localStorage存储');
          UserExperienceDB.setStorageMode('local');
          
          // Store in localStorage as fallback
          const key = 'ntu_complete_sessions';
          const existingData = UserExperienceDB._getStoredData(key);
          existingData.push({...sessionData, storedAt: new Date().toISOString()});
          localStorage.setItem(key, JSON.stringify(existingData));
          
          return { 
            success: true, 
            message: 'Session data saved to localStorage (fallback)',
            id: `session_${Date.now()}`
          };
        }
      } else {
        // Store in localStorage
        const key = 'ntu_complete_sessions';
        const existingData = UserExperienceDB._getStoredData(key);
        existingData.push({...sessionData, storedAt: new Date().toISOString()});
        localStorage.setItem(key, JSON.stringify(existingData));
        
        return { success: true, id: `session_${Date.now()}` };
      }
    } catch (error) {
      console.error('保存完整会话数据时出错:', error);
      return { success: false, error: error.message };
    }
  },
};

// Dialog Component (Redesigned to match Literature Review Assistant)
const Dialog = ({ isOpen, onClose, currentSection, sessionId, updateUserSessionData, llmApiKey, setLlmApiKey }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Welcome to the NTU GenAI Research Portal! Are you an Instructor or a Student?', sender: 'bot' }
  ]);
  const messagesEndRef = React.useRef(null);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const [userPurpose, setUserPurpose] = useState(null); // 'navigation', 'recommendations', or 'feedback'
  const [userRole, setUserRole] = useState(null); // 'instructor' or 'student'
  const dialogRef = React.useRef(null); // Reference to the dialog element
  const [hasShownPostPageInteraction, setHasShownPostPageInteraction] = useState(false); // Track if post-page interaction occurred
  const [visible, setVisible] = useState(false);

  // Animate dialog open
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // 使用短暂延迟允许DOM更新
      setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.style.opacity = '1';
          dialogRef.current.style.transform = 'translateY(0)';
          dialogRef.current.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
        }
      }, 10);
    } else {
      if (dialogRef.current) {
        dialogRef.current.style.opacity = '0';
        dialogRef.current.style.transform = 'translateY(30px)';
        dialogRef.current.style.boxShadow = '0 0px 0px rgba(0,0,0,0)';
      }
      // 使用更长的延迟来确保动画完成
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when messages update
  React.useEffect(() => {
    try {
      if (messagesEndRef.current) {
        // Use a simpler approach to scrolling
        const element = messagesEndRef.current;
        const container = element.parentElement;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }
    } catch (e) {
      console.error("Scroll error (non-critical):", e);
    }
  }, [messages]);
  
  // Listen for post-page interaction trigger
  useEffect(() => {
    const handlePostPageInteraction = (event) => {
      const { section, caseTitle } = event.detail;
      if (!hasShownPostPageInteraction) {
        triggerPostPageInteraction({ section, caseTitle });
        setHasShownPostPageInteraction(true);
      }
    };
    
    window.addEventListener('pageNavigated', handlePostPageInteraction);
    
    return () => {
      window.removeEventListener('pageNavigated', handlePostPageInteraction);
    };
  }, [hasShownPostPageInteraction]);
  
  // Function to trigger post-page interaction based on section
  const triggerPostPageInteraction = (sectionData) => {
    // Create personalized message based on current section
    let feedbackQuestion = "How was your experience reading this section?";
    let suggestions = [];
    
    // Handle section which can be either string or object
    const section = typeof sectionData === 'object' && sectionData.section ? sectionData.section : sectionData;
    const caseTitle = typeof sectionData === 'object' && sectionData.caseTitle ? sectionData.caseTitle : '';
    
    // Ensure section is a string before using includes
    const sectionStr = String(section || '');
    
    // Only add role-specific suggestions if role is known
    if (userRole === 'instructor') {
      suggestions.push({ text: "Teaching Resources", value: "instructor-tools", href: "#instructor-tools" });
    } else if (userRole === 'student') {
      suggestions.push({ text: "Learning Resources", value: "student-tools", href: "#student-tools" });
    } else {
      // If no role selected yet, don't show any suggestions
      return;
    }
    
    // Show typing indicator
    setBotTyping(true);
    
    // Add message after delay
    setTimeout(() => {
      setBotTyping(false);
      setMessages(prev => [...prev, { 
        text: feedbackQuestion, 
        sender: 'bot',
        postPageInteraction: true
      }]);
      
      // Only show suggestions if user has selected a role
      if (userRole && suggestions.length > 0) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            text: "You might also be interested in:", 
            sender: 'bot',
            showSuggestions: true,
            suggestions
          }]);
        }, 1000);
      }
    }, 1500);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Initial role selection buttons
  const renderRoleSelection = () => {
    if (userRole) return null;
    
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        gap: '15px', 
        marginTop: '15px',
        marginBottom: '15px'
      }}>
        <button 
          onClick={() => handleRoleSelection('instructor')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#003d7c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'background-color 0.2s, transform 0.2s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.backgroundColor = '#00295a';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#003d7c';
          }}
        >
          I'm an Instructor
        </button>
        <button 
          onClick={() => handleRoleSelection('student')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#003d7c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'background-color 0.2s, transform 0.2s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.backgroundColor = '#00295a';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#003d7c';
          }}
        >
          I'm a Student
        </button>
      </div>
    );
  };

  // Function to handle role selection
  const handleRoleSelection = (role) => {
    setUserRole(role);
    
    // Show typing indicator
    setBotTyping(true);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      setBotTyping(false);
      
      // Display interest options based on role
      if (role === 'instructor') {
        setMessages(prev => [...prev, { 
          text: "What are you most interested in exploring?", 
          sender: 'bot',
          showInterestOptions: true,
          options: [
            { text: "Hands-on Teaching Activities", value: "teaching-activities", href: "#research-focus" },
            { text: "Gen AI for Assessment", value: "ai-assessment", href: "#findings" },
            { text: "Toolkit Materials", value: "instructor-toolkit", href: "#instructor-tools" },
            { text: "Research Insights", value: "research-insights", href: "#literature-review" }
          ]
        }]);
      } else {
        setMessages(prev => [...prev, { 
          text: "What are you most interested in exploring?", 
          sender: 'bot',
          showInterestOptions: true,
          options: [
            { text: "Learning with Gen AI", value: "learning-ai", href: "#methods" },
            { text: "Research Materials", value: "student-research", href: "#research-focus" },
            { text: "Student Tools", value: "student-tools", href: "#student-tools" },
            { text: "Case Studies", value: "case-studies", href: "#case-studies" }
          ]
        }]);
      }
    }, 1000);
  };

  // Function to handle interest selection
  const handleInterestSelection = (option) => {
    const { text, value, href } = option;
    
    // Add user message
    setMessages(prev => [...prev, { text: text, sender: 'user' }]);
    
    // Show typing indicator
    setBotTyping(true);
    
    // Create content-specific response based on the selected interest
    let responseText = '';
    
    switch (value) {
      case 'teaching-activities':
        responseText = "Great choice! Our hands-on teaching activities include prompt engineering exercises, collaborative AI projects, and classroom integration strategies. I'll take you to our Resources section where you can explore these activities.";
        break;
      case 'ai-assessment':
        responseText = "Our findings section contains best practices for using Gen AI in assessment design, grading assistance, and creating authentic assessments in an AI era. Let me show you those resources.";
        break;
      case 'instructor-toolkit':
        responseText = "Our resources provide ready-to-use templates, prompts, and guides for incorporating AI tools into your teaching. I'll direct you to our complete collection of teaching resources.";
        break;
      case 'research-insights':
        responseText = "I'll direct you to our literature review which summarizes key research on AI readiness, ethics considerations, and effective implementation strategies.";
        break;
      case 'learning-ai':
        responseText = "Our methods section includes strategies for effective learning with Gen AI, including prompt crafting, critical evaluation of AI outputs, and ethical usage guidelines.";
        break;
      case 'student-research':
        responseText = "I'll take you to our research focus section which includes findings on how students are leveraging Gen AI across different disciplines and learning contexts.";
        break;
      case 'student-tools':
        responseText = "Let me show you our collection of recommended AI tools specifically selected to enhance your academic work and learning efficiency.";
        break;
      case 'case-studies':
        responseText = "Our case studies showcase real examples of how AI is being integrated into teaching and learning contexts. You'll find 8 detailed cases covering different aspects of AI in education. I'll direct you there now.";
        break;
      default:
        responseText = "I'll direct you to resources related to " + text;
    }
    
    // Respond after a short delay
    setTimeout(() => {
      setBotTyping(false);
      setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
      
      // Reset userPurpose to ensure quick replies stay available
      setUserPurpose(null);
      
      // Add navigation button after a brief pause
      setTimeout(() => {
        // Create more descriptive button text based on the value/context
        let buttonText = `Go to ${text}`;
        
        switch (value) {
          case 'teaching-activities':
            buttonText = 'View Teaching Activities';
            break;
          case 'ai-assessment':
            buttonText = 'Explore Assessment Tools';
            break;
          case 'instructor-toolkit':
            buttonText = 'Open Instructor Resources';
            break;
          case 'research-insights':
            buttonText = 'Read Literature Review';
            break;
          case 'learning-ai':
            buttonText = 'Learn AI Methods';
            break;
          case 'student-research':
            buttonText = 'View Research Materials';
            break;
          case 'student-tools':
            buttonText = 'Browse Student Tools';
            break;
          case 'case-studies':
            buttonText = 'Explore Case Studies';
            break;
          default:
            buttonText = `Go to ${text}`;
        }
        
        setMessages(prev => [
          ...prev, 
          { 
            text: buttonText, 
            sender: 'bot', 
            isButton: true, 
            action: href 
          }
        ]);
      }, 500);
    }, 1500);
  };

  // Function to provide quick replies
  const renderQuickReplies = () => {
    // Only show quick replies if a role is selected
    if (!userRole) return null;
    
    return (
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px', 
        marginTop: '12px',
        marginBottom: '12px',
        justifyContent: 'center'
      }}>
        <button 
          onClick={() => handleQuickReply(userRole === 'instructor' ? 'instructor-tools' : 'student-tools')}
          style={{
            padding: '10px 16px',
            backgroundColor: userRole === 'instructor' ? '#003d7c' : '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.95em',
            fontWeight: '500',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
          }}
        >
          🔍 {userRole === 'instructor' ? 'Teaching Tools' : 'Learning Tools'}
        </button>
        <button 
          onClick={() => handleQuickReply('feedback')}
          style={{
            padding: '10px 16px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.95em',
            fontWeight: '500',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
          }}
        >
          💬 Give Feedback
        </button>
      </div>
    );
  };

  // Handle quick reply button clicks
  const handleQuickReply = (purpose) => {
    let userText = '';
    let botResponse = '';
    
    switch (purpose) {
      case 'instructor-tools':
        userText = 'Show me teaching tools';
        botResponse = 'Here are some recommended AI tools for instructors:\n\n• Copilot - For course material development\n• ChatGPT - For creating assessments and activities\n• TeacherGAIA - For personalized learning design\n\nWould you like to see the complete list of teaching tools?';
        setUserPurpose('recommendations');
        break;
      case 'student-tools':
        userText = 'Show me learning tools';
        botResponse = 'Here are some recommended AI tools for students:\n\n• Gemini - Great for brainstorming and research\n• Claude - Excellent for essay feedback\n• Perplexity.ai - For in-depth research with citations\n• Google NotebookLM - For organizing research notes\n\nWould you like to see the complete list of learning tools?';
        setUserPurpose('recommendations');
        break;
      case 'feedback':
        userText = 'I want to give feedback';
        botResponse = 'Thanks for wanting to share your feedback! Please let me know what you think about the research or this website.';
        setUserPurpose('feedback');
        break;
      default:
        return;
    }
    
    // Add user message
    setMessages(prev => [...prev, { text: userText, sender: 'user' }]);
    
    // Show typing indicator
    setBotTyping(true);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      setBotTyping(false);
      
      const botResponseObj = { text: botResponse, sender: 'bot' };
      
      // Add action for tools
      if (purpose === 'instructor-tools') {
        botResponseObj.action = '#instructor-tools';
      } else if (purpose === 'student-tools') {
        botResponseObj.action = '#student-tools';
      }
      
      setMessages(prev => [...prev, botResponseObj]);
      
      // If the response has an action (navigation link), provide a follow-up button
      if (botResponseObj.action) {
        setTimeout(() => {
          // Create descriptive button text based on the action
          let buttonText = 'Click here to navigate';
          
          // Customize button text based on the action
          if (botResponseObj.action.includes('instructor-tools')) {
            buttonText = 'View Instructor Tools';
          } else if (botResponseObj.action.includes('student-tools')) {
            buttonText = 'View Student Tools';
          } else if (botResponseObj.action.includes('research-focus')) {
            buttonText = 'Go to Research Focus';
          } else if (botResponseObj.action.includes('methods')) {
            buttonText = 'Explore Methods';
          } else if (botResponseObj.action.includes('findings')) {
            buttonText = 'View Findings';
          } else if (botResponseObj.action.includes('case-studies')) {
            buttonText = 'Browse Case Studies';
          }
          
          const buttonMessage = { 
            text: buttonText, 
            sender: 'bot', 
            isButton: true, 
            action: botResponseObj.action 
          };
          
          setMessages(prev => [...prev, buttonMessage]);
          
          // Store button message in database
          storeMessage(buttonMessage);
        }, 500);
      } else {
        // Reset userPurpose to ensure quick replies stay available
        setUserPurpose(null);
      }
    }, 1500);
  };
  // Function to store user feedback
  const storeFeedback = async (feedbackText, rating) => {
    const feedbackData = {
      sessionId,
      timestamp: new Date().toISOString(),
      section: currentSection,
      feedbackText,
      rating,
      userRole
    };
    
    await UserExperienceDB.storeUserFeedback(feedbackData);
    
    // Update session data
    updateUserSessionData({ lastFeedback: feedbackData });
  };
  
  // Function to store chat message
  const storeMessage = async (message) => {
    if (!sessionId) return; // Skip if no session ID
    
    await UserExperienceDB.storeConversation({
      sessionId,
      timestamp: new Date().toISOString(),
      message,
      section: currentSection
    });
    
    // Update session interactions count
    updateUserSessionData({});
  };
  
  // Function to get response from OpenAI
  const getOpenAIResponse = async (userInput, chatHistory) => {
    const apiKey = llmApiKey;
    if (!apiKey) {
      throw new Error("OpenAI API Key is not set.");
    }

    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const systemMessage = {
      role: "system",
      content: "You are a helpful research assistant for the NTU GenAI Research Portal. Your goal is to assist users with their queries about the research project, guide them through the website content, and help them find relevant information. Be concise and informative."
    };
    
    const formattedMessages = [
      systemMessage,
      ...chatHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: userInput }
    ];

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-nano',
        messages: formattedMessages,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const choice = data.choices && data.choices[0];
    return choice?.message?.content || "Sorry, I couldn't retrieve a valid response from the AI.";
  };

  // Modify handleSendMessage to call OpenAI and store messages
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;

    const userMessage = { text: inputValue, sender: 'user' };
    // Add user message to state immediately for responsiveness
    // Use the functional update form of setState to ensure we have the latest messages array
    setMessages(prevMessages => [...prevMessages, userMessage]); 
    storeMessage(userMessage); // Log user message
    
    const currentInput = inputValue; // Capture current input before clearing
    setInputValue(''); // Clear input field

    // Check for API key
    if (!llmApiKey) {
      setBotTyping(true);
      setTimeout(() => {
        setBotTyping(false);
        const errorMsg = { text: 'Please enter your OpenAI API Key in the field below to enable AI responses.', sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, errorMsg]);
        storeMessage(errorMsg);
      }, 500); // Short delay for the message to appear
      return;
    }

    setBotTyping(true);

    try {
      // Pass the current messages state (excluding the latest user message because it's already in `userMessage` object)
      // The `getOpenAIResponse` function expects history *before* the current user input, which it adds itself.
      const chatHistoryForAPI = [...messages]; // Capture snapshot of messages *before* adding the new one
      
      // The previous method of obtaining historyForAPI via a setMessages callback was removed.

      const botResponseText = await getOpenAIResponse(currentInput, chatHistoryForAPI);
      const botMessage = { text: botResponseText, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      storeMessage(botMessage);
    } catch (error) {
      console.error("Error getting OpenAI response:", error);
      const errorMsg = { text: `Error from AI: ${error.message}. Please check your API key and network.`, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMsg]);
      storeMessage(errorMsg);
    } finally {
      setBotTyping(false);
    }
  };

  const handleRating = (value) => {
    setRating(value);
  };

  // Modify submitRating to store rating data
  const submitRating = () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    console.log('开始保存评分和会话数据...');
    console.log('当前存储模式:', UserExperienceDB.getStorageMode());
    
    // 强制设置为服务器模式
    UserExperienceDB.setStorageMode('server');
    console.log('已切换到服务器存储模式');
    
    // Prepare complete session data to save
    const completeSessionData = {
      sessionId,
      timestamp: new Date().toISOString(),
      section: currentSection,
      rating: rating,
      userRole: userRole,
      messages: messages,
      sessionDuration: Date.now() - new Date().getTime(), // 使用当前时间，不依赖userSessionData
      pagesVisited: [] // 不依赖userSessionData.sections
    };
    
    // 添加调试信息
    console.log('准备保存的会话数据:', completeSessionData);
    
    // Store rating and complete conversation in database
    Promise.all([
      storeFeedback("Rating submission", rating),
      UserExperienceDB.saveCompleteSession(completeSessionData)
    ])
    .then((results) => {
      console.log('保存结果:', results);
      setIsSubmitting(false);
      setRatingSubmitted(true);
      
      // Log success message with filepath if available
      const sessionResult = results[1];
      if (sessionResult && sessionResult.success) {
        console.log('Complete session saved successfully', 
          sessionResult.filepath ? `to ${sessionResult.filepath}` : '');
      } else {
        console.error('保存会话数据失败:', sessionResult);
      }
      
      // 检查数据目录
      fetch('http://localhost:3001/api/data-files')
        .then(response => response.json())
        .then(data => {
          console.log('数据目录内容:', data);
        })
        .catch(error => {
          console.error('获取数据目录内容失败:', error);
        });
      
      // If using browser storage and auto-download is enabled, trigger file download
      if (UserExperienceDB.getStorageMode() === 'local') {
        // For browser storage, trigger a file download for this specific session
        const autoDownload = localStorage.getItem('ntu_auto_download_sessions') === 'true';
        if (autoDownload) {
          const sessionFilename = `user-session-${sessionId}-${new Date().toISOString().split('T')[0]}.json`;
          const dataStr = JSON.stringify(completeSessionData, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          
          const a = document.createElement('a');
          a.href = url;
          a.download = sessionFilename;
          document.body.appendChild(a);
          a.click();
          
          // Clean up
    setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 100);
        }
      }
    })
    .catch(error => {
      console.error("Error submitting rating:", error);
      setIsSubmitting(false);
    });
  };

  // Modify handleNavigation to store navigation data
  const handleNavigation = (action) => {
    // Log navigation in database
    UserExperienceDB.logNavigation({
      sessionId,
      timestamp: new Date().toISOString(),
      fromSection: currentSection,
      toSection: action,
      interactionType: 'chatbot_navigation'
    });
    
    // Navigate to the section without closing the dialog
    window.location.href = action;
    
    // Add a confirmation message
    setTimeout(() => {
    setBotTyping(true);
    
    setTimeout(() => {
      setBotTyping(false);
        const confirmMessage = { 
          text: "I've navigated you to that section. Is there anything else you'd like to know?", 
          sender: 'bot' 
        };
        
        setMessages(prev => [...prev, confirmMessage]);
        
        // Store confirmation message in database
        storeMessage(confirmMessage);
      }, 1000);
    }, 300);
  };
  
  const handleClose = () => {
    // If user has had a conversation but hasn't rated, show rating before closing
    if (messages.length > 2 && !showRating && !ratingSubmitted) {
      setShowRating(true);
    } else {
      // Reset all states when closing
      setMessages([{ text: 'Welcome to the NTU GenAI Research Portal! Are you an Instructor or a Student?', sender: 'bot' }]);
      setShowRating(false);
      setRating(0);
      setRatingSubmitted(false);
      setUserPurpose(null);
      setUserRole(null);
      onClose();
    }
  };

  if (!visible) return null;

  // Dialog styles from Literature Review page
  const dialogStyles = {
    dialogPopup: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '380px',
      height: '520px',
      backgroundColor: 'white',
      boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
      borderRadius: '16px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      // opacity: 0,
      // transform: 'translateY(30px)',
      // pointerEvents: isOpen ? 'auto' : 'none',
    },
    dialogHeader: {
      backgroundColor: '#003d7c',
      backgroundImage: 'linear-gradient(135deg, #003d7c 0%, #0056b3 100%)',
      color: '#fff',
      padding: '15px 20px',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    dialogMessages: {
      flex: 1,
      padding: '20px',
      paddingBottom: '10px',
      marginBottom: '5px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      backgroundColor: '#f8f9fa',
    },
    userMessage: {
      margin: '5px 0',
      padding: '12px 16px',
      borderRadius: '18px',
      backgroundColor: '#0056b3',
      color: 'white',
      alignSelf: 'flex-end',
      marginLeft: 'auto',
      borderBottomRightRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      maxWidth: '80%',
      wordWrap: 'break-word',
      fontWeight: '400',
      animation: 'fadeInRight 0.3s ease',
    },
    botMessage: {
      margin: '5px 0',
      padding: '12px 16px',
      borderRadius: '18px',
      backgroundColor: 'white',
      color: '#333',
      alignSelf: 'flex-start',
      marginRight: 'auto',
      borderBottomLeftRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
      maxWidth: '80%',
      wordWrap: 'break-word',
      fontWeight: '400',
      animation: 'fadeInLeft 0.3s ease',
    },
    typingIndicator: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: 'white',
      borderRadius: '18px',
      alignSelf: 'flex-start',
      marginRight: 'auto',
      width: 'fit-content',
      boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
      animation: 'fadeIn 0.3s ease',
    },
    dot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#666',
      borderRadius: '50%',
      margin: '0 2px',
      animation: 'bounce 1.4s infinite',
    },
    dialogInputContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 15px',
      borderTop: '1px solid #eaeaea',
      backgroundColor: 'white',
    },
    messageInputContainerStyle: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    dialogInput: {
      flex: 1,
      padding: '10px 15px',
      border: '1px solid #ddd',
      borderRadius: '40px',
      marginRight: '10px',
      marginBottom: '8px',
      outline: 'none',
      fontSize: '14px',
      backgroundColor: 'white',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
      transition: 'all 0.2s ease',
      height: '45px',
      boxSizing: 'border-box',
    },
    sendButton: {
      backgroundColor: '#0056b3',
      backgroundImage: 'linear-gradient(135deg, #0056b3 0%, #003d7c 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '40px',
      padding: '10px 25px',
      cursor: 'pointer',
      fontWeight: '500',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease',
      alignSelf: 'flex-start',
      height: '45px',
      marginBottom: '8px',
      fontSize: '16px',
    },
    apiKeyContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '5px',
    },
    apiKeyLabel: {
      marginRight: '10px',
      fontSize: '0.9em',
      color: '#555',
    },
    apiKeyInput: {
      flex: 1,
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '0.9em',
      backgroundColor: '#f8f9fa',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
      transition: 'all 0.2s ease',
      height: '40px',
      boxSizing: 'border-box',
    },
    botButton: {
      padding: '10px 14px',
      backgroundColor: '#0056b3',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 'bold',
      transition: 'background-color 0.2s, transform 0.2s, box-shadow 0.2s',
      margin: '0 0 8px 0',
      alignSelf: 'flex-start',
      marginRight: 'auto',
      animation: 'fadeIn 0.3s ease',
    },
  };

  // Star rating styles
  const starContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '15px 0'
  };
  
  const starStyle = {
    fontSize: '30px',
    color: '#ccc',
    cursor: 'pointer',
    margin: '0 5px',
    transition: 'transform 0.1s ease, color 0.2s ease'
  };
  
  const starActiveStyle = {
    ...starStyle,
    color: '#ffd700', // Gold color for selected stars
    transform: 'scale(1.2)'
  };

  return (
    <div 
      style={dialogStyles.dialogPopup} 
      ref={dialogRef}
      role="dialog" 
      aria-labelledby="dialog-title"
      aria-modal="true"
    >
      <div style={dialogStyles.dialogHeader}>
        <h3 style={{ margin: 0, fontWeight: '500', fontSize: '1.1rem' }} id="dialog-title">
          NTU GenAI Research Portal Assistant
        </h3>
        <button 
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
          }}
          onClick={handleClose} 
          title="Close Dialog"
          aria-label="Close dialog"
        >
          ×
        </button>
      </div>
      
      {showRating ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px'
        }}>
          {ratingSubmitted ? (
            <>
              <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Thank You!</h3>
              <p style={{ textAlign: 'center' }}>Your feedback has been recorded. We appreciate your input.</p>
              <button 
                onClick={() => {
                  setMessages([{ text: 'Welcome to the NTU GenAI Research Portal! Are you an Instructor or a Student?', sender: 'bot' }]);
                  setShowRating(false);
                  setRating(0);
                  setRatingSubmitted(false);
                  setUserPurpose(null);
                  setUserRole(null);
                  onClose();
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#003d7c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginTop: '15px',
                  fontSize: '1em',
                  transition: 'background-color 0.2s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                Close
              </button>
            </>
          ) : (
            <>
              <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Rate Your Experience</h3>
              <p style={{ textAlign: 'center' }}>How helpful was this conversation?</p>
              
              <div style={starContainerStyle}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={star <= rating ? starActiveStyle : starStyle}
                    onClick={() => handleRating(star)}
                    onMouseOver={(e) => {
                      if (star > rating) e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      if (star > rating) e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              
              <button 
                onClick={submitRating}
                disabled={rating === 0 || isSubmitting}
                style={{
                  padding: '10px 20px',
                  backgroundColor: rating === 0 || isSubmitting ? '#ccc' : '#003d7c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: rating === 0 || isSubmitting ? 'not-allowed' : 'pointer',
                  marginTop: '15px',
                  fontSize: '1em',
                  transition: 'background-color 0.2s ease',
                  boxShadow: rating === 0 || isSubmitting ? 'none' : '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Rating'}
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Chat messages container */}
          <div style={dialogStyles.dialogMessages}>
            {messages.map((msg, index) => (
              msg.isButton ? (
                <button
                  key={index}
                  style={dialogStyles.botButton}
                  onClick={() => handleNavigation(msg.action)}
                >
                  {msg.text}
                </button>
              ) : msg.showInterestOptions ? (
                <div key={index} style={{width: '100%', margin: '10px 0'}}>
                  <div style={dialogStyles.botMessage}>
                    {msg.text}
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '8px',
                    marginTop: '10px',
                    width: '100%'
                  }}>
                    {msg.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleInterestSelection(option)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#003d7c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '16px',
                          cursor: 'pointer',
                          fontSize: '0.9em',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseOver={e => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div 
                  key={index} 
                  style={msg.sender === 'user' ? dialogStyles.userMessage : dialogStyles.botMessage}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              )
            ))}
            
            {botTyping && (
              <div style={dialogStyles.typingIndicator}>
                <div style={{...dialogStyles.dot, animationDelay: '0s'}}></div>
                <div style={{...dialogStyles.dot, animationDelay: '0.2s'}}></div>
                <div style={{...dialogStyles.dot, animationDelay: '0.4s'}}></div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Role selection buttons */}
          {renderRoleSelection()}
          
          {/* Quick replies - only show if role is selected but there are no interest options active */}
          {userRole && renderQuickReplies()}
          
          {/* Input form - Only show when a role has been selected */}
          {userRole && (
            <div style={dialogStyles.dialogInputContainer}>
              <div style={dialogStyles.messageInputContainerStyle}> {/* Container for message input */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                  placeholder="Type your message..."
                  aria-label="Chat message input"
                  style={dialogStyles.dialogInput}
                />
                <button
                  onClick={handleSendMessage}
                  aria-label="Send message"
                  title="Send message"
                  style={dialogStyles.sendButton}
                >
                  Send
                </button>
              </div>
              {/* API Key input field */}
              <div style={dialogStyles.apiKeyContainer}>
                <label htmlFor="apiKeyInput" style={dialogStyles.apiKeyLabel}>API Key:</label>
                <input
                  id="apiKeyInput"
                  type="password"
                  value={llmApiKey}
                  onChange={(e) => setLlmApiKey(e.target.value)}
                  placeholder="Enter your OpenAI API Key"
                  aria-label="OpenAI API Key"
                  style={dialogStyles.apiKeyInput}
                />
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Add keyframes for all animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-5px); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes fadeInLeft {
            from { 
              opacity: 0;
              transform: translateX(-10px);
            }
            to { 
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInRight {
            from { 
              opacity: 0;
              transform: translateX(10px);
            }
            to { 
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          /* 滚动条样式 */
          #chat-messages::-webkit-scrollbar {
            width: 6px;
          }
          
          #chat-messages::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          
          #chat-messages::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 10px;
          }
          
          #chat-messages::-webkit-scrollbar-thumb:hover {
            background: #aaa;
          }
        `
      }} />
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          margin: '20px', 
          backgroundColor: '#f8d7da', 
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          color: '#721c24'
        }}>
          <h2>Something went wrong.</h2>
          <p>Please try refreshing the page. If the issue persists, contact support.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main App Component
const App = () => {
  // Use simple state with default values, no reliance on browser APIs
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [sessionId, setSessionId] = useState(`session_${Date.now()}`);
  const [userSessionData, setUserSessionData] = useState({
    startTime: new Date().toISOString(),
    sections: [],
    interactions: 0
  });
  const [llmApiKey, setLlmApiKey] = useState(''); // Added for persistent API Key

  useEffect(() => {
    // Initialize user session 
    const initUserSession = async () => {
      // Store initial session data
      await UserExperienceDB.storeSession({
        sessionId,
        startTime: userSessionData.startTime,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        referrer: document.referrer || 'direct'
      });
    };
    
    initUserSession();
    
    // Listen for pageNavigated events from MainContent
    const handlePageNavigation = async (event) => {
      const { section } = event.detail;
      setCurrentSection(section);
      
      // Update and store navigation data
      const navigationData = {
        sessionId,
        timestamp: new Date().toISOString(),
        section,
        timeSpent: 0 // Will be updated on next navigation
      };
      
      // Log navigation in database
      await UserExperienceDB.logNavigation(navigationData);
      
      // Update session data
      setUserSessionData(prev => ({
          ...prev, 
        sections: [...prev.sections, section]
      }));
      
      // Wait some time for user to consume content, then show chatbot
    setTimeout(() => {
        setIsDialogOpen(true);
        
        // Dispatch an event to tell the chatbot to show post-page interaction
        window.dispatchEvent(new CustomEvent('triggerPostPageInteraction', { 
          detail: { section }
        }));
      }, 15000); // Show after 15 seconds of browsing
    };
    
    window.addEventListener('pageNavigated', handlePageNavigation);
    
    // Clean up
    return () => {
      window.removeEventListener('pageNavigated', handlePageNavigation);
      
      // Store final session data on unmount
      UserExperienceDB.storeSession({
        sessionId,
        endTime: new Date().toISOString(),
        sections: userSessionData.sections,
        interactions: userSessionData.interactions
      });
    };
  }, [sessionId, userSessionData.startTime, userSessionData.sections]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Simple render without useEffect
  return (
    <ErrorBoundary>
      <Header />
      <MainContent />
      <Footer />
      <FloatingButton onClick={handleOpenDialog} />
      {isDialogOpen && <Dialog 
        isOpen={true} 
        onClose={handleCloseDialog} 
        currentSection={currentSection}
        sessionId={sessionId}
        updateUserSessionData={(data) => {
          setUserSessionData(prev => ({
          ...prev, 
            ...data,
            interactions: prev.interactions + 1
          }));
        }}
        llmApiKey={llmApiKey} // Pass API key state
        setLlmApiKey={setLlmApiKey} // Pass API key setter
      />}
    </ErrorBoundary>
  );
};

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(); // Removed as requested


