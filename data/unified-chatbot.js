// Unified Chatbot Components
// This file provides common components for the chatbot across different pages

console.log('Loading unified-chatbot.js...');

// Define a namespace to avoid polluting global scope
window.unifiedChatbot = {};

// Base Dialog Component for chat interface
window.unifiedChatbot.BaseDialog = function(props) {
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [props.messages]);

  if (!props.isOpen) return null;

  const styles = {
    dialogPopup: {
      position: 'fixed',
      bottom: '100px',
      right: '30px',
      width: '350px',
      height: '500px',
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    header: {
      backgroundColor: '#003d7c',
      color: 'white',
      padding: '10px 15px',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: { 
      margin: 0,
      fontSize: '1.2em',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer',
    },
    messagesContainer: {
      flex: 1,
      padding: '15px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    inputContainer: {
      display: 'flex',
      padding: '10px',
      borderTop: '1px solid #eee',
    },
    input: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '20px',
      marginRight: '10px',
      outline: 'none',
    },
    sendButton: {
      backgroundColor: '#003d7c',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '8px 15px',
      cursor: 'pointer',
    },
    userMessage: {
      backgroundColor: '#003d7c',
      color: 'white',
      padding: '10px',
      borderRadius: '18px',
      maxWidth: '80%',
      alignSelf: 'flex-end',
      marginLeft: 'auto',
      borderBottomRightRadius: '3px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      wordWrap: 'break-word',
    },
    botMessage: {
      backgroundColor: '#f1f1f1',
      color: '#333',
      padding: '10px',
      borderRadius: '18px',
      maxWidth: '80%',
      alignSelf: 'flex-start',
      marginRight: 'auto',
      borderBottomLeftRadius: '3px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      wordWrap: 'break-word',
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '8px',
      alignSelf: 'flex-start',
    },
    button: {
      padding: '8px 12px',
      border: 'none',
      borderRadius: '16px',
      cursor: 'pointer',
      fontSize: '0.9em',
      textAlign: 'center',
      transition: 'all 0.2s',
    },
    primaryButton: {
      backgroundColor: '#003d7c',
      color: 'white',
    },
    secondaryButton: {
      backgroundColor: '#e8f0fe',
      color: '#003d7c',
      border: '1px solid #c9d9ec',
    },
    typingIndicator: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: '#f5f5f5',
      borderRadius: '18px',
      alignSelf: 'flex-start',
      width: 'fit-content',
    },
    typingDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#777',
      borderRadius: '50%',
      margin: '0 2px',
      animation: 'bounce 1.2s infinite',
    },
  };

  return React.createElement(
    'div', 
    { style: styles.dialogPopup },
    [
      React.createElement(
        'div', 
        { key: 'header', style: styles.header },
        [
          React.createElement('h3', { key: 'title', style: styles.headerTitle }, props.title || 'Chat'),
          React.createElement(
            'button', 
            { 
              key: 'close',
              style: styles.closeButton,
              onClick: props.onClose, 
              'aria-label': 'Close dialog'
            }, 
            '×'
          )
        ]
      ),
      
      React.createElement(
        'div', 
        { key: 'messages', style: styles.messagesContainer },
        [
          ...(props.messages || []).map((msg, index) => 
            React.createElement(
              'div', 
              { key: 'msg-' + index },
              [
                React.createElement(
                  'div', 
                  { 
                    key: 'text',
                    style: msg.sender === 'user' ? styles.userMessage : styles.botMessage 
                  },
                  msg.text.split('\n').map((line, i) => 
                    React.createElement(
                      React.Fragment, 
                      { key: i },
                      [
                        line,
                        i < msg.text.split('\n').length - 1 ? React.createElement('br', { key: 'br-' + i }) : null
                      ]
                    )
                  )
                ),
                
                msg.buttons && msg.buttons.length > 0 ? 
                  React.createElement(
                    'div', 
                    { key: 'buttons', style: styles.buttonsContainer },
                    msg.buttons.map((btn, btnIndex) => 
                      React.createElement(
                        'button',
                        {
                          key: 'btn-' + btnIndex,
                          style: {
                            ...styles.button,
                            ...(btn.type === 'primary' ? styles.primaryButton : styles.secondaryButton)
                          },
                          onClick: btn.action
                        },
                        btn.text
                      )
                    )
                  ) : null
              ]
            )
          ),
          
          props.typingIndicator ? 
            React.createElement(
              'div', 
              { key: 'typing', style: styles.typingIndicator },
              [
                React.createElement('div', { key: 'dot1', style: {...styles.typingDot, animationDelay: '0s'} }),
                React.createElement('div', { key: 'dot2', style: {...styles.typingDot, animationDelay: '0.2s'} }),
                React.createElement('div', { key: 'dot3', style: {...styles.typingDot, animationDelay: '0.4s'} })
              ]
            ) : null,
          
          React.createElement('div', { key: 'end', ref: messagesEndRef })
        ]
      ),
      
      React.createElement(
        'div', 
        { key: 'input', style: styles.inputContainer },
        [
          React.createElement(
            'input',
            {
              key: 'text-input',
              type: 'text',
              value: props.inputValue,
              onChange: (e) => props.setInputValue(e.target.value),
              onKeyPress: (e) => e.key === 'Enter' && props.handleSendMessage(e),
              placeholder: 'Type your message...',
              'aria-label': 'Chat message input',
              style: styles.input
            }
          ),
          React.createElement(
            'button',
            {
              key: 'send',
              onClick: props.handleSendMessage,
              'aria-label': 'Send message',
              title: 'Send message',
              style: styles.sendButton
            },
            'Send'
          )
        ]
      ),
      
      React.createElement(
        'style', 
        { 
          key: 'style',
          dangerouslySetInnerHTML: {
            __html: `
              @keyframes bounce {
                0%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-5px); }
              }
            `
          } 
        }
      )
    ]
  );
};

// FloatingButton Component
window.unifiedChatbot.FloatingButton = function(props) {
  const style = {
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
  };

  // Function to handle mouseover
  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
  };

  // Function to handle mouseout
  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
  };

  return React.createElement(
    'button', 
    {
      style: style,
      onClick: props.onClick,
      title: props.title || 'Chat',
      'aria-label': props.title || 'Chat',
      onMouseOver: handleMouseOver,
      onMouseOut: handleMouseOut
    },
    props.icon || '💬'
  );
};

// ChatButtonGroup Component
window.unifiedChatbot.ChatButtonGroup = function(props) {
  if (!props.buttons || props.buttons.length === 0) return null;
  
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    margin: '10px 0',
  };
  
  const buttonStyle = {
    padding: '8px 12px',
    backgroundColor: '#003d7c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s, transform 0.2s',
  };
  
  return React.createElement(
    'div',
    { style: style },
    props.buttons.map((btn, index) => 
      React.createElement(
        'button',
        {
          key: index,
          style: buttonStyle,
          onClick: btn.action,
          onMouseOver: (e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.backgroundColor = '#002d5c';
          },
          onMouseOut: (e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = '#003d7c';
          }
        },
        btn.text
      )
    )
  );
};

console.log('Unified Chatbot components loaded successfully');
console.log('Available components:', Object.keys(window.unifiedChatbot).join(', ')); 