// Chatbot Embed Script

const chatbotStyles = {
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
  chatButton: {
    backgroundColor: '#0056b3',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px 5px 5px 0',
    fontSize: '0.9em',
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
  }
};

// Function to dispatch navigation events
const navigateFindingsPage = (tab, section) => {
  console.log(`Chatbot: Dispatching navigateFindings event - Tab: ${tab}, Section: ${section}`);
  document.dispatchEvent(new CustomEvent('navigateFindings', { 
    detail: { tab, section }
  }));
};

const Dialog = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = React.useState('');
  const initialMessages = [
    { 
      text: 'Hello! I can help you navigate the Findings page or answer questions about the research. What would you like to do?', 
      sender: 'bot', 
      buttons: [
        { text: 'Quantitative Findings', action: () => handleNavigationChoice('quantitative') },
        { text: 'Qualitative Findings', action: () => handleNavigationChoice('qualitative') },
        { text: 'Recommendations', action: () => handleNavigationChoice('recommendations') },
      ]
    }
  ];
  const [messages, setMessages] = React.useState(initialMessages);
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleNavigationChoice = (choice, subChoice = null) => {
    let userText = '';
    let botResponse = { sender: 'bot', text: 'Navigating...', buttons: [] };

    if (choice === 'quantitative') {
      userText = subChoice ? `Quantitative: ${subChoice}` : 'Quantitative Findings';
      if (!subChoice) {
        botResponse.text = 'Navigating to Quantitative Findings. Which section?';
        botResponse.buttons = [
          { text: 'Instructor Data', action: () => handleNavigationChoice('quantitative', 'instructors') },
          { text: 'Student Data', action: () => handleNavigationChoice('quantitative', 'students') },
          { text: 'Survey Appendix', action: () => handleNavigationChoice('quantitative', 'appendix') },
        ];
        addMessage({ text: userText, sender: 'user' });
        addMessage(botResponse);
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
          { text: 'Instructor Analysis', action: () => handleNavigationChoice('qualitative', 'instructors') },
          { text: 'Student Analysis', action: () => handleNavigationChoice('qualitative', 'students') },
        ];
        addMessage({ text: userText, sender: 'user' });
        addMessage(botResponse);
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
    addMessage({ text: userText, sender: 'user' });
    addMessage(botResponse);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    const userText = inputValue;
    addMessage({ text: userText, sender: 'user' });
    setInputValue('');
    
    setTimeout(() => {
      const lowerUserText = userText.toLowerCase();
      let botResponseText = 'Sorry, I can only help with navigation or general questions about the findings for now.';
      let matched = false;

      if (lowerUserText.includes('quantitative')) {
        if (lowerUserText.includes('instructor')) { handleNavigationChoice('quantitative', 'instructors'); matched = true; } 
        else if (lowerUserText.includes('student')) { handleNavigationChoice('quantitative', 'students'); matched = true; } 
        else if (lowerUserText.includes('appendix')) { handleNavigationChoice('quantitative', 'appendix'); matched = true; } 
        else { handleNavigationChoice('quantitative'); matched = true; }
      } else if (lowerUserText.includes('qualitative')) {
        if (lowerUserText.includes('instructor')) { handleNavigationChoice('qualitative', 'instructors'); matched = true; } 
        else if (lowerUserText.includes('student')) { handleNavigationChoice('qualitative', 'students'); matched = true; } 
        else { handleNavigationChoice('qualitative'); matched = true; }
      } else if (lowerUserText.includes('recommendation')) {
        handleNavigationChoice('recommendations'); matched = true;
      } else if (lowerUserText.includes('instructor') || lowerUserText.includes('faculty') || lowerUserText.includes('teacher')) {
        botResponseText = 'Our instructor findings (N=128) show that 42% incorporate GenAI into teaching... (details)'; matched = true;
      } else if (lowerUserText.includes('student')) {
        botResponseText = 'Our student findings (N=480) show 78% use GenAI weekly... (details)'; matched = true;
      } // Add more general Q&A here

      if (matched && botResponseText.startsWith('Sorry')) return; // Avoid double messaging if handled by handleNavigationChoice
      
      if (!matched) {
          addMessage({ text: botResponseText, sender: 'bot' });
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div style={chatbotStyles.dialogPopup}>
      <div style={chatbotStyles.dialogHeader}>
        <h3 style={{ margin: 0 }}>Findings Assistant</h3>
        <button 
          style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div style={chatbotStyles.dialogMessages}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === 'user' ? chatbotStyles.userMessage : chatbotStyles.botMessage}>
            {msg.text}
            {msg.buttons && msg.buttons.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                {msg.buttons.map((btn, btnIndex) => (
                  <button key={btnIndex} onClick={btn.action} style={chatbotStyles.chatButton}>
                    {btn.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={chatbotStyles.dialogInputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
          placeholder="Ask about findings or navigate..."
          style={chatbotStyles.dialogInput}
        />
        <button onClick={handleSendMessage} style={chatbotStyles.dialogSendButton}>➤</button>
      </div>
    </div>
  );
};

const FloatingButton = ({ onClick }) => (
  <button style={chatbotStyles.fab} onClick={onClick}>💬</button>
);

const ChatbotApp = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      {!isDialogOpen && <FloatingButton onClick={openDialog} />}
      {isDialogOpen && <Dialog isOpen={true} onClose={closeDialog} />}
    </>
  );
};

const chatbotContainer = document.getElementById('chatbot-container');
if (chatbotContainer) {
  ReactDOM.render(<ChatbotApp />, chatbotContainer);
} else {
  console.error('Chatbot container not found. Please add <div id="chatbot-container"></div> to your HTML.');
} 