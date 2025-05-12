// Note: This is a compiled version for the browser with the necessary globals
// The imports are provided by the script tags in the HTML

const CaseStudiesPage = () => {
  const [selectedCase, setSelectedCase] = React.useState(null);
  const [showChatbot, setShowChatbot] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState([
    { 
      sender: 'bot', 
      text: 'We have AI case studies in Teaching, Science, Engineering, and Ethics. Please select an area of interest:',
      buttons: [
        {
          text: 'Teaching Cases',
          action: () => {
            const teachingCases = window.caseStudies.filter(cs => cs.category === 'Teaching');
            setChatMessages(prevMessages => [
              ...prevMessages,
              { sender: 'user', text: 'Teaching Cases' },
              { 
                sender: 'bot', 
                text: 'We have multiple teaching-related case studies showing different approaches to AI integration:' 
              },
              createCategoryNavButtons('Teaching', teachingCases)
            ]);
          }
        },
        {
          text: 'Science Cases',
          action: () => {
            const scienceCases = window.caseStudies.filter(cs => cs.category === 'Science');
            setChatMessages(prevMessages => [
              ...prevMessages,
              { sender: 'user', text: 'Science Cases' },
              { 
                sender: 'bot', 
                text: 'Our science case studies focus on lab work, data interpretation, and scientific literacy:' 
              },
              createCategoryNavButtons('Science', scienceCases)
            ]);
          }
        },
        {
          text: 'Engineering Cases',
          action: () => {
            const engineeringCases = window.caseStudies.filter(cs => cs.category === 'Engineering');
            setChatMessages(prevMessages => [
              ...prevMessages,
              { sender: 'user', text: 'Engineering Cases' },
              { 
                sender: 'bot', 
                text: 'Our engineering case studies showcase AI applications in design feedback and technical problem-solving:' 
              },
              createCategoryNavButtons('Engineering', engineeringCases)
            ]);
          }
        },
        {
          text: 'Ethics Cases',
          action: () => {
            const ethicsCases = window.caseStudies.filter(cs => cs.category === 'Ethics');
            setChatMessages(prevMessages => [
              ...prevMessages,
              { sender: 'user', text: 'Ethics Cases' },
              { 
                sender: 'bot', 
                text: 'Our ethics case studies examine ethical considerations in AI integration:' 
              },
              createCategoryNavButtons('Ethics', ethicsCases)
            ]);
          }
        }
      ]
    }
  ]);
  const [userInput, setUserInput] = React.useState('');
  const [llmApiKey, setLlmApiKey] = React.useState('');
  const [isBotTyping, setIsBotTyping] = React.useState(false);
  const [quotedText, setQuotedText] = React.useState(null);
  
  // Initialize word clouds after component mounts
  React.useEffect(() => {
    // Initialize word clouds for visible containers
    if (selectedCase && selectedCase.hasWordCloud) {
      setTimeout(() => {
        window.createWordCloudViewer(`wordcloud-container-${selectedCase.id}`);
      }, 100);
    }
    
    // Add a message when a case study is selected directly from the grid
    if (selectedCase) {
      // Automatically show chatbot when a case is selected
      setShowChatbot(true);
      
      // Clear previous messages when a new case is selected to avoid message stacking
      const lastMessage = chatMessages[chatMessages.length - 1];
      const chatbotAlreadyAcknowledged = lastMessage && 
        lastMessage.sender === 'bot' && 
        lastMessage.text && 
        lastMessage.text.includes(selectedCase.title);
        
      if (!chatbotAlreadyAcknowledged) {
        // Find related case studies (same category)
        const relatedCases = window.caseStudies.filter(cs => 
          cs.id !== selectedCase.id && cs.category === selectedCase.category
        );
        
        // Reset chat messages with a fresh welcome message for this case study
        setChatMessages([
          {
            sender: 'bot',
            text: `You're viewing "${selectedCase.title}". ${getCaseStudyDetails(selectedCase)}`
          },
          {
            sender: 'bot',
            text: 'Would you like to explore the reflection prompts for this case?',
            buttons: [
              {
                text: 'Show Reflection Prompts',
                action: () => {
                  setChatMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'user', text: 'Show Reflection Prompts' },
                    { 
                      sender: 'bot', 
                      text: `Here are the reflection questions for "${selectedCase.title}". Click on any question to explore it further:`,
                    },
                    { 
                      sender: 'bot', 
                      text: 'Select a reflection question to explore:',
                      buttons: selectedCase.reflectionPrompts.map((prompt, idx) => {
                        return {
                          text: prompt,
                          action: () => {
                            setChatMessages(prevMessages => [
                              ...prevMessages,
                              { sender: 'user', text: prompt },
                              { 
                                sender: 'bot', 
                                text: `Let's explore this reflection question: "${prompt}"\n\nConsider how this applies to your own teaching context. Would you like some suggestions for implementing this approach?`,
                                buttons: [
                                  {
                                    text: 'Give me implementation ideas',
                                    action: () => {
                                      setChatMessages(prevMessages => [
                                        ...prevMessages,
                                        { sender: 'user', text: 'Give me implementation ideas' },
                                        { 
                                          sender: 'bot', 
                                          text: `Here are some implementation ideas for this reflection question:\n\n• Start with a small assignment or activity to test the approach\n• Provide clear guidelines to students about AI tool usage\n• Create a reflection worksheet for students to document their process\n• Consider both individual and collaborative activities\n• Build in checkpoints to ensure students are engaging critically`
                                        }
                                      ]);
                                    }
                                  },
                                  {
                                    text: 'See related case studies',
                                    action: () => {
                                      const relatedCases = window.caseStudies.filter(cs => 
                                        cs.id !== selectedCase.id && cs.category === selectedCase.category
                                      );
                                      setChatMessages(prevMessages => [
                                        ...prevMessages,
                                        { sender: 'user', text: 'See related case studies' },
                                        createCategoryNavButtons(selectedCase.category, relatedCases)
                                      ]);
                                    }
                                  }
                                ]
                              }
                            ]);
                          }
                        };
                      })
                    }
                  ]);
                }
              },
              {
                text: 'See Related Cases',
                action: () => {
                  // Find related case studies (same category)
                  const relatedCases = window.caseStudies.filter(cs => 
                    cs.id !== selectedCase.id && cs.category === selectedCase.category
                  );
                  setChatMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'user', text: 'See Related Cases' },
                    { 
                      sender: 'bot', 
                      text: `Here are other ${selectedCase.category} case studies you might find interesting:` 
                    },
                    createCategoryNavButtons(selectedCase.category, relatedCases)
                  ]);
                }
              },
              {
                text: 'All Categories',
                action: () => {
                  setChatMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'user', text: 'All Categories' },
                    { 
                      sender: 'bot', 
                      text: 'We have AI case studies in these categories:',
                      buttons: [
                        {
                          text: 'Explore Teaching Cases',
                          action: () => {
                            const teachingCases = window.caseStudies.filter(cs => cs.category === 'Teaching');
                            setChatMessages(prevMessages => [
                              ...prevMessages,
                              { sender: 'user', text: 'Teaching Cases' },
                              { 
                                sender: 'bot', 
                                text: 'We have multiple teaching-related case studies:' 
                              },
                              createCategoryNavButtons('Teaching', teachingCases)
                            ]);
                          }
                        },
                        {
                          text: 'View Science Case Studies',
                          action: () => {
                            const scienceCases = window.caseStudies.filter(cs => cs.category === 'Science');
                            setChatMessages(prevMessages => [
                              ...prevMessages,
                              { sender: 'user', text: 'Science Cases' },
                              { 
                                sender: 'bot', 
                                text: 'Our science case studies:' 
                              },
                              createCategoryNavButtons('Science', scienceCases)
                            ]);
                          }
                        },
                        {
                          text: 'Browse Engineering Cases',
                          action: () => {
                            const engineeringCases = window.caseStudies.filter(cs => cs.category === 'Engineering');
                            setChatMessages(prevMessages => [
                              ...prevMessages,
                              { sender: 'user', text: 'Engineering Cases' },
                              { 
                                sender: 'bot', 
                                text: 'Our engineering case studies:' 
                              },
                              createCategoryNavButtons('Engineering', engineeringCases)
                            ]);
                          }
                        },
                        {
                          text: 'See Ethics & AI Cases',
                          action: () => {
                            const ethicsCases = window.caseStudies.filter(cs => cs.category === 'Ethics');
                            setChatMessages(prevMessages => [
                              ...prevMessages,
                              { sender: 'user', text: 'Ethics Cases' },
                              { 
                                sender: 'bot', 
                                text: 'Our ethics case studies:' 
                              },
                              createCategoryNavButtons('Ethics', ethicsCases)
                            ]);
                          }
                        }
                      ]
                    }
                  ]);
                }
              }
            ]
          }
        ]);
      }
    }
  }, [selectedCase]);
  
  // Show chatbot after a delay - but only if no case is selected
  React.useEffect(() => {
    // Only show initial welcome message if no case study is selected
    if (!selectedCase) {
      // Wait 5 seconds before showing the chatbot
      const timer = setTimeout(() => {
        setShowChatbot(true);
        // Only add introduction message if no case study is selected AND no existing messages
        if (chatMessages.length <= 1) {
          setChatMessages([
            { 
              sender: 'bot', 
              text: 'We have AI case studies in Teaching, Science, Engineering, and Ethics. Please select an area of interest:',
              buttons: [
                {
                  text: 'Teaching Cases',
                  action: () => {
                    const teachingCases = window.caseStudies.filter(cs => cs.category === 'Teaching');
                    setChatMessages(prevMessages => [
                      ...prevMessages,
                      { sender: 'user', text: 'Teaching Cases' },
                      { 
                        sender: 'bot', 
                        text: 'We have multiple teaching-related case studies showing different approaches to AI integration:' 
                      },
                      createCategoryNavButtons('Teaching', teachingCases)
                    ]);
                  }
                },
                {
                  text: 'Science Cases',
                  action: () => {
                    const scienceCases = window.caseStudies.filter(cs => cs.category === 'Science');
                    setChatMessages(prevMessages => [
                      ...prevMessages,
                      { sender: 'user', text: 'Science Cases' },
                      { 
                        sender: 'bot', 
                        text: 'Our science case studies focus on lab work, data interpretation, and scientific literacy:' 
                      },
                      createCategoryNavButtons('Science', scienceCases)
                    ]);
                  }
                },
                {
                  text: 'Engineering Cases',
                  action: () => {
                    const engineeringCases = window.caseStudies.filter(cs => cs.category === 'Engineering');
                    setChatMessages(prevMessages => [
                      ...prevMessages,
                      { sender: 'user', text: 'Engineering Cases' },
                      { 
                        sender: 'bot', 
                        text: 'Our engineering case studies showcase AI applications in design feedback and technical problem-solving:' 
                      },
                      createCategoryNavButtons('Engineering', engineeringCases)
                    ]);
                  }
                },
                {
                  text: 'Ethics Cases',
                  action: () => {
                    const ethicsCases = window.caseStudies.filter(cs => cs.category === 'Ethics');
                    setChatMessages(prevMessages => [
                      ...prevMessages,
                      { sender: 'user', text: 'Ethics Cases' },
                      { 
                        sender: 'bot', 
                        text: 'Our ethics case studies examine ethical considerations in AI integration:' 
                      },
                      createCategoryNavButtons('Ethics', ethicsCases)
                    ]);
                  }
                }
              ]
            }
          ]);
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedCase]);
  
  // Add event listener for quoted text
  React.useEffect(() => {
    const handleTextQuoteSelected = (event) => {
      const { quote } = event.detail;
      if (quote && quote.trim()) {
        setQuotedText(quote);
        setShowChatbot(true); // Open chatbot when text is quoted
      }
    };
    
    window.addEventListener('textQuoteSelected', handleTextQuoteSelected);
    
    return () => {
      window.removeEventListener('textQuoteSelected', handleTextQuoteSelected);
    };
  }, []);
  
  // Function to get more specific information about a case study
  const getCaseStudyDetails = (caseStudy) => {
    switch(caseStudy.id) {
      case 1:
        return "This case shows how Dr. Lim structured a three-phase assignment sequence using ChatGPT in a history course. Students use AI for inquiry question development, draft feedback, and critical analysis.";
      case 2:
        return "In this case, Dr. Tan integrated AI tools to help students visualize reaction pathways and interpret lab data in Environmental Chemistry, improving lab performance and student confidence.";
      case 3:
        return "Dr. Tan uses ChatGPT and Copilot to provide iterative feedback on CAD designs in a mechanical engineering course, helping students refine their thinking while teaching them to verify AI suggestions.";
      case 4:
        return "This case addresses the ethical concerns that arose when students shared cultural narratives with AI, and how Dr. Tan responded by creating a workshop on digital ethics and cultural respect.";
      case 5:
        return "Dr. Tan addresses the issue of students uncritically citing AI-generated statistics by mandating source verification and introducing a module on scientific misinformation in the AI age.";
      case 6:
        return "This case examines three different approaches to AI integration across disciplines: science (biology), engineering (programming), and humanities (history).";
      case 7:
        return "This showcases university-level implementations of AI in environmental science, mechanical engineering, and philosophy, demonstrating various ways to integrate AI into higher education.";
      case 8:
        return "This examines AI integration strategies in biology lab reports, engineering design prompt engineering, and humanities source analysis, with specific implementation details.";
      default:
        return caseStudy.summary;
    }
  };

  // Function to create a navigation button message for a single case
  const createNavButtonMessage = (caseStudy) => {
    return {
      sender: 'bot',
      text: `Would you like to view this case study?`,
      buttons: [
        {
          text: `View "${caseStudy.title}"`,
          action: () => setSelectedCase(caseStudy)
        },
        {
          text: 'No, thanks',
          action: () => {
            setChatMessages(prevMessages => [
              ...prevMessages, 
              { 
                sender: 'bot', 
                text: 'No problem. Let me know if you want to explore other case studies or have any questions.' 
              }
            ]);
          }
        }
      ]
    };
  };
  
  // Function to create navigation buttons for multiple cases in a category
  const createCategoryNavButtons = (category, cases) => {
    // Limit to 3 buttons max to avoid cluttering the interface
    const casesToShow = cases.slice(0, 3);
    
    return {
      sender: 'bot',
      text: `Here are some ${category} case studies you may explore:`,
      buttons: [
        ...casesToShow.map(caseStudy => ({
          text: caseStudy.title,
          action: () => {
            setSelectedCase(caseStudy);
            setChatMessages(prevMessages => [
              ...prevMessages, 
              { 
                sender: 'bot', 
                text: `You're now viewing "${caseStudy.title}". ${getCaseStudyDetails(caseStudy)}` 
              }
            ]);
          }
        })),
        {
          text: 'See all case studies',
          action: () => {
            setSelectedCase(null);
            setChatMessages(prevMessages => [
              ...prevMessages, 
              { 
                sender: 'bot', 
                text: 'Here\'s the overview of all our case studies:',
                buttons: [
                  {
                    text: 'Explore Teaching Cases',
                    action: () => {
                      const teachingCases = window.caseStudies.filter(cs => cs.category === 'Teaching');
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: 'Teaching Cases' },
                        { 
                          sender: 'bot', 
                          text: 'We have multiple teaching-related case studies:' 
                        },
                        createCategoryNavButtons('Teaching', teachingCases)
                      ]);
                    }
                  },
                  {
                    text: 'View Science Case Studies',
                    action: () => {
                      const scienceCases = window.caseStudies.filter(cs => cs.category === 'Science');
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: 'Science Cases' },
                        { 
                          sender: 'bot', 
                          text: 'Our science case studies:' 
                        },
                        createCategoryNavButtons('Science', scienceCases)
                      ]);
                    }
                  },
                  {
                    text: 'Browse Engineering Cases',
                    action: () => {
                      const engineeringCases = window.caseStudies.filter(cs => cs.category === 'Engineering');
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: 'Engineering Cases' },
                        { 
                          sender: 'bot', 
                          text: 'Our engineering case studies:' 
                        },
                        createCategoryNavButtons('Engineering', engineeringCases)
                      ]);
                    }
                  },
                  {
                    text: 'See Ethics & AI Cases',
                    action: () => {
                      const ethicsCases = window.caseStudies.filter(cs => cs.category === 'Ethics');
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: 'Ethics Cases' },
                        { 
                          sender: 'bot', 
                          text: 'Our ethics case studies:' 
                        },
                        createCategoryNavButtons('Ethics', ethicsCases)
                      ]);
                    }
                  }
                ]
              }
            ]);
          }
        }
      ]
    };
  };

  // Function to render a message with buttons
  const renderMessage = (msg, index) => {
    // Handle bot typing indicator
    if (msg.isTypingIndicator) {
      return (
        <div key={`typing-${index}`} style={styles.typingIndicator}>
          <div style={{...styles.dot, animationDelay: '0s'}}></div>
          <div style={{...styles.dot, animationDelay: '0.2s'}}></div>
          <div style={{...styles.dot, animationDelay: '0.4s'}}></div>
        </div>
      );
    }
    
    // Handle user message
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
    
    // Handle bot message with buttons
    if (msg.buttons) {
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
          
          <div style={styles.buttonContainer}>
            {msg.buttons.map((button, btnIndex) => (
              <button
                key={`btn-${index}-${btnIndex}`}
                onClick={button.action}
                style={button.type === 'primary' ? styles.primaryButton : styles.secondaryButton}
                onMouseOver={e => {
                  // Apply hover styles for primary buttons from literature review
                  if (button.type === 'primary') {
                    e.currentTarget.style.backgroundColor = styles.primaryButtonHover.backgroundColor;
                    e.currentTarget.style.transform = styles.primaryButtonHover.transform;
                    e.currentTarget.style.boxShadow = styles.primaryButtonHover.boxShadow;
                  } else { // Assuming other buttons are secondary
                    e.currentTarget.style.backgroundColor = styles.secondaryButtonHover.backgroundColor;
                    e.currentTarget.style.transform = styles.secondaryButtonHover.transform;
                    e.currentTarget.style.boxShadow = styles.secondaryButtonHover.boxShadow;
                  }
                }}
                onMouseOut={e => {
                  // Reset to base styles from literature review
                  if (button.type === 'primary') {
                    e.currentTarget.style.backgroundColor = styles.primaryButton.backgroundColor;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none'; // Or initial shadow if defined
                  } else {
                    e.currentTarget.style.backgroundColor = styles.secondaryButton.backgroundColor;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none'; // Or initial shadow if defined
                  }
                }}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      );
    }
    
    // Handle regular bot message
    return (
      <div key={`bot-${index}`} style={styles.botMessage}>
        {msg.text.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < msg.text.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Function to handle chatbot responses
  const handleChatbotResponse = async (userMessage) => {
    // Add user message to conversation
    setChatMessages(prevMessages => [...prevMessages, { sender: 'user', text: userMessage }]);
    
    // Show typing indicator
    setIsBotTyping(true);
    
    // If API key exists, use AI to generate response
    if (llmApiKey) {
      try {
        const historyForAPI = [...chatMessages]; // Get current message history
        const botResponseText = await getOpenAIResponse(userMessage, historyForAPI, llmApiKey);
        setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponseText }]);
        
        // Check response content, if specific cases are mentioned, automatically add navigation suggestions
        const lowerCaseResponse = botResponseText.toLowerCase();
        setTimeout(() => {
          // Find cases that might be mentioned in the response
          const mentionedCases = window.caseStudies.filter(caseStudy => 
            lowerCaseResponse.includes(caseStudy.title.toLowerCase()) && 
            (!selectedCase || selectedCase.id !== caseStudy.id)
          );
          
          if (mentionedCases.length > 0) {
            setChatMessages(prevMessages => [
              ...prevMessages,
              { 
                sender: 'bot', 
                text: 'I noticed you might be interested in these cases:',
                buttons: mentionedCases.map(cs => ({
                  text: cs.title,
                  type: 'primary',
                  action: () => {
                    setSelectedCase(cs);
                    setChatMessages(prevMessages => [
                      ...prevMessages,
                      { sender: 'user', text: `View case: ${cs.title}` },
                      { sender: 'bot', text: `Opened "${cs.title}" for you. ${getCaseStudyDetails(cs)}` }
                    ]);
                  }
                }))
              }
            ]);
          }
          
          // If the response contains discussion about categories, add category navigation
          if (lowerCaseResponse.includes('teaching')) {
            const teachingCases = window.caseStudies.filter(cs => cs.category === 'Teaching');
            if (teachingCases.length > 0) {
              setChatMessages(prevMessages => [
                ...prevMessages,
                { 
                  sender: 'bot', 
                  text: 'You might want to browse these teaching-related cases:',
                  buttons: teachingCases.slice(0, 3).map(cs => ({
                    text: cs.title,
                    type: 'primary',
                    action: () => {
                      setSelectedCase(cs);
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: `View case: ${cs.title}` },
                        { sender: 'bot', text: `Opened "${cs.title}" for you. ${getCaseStudyDetails(cs)}` }
                      ]);
                    }
                  }))
                }
              ]);
            }
          }
        }, 500);
      } catch (error) {
        console.error("OpenAI API Error:", error);
        setChatMessages(prevMessages => [
          ...prevMessages, 
          { 
            sender: 'bot', 
            text: `AI Error: ${error.message}. Please check your API key and network.` 
          }
        ]);
      } finally {
        setIsBotTyping(false);
      }
      return;
    }
    
    // Without API key, use original rule-based logic
    setTimeout(() => {
      setIsBotTyping(false);
      
      if (!llmApiKey) {
        setChatMessages(prevMessages => [
          ...prevMessages, 
          { 
            sender: 'bot', 
            text: "Please enter an OpenAI API key to enable AI-powered responses. Without it, I'll provide pre-programmed help." 
          }
        ]);
      }
      
      // Original rule-based logic handling
      // ... existing code ...
      
    }, 800);
  };
  
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === '' && !quotedText) return;

    // Create message text - if there's a quote, include it with the user's input
    const messageText = quotedText 
      ? `Regarding this text: "${quotedText}"\n\n${userInput || "What are your thoughts on this?"}`
      : userInput;
    
    handleChatbotResponse(messageText);
    setUserInput('');
    setQuotedText(null); // Clear quoted text after sending
  };

  // Add clear quote button handler
  const handleClearQuote = () => {
    setQuotedText(null);
  };

  // Define styles based on literature-review-page.js
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Unified font family
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
    chatContainer: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '380px', // Matched lit review
      height: '520px', // Matched lit review
      backgroundColor: 'white',
      boxShadow: '0 5px 20px rgba(0,0,0,0.15)', // Matched lit review
      borderRadius: '16px', // Matched lit review
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Added font family
    },
    chatHeader: {
      backgroundColor: '#003d7c',
      backgroundImage: 'linear-gradient(135deg, #003d7c 0%, #0056b3 100%)', // Matched lit review
      color: '#fff', // Matched lit review
      padding: '15px 20px', // Matched lit review
      borderTopLeftRadius: '16px', // Matched lit review
      borderTopRightRadius: '16px', // Matched lit review
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Matched lit review
    },
    chatMessages: {
      flex: 1,
      padding: '20px', // Matched lit review
      paddingBottom: '10px',
      marginBottom: '5px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px', // Matched lit review
      backgroundColor: '#f8f9fa', // Matched lit review
    },
    userMessage: {
      margin: '5px 0',
      padding: '12px 16px', // Matched lit review
      borderRadius: '18px', // Matched lit review
      backgroundColor: '#0056b3', // Matched lit review
      color: 'white',
      alignSelf: 'flex-end',
      marginLeft: 'auto',
      borderBottomRightRadius: '4px', // Matched lit review
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Matched lit review
      maxWidth: '80%',
      wordWrap: 'break-word',
      fontWeight: '400', // Matched lit review
      fontSize: '14px', // Added font size
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Added font family
    },
    botMessage: {
      margin: '5px 0',
      padding: '12px 16px', // Matched lit review
      borderRadius: '18px', // Matched lit review
      backgroundColor: 'white', // Matched lit review
      color: '#333',
      alignSelf: 'flex-start',
      marginRight: 'auto',
      borderBottomLeftRadius: '4px', // Matched lit review
      boxShadow: '0 2px 4px rgba(0,0,0,0.08)', // Matched lit review
      maxWidth: '80%',
      wordWrap: 'break-word',
      fontWeight: '400', // Matched lit review
      fontSize: '14px', // Added font size
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Added font family
    },
    typingIndicator: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px', // Matched lit review
      backgroundColor: 'white', // Matched lit review
      borderRadius: '18px', // Matched lit review
      alignSelf: 'flex-start',
      marginRight: 'auto',
      width: 'fit-content',
      boxShadow: '0 2px 4px rgba(0,0,0,0.08)', // Matched lit review
    },
    dot: {
      width: '8px', // Matched lit review
      height: '8px', // Matched lit review
      backgroundColor: '#666', // Matched lit review
      borderRadius: '50%',
      margin: '0 2px',
      animation: 'bounce 1.4s infinite',
    },
    chatInputContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 15px', // Matched lit review
      borderTop: '1px solid #eaeaea', // Matched lit review
      backgroundColor: 'white', // Matched lit review
    },
    messageInputContainerStyle: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    chatInput: {
      flex: 1,
      padding: '12px 15px', // Matched lit review input padding
      border: '1px solid #ddd',
      borderRadius: '24px', // Matched lit review input radius
      marginRight: '10px',
      marginBottom: '15px', // Matched lit review input margin
      outline: 'none',
      fontSize: '14px', // Matched lit review input font size
      backgroundColor: 'white',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
      transition: 'all 0.2s ease',
      height: 'auto', // Allow height to adjust
      minHeight: '45px', // Maintain minimum height
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Added font family
    },
    chatSubmit: {
      backgroundColor: '#0056b3', // Matched lit review send button
      backgroundImage: 'none', // Removed gradient
      color: 'white',
      border: 'none',
      borderRadius: '24px', // Matched lit review send button radius
      padding: '10px 18px', // Matched lit review send button padding
      cursor: 'pointer',
      fontWeight: 'bold', // Matched lit review send button weight
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease',
      alignSelf: 'flex-start',
      height: '45px', // Adjust if needed
      marginBottom: '15px', // Match input margin
      fontSize: '14px', // Match input font size
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Added font family
    },
    apiKeyInputContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '5px',
    },
    apiKeyLabel: {
      marginRight: '10px',
      fontSize: '13px', 
      color: '#555',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Added font family
    },
    apiKeyInput: {
      flex: 1,
      padding: '8px 12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '13px', 
      backgroundColor: '#f8f9fa',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
      transition: 'all 0.2s ease',
      height: '40px',
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Added font family
    },
    buttonContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px', // Matched lit review
      marginTop: '8px',
    },
    primaryButton: {
      padding: '10px 14px', // Matched lit review primary button
      backgroundColor: '#0056b3', // Matched lit review primary button
      color: 'white',
      border: 'none',
      borderRadius: '6px', // Matched lit review primary button
      cursor: 'pointer',
      fontSize: '13px', // Matched lit review primary button
      fontWeight: 'bold', // Matched lit review primary button
      transition: 'background-color 0.2s, transform 0.2s, box-shadow 0.2s',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Added font family
    },
    primaryButtonHover: {
      backgroundColor: '#003d7c',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,60,124,0.2)',
    },
    secondaryButton: {
      padding: '9px 13px', // Matched lit review secondary button
      backgroundColor: '#f0f0f0', // Matched lit review secondary button
      color: '#444', // Matched lit review secondary button
      border: '1px solid #ddd',
      borderRadius: '6px', // Matched lit review secondary button
      cursor: 'pointer',
      fontSize: '13px', // Matched lit review secondary button
      transition: 'background-color 0.2s, transform 0.2s, box-shadow 0.2s',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Added font family
    },
    secondaryButtonHover: {
      backgroundColor: '#e0e0e0',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    chatButtonFixed: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '65px', // Matched lit review FAB
      height: '65px', // Matched lit review FAB
      backgroundColor: '#0056b3', // Matched lit review FAB
      backgroundImage: 'linear-gradient(135deg, #003d7c 0%, #0056b3 100%)', // Matched lit review FAB
      color: 'white',
      borderRadius: '50%',
      border: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '28px', // Matched lit review FAB
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(0,0,0,0.25)', // Matched lit review FAB
      zIndex: 100,
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Added font family
    },
    chatButtonFixedHover: {
      transform: 'scale(1.08) translateY(-3px)',
      boxShadow: '0 6px 15px rgba(0,0,0,0.3)',
    },
    chatHeaderTitle: { // Style for chat header title
      margin: 0,
      fontWeight: '500',
      fontSize: '1.1rem',
    },
    chatHeaderCategory: { // Style for category badge in header
      backgroundColor: '#e6f0ff', 
      color: '#003d7c', 
      padding: '3px 8px', 
      borderRadius: '12px', 
      fontSize: '11px', 
      fontWeight: 'bold', 
      marginLeft: '8px' 
    },
    quotedTextContainer: {
      backgroundColor: '#f0f7ff',
      padding: '10px 15px',
      borderRadius: '8px',
      marginBottom: '10px',
      border: '1px solid #d0e3ff',
      position: 'relative',
      fontSize: '14px'
    },
    quotedTextHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5px'
    },
    quotedTextTitle: {
      fontWeight: 'bold',
      color: '#003d7c',
      fontSize: '13px'
    },
    quotedTextContent: {
      maxHeight: '80px',
      overflowY: 'auto',
      fontStyle: 'italic',
      color: '#444',
      padding: '0 5px'
    },
    chatCloseButton: { // Style for close button
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '18px', // Matched lit review
      cursor: 'pointer',
      padding: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      transition: 'background-color 0.2s',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif', // Added font family
    },
  };

  // Chatbot button
  const renderChatbotButton = () => {
    return React.createElement(
      'div',
      { 
        style: styles.chatButtonFixed,
        onClick: () => setShowChatbot(!showChatbot),
        onMouseOver: (e) => {
          e.currentTarget.style.transform = styles.chatButtonFixedHover.transform;
          e.currentTarget.style.boxShadow = styles.chatButtonFixedHover.boxShadow;
        },
        onMouseOut: (e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = styles.chatButtonFixed.boxShadow;
        },
        'aria-label': showChatbot ? 'Close chat' : 'Open chat',
      },
      showChatbot ? '×' : '💬'
    );
  };

  // New OpenAI API call function
  const getOpenAIResponse = async (currentInput, chatHistoryForAPI, apiKey) => {
    if (!apiKey) {
      throw new Error("OpenAI API Key is not set.");
    }
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    
    // Create more specific system prompt based on currently selected case
    let systemContent = "You are a helpful assistant for the NTU GenAI Research Portal's case studies section. Always respond in English, even if the user asks questions in other languages. ";
    if (selectedCase) {
      systemContent += `The user is currently viewing the case study: "${selectedCase.title}" which is about ${selectedCase.summary}. `;
    }
    systemContent += "Focus on providing concise information about AI use cases in education, implementation strategies, and reflection questions. Be direct and helpful.";
    
    const systemMessage = {
      role: "system",
      content: systemContent
    };
    
    // Process history messages, ensure correct format
    const processedHistory = chatHistoryForAPI.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    })).filter(msg => msg.content);

    const formattedMessages = [
      systemMessage,
      ...processedHistory,
      { role: 'user', content: currentInput }
    ];

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${apiKey}` 
      },
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
    return choice?.message?.content || "Sorry, I couldn't retrieve a valid response.";
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
            href="case-studies.html"
            className="header-nav-link active"
          >
            Case Studies
          </a>
        </nav>
      </header>

      <div style={styles.container}>
        <div style={styles.header}>
          <h1>Case Studies</h1>
          <p>Explore our collection of case studies showcasing how AI is being used in teaching and learning contexts</p>
        </div>
        <a href="/" style={styles.backLink}>← Back to Main Page</a>
        {selectedCase
          ? (
              <div>
                <div style={styles.caseDetail}>
                  <h2 style={styles.caseTitle}>{selectedCase.title}</h2>
                  <span style={styles.caseCategory}>{selectedCase.category}</span>
                  <p style={styles.caseSummary}>
                    <strong>{selectedCase.summary}</strong>
                  </p>
                  {selectedCase.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  {selectedCase.hasWordCloud && (
                    <div
                      id={`wordcloud-container-${selectedCase.id}`}
                      style={{ marginTop: '30px' }}
                    ></div>
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
                    onClick={() => {
                      setSelectedCase(null);
                      // Add navigation message to chatbot if it's open
                      if (showChatbot) {
                        setChatMessages(prevMessages => [
                          ...prevMessages,
                          { sender: 'bot', text: 'You\'ve returned to the case studies overview. Let me know if you want to explore a different case study.' }
                        ]);
                      }
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
                    Back to All Case Studies
                  </button>
                </div>
              </div>
            )
          : (
              <div>
                <h2>Browse Case Studies</h2>
                <div style={styles.caseGrid}>
                  {window.caseStudies.map(caseStudy => (
                    <div
                      key={caseStudy.id}
                      style={styles.caseCard}
                      onClick={() => {
                        setSelectedCase(caseStudy);
                        // Add case selection message to chatbot if it's open but only if it wasn't triggered by the chatbot
                        if (showChatbot) {
                          const lastMessage = chatMessages[chatMessages.length - 1];
                          const chatbotAlreadyAcknowledged = lastMessage && 
                            lastMessage.sender === 'bot' && 
                            lastMessage.text && 
                            lastMessage.text.includes(caseStudy.title);
                          
                          if (!chatbotAlreadyAcknowledged) {
                            setChatMessages(prevMessages => [
                              ...prevMessages,
                              { 
                                sender: 'bot', 
                                text: `You've selected "${caseStudy.title}". ${getCaseStudyDetails(caseStudy)} I'm here if you have questions!` 
                              }
                            ]);
                          }
                        }
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={e => {
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

        {/* Chatbot button */}
        {renderChatbotButton()}

        {/* Chatbot container */}
        {showChatbot && (
          <div style={styles.chatContainer}>
            <div style={styles.chatHeader}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 style={styles.chatHeaderTitle}>Case Studies Assistant</h3>
                {selectedCase && (
                  <span style={styles.chatHeaderCategory}>
                    {selectedCase.category.toUpperCase()}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                style={styles.chatCloseButton}
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
            <div
              style={styles.chatMessages}
              ref={el => {
                // Auto-scroll to bottom when new messages are added
                if (el) {
                  el.scrollTop = el.scrollHeight;
                }
              }}
            >
              {chatMessages.map((msg, index) => renderMessage(msg, index))}
              {isBotTyping && renderMessage({ isTypingIndicator: true }, chatMessages.length)}
            </div>
            <div style={styles.chatInputContainer}>
              {/* Display quoted text above input if available */}
              {quotedText && (
                <div style={styles.quotedTextContainer}>
                  <div style={styles.quotedTextHeader}>
                    <span style={styles.quotedTextTitle}>Quoted Text:</span>
                    <button 
                      onClick={handleClearQuote}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666',
                        fontSize: '16px',
                        padding: '0 5px'
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <div style={styles.quotedTextContent}>
                    "{quotedText}"
                  </div>
                </div>
              )}
              <div style={styles.messageInputContainerStyle}>
                <input
                  type="text"
                  placeholder={
                    quotedText 
                      ? 'Ask about the quoted text...' 
                      : (selectedCase 
                          ? 'Ask about this or any other case study...' 
                          : 'Ask about our case studies...')
                  }
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  style={styles.chatInput}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0056b3';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05), 0 0 0 3px rgba(0,86,179,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.05)';
                  }}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                />
                <button 
                  onClick={handleSubmit} 
                  style={styles.chatSubmit}
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
              <div style={styles.apiKeyInputContainer}>
                <label htmlFor="apiKeyInput" style={styles.apiKeyLabel}>API Key:</label>
                <input
                  id="apiKeyInputFromCaseStudies"
                  type="password"
                  value={llmApiKey}
                  onChange={(e) => setLlmApiKey(e.target.value)}
                  placeholder="Enter your OpenAI API Key"
                  aria-label="OpenAI API Key"
                  style={styles.apiKeyInput}
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
        )}
      </div>
      
      {/* 添加动画样式 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-5px); }
          }
          /* Scrollbar styles from literature review */
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

// Render the component
ReactDOM.render(React.createElement(CaseStudiesPage, null), document.getElementById('root')); 

// Text selection and quote component
const TextCitationSelector = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = React.useState('');
  
  React.useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection.toString().trim();
      
      if (selectedText.length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setSelectedText(selectedText);
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + rect.width / 2 + window.scrollX,
        });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('touchend', handleTextSelection);
    
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('touchend', handleTextSelection);
    };
  }, []);
  
  // Handle quote button click
  const handleQuoteClick = (e) => {
    e.preventDefault();
    setIsVisible(false);
    
    // Dispatch a custom event to notify the chatbot about the selected quote
    window.dispatchEvent(
      new CustomEvent('textQuoteSelected', { 
        detail: { quote: selectedText } 
      })
    );
  };
  
  return React.createElement(
    React.Fragment,
    null,
    isVisible && React.createElement(
      'div',
      {
        style: {
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: 'translateX(-50%)',
          backgroundColor: '#003d7c',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          zIndex: 1000,
          display: 'flex',
          gap: '8px',
          fontSize: '14px',
          cursor: 'pointer',
          animation: 'fadeIn 0.2s ease',
        }
      },
      React.createElement(
        'button',
        {
          onClick: handleQuoteClick,
          style: {
            background: 'none',
            border: 'none',
            color: 'white',
            padding: '0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px',
          }
        },
        React.createElement(
          'span',
          { style: { fontSize: '16px' } },
          '💬'
        ),
        ' Quote'
      )
    ),
    React.createElement(
      'style',
      {
        dangerouslySetInnerHTML: {
          __html: `
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `
        }
      }
    )
  );
};

// Render the case studies page with TextCitationSelector
ReactDOM.render(
  React.createElement(
    React.Fragment,
    null,
    React.createElement(CaseStudiesPage, null),
    React.createElement(TextCitationSelector, null)
  ),
  document.getElementById('root')
); 