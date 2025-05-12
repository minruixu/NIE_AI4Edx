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
  const [llmApiKey, setLlmApiKey] = React.useState(''); // New state for API Key
  const [isBotTyping, setIsBotTyping] = React.useState(false); // New state for typing indicator

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
    },
    chatHeader: {
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
    chatMessages: {
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
      boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
    },
    dot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#666',
      borderRadius: '50%',
      margin: '0 2px',
      animation: 'bounce 1.4s infinite',
    },
    chatInputContainer: {
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
    chatInput: {
      flex: 1,
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '24px',
      marginRight: '10px',
      marginBottom: '15px',
      outline: 'none',
      fontSize: '14px',
      transition: 'border-color 0.2s',
      ':focus': {
        borderColor: '#0056b3',
      },
    },
    chatButton: {
      backgroundColor: '#0056b3',
      color: 'white',
      border: 'none',
      borderRadius: '24px',
      padding: '10px 18px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.2s, transform 0.1s',
      ':hover': {
        backgroundColor: '#003d7c',
        transform: 'translateY(-2px)',
      },
    },
    chatButtonFixed: {
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
    },
    chatButtonFixedHover: {
      transform: 'scale(1.08) translateY(-3px)',
      boxShadow: '0 6px 15px rgba(0,0,0,0.3)',
    },
    buttonContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px',
    },
    primaryButton: {
      padding: '10px 14px',
      backgroundColor: '#0056b3',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 'bold',
      transition: 'background-color 0.2s, transform 0.2s, box-shadow 0.2s',
    },
    primaryButtonHover: {
      backgroundColor: '#003d7c',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,60,124,0.2)',
    },
    secondaryButton: {
      padding: '9px 13px',
      backgroundColor: '#f0f0f0',
      color: '#444',
      border: '1px solid #ddd',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '13px',
      transition: 'background-color 0.2s, transform 0.2s, box-shadow 0.2s',
    },
    secondaryButtonHover: {
      backgroundColor: '#e0e0e0',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
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
    // 处理机器人的打字指示器
    if (msg.isTypingIndicator) {
      return (
        <div key={`typing-${index}`} style={styles.typingIndicator}>
          <div style={{...styles.dot, animationDelay: '0s'}}></div>
          <div style={{...styles.dot, animationDelay: '0.2s'}}></div>
          <div style={{...styles.dot, animationDelay: '0.4s'}}></div>
        </div>
      );
    }

    // 处理用户消息
    if (msg.sender === 'user') {
      return (
        <div key={`user-${index}`} style={styles.userMessage}>
          {msg.text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < msg.text.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      );
    }

    // 处理机器人消息
    return (
      <div key={`bot-${index}`}>
        <div style={styles.botMessage}>
          {msg.text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < msg.text.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        
        {/* 如果有按钮，渲染按钮容器 */}
        {msg.buttons && msg.buttons.length > 0 && (
          <div style={styles.buttonContainer}>
            {msg.buttons.map((button, btnIndex) => (
              <button
                key={`btn-${index}-${btnIndex}`}
                onClick={button.action}
                style={button.type === 'primary' ? styles.primaryButton : styles.secondaryButton}
                onMouseOver={e => {
                  if (button.type === 'primary') {
                    e.currentTarget.style.backgroundColor = styles.primaryButtonHover.backgroundColor;
                    e.currentTarget.style.transform = styles.primaryButtonHover.transform;
                  } else {
                    e.currentTarget.style.backgroundColor = styles.secondaryButtonHover.backgroundColor;
                    e.currentTarget.style.transform = styles.secondaryButtonHover.transform;
                  }
                }}
                onMouseOut={e => {
                  if (button.type === 'primary') {
                    e.currentTarget.style.backgroundColor = styles.primaryButton.backgroundColor;
                    e.currentTarget.style.transform = 'translateY(0)';
                  } else {
                    e.currentTarget.style.backgroundColor = styles.secondaryButton.backgroundColor;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {button.text}
              </button>
            ))}
          </div>
        )}
      </div>
    );
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
    
    const currentUserMessage = { sender: 'user', text: userInput };
    // Add user message to chat immediately
    setChatMessages(prevMessages => [...prevMessages, currentUserMessage]);
    
    // Capture history *before* adding the current user message for the API call
    // The getOpenAIResponse function will add the `userInput` itself.
    const historyForAPI = [...chatMessages]; 
    
    // Process the user input to generate a response
    handleChatbotResponse(userInput, historyForAPI);
    
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
  const handleChatbotResponse = async (userMessageText, historyForAPI) => {
    const lowerCaseInput = userMessageText.toLowerCase();
    
    // 显示打字指示器
    setIsBotTyping(true);
    
    // 如果有API密钥，使用API
    if (llmApiKey) {
      try {
        const botResponseText = await getOpenAIResponse(userMessageText, historyForAPI, llmApiKey);
        setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponseText }]);
        
        // 处理特定关键词，自动添加导航按钮
        if (botResponseText.toLowerCase().includes('rq1') || 
            botResponseText.toLowerCase().includes('readiness')) {
          setTimeout(() => {
            setChatMessages(prevMessages => [
              ...prevMessages,
              { 
                sender: 'bot', 
                text: "Would you like to explore the readiness literature review in detail?",
                buttons: [
                  {
                    text: 'View RQ1: Readiness',
                    type: 'primary',
                    action: () => navigateToReview(1)
                  },
                  {
                    text: 'No thanks',
                    type: 'secondary',
                    action: () => {}
                  }
                ]
              }
            ]);
          }, 500);
        } else if (botResponseText.toLowerCase().includes('rq2') || 
                  botResponseText.toLowerCase().includes('ethics') || 
                  botResponseText.toLowerCase().includes('ethical')) {
          setTimeout(() => {
            setChatMessages(prevMessages => [
              ...prevMessages,
              { 
                sender: 'bot', 
                text: "Would you like to see the ethics literature review?",
                buttons: [
                  {
                    text: 'View RQ2: Ethics',
                    type: 'primary',
                    action: () => navigateToReview(2)
                  },
                  {
                    text: 'No thanks',
                    type: 'secondary',
                    action: () => {}
                  }
                ]
              }
            ]);
          }, 500);
        } else if (botResponseText.toLowerCase().includes('rq3') || 
                  botResponseText.toLowerCase().includes('practices') || 
                  botResponseText.toLowerCase().includes('benefits') ||
                  botResponseText.toLowerCase().includes('threats')) {
          setTimeout(() => {
            setChatMessages(prevMessages => [
              ...prevMessages,
              { 
                sender: 'bot', 
                text: "Would you like to explore the practices literature review?",
                buttons: [
                  {
                    text: 'View RQ3: Practices',
                    type: 'primary',
                    action: () => navigateToReview(3)
                  },
                  {
                    text: 'No thanks',
                    type: 'secondary',
                    action: () => {}
                  }
                ]
              }
            ]);
          }, 500);
        }
      } catch (error) {
        console.error("OpenAI API Error:", error);
        setChatMessages(prevMessages => [...prevMessages, { 
          sender: 'bot', 
          text: `AI Error: ${error.message}. Please check your API key and network.` 
        }]);
      } finally {
        setIsBotTyping(false);
      }
      return; // Exit after attempting API call
    }

    // 无API密钥时的规则逻辑
    setTimeout(() => {
      setIsBotTyping(false);
      let botResponseText = '';

      if (!llmApiKey) {
        setChatMessages(prevMessages => [
          ...prevMessages, 
          { 
            sender: 'bot', 
            text: "Please enter an OpenAI API Key for AI-powered responses. Otherwise, I offer pre-programmed help with the literature reviews." 
          }
        ]);
      }
      
      // 处理特定命令和问题的逻辑与原来相同
      // ... existing rule-based logic ...
      
    }, 800);
  };

  // --- Add getOpenAIResponse function here ---
  const getOpenAIResponse = async (currentInput, chatHistoryForAPI, apiKey) => {
    if (!apiKey) {
      throw new Error("OpenAI API Key is not set.");
    }
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const systemMessage = {
      role: "system",
      content: "You are an academic assistant specializing in literature reviews for the NTU GenAI Research Portal. Focus on discussing research papers, theoretical concepts, AI readiness, ethics, and educational practices related to AI in education. Provide insightful summaries and connections. Be concise and directly answer questions."
    };
    // Ensure chatHistoryForAPI messages are in the correct format, especially if they contain button objects
    const processedHistory = chatHistoryForAPI.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text // Assuming msg.text holds the core message content
    })).filter(msg => msg.content); // Filter out messages that might not have text (e.g. pure button messages)

    const formattedMessages = [
      systemMessage,
      ...processedHistory,
      { role: 'user', content: currentInput }
    ];

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ 
        model: 'gpt-4.1-nano', 
        messages: formattedMessages 
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
  // --- End of getOpenAIResponse function ---

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
              <h3 style={{ margin: 0, fontWeight: '500', fontSize: '1.1rem' }}>Literature Review Assistant</h3>
              <button
                onClick={toggleChatVisibility}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                ×
              </button>
            </div>
            <div style={styles.chatMessages} id="chat-messages">
              {chatMessages.map((message, index) => renderMessage(message, index))}
              {isBotTyping && renderMessage({ isTypingIndicator: true }, chatMessages.length)}
            </div>
            <div style={styles.chatInputContainer}>
              <div style={styles.messageInputContainerStyle}>
                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  aria-label="Chat message input"
                  style={{
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
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0056b3';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05), 0 0 0 3px rgba(0,86,179,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05)';
                  }}
                />
                <button 
                  onClick={handleSendMessage} 
                  style={{
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
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#003d7c';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#0056b3';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }}
                >
                  Send
                </button>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '5px',
              }}>
                <label htmlFor="apiKeyInput" style={{ 
                  marginRight: '10px',
                  fontSize: '0.9em',
                  color: '#555',
                }}>API Key:</label>
                <input
                  id="apiKeyInput"
                  type="password"
                  value={llmApiKey}
                  onChange={(e) => setLlmApiKey(e.target.value)}
                  placeholder="Enter your OpenAI API Key"
                  aria-label="OpenAI API Key"
                  style={{ 
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
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0056b3';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05), 0 0 0 3px rgba(0,86,179,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05)';
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            style={styles.chatButtonFixed}
            onClick={toggleChatVisibility}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = styles.chatButtonFixedHover.transform;
              e.currentTarget.style.boxShadow = styles.chatButtonFixedHover.boxShadow;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = styles.chatButtonFixed.boxShadow;
            }}
          >
            💬
          </div>
        )}
      </div>
      
      {/* 更新动画样式 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-5px); }
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

// Render the Literature Review Page
ReactDOM.render(
  React.createElement(LiteratureReviewPage, null),
  document.getElementById('root')
); 