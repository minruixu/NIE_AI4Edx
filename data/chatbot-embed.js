// Chatbot Embed Script

// Function to dispatch navigation events
const navigateFindingsPage = (tab, section) => {
  console.log(`Chatbot: Dispatching navigateFindings event - Tab: ${tab}, Section: ${section}`);
  document.dispatchEvent(new CustomEvent('navigateFindings', { 
    detail: { tab, section }
  }));
};

// Dialog Component with unified components and LLM integration
class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      messages: [
        { 
          text: 'Hello! I can help you navigate the Findings page or answer questions about the research. What would you like to do?', 
          sender: 'bot', 
          buttons: [
            { 
              text: 'Quantitative Findings', 
              type: 'primary',
              action: () => this.handleNavigationChoice('quantitative') 
            },
            { 
              text: 'Qualitative Findings', 
              type: 'primary',
              action: () => this.handleNavigationChoice('qualitative') 
            },
            { 
              text: 'Recommendations', 
              type: 'primary',
              action: () => this.handleNavigationChoice('recommendations') 
            },
          ]
        }
      ],
      typingIndicator: false,
      llmApiKey: localStorage.getItem('nie_llm_api_key') || '',
      messagesEndRef: React.createRef()
    };
  }

  componentDidUpdate() {
    // Scroll to bottom when messages update
    if (this.state.messagesEndRef.current) {
      this.state.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  addMessage = (message) => {
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }));
  }

  handleNavigationChoice = (choice, subChoice = null) => {
    let userText = '';
    let botResponse = { sender: 'bot', text: 'Navigating...', buttons: [] };

    if (choice === 'quantitative') {
      userText = subChoice ? `Quantitative: ${subChoice}` : 'Quantitative Findings';
      if (!subChoice) {
        botResponse.text = 'Navigating to Quantitative Findings. Which section?';
        botResponse.buttons = [
          { 
            text: 'Instructor Data', 
            type: 'secondary',
            action: () => this.handleNavigationChoice('quantitative', 'instructors') 
          },
          { 
            text: 'Student Data', 
            type: 'secondary',
            action: () => this.handleNavigationChoice('quantitative', 'students') 
          },
          { 
            text: 'Survey Appendix', 
            type: 'secondary',
            action: () => this.handleNavigationChoice('quantitative', 'appendix') 
          },
        ];
        this.addMessage({ text: userText, sender: 'user' });
        this.addMessage(botResponse);
        return;
      } else {
        navigateFindingsPage('quantitative', subChoice);
        botResponse.text = `Navigating to Quantitative Findings: ${subChoice}.`;
      }
    } else if (choice === 'qualitative') {
      userText = subChoice ? `Qualitative: ${subChoice}` : 'Qualitative Findings';
      if (!subChoice) {
        botResponse.text = 'Navigating to Qualitative Findings. Which section?';
        botResponse.buttons = [
          { 
            text: 'Instructor Analysis', 
            type: 'secondary',
            action: () => this.handleNavigationChoice('qualitative', 'instructors') 
          },
          { 
            text: 'Student Analysis', 
            type: 'secondary',
            action: () => this.handleNavigationChoice('qualitative', 'students') 
          },
        ];
        this.addMessage({ text: userText, sender: 'user' });
        this.addMessage(botResponse);
        return;
      } else {
        navigateFindingsPage('qualitative', subChoice);
        botResponse.text = `Navigating to Qualitative Findings: ${subChoice}.`;
      }
    } else if (choice === 'recommendations') {
      userText = 'Recommendations';
      navigateFindingsPage('recommendations', null);
      botResponse.text = 'Navigating to Recommendations.';
    }
    this.addMessage({ text: userText, sender: 'user' });
    this.addMessage(botResponse);
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleApiKeyChange = (e) => {
    const apiKey = e.target.value;
    this.setState({ llmApiKey: apiKey });
    localStorage.setItem('nie_llm_api_key', apiKey);
  }

  getOpenAIResponse = async (userInput, chatHistory) => {
    const apiKey = this.state.llmApiKey;
    if (!apiKey) {
      throw new Error("OpenAI API Key is not set.");
    }

    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const systemMessage = {
      role: "system",
      content: "You are a helpful research assistant for the NIE AI4Edx research project findings page. You assist users in navigating the findings and answering questions about the research. Be concise and factual. The research surveyed 128 instructors and 496 students about AI readiness, ethics, and practices in higher education. Key findings include: instructors showed moderate AI readiness (mean scores ranging from 3.06 to 3.72 across dimensions), with high ethics awareness (M=3.72) but lower confidence in ability to use AI (M=3.06); students showed higher AI readiness compared to instructors, with better ability to use AI (M=3.47) and greater perception of AI-enhanced innovation (M=3.69)."
    };
    
    const formattedMessages = [
      systemMessage,
      ...chatHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: userInput }
    ];

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: formattedMessages,
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const choice = data.choices && data.choices[0];
      return choice?.message?.content || "Sorry, I couldn't retrieve a valid response.";
    } catch (error) {
      console.error("Error in OpenAI API call:", error);
      throw error;
    }
  }

  handleSendMessage = async (e) => {
    e.preventDefault();
    if (this.state.inputValue.trim() === '') return;
    
    const userText = this.state.inputValue;
    this.addMessage({ text: userText, sender: 'user' });
    this.setState({ inputValue: '', typingIndicator: true });
    
    // Check for API key first
    if (!this.state.llmApiKey) {
      setTimeout(() => {
        this.setState({ typingIndicator: false });
        this.addMessage({ 
          text: 'Please enter your OpenAI API Key in the field below to enable AI responses.', 
          sender: 'bot' 
        });
      }, 500);
      return;
    }
    
    // Check for direct navigation commands first
    const lowerUserText = userText.toLowerCase();
    let handled = false;

    if (lowerUserText.includes('quantitative') && !lowerUserText.includes('what') && !lowerUserText.includes('explain')) {
      if (lowerUserText.includes('instructor')) { 
        this.handleNavigationChoice('quantitative', 'instructors'); 
        handled = true; 
      } else if (lowerUserText.includes('student')) { 
        this.handleNavigationChoice('quantitative', 'students'); 
        handled = true; 
      } else if (lowerUserText.includes('appendix')) { 
        this.handleNavigationChoice('quantitative', 'appendix'); 
        handled = true; 
      } else { 
        this.handleNavigationChoice('quantitative'); 
        handled = true; 
      }
    } else if (lowerUserText.includes('qualitative') && !lowerUserText.includes('what') && !lowerUserText.includes('explain')) {
      if (lowerUserText.includes('instructor')) { 
        this.handleNavigationChoice('qualitative', 'instructors'); 
        handled = true; 
      } else if (lowerUserText.includes('student')) { 
        this.handleNavigationChoice('qualitative', 'students'); 
        handled = true; 
      } else { 
        this.handleNavigationChoice('qualitative'); 
        handled = true; 
      }
    } else if (lowerUserText.includes('recommendation') && !lowerUserText.includes('what') && !lowerUserText.includes('explain')) {
      this.handleNavigationChoice('recommendations'); 
      handled = true;
    }
    
    // If not handled as navigation, use LLM
    if (!handled) {
      try {
        // Filter out messages with buttons for better context
        const chatHistory = this.state.messages.filter(msg => !msg.buttons || msg.buttons.length === 0);
        const aiResponse = await this.getOpenAIResponse(userText, chatHistory);
        
        this.setState({ typingIndicator: false });
        this.addMessage({ text: aiResponse, sender: 'bot' });
      } catch (error) {
        console.error("Error getting AI response:", error);
        this.setState({ typingIndicator: false });
        this.addMessage({ 
          text: `Error: ${error.message}. Please check your API key and network connection.`, 
          sender: 'bot' 
        });
      }
    }
  }

  render() {
    if (!this.props.isOpen) return null;
    
    // Dialog container styles based on literature-review-page.js
    const styles = {
      dialogContainer: {
        position: 'fixed',
        bottom: '30px', // Changed from 100px
        right: '30px', // Consistent
        width: '380px', // Changed from 350px
        height: '520px', // Changed from 500px
        backgroundColor: 'white',
        boxShadow: '0 5px 20px rgba(0,0,0,0.15)', // Enhanced shadow
        borderRadius: '16px', // New, more rounded
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.3s ease', // Added transition
        animation: 'dialogFadeIn 0.3s ease', // Added animation
      },
      header: {
        backgroundColor: '#003d7c',
        backgroundImage: 'linear-gradient(135deg, #003d7c 0%, #0056b3 100%)', // Gradient background
        color: '#fff', // Changed to white for better contrast
        padding: '15px 20px', // Increased padding
        borderTopLeftRadius: '16px', // Match container
        borderTopRightRadius: '16px', // Match container
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Added shadow
      },
      headerTitle: { 
        margin: 0,
        fontSize: '1.1rem', // Adjusted size
        fontWeight: '500', // Adjusted weight
      },
      closeButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '18px', // Consistent size
        cursor: 'pointer',
        padding: '5px', // Added for better click area
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        transition: 'background-color 0.2s',
      },
      messagesContainer: {
        flex: 1,
        padding: '20px', // Increased padding
        paddingBottom: '10px',
        marginBottom: '5px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        backgroundColor: '#f8f9fa', // Light background for messages area
      },
      inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 15px', // Adjusted padding
        borderTop: '1px solid #eaeaea', // Lighter border
        backgroundColor: 'white',
      },
      messageInputContainer: { // Contains input and send button
        display: 'flex',
        alignItems: 'flex-start', // Align items to the start for multiline input
        // marginBottom: '10px', // Removed, spacing handled by chatInput and sendButton
      },
      messageInput: {
        flex: 1,
        padding: '10px 15px',
        border: '1px solid #ddd',
        borderRadius: '40px', // Pill shape
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
        borderRadius: '40px', // Pill shape
        padding: '10px 25px', // Adjusted padding
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
        marginBottom: '5px', // Added margin
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
      buttonsContainer: {
        display: 'flex',
        flexWrap: 'wrap', // Allow buttons to wrap
        gap: '8px',
        marginTop: '8px',
        // alignSelf: 'flex-start', // Removed to allow centering if only one button row
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
        // Removed flex properties to be more general for buttons
      },
      primaryButtonHover: { // For JS hover effects
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
      secondaryButtonHover: { // For JS hover effects
        backgroundColor: '#e0e0e0',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
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
      },
      typingDot: {
        width: '8px',
        height: '8px',
        backgroundColor: '#666',
        borderRadius: '50%',
        margin: '0 2px',
        animation: 'bounce 1.4s infinite',
      },
    };
    
    // Create a CSS animation for typing indicator and scrollbar
    const keyframesStyle = `
      @keyframes bounce {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-5px); }
      }
      
      @keyframes dialogFadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      /* Scrollbar styles from literature review */
      /* Apply to a class or ID if possible, otherwise direct styling to messagesContainer */
      .chat-messages-container::-webkit-scrollbar {
        width: 6px;
      }
      .chat-messages-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      .chat-messages-container::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 10px;
      }
      .chat-messages-container::-webkit-scrollbar-thumb:hover {
        background: #aaa;
      }
    `;
    
    return React.createElement(
      'div',
      { style: styles.dialogContainer },
      [
        // Header
        React.createElement(
          'div',
          { key: 'header', style: styles.header },
          [
            React.createElement('h3', { key: 'title', style: styles.headerTitle }, 'Findings Assistant'),
            React.createElement(
              'button',
              {
                key: 'close',
                style: styles.closeButton,
                onClick: this.props.onClose,
                onMouseOver: (e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; },
                onMouseOut: (e) => { e.currentTarget.style.backgroundColor = 'transparent'; },
                'aria-label': 'Close dialog'
              },
              '×'
            )
          ]
        ),
        
        // Messages Container
        React.createElement(
          'div',
          { key: 'messages', style: styles.messagesContainer, className: 'chat-messages-container' }, // Added className for scrollbar
          [
            // Map through messages
            ...this.state.messages.map((msg, index) => 
              React.createElement(
                'div',
                { key: `msg-${index}` },
                [
                  // Message text
                  React.createElement(
                    'div',
                    { style: msg.sender === 'user' ? styles.userMessage : styles.botMessage },
                    msg.text.split('\n').map((line, i) => 
                      React.createElement(
                        React.Fragment,
                        { key: i },
                        [
                          line,
                          i < msg.text.split('\n').length - 1 ? React.createElement('br', { key: `br-${i}` }) : null
                        ]
                      )
                    )
                  ),
                  
                  // Message buttons (if any)
                  msg.buttons && msg.buttons.length > 0 ?
                    React.createElement(
                      'div',
                      { style: styles.buttonsContainer },
                      msg.buttons.map((btn, btnIndex) => 
                        React.createElement(
                          'button',
                          {
                            key: `btn-${btnIndex}`,
                            style: btn.type === 'primary' ? styles.primaryButton : styles.secondaryButton,
                            onClick: btn.action,
                            onMouseOver: e => {
                              if (btn.type === 'primary') {
                                e.currentTarget.style.backgroundColor = styles.primaryButtonHover.backgroundColor;
                                e.currentTarget.style.transform = styles.primaryButtonHover.transform;
                                e.currentTarget.style.boxShadow = styles.primaryButtonHover.boxShadow;
                              } else {
                                e.currentTarget.style.backgroundColor = styles.secondaryButtonHover.backgroundColor;
                                e.currentTarget.style.transform = styles.secondaryButtonHover.transform;
                                e.currentTarget.style.boxShadow = styles.secondaryButtonHover.boxShadow;
                              }
                            },
                            onMouseOut: e => {
                              if (btn.type === 'primary') {
                                e.currentTarget.style.backgroundColor = styles.primaryButton.backgroundColor;
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              } else {
                                e.currentTarget.style.backgroundColor = styles.secondaryButton.backgroundColor;
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }
                            }
                          },
                          btn.text
                        )
                      )
                    ) : null
                ]
              )
            ),
            
            // Typing Indicator
            this.state.typingIndicator ?
              React.createElement(
                'div',
                { style: styles.typingIndicator },
                [
                  React.createElement('div', { key: 'dot1', style: {...styles.typingDot, animationDelay: '0s'} }),
                  React.createElement('div', { key: 'dot2', style: {...styles.typingDot, animationDelay: '0.2s'} }),
                  React.createElement('div', { key: 'dot3', style: {...styles.typingDot, animationDelay: '0.4s'} })
                ]
              ) : null,
            
            // Reference for scrolling
            React.createElement('div', { key: 'end', ref: this.state.messagesEndRef })
          ]
        ),
        
        // Input Container
        React.createElement(
          'div',
          { key: 'input', style: styles.inputContainer },
          [
            // Message Input
            React.createElement(
              'div',
              { key: 'message-input', style: styles.messageInputContainer },
              [
                React.createElement(
                  'input',
                  {
                    key: 'text',
                    type: 'text',
                    value: this.state.inputValue,
                    onChange: this.handleInputChange,
                    onKeyPress: (e) => e.key === 'Enter' && this.handleSendMessage(e),
                    placeholder: 'Type your message...',
                    'aria-label': 'Chat message input',
                    style: styles.messageInput, // Applied
                    onFocus: (e) => { // Added focus style
                        e.currentTarget.style.borderColor = '#0056b3';
                        e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05), 0 0 0 3px rgba(0,86,179,0.1)';
                    },
                    onBlur: (e) => { // Added blur style
                        e.currentTarget.style.borderColor = '#ddd';
                        e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05)';
                    }
                  }
                ),
                React.createElement(
                  'button',
                  {
                    key: 'send',
                    onClick: this.handleSendMessage,
                    'aria-label': 'Send message',
                    title: 'Send message',
                    style: styles.sendButton, // Applied
                    onMouseOver: (e) => { // Added hover style
                        e.currentTarget.style.backgroundColor = '#003d7c';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                    },
                    onMouseOut: (e) => { // Added mouseout style
                        e.currentTarget.style.backgroundColor = '#0056b3'; // Or original backgroundImage if preferred
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    }
                  },
                  'Send'
                )
              ]
            ),
            
            // API Key Input
            React.createElement(
              'div',
              { key: 'api-key', style: styles.apiKeyContainer },
              [
                React.createElement('label', { key: 'label', style: styles.apiKeyLabel }, 'API Key:'),
                React.createElement(
                  'input',
                  {
                    key: 'key-input',
                    type: 'password',
                    value: this.state.llmApiKey,
                    onChange: this.handleApiKeyChange,
                    placeholder: 'Enter OpenAI API Key',
                    'aria-label': 'OpenAI API Key',
                    style: styles.apiKeyInput, // Applied
                    onFocus: (e) => { // Added focus style
                        e.currentTarget.style.borderColor = '#0056b3';
                        e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05), 0 0 0 3px rgba(0,86,179,0.1)';
                    },
                    onBlur: (e) => { // Added blur style
                        e.currentTarget.style.borderColor = '#ddd';
                        e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05)';
                    }
                  }
                )
              ]
            )
          ]
        ),
        
        // Style Element for Animations
        React.createElement(
          'style',
          { key: 'style', dangerouslySetInnerHTML: { __html: keyframesStyle } }
        )
      ]
    );
  }
}

// Main ChatbotApp Component
class ChatbotApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false
    };
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  }

  closeDialog = () => {
    this.setState({ isDialogOpen: false });
  }

  render() {
    // Floating button styles from literature-review-page.js
    const floatingButtonStyle = {
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
    };
    
    if (!window.unifiedChatbot || !window.unifiedChatbot.FloatingButton) {
      console.error('Unified chatbot components not available');
      return React.createElement(
        'button',
        { 
          onClick: this.openDialog,
          style: floatingButtonStyle,
          onMouseOver: (e) => {
            e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
          },
          onMouseOut: (e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.25)';
          }
        },
        '💬'
      );
    }
    
    return React.createElement(
      'div',
      null,
      [
        React.createElement(
          'button',
          { 
            key: 'button',
            onClick: this.openDialog,
            style: floatingButtonStyle,
            onMouseOver: (e) => {
              e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
            },
            onMouseOut: (e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.25)';
            }
          },
          '💬'
        ),
        React.createElement(
          Dialog,
          {
            key: 'dialog',
            isOpen: this.state.isDialogOpen,
            onClose: this.closeDialog
          }
        )
      ]
    );
  }
}

// Function to render the chatbot app
const renderChatbotApp = () => {
  const container = document.getElementById('chatbot-container');
  if (container) {
    console.log('Rendering chatbot in existing container');
    ReactDOM.render(React.createElement(ChatbotApp), container);
  } else {
    console.log('Creating container for chatbot');
    const newContainer = document.createElement('div');
    newContainer.id = 'chatbot-container';
    document.body.appendChild(newContainer);
    ReactDOM.render(React.createElement(ChatbotApp), newContainer);
  }
};

// Load unified chatbot script if needed, then render
const loadUnifiedChatbot = () => {
  if (window.unifiedChatbot) {
    console.log('Unified chatbot already loaded, rendering app');
    renderChatbotApp();
    return;
  }

  console.log('Loading unified chatbot script');
  const script = document.createElement('script');
  
  // Try to determine the correct path to the script
  const scriptPath = (() => {
    // Get the path of the current script
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const currentPath = currentScript.src;
    const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    return `${basePath}/unified-chatbot.js`;
  })();
  
  console.log('Attempting to load unified chatbot from:', scriptPath);
  script.src = scriptPath;
  
  script.onload = () => {
    console.log('Unified chatbot script loaded successfully');
    renderChatbotApp();
  };
  script.onerror = (error) => {
    console.error('Error loading unified chatbot script:', error);
    // Create a simple fallback if the script fails to load
    window.unifiedChatbot = {
      FloatingButton: ({ onClick }) => React.createElement(
        'button',
        {
          onClick,
          style: { // Apply FAB styling from literature review
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
          onMouseOver: (e) => {
            e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
          },
          onMouseOut: (e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.25)';
          }
        },
        '💬'
      )
    };
    renderChatbotApp();
  };
  document.head.appendChild(script);
};

// Execute when the document is loaded
document.addEventListener('DOMContentLoaded', loadUnifiedChatbot);

// Try to initialize immediately if document is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  loadUnifiedChatbot();
} 