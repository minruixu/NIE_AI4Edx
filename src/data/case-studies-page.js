import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import caseStudies from './case-studies.js';
import createWordCloudViewer from './case-wordcloud.js';

const CaseStudiesPage = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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
    // 聊天机器人样式
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
      width: '400px',
      height: '600px',
      backgroundColor: 'white',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      borderRadius: '12px',
      zIndex: 1002,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    dialogHeader: {
      backgroundColor: '#1a4785',
      color: 'white',
      padding: '15px 20px',
      borderTopLeftRadius: '12px',
      borderTopRightRadius: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dialogMessages: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      backgroundColor: '#ffffff',
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
    dialogInputContainer: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f9f9f9',
      borderTop: '1px solid #eaeaea',
    },
    messageInputContainer: {
      display: 'flex',
      marginBottom: '10px',
      padding: '10px 15px',
      backgroundColor: '#f9f9f9',
      borderTop: '1px solid #eaeaea',
    },
    messageInput: {
      flex: 1,
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '30px',
      marginRight: '10px',
      outline: 'none',
      fontSize: '16px',
    },
    sendButton: {
      backgroundColor: '#1a4785',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    apiKeyContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: '5px 15px 15px',
      backgroundColor: '#f9f9f9',
    },
    apiKeyLabel: {
      marginRight: '10px',
      fontSize: '18px',
      color: '#666',
      fontWeight: '500',
    },
    apiKeyInput: {
      flex: 1,
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
      color: '#666',
    },
    typingIndicator: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 16px',
      backgroundColor: '#f5f5f5',
      borderRadius: '18px',
      alignSelf: 'flex-start',
      marginRight: 'auto',
      width: 'fit-content',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
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

  // 聊天机器人组件
  const Dialog = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([
      { text: 'Welcome to the Case Studies Assistant! How can I help you explore our case studies?', sender: 'bot' }
    ]);
    const [botTyping, setBotTyping] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const messagesEndRef = React.useRef(null);

    // 自动滚动到底部
    React.useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [messages]);

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };

    const handleApiKeyChange = (e) => {
      setApiKey(e.target.value);
    };

    const handleSendMessage = (e) => {
      e.preventDefault();
      
      if (inputValue.trim() === '') return;
      
      // 添加用户消息
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      
      setInputValue('');
      setBotTyping(true);
      
      // 模拟机器人思考
      setTimeout(() => {
        setBotTyping(false);
        
        // 处理用户消息并生成回复
        const userText = inputValue.toLowerCase();
        let botResponse = { text: '', sender: 'bot' };
        
        if (userText.includes('case') && userText.includes('list')) {
          botResponse.text = `We have ${caseStudies.length} case studies covering different aspects of AI in education. Would you like me to list them for you?`;
        } else if (userText.includes('hello') || userText.includes('hi') || userText.includes('hey')) {
          botResponse.text = 'Hello! I can help you navigate through our case studies. What would you like to know?';
        } else if (userText.includes('categories') || userText.includes('types')) {
          const categories = [...new Set(caseStudies.map(c => c.category))];
          botResponse.text = `Our case studies cover these categories: ${categories.join(', ')}. Which category interests you?`;
        } else if (selectedCase) {
          botResponse.text = `You're currently viewing "${selectedCase.title}". This case study explores ${selectedCase.summary} Would you like to see a different case study?`;
        } else {
          botResponse.text = 'I can help you find specific case studies or explain their content. You can ask me about specific AI tools, teaching methods, or educational contexts covered in our case studies.';
        }
        
        setMessages(prev => [...prev, botResponse]);
      }, 1500);
    };

    return (
      <div style={styles.dialogPopup}>
        <div style={styles.dialogHeader}>
          <h3 style={{ margin: 0 }}>Case Studies Assistant</h3>
          <button 
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
            }}
            onClick={() => setIsDialogOpen(false)}
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
          
          {botTyping && (
            <div style={styles.typingIndicator}>
              <div style={{...styles.typingDot, animationDelay: '0s'}}></div>
              <div style={{...styles.typingDot, animationDelay: '0.2s'}}></div>
              <div style={{...styles.typingDot, animationDelay: '0.4s'}}></div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div style={styles.dialogInputContainer}>
          <div style={styles.messageInputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
              placeholder="Type your message..."
              style={styles.messageInput}
            />
            <button
              onClick={handleSendMessage}
              style={styles.sendButton}
            >
              Send
            </button>
          </div>
          
          <div style={styles.apiKeyContainer}>
            <div style={styles.apiKeyLabel}>API Key:</div>
            <input
              type="password"
              value={apiKey}
              onChange={handleApiKeyChange}
              placeholder="Enter your OpenAI API Key"
              style={styles.apiKeyInput}
            />
          </div>
        </div>
        
        {/* 动画样式 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes bounce {
              0%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-5px); }
            }
          `
        }} />
      </div>
    );
  };

  // 浮动按钮组件
  const FloatingButton = () => (
    <button 
      style={styles.fab} 
      onClick={() => setIsDialogOpen(true)}
      title="Chat with Case Studies Assistant"
    >
      💬
    </button>
  );

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
      
      {/* 聊天机器人组件 */}
      {isDialogOpen && <Dialog />}
      <FloatingButton />
    </div>
  );
};

// Render the component
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.render(<CaseStudiesPage />, root);

export default CaseStudiesPage; 