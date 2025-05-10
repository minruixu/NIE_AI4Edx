const LiteratureReviewPage = () => {
  // State for the selected literature review
  const [selectedReview, setSelectedReview] = React.useState(null);
  // State for chat messages
  const [chatMessages, setChatMessages] = React.useState([
    { 
      sender: 'bot', 
      text: 'Hello! I can help you explore the literature review findings on AI in education. What would you like to know about?'
    },
    {
      sender: 'bot',
      text: 'You can explore any of these research questions:',
      buttons: [
        {
          text: 'RQ1: Readiness',
          type: 'primary',
          action: () => navigateToReview(1)
        },
        {
          text: 'RQ2: Ethics',
          type: 'primary',
          action: () => navigateToReview(2)
        },
        {
          text: 'RQ3: Practices',
          type: 'primary',
          action: () => navigateToReview(3)
        },
        {
          text: 'Help',
          type: 'secondary',
          action: () => {
            setChatMessages(prevMessages => [
              ...prevMessages,
              { sender: 'user', text: 'Help' },
              { 
                sender: 'bot', 
                text: 'I can help you with information about faculty and student readiness (RQ1), ethical concerns across disciplines (RQ2), or current GPT practices including threats and benefits (RQ3). Click any button to navigate or just ask me a question.'
              }
            ]);
          }
        }
      ]
    }
  ]);
  // State for user input in the chat
  const [userInput, setUserInput] = React.useState('');
  // State for sidebar visibility on mobile
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
  // State for chat visibility
  const [isChatVisible, setIsChatVisible] = React.useState(false);
  // State for quick nav visibility
  const [showQuickNav, setShowQuickNav] = React.useState(false);

  // Load review from URL hash if present
  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const reviewId = parseInt(hash);
    
    if (reviewId && window.literatureReviews) {
      const review = window.literatureReviews.find(r => r.id === reviewId);
      if (review) {
        setSelectedReview(review);
      }
    }
    
    // Listen for hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const reviewId = parseInt(hash);
      
      if (reviewId && window.literatureReviews) {
        const review = window.literatureReviews.find(r => r.id === reviewId);
        if (review) {
          setSelectedReview(review);
        }
      } else {
        setSelectedReview(null);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Setup wordcloud after review selection
  React.useEffect(() => {
    if (selectedReview && selectedReview.hasWordCloud) {
      // Check if the window.setupWordClouds function exists
      if (typeof window.setupWordClouds === 'function') {
        setTimeout(() => {
          window.setupWordClouds(selectedReview.id);
        }, 500);
      }
    }
  }, [selectedReview]);

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
    reviewGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    },
    reviewCard: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      cursor: 'pointer',
    },
    reviewCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
    reviewTitle: {
      color: '#003d7c',
      marginTop: '0',
      marginBottom: '10px',
    },
    reviewCategory: {
      display: 'inline-block',
      backgroundColor: '#e6f0ff',
      color: '#003d7c',
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '14px',
      marginBottom: '10px',
    },
    reviewSummary: {
      color: '#555',
    },
    reviewDetail: {
      backgroundColor: '#fff',
      padding: '25px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    caseTitle: {
      color: '#003d7c',
      marginTop: '0',
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
    chatContainer: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '350px',
      height: '500px',
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      overflow: 'hidden',
    },
    chatHeader: {
      backgroundColor: '#003d7c',
      color: '#fff',
      padding: '10px 15px',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    chatMessages: {
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
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#f1f1f1',
      padding: '10px 15px',
      borderRadius: '18px',
      borderBottomLeftRadius: '3px',
      maxWidth: '80%',
    },
    chatInputContainer: {
      display: 'flex',
      padding: '10px',
      borderTop: '1px solid #eee',
    },
    chatInput: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '20px',
      marginRight: '10px',
      outline: 'none',
    },
    chatButton: {
      backgroundColor: '#003d7c',
      color: '#fff',
      border: 'none',
      borderRadius: '20px',
      padding: '8px 15px',
      marginLeft: '10px',
      cursor: 'pointer',
    },
    toggleSidebarButton: {
      display: 'none',
      position: 'fixed',
      top: '15px',
      right: '15px',
      backgroundColor: '#003d7c',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px',
      zIndex: 1001,
      cursor: 'pointer',
    },
    chatButtonFixed: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#003d7c',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      zIndex: 999,
    },
    navBar: {
      display: 'flex',
      justifyContent: 'center',
      padding: '10px',
      borderTop: '1px solid #ddd',
    },
    navButton: {
      margin: '0 5px',
      padding: '5px 10px',
      backgroundColor: '#e6f0ff',
      color: '#003d7c',
      border: '1px solid #ccd',
      borderRadius: '15px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    navButtonHover: {
      backgroundColor: '#cce0ff',
    },
    buttonContainer: {
      marginTop: '10px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },
    primaryButton: {
      backgroundColor: '#003d7c',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 12px',
      margin: '0 0 8px 0',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '160px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s, transform 0.2s',
    },
    secondaryButton: {
      backgroundColor: '#e6f0ff',
      color: '#003d7c',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 12px',
      margin: '0 0 8px 0',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '160px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s, transform 0.2s',
    },
    quickNavContainer: {
      padding: '10px',
      backgroundColor: '#f5f9ff',
      borderRadius: '8px',
      margin: '10px 0',
    },
    quickNavTitle: {
      margin: '0 0 8px 0',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#003d7c',
    },
    quickNavGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '5px',
    },
    quickNavButton: {
      padding: '8px',
      backgroundColor: '#e6f0ff',
      color: '#003d7c',
      border: '1px solid #ccd',
      borderRadius: '4px',
      fontSize: '12px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
  };

  // Function to toggle chat visibility
  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  // Function to handle card hover state
  const handleCardHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = styles.reviewCardHover.transform;
      e.currentTarget.style.boxShadow = styles.reviewCardHover.boxShadow;
    } else {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = styles.reviewCard.boxShadow;
    }
  };

  // Function to handle review selection
  const handleReviewSelect = (review) => {
    setSelectedReview(review);
    window.location.hash = review.id;
  };

  // Function to handle user chat input
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Function to navigate to a specific review
  const navigateToReview = (reviewId) => {
    const matchingReview = window.literatureReviews.find(review => review.id === reviewId);
    if (matchingReview) {
      setSelectedReview(matchingReview);
      window.location.hash = matchingReview.id;
      return true;
    }
    return false;
  };

  // Function to render a message with buttons
  const renderMessage = (msg, index) => {
    if (msg.buttons) {
      // Determine if buttons should wrap (for more than 2 buttons)
      const shouldWrap = msg.buttons.length > 2;
      
      return React.createElement(
        'div',
        {
          key: index,
          style: styles.botMessage,
        },
        React.createElement('div', {}, msg.text),
        React.createElement(
          'div',
          { 
            style: {
              ...styles.buttonContainer,
              flexWrap: shouldWrap ? 'wrap' : 'nowrap'
            }
          },
          msg.buttons.map((button, btnIndex) => {
            // Choose appropriate button style based on button type
            let buttonStyle = styles.primaryButton;
            if (button.type === 'secondary') {
              buttonStyle = styles.secondaryButton;
            } else if (button.type === 'neutral') {
              buttonStyle = {...styles.secondaryButton, backgroundColor: '#f1f1f1', color: '#333'};
            }
            
            return React.createElement(
              'button',
              {
                key: btnIndex,
                onClick: button.action,
                style: buttonStyle,
                onMouseEnter: (e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  if (buttonStyle === styles.primaryButton) {
                    e.currentTarget.style.backgroundColor = '#00295a';
                  } else if (buttonStyle === styles.secondaryButton) {
                    e.currentTarget.style.backgroundColor = '#e6f0ff';
                  } else {
                    e.currentTarget.style.backgroundColor = '#f1f1f1';
                  }
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.transform = 'none';
                  if (buttonStyle === styles.primaryButton) {
                    e.currentTarget.style.backgroundColor = '#003d7c';
                  } else if (buttonStyle === styles.secondaryButton) {
                    e.currentTarget.style.backgroundColor = '#e6f0ff';
                  } else {
                    e.currentTarget.style.backgroundColor = '#f1f1f1';
                  }
                }
              },
              button.text
            );
          })
        )
      );
    } else {
      return React.createElement(
        'div',
        {
          key: index,
          style: msg.sender === 'user' ? styles.userMessage : styles.botMessage,
        },
        msg.text
      );
    }
  };

  // Function to create navigation buttons for reviews
  const createReviewNavButtons = () => {
    return {
      sender: 'bot',
      text: 'Navigate to a literature review:',
      buttons: [
        {
          text: 'RQ1: Readiness',
          type: 'primary',
          action: () => navigateToReview(1)
        },
        {
          text: 'RQ2: Ethics',
          type: 'primary',
          action: () => navigateToReview(2)
        },
        {
          text: 'RQ3: Practices',
          type: 'primary',
          action: () => navigateToReview(3)
        },
        {
          text: 'Main Page',
          type: 'secondary',
          action: () => {
            setSelectedReview(null);
            window.location.hash = '';
          }
        }
      ]
    };
  };

  // Function to show help message with navigation options
  const showHelpMessage = () => {
    const helpMessage = 'Here are the navigation commands you can use:';
    
    setChatMessages(prevMessages => [
      ...prevMessages, 
      { sender: 'bot', text: helpMessage },
      createReviewNavButtons()
    ]);
  };

  // Function to send message
  const handleSendMessage = () => {
    if (userInput.trim() === '') return;
    
    // Add user message to chat
    setChatMessages(prevMessages => [...prevMessages, { sender: 'user', text: userInput }]);
    
    // Process the user input to generate a response
    handleChatbotResponse(userInput);
    
    // Clear input field
    setUserInput('');
  };

  // Function to handle input key press (send on Enter)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Function to handle chatbot responses
  const handleChatbotResponse = (userMessage) => {
    const lowerCaseInput = userMessage.toLowerCase();
    
    // Delayed response to simulate thinking
    setTimeout(() => {
      let botResponse = '';
      
      // Check for navigation commands
      if (lowerCaseInput === 'help') {
        showHelpMessage();
        return;
      } else if (lowerCaseInput === 'nav') {
        setChatMessages(prevMessages => [
          ...prevMessages, 
          createReviewNavButtons()
        ]);
        return;
      } else if (lowerCaseInput === 'home' || lowerCaseInput === 'main' || lowerCaseInput === 'all') {
        botResponse = 'Returning to the main literature reviews page.';
        setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
        setTimeout(() => {
          setSelectedReview(null);
          window.location.hash = '';
        }, 800);
        return;
      }
      
      // Check for greetings
      if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi') || lowerCaseInput === 'hey') {
        botResponse = 'Hello! How can I help you explore the literature review findings? Type "help" to see navigation options.';
        setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
      }
      // Check for questions about the research
      else if (lowerCaseInput.includes('what is') && lowerCaseInput.includes('research')) {
        botResponse = 'This research explores faculty and student perceptions of GPT in education, ethical concerns across disciplines, and current practices including both threats and benefits of GPT integration.';
        setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
      }
      // Check for readiness questions (RQ1)
      else if (lowerCaseInput.includes('readiness') || lowerCaseInput.includes('ready') || 
               lowerCaseInput.includes('prepared') || 
               (lowerCaseInput.includes('faculty') && lowerCaseInput.includes('student'))) {
        botResponse = 'Our research on readiness shows that both faculty and students have varying levels of preparedness for GPT adoption. Key factors include institutional support, training opportunities, technological infrastructure, demographic factors, teaching modalities, and cross-cultural backgrounds. Wang et al. (2023) found that AI readiness requires specific preparation beyond general technological competence.';
        
        // Add navigation button
        setChatMessages(prevMessages => [
          ...prevMessages, 
          { sender: 'bot', text: botResponse },
          { 
            sender: 'bot', 
            text: 'Would you like me to show you the detailed literature review on readiness (RQ1)?',
            buttons: [
              {
                text: 'View RQ1: Readiness',
                type: 'primary',
                action: () => navigateToReview(1)
              },
              {
                text: 'No thanks',
                type: 'secondary',
                action: () => {
                  setChatMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'user', text: 'No thanks' },
                    { sender: 'bot', text: 'Alright. Let me know if you need anything else about the literature reviews.' }
                  ]);
                }
              }
            ]
          }
        ]);
      }
      // Check for ethics questions (RQ2)
      else if (lowerCaseInput.includes('ethics') || lowerCaseInput.includes('ethical') || 
               lowerCaseInput.includes('concern') || lowerCaseInput.includes('integrity') || 
               lowerCaseInput.includes('plagiarism')) {
        botResponse = 'Our literature review on ethical concerns identified diverse issues across disciplines. Major concerns include undetectable AI-generated plagiarism (Perkins, 2023; Dehouche, 2021), the need for comprehensive ethical frameworks (Chan, 2023; Kooli, 2023), and gaps in AI literacy. Studies by Miljkovic Krecar et al. (2024) found professors struggle to distinguish AI-generated content, while Biagini et al. (2024) found students show overconfidence despite limited AI knowledge.';
        
        // Add navigation button
        setChatMessages(prevMessages => [
          ...prevMessages, 
          { sender: 'bot', text: botResponse },
          { 
            sender: 'bot', 
            text: 'Would you like to see the full literature review on ethical concerns (RQ2)?',
            buttons: [
              {
                text: 'View RQ2: Ethics',
                type: 'primary',
                action: () => navigateToReview(2)
              },
              {
                text: 'No thanks',
                type: 'secondary',
                action: () => {
                  setChatMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'user', text: 'No thanks' },
                    { sender: 'bot', text: 'Alright. Let me know if you need anything else about the literature reviews.' }
                  ]);
                }
              }
            ]
          }
        ]);
      }
      // Check for practices questions (RQ3)
      else if (lowerCaseInput.includes('practice') || lowerCaseInput.includes('application') || 
               lowerCaseInput.includes('implement') || lowerCaseInput.includes('benefit') || 
               lowerCaseInput.includes('threat') || lowerCaseInput.includes('challenge')) {
        botResponse = 'Our review of current GPT practices identified innovative applications like enhanced interactive learning through social robots (Sonderegger, 2022), language education tools (Bonner et al., 2023), and frameworks like the "IDEE" model (Su & Yang, 2023). Pedagogical innovations include dual-contrast pedagogy for AI literacy (Dai, 2024) and democratized lesson planning (Van den Berg & du Plessis, 2023). Implementation challenges include the need for clear policies, ethical guidelines, and AI-resilient assessments.';
        
        // Add navigation button
        setChatMessages(prevMessages => [
          ...prevMessages, 
          { sender: 'bot', text: botResponse },
          { 
            sender: 'bot', 
            text: 'Would you like to explore the detailed literature review on current GPT practices (RQ3)?',
            buttons: [
              {
                text: 'View RQ3: Practices',
                type: 'primary',
                action: () => navigateToReview(3)
              },
              {
                text: 'No thanks',
                type: 'secondary',
                action: () => {
                  setChatMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'user', text: 'No thanks' },
                    { sender: 'bot', text: 'Alright. Let me know if you need anything else about the literature reviews.' }
                  ]);
                }
              }
            ]
          }
        ]);
      }
      // Check for specific literature review questions
      else if (lowerCaseInput.includes('rq1') || lowerCaseInput.includes('rq 1')) {
        if (navigateToReview(1)) {
          botResponse = `Opening the literature review on RQ1: Instructors' and Students' Perceptions of Readiness to Use GPT for you now.`;
          setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
          return;
        }
      }
      else if (lowerCaseInput.includes('rq2') || lowerCaseInput.includes('rq 2')) {
        if (navigateToReview(2)) {
          botResponse = `Opening the literature review on RQ2: Ethical Concerns in Humanities, Social Sciences, and STEM for you now.`;
          setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
          return;
        }
      }
      else if (lowerCaseInput.includes('rq3') || lowerCaseInput.includes('rq 3')) {
        if (navigateToReview(3)) {
          botResponse = `Opening the literature review on RQ3: Current GPT Practices - Threats and Benefits for you now.`;
          setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
          return;
        }
      }
      else {
        const matchingReview = window.literatureReviews.find(review => {
          if (selectedReview && review.id === selectedReview.id) return false; // Skip current case
          const title = review.title.toLowerCase();
          return (lowerCaseInput.includes(title) || 
                  (title.split(' ').some(word => word.length > 3 && lowerCaseInput.includes(word))));
        });
        
        if (matchingReview) {
          botResponse = `I found information on "${matchingReview.title}". ${matchingReview.summary}`;
          
          // Add bot response with navigation button
          setChatMessages(prevMessages => [
            ...prevMessages, 
            { sender: 'bot', text: botResponse },
            { 
              sender: 'bot', 
              text: 'Would you like to view this literature review?',
              buttons: [
                {
                  text: `View ${matchingReview.title.substring(0, 20)}...`,
                  type: 'primary',
                  action: () => {
                    setSelectedReview(matchingReview);
                    window.location.hash = matchingReview.id;
                    setChatMessages(prevMessages => [
                      ...prevMessages,
                      { 
                        sender: 'bot', 
                        text: `You're now viewing "${matchingReview.title}". Don't forget to check out the reflection prompts at the bottom which can help you think deeper about these findings.`
                      }
                    ]);
                  }
                },
                {
                  text: 'No thanks',
                  type: 'secondary',
                  action: () => {
                    setChatMessages(prevMessages => [
                      ...prevMessages,
                      { sender: 'user', text: 'No thanks' },
                      { sender: 'bot', text: 'Alright. Let me know if you need anything else about the literature reviews.' }
                    ]);
                  }
                }
              ]
            }
          ]);
          return;
        }
        else {
          botResponse = "I'm not sure I understood that. I can help with information about faculty and student readiness (RQ1), ethical concerns across disciplines (RQ2), or current GPT practices including threats and benefits (RQ3).";
          setChatMessages(prevMessages => [
            ...prevMessages, 
            { sender: 'bot', text: botResponse },
            createReviewNavButtons()
          ]);
        }
      }
    }, 800);
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
            className="header-nav-link active"
          >
            Literature Review
          </a>
        </nav>
      </header>

      <div style={styles.container}>
        <div style={styles.header}>
          <h1>Literature Review</h1>
          <p>Explore the findings from our comprehensive literature review on AI in education</p>
        </div>

        <a href="/" style={styles.backLink}>← Back to Main Page</a>

        {selectedReview
          ? (
              <div>
                <div style={styles.reviewDetail}>
                  <h2 style={styles.caseTitle}>{selectedReview.title}</h2>
                  <span style={styles.caseCategory}>{selectedReview.category}</span>
                  <p style={styles.caseSummary}>
                    <strong>{selectedReview.summary}</strong>
                  </p>
                  {selectedReview.content.split('\n\n').map((paragraph, index) =>
                    <p key={index}>{paragraph}</p>
                  )}
                  {selectedReview.hasWordCloud &&
                    <div
                      id={`wordcloud-container-${selectedReview.id}`}
                      style={{ marginTop: '30px' }}
                    ></div>
                  }
                  <div style={styles.promptsContainer}>
                    <h3 style={styles.promptTitle}>Reflection Prompts</h3>
                    <ul style={styles.promptList}>
                      {selectedReview.reflectionPrompts.map((prompt, index) =>
                        <li key={index} style={styles.promptItem}>{prompt}</li>
                      )}
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedReview(null);
                      window.location.hash = '';
                    }}
                    style={{
                      marginTop: '20px',
                      padding: '10px 15px',
                      backgroundColor: '#003d7c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Back to All Literature Reviews
                  </button>
                </div>
              </div>
            )
          : (
              <div style={styles.reviewGrid}>
                {window.literatureReviews.map((review) =>
                  <div
                    key={review.id}
                    style={styles.reviewCard}
                    onClick={() => handleReviewSelect(review)}
                    onMouseEnter={(e) => handleCardHover(e, true)}
                    onMouseLeave={(e) => handleCardHover(e, false)}
                  >
                    <h3 style={styles.reviewTitle}>{review.title}</h3>
                    <span style={styles.reviewCategory}>{review.category}</span>
                    <p style={styles.reviewSummary}>{review.summary}</p>
                  </div>
                )}
              </div>
            )}

        {isChatVisible ? (
          <div style={styles.chatContainer} id="chat-container">
            <div style={styles.chatHeader}>
              <h3 style={{ margin: 0 }}>Literature Review Assistant</h3>
              <button
                onClick={toggleChatVisibility}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                x
              </button>
            </div>
            <div style={styles.chatMessages} id="chat-messages">
              {chatMessages.map((message, index) => renderMessage(message, index))}
              {showQuickNav && (
                <div
                  onClick={() => setShowQuickNav(false)}
                  style={{
                    textAlign: 'right',
                    fontSize: '12px',
                    marginTop: '5px',
                    color: '#666',
                    cursor: 'pointer'
                  }}
                >
                  Hide navigation
                </div>
              )}
            </div>
            <div style={styles.chatInputContainer}>
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask about literature review..."
                style={styles.chatInput}
              />
              <button onClick={handleSendMessage} style={styles.chatButton}>Send</button>
            </div>
            <div style={styles.navBar}>
              <button
                style={styles.navButton}
                onClick={() => {
                  setChatMessages(prevMessages => [
                    ...prevMessages,
                    createReviewNavButtons()
                  ]);
                }}
              >
                Navigation
              </button>
              <button
                style={styles.navButton}
                onClick={showHelpMessage}
              >
                Help
              </button>
              <button
                style={styles.navButton}
                onClick={() => {
                  setSelectedReview(null);
                  window.location.hash = '';
                  setChatMessages(prevMessages => [...prevMessages, { 
                    sender: 'bot', 
                    text: 'Returned to the main literature review page.'
                  }]);
                }}
              >
                Home
              </button>
            </div>
          </div>
        ) : (
          <div
            style={styles.chatButtonFixed}
            onClick={toggleChatVisibility}
          >
            💬
          </div>
        )}
      </div>
    </div>
  );
};

// Render the Literature Review Page
ReactDOM.render(
  React.createElement(LiteratureReviewPage, null),
  document.getElementById('root')
); 