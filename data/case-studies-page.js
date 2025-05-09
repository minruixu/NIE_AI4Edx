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
          }
        ]);
        
        // If there are related cases, suggest them with buttons - after a short delay
        if (relatedCases.length > 0) {
          setTimeout(() => {
            setChatMessages(prevMessages => [
              ...prevMessages,
              {
                sender: 'bot',
                text: `You might also be interested in these other ${selectedCase.category} case studies:`,
                buttons: [
                  ...relatedCases.slice(0, 2).map(cs => ({
                    text: cs.title,
                    action: () => {
                      setSelectedCase(cs);
                    }
                  })),
                  {
                    text: 'See all case studies',
                    action: () => {
                      setSelectedCase(null);
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
                  },
                  {
                    text: 'Tell me about reflection questions',
                    action: () => {
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: 'Tell me about reflection questions' },
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
                                          if (relatedCases.length > 0) {
                                            setChatMessages(prevMessages => [
                                              ...prevMessages,
                                              { sender: 'user', text: 'See related case studies' },
                                              createCategoryNavButtons(selectedCase.category, relatedCases)
                                            ]);
                                          } else {
                                            setChatMessages(prevMessages => [
                                              ...prevMessages,
                                              { sender: 'user', text: 'See related case studies' },
                                              { 
                                                sender: 'bot', 
                                                text: `There are no other case studies in the ${selectedCase.category} category. Would you like to explore case studies in other categories?`,
                                                buttons: [
                                                  {
                                                    text: 'See all categories',
                                                    action: () => {
                                                      setSelectedCase(null);
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
                                                  }
                                                ]
                                              }
                                            ]);
                                          }
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
                  }
                ]
              }
            ]);
          }, 500);
        } else {
          // If no related cases, just show the reflection questions prompt
          setTimeout(() => {
            setChatMessages(prevMessages => [
              ...prevMessages,
              {
                sender: 'bot',
                text: `Would you like to know more about the reflection questions for this case study?`,
                buttons: [
                  {
                    text: 'Show reflection questions',
                    action: () => {
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: 'Show reflection questions' },
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
                                          if (relatedCases.length > 0) {
                                            setChatMessages(prevMessages => [
                                              ...prevMessages,
                                              { sender: 'user', text: 'See related case studies' },
                                              createCategoryNavButtons(selectedCase.category, relatedCases)
                                            ]);
                                          } else {
                                            setChatMessages(prevMessages => [
                                              ...prevMessages,
                                              { sender: 'user', text: 'See related case studies' },
                                              { 
                                                sender: 'bot', 
                                                text: `There are no other case studies in the ${selectedCase.category} category. Would you like to explore case studies in other categories?`,
                                                buttons: [
                                                  {
                                                    text: 'See all categories',
                                                    action: () => {
                                                      setSelectedCase(null);
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
                                                  }
                                                ]
                                              }
                                            ]);
                                          }
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
                    text: 'No, thanks',
                    action: () => {
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: 'No, thanks' },
                        { 
                          sender: 'bot', 
                          text: `Let me know if you have any questions about "${selectedCase.title}" or want to explore other case studies.` 
                        }
                      ]);
                    }
                  }
                ]
              }
            ]);
          }, 500);
        }
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
                    text: 'Teaching Cases',
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
                    text: 'Science Cases',
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
                    text: 'Engineering Cases',
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
                    text: 'Ethics Cases',
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
    if (msg.buttons) {
      // Determine if buttons should wrap (for more than 2 buttons)
      const shouldWrap = msg.buttons.length > 2;
      
      // Check if these are reflection question buttons (longer text)
      const isReflectionQuestions = msg.text === 'Select a reflection question to explore:';
      
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
            let buttonStyle;
            if (button.text.includes('View') || button.text.includes('See all')) {
              buttonStyle = { ...styles.primaryButton };
            } else if (button.text.includes('No')) {
              buttonStyle = { ...styles.neutralButton };
            } else {
              buttonStyle = { ...styles.secondaryButton };
            }
            
            // Adjust styles for reflection question buttons
            if (isReflectionQuestions) {
              buttonStyle = { 
                ...buttonStyle,
                maxWidth: '100%', 
                whiteSpace: 'normal',
                height: 'auto',
                padding: '10px 15px',
                textAlign: 'left',
                justifyContent: 'flex-start',
                fontSize: '13px'
              };
            }
            // Adjust max width based on button count for regular buttons
            else if (shouldWrap) {
              buttonStyle.maxWidth = '100%';
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

  // Function to handle chatbot responses
  const handleChatbotResponse = (userMessage) => {
    // Add user message to chat
    setChatMessages(prevMessages => [...prevMessages, { sender: 'user', text: userMessage }]);
    
    // Process user input and generate response
    setTimeout(() => {
      let botResponse = '';
      
      // Check for help request
      if (userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('帮助')) {
        setChatMessages(prevMessages => [
          ...prevMessages, 
          { 
            sender: 'bot', 
            text: '您可以选择以下方向查看案例研究：',
            buttons: [
              {
                text: '教学案例',
                action: () => {
                  const teachingCases = window.caseStudies.filter(cs => cs.category === 'Teaching');
                  setChatMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'user', text: '教学案例' },
                    { 
                      sender: 'bot', 
                      text: '我们有多个教学相关案例研究，展示了不同的AI教学集成方法：' 
                    },
                    createCategoryNavButtons('Teaching', teachingCases)
                  ]);
                }
              },
              {
                text: '科学案例',
                action: () => {
                  const scienceCases = window.caseStudies.filter(cs => cs.category === 'Science');
                  setChatMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'user', text: '科学案例' },
                    { 
                      sender: 'bot', 
                      text: '我们的科学案例研究专注于实验工作、数据解释和科学素养：' 
                    },
                    createCategoryNavButtons('Science', scienceCases)
                  ]);
                }
              },
              {
                text: '工程案例',
                action: () => {
                  const engineeringCases = window.caseStudies.filter(cs => cs.category === 'Engineering');
                  setChatMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'user', text: '工程案例' },
                    { 
                      sender: 'bot', 
                      text: '我们的工程案例研究展示了AI在设计反馈和技术问题解决方面的应用：' 
                    },
                    createCategoryNavButtons('Engineering', engineeringCases)
                  ]);
                }
              },
              {
                text: '道德案例',
                action: () => {
                  const ethicsCases = window.caseStudies.filter(cs => cs.category === 'Ethics');
                  setChatMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'user', text: '道德案例' },
                    { 
                      sender: 'bot', 
                      text: '我们的道德案例研究探讨了AI集成中的伦理考量：' 
                    },
                    createCategoryNavButtons('Ethics', ethicsCases)
                  ]);
                }
              }
            ]
          }
        ]);
        return;
      }
      
      // Search case studies for relevant content
      const lowerCaseInput = userMessage.toLowerCase();
      
      // Check if the user is asking about other case studies
      if (selectedCase && lowerCaseInput.includes('other') && 
          (lowerCaseInput.includes('case') || lowerCaseInput.includes('stud'))) {
        const otherCases = window.caseStudies.filter(cs => cs.id !== selectedCase.id);
        const casesByCategory = {};
        otherCases.forEach(cs => {
          if (!casesByCategory[cs.category]) casesByCategory[cs.category] = [];
          casesByCategory[cs.category].push(cs.title);
        });
        
        let categoryList = '';
        for (const [category, titles] of Object.entries(casesByCategory)) {
          categoryList += `\n\n${category}:\n- ${titles.join('\n- ')}`;
        }
        
        botResponse = `Here are other case studies by category:${categoryList}\n\nWhich one would you like to explore?`;
        setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
        return;
      }
      
      // Check if the user is asking about the current case study
      const isAskingAboutCurrent = selectedCase && (
        lowerCaseInput.includes('this case') || 
        lowerCaseInput.includes('current case') || 
        lowerCaseInput.includes('this example') ||
        lowerCaseInput.includes(selectedCase.title.toLowerCase())
      );
      
      // If asking about current case study
      if (isAskingAboutCurrent) {
        if (lowerCaseInput.includes('summary') || lowerCaseInput.includes('what is')) {
          botResponse = `"${selectedCase.title}" ${getCaseStudyDetails(selectedCase)}`;
        } 
        else if (lowerCaseInput.includes('reflection') || lowerCaseInput.includes('prompt')) {
          setChatMessages(prevMessages => [
            ...prevMessages, 
            { 
              sender: 'bot', 
              text: `Here are the reflection questions for "${selectedCase.title}". Click on any question to explore it further:` 
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
          return;
        }
        else if (lowerCaseInput.includes('category') || lowerCaseInput.includes('discipline')) {
          botResponse = `This case study is categorized under ${selectedCase.category}.`;
        }
        else {
          botResponse = `You're currently viewing "${selectedCase.title}". ${getCaseStudyDetails(selectedCase)}\n\nFeel free to ask about any aspect of this case study or explore other cases as well.`;
        }
      }
      // Check for specific case study questions by title keywords (still allow this even if viewing a case)
      else {
        const matchingCase = window.caseStudies.find(caseStudy => {
          if (selectedCase && caseStudy.id === selectedCase.id) return false; // Skip current case
          const title = caseStudy.title.toLowerCase();
          return (lowerCaseInput.includes(title) || 
                  (title.split(' ').some(word => word.length > 3 && lowerCaseInput.includes(word))));
        });
        
        if (matchingCase) {
          botResponse = `I found the case study "${matchingCase.title}". ${getCaseStudyDetails(matchingCase)} Opening it for you now.`;
          // Add bot response to chat immediately
          setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
          // Wait a moment before navigating to the case study
          setTimeout(() => {
            setSelectedCase(matchingCase);
            // Add a follow-up message about reflection prompts
            setChatMessages(prevMessages => [...prevMessages, { 
              sender: 'bot', 
              text: `You're now viewing "${matchingCase.title}". Don't forget to check out the reflection prompts at the bottom of the case study. They can help you think about how to apply this approach in your own teaching.`
            }]);
          }, 1000);
          return;
        }
        
        // Modified case recommendations to include navigation buttons
        // Case study suggestions based on topics
        if (lowerCaseInput.includes('feedback') || lowerCaseInput.includes('assessment')) {
          const feedbackCases = window.caseStudies.filter(cs => 
            cs.content.toLowerCase().includes('feedback') || 
            cs.title.toLowerCase().includes('feedback'));
          
          if (feedbackCases.length > 0) {
            const suggestedCase = feedbackCases[0];
            botResponse = `For AI in feedback and assessment, I recommend looking at "${suggestedCase.title}". ${getCaseStudyDetails(suggestedCase)}`;
            // Add bot response to chat
            setChatMessages(prevMessages => [
              ...prevMessages, 
              { sender: 'bot', text: botResponse },
              createNavButtonMessage(suggestedCase)
            ]);
            return;
          }
        }
        // Handle questions about ethical concerns or issues
        else if (lowerCaseInput.includes('ethics') || lowerCaseInput.includes('ethical') || lowerCaseInput.includes('privacy') || lowerCaseInput.includes('data')) {
          const ethicsCases = window.caseStudies.filter(cs => 
            cs.category === 'Ethics' || 
            cs.content.toLowerCase().includes('ethics') ||
            cs.content.toLowerCase().includes('privacy'));
          
          if (ethicsCases.length > 0) {
            const suggestedCase = ethicsCases[0];
            botResponse = `For ethical considerations in AI use, I recommend looking at "${suggestedCase.title}". ${getCaseStudyDetails(suggestedCase)}`;
            // Add bot response to chat
            setChatMessages(prevMessages => [
              ...prevMessages, 
              { sender: 'bot', text: botResponse },
              createNavButtonMessage(suggestedCase)
            ]);
            return;
          }
        }
        // Check for greetings or general questions
        else if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
          botResponse = 'Hello! How can I help you with our case studies today? I can suggest case studies by discipline, topic, or specific teaching challenges.';
        } 
        // Handle case study category questions - continue to show all options even when viewing a specific case
        else if (lowerCaseInput.includes('teaching') || lowerCaseInput.includes('education')) {
          const teachingCases = window.caseStudies.filter(cs => cs.category === 'Teaching');
          botResponse = `We have ${teachingCases.length} teaching-related case studies that show different approaches to integrating AI in educational contexts.`;
          setChatMessages(prevMessages => [
            ...prevMessages, 
            { sender: 'bot', text: botResponse },
            createCategoryNavButtons('Teaching', teachingCases)
          ]);
          return;
        }
        else if (lowerCaseInput.includes('science')) {
          const scienceCases = window.caseStudies.filter(cs => cs.category === 'Science');
          botResponse = `We have ${scienceCases.length} science-related case studies that focus on lab work, data interpretation, and scientific literacy.`;
          setChatMessages(prevMessages => [
            ...prevMessages, 
            { sender: 'bot', text: botResponse },
            createCategoryNavButtons('Science', scienceCases)
          ]);
          return;
        }
        else if (lowerCaseInput.includes('engineering')) {
          const engineeringCases = window.caseStudies.filter(cs => cs.category === 'Engineering');
          botResponse = `We have ${engineeringCases.length} engineering-related case studies that showcase AI integration in design feedback and technical problem-solving.`;
          setChatMessages(prevMessages => [
            ...prevMessages, 
            { sender: 'bot', text: botResponse },
            createCategoryNavButtons('Engineering', engineeringCases)
          ]);
          return;
        }
        // Handle questions about ChatGPT or AI usage
        else if (lowerCaseInput.includes('chatgpt') || lowerCaseInput.includes('ai')) {
          botResponse = 'Our case studies showcase various ways ChatGPT and other AI tools are being integrated into teaching and learning. This includes using AI for:\n\n- Providing feedback on student work\n- Designing prompts for critical thinking\n- Supporting visual learning with diagrams\n- Validating sources and fact-checking\n- Stimulating debates and discussions\n\nWhich of these applications are you most interested in?';
        }
        // Handle specific case study questions
        else if (lowerCaseInput.includes('history') || lowerCaseInput.includes('humanities')) {
          const historyCases = window.caseStudies.filter(cs => 
            cs.title.toLowerCase().includes('history') || 
            cs.content.toLowerCase().includes('history') ||
            cs.category.toLowerCase().includes('humanities'));
          
          if (historyCases.length > 0) {
            botResponse = `I found ${historyCases.length} case studies related to history/humanities: ${historyCases.map(cs => cs.title).join(', ')}. Would you like me to show you one of these?`;
          } else {
            botResponse = 'I don\'t see specific history case studies, but we do have humanities examples embedded in our "Teaching" category cases.';
          }
        }
        // Handle how to use case studies
        else if (lowerCaseInput.includes('how to use') || lowerCaseInput.includes('implement') || lowerCaseInput.includes('apply')) {
          botResponse = 'Our case studies can be used as models for implementing AI in your teaching. Each case includes reflection prompts to help you consider how to adapt these approaches. You can start by identifying a case study in your discipline, reviewing their approach, and adapting it to your context.';
        }
        else if (lowerCaseInput.includes('benefits') || lowerCaseInput.includes('advantages')) {
          botResponse = 'The case studies highlight several benefits of AI integration in teaching:\n\n- Increased student engagement and participation\n- More efficient feedback and assessment\n- Enhanced visualization and modeling\n- Support for critical thinking skills\n- Opportunities for personalized learning\n\nEach case study also addresses challenges and limitations to consider.';
        }
        else if (lowerCaseInput.includes('challenges') || lowerCaseInput.includes('problems') || lowerCaseInput.includes('issues')) {
          botResponse = 'The case studies identify several challenges when integrating AI in teaching:\n\n- Students over-relying on AI-generated content\n- Ensuring academic integrity and original work\n- Maintaining privacy and data security\n- Addressing AI hallucinations and factual errors\n- Teaching students to verify and validate AI output\n\nThe cases provide strategies for addressing these challenges.';
        }
        // Handle "list all" or "show all cases" request
        else if (lowerCaseInput.includes('list all') || lowerCaseInput.includes('all case') || lowerCaseInput.includes('all studies')) {
          const casesByCategory = {};
          window.caseStudies.forEach(cs => {
            if (!casesByCategory[cs.category]) casesByCategory[cs.category] = [];
            casesByCategory[cs.category].push(cs);
          });
          
          botResponse = `Here are all our case studies by category:`;
          setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
          
          // Add a message with buttons for each category
          for (const [category, cases] of Object.entries(casesByCategory)) {
            setChatMessages(prevMessages => [
              ...prevMessages,
              createCategoryNavButtons(category, cases)
            ]);
          }
          return;
        }
        // Handle "show me" requests
        else if (lowerCaseInput.includes('show me')) {
          // Parse discipline from request
          let discipline = '';
          if (lowerCaseInput.includes('science')) discipline = 'Science';
          else if (lowerCaseInput.includes('engineering')) discipline = 'Engineering';
          else if (lowerCaseInput.includes('teaching')) discipline = 'Teaching';
          else if (lowerCaseInput.includes('ethics')) discipline = 'Ethics';
          
          if (discipline) {
            const cases = window.caseStudies.filter(cs => cs.category === discipline);
            if (cases.length > 0) {
              // Select first case in the category
              const caseToShow = cases[0];
              botResponse = `I'll show you a ${discipline} case study: "${caseToShow.title}". ${getCaseStudyDetails(caseToShow)}`;
              // Add bot response to chat
              setChatMessages(prevMessages => [
                ...prevMessages, 
                { sender: 'bot', text: botResponse },
                createNavButtonMessage(caseToShow)
              ]);
              return;
            }
          } else {
            // If no specific discipline, show the first case study
            const caseToShow = window.caseStudies[0];
            botResponse = `I'll show you our first case study: "${caseToShow.title}". ${getCaseStudyDetails(caseToShow)}`;
            // Add bot response to chat
            setChatMessages(prevMessages => [
              ...prevMessages, 
              { sender: 'bot', text: botResponse },
              createNavButtonMessage(caseToShow)
            ]);
            return;
          }
        }
        // Handle navigation back to all case studies
        else if (lowerCaseInput.includes('back') || lowerCaseInput.includes('all cases') || lowerCaseInput.includes('show all')) {
          if (selectedCase) {
            botResponse = 'Going back to all case studies.';
            // Add bot response to chat immediately
            setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
            // Navigate back to all case studies
            setTimeout(() => {
              setSelectedCase(null);
            }, 500);
            return;
          } else {
            botResponse = 'You are already viewing all case studies. Let me know if you want to see a specific one.';
          }
        }
        // Compare case studies
        else if (lowerCaseInput.includes('compare') || lowerCaseInput.includes('difference') || lowerCaseInput.includes('similarities')) {
          botResponse = 'Our case studies cover different approaches to AI integration across disciplines. The engineering cases focus on technical applications and feedback, while science cases emphasize data interpretation and visualization. Teaching cases show broader pedagogical strategies. What specific comparison are you interested in?';
        }
        // Default response
        else {
          if (selectedCase) {
            setChatMessages(prevMessages => [
              ...prevMessages, 
              { 
                sender: 'bot', 
                text: '您可以选择以下方向查看其他案例研究：',
                buttons: [
                  {
                    text: '教学案例',
                    action: () => {
                      const teachingCases = window.caseStudies.filter(cs => cs.category === 'Teaching');
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: '教学案例' },
                        { 
                          sender: 'bot', 
                          text: '我们有多个教学相关案例研究：' 
                        },
                        createCategoryNavButtons('Teaching', teachingCases)
                      ]);
                    }
                  },
                  {
                    text: '科学案例',
                    action: () => {
                      const scienceCases = window.caseStudies.filter(cs => cs.category === 'Science');
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: '科学案例' },
                        { 
                          sender: 'bot', 
                          text: '我们的科学案例研究：' 
                        },
                        createCategoryNavButtons('Science', scienceCases)
                      ]);
                    }
                  },
                  {
                    text: '工程案例',
                    action: () => {
                      const engineeringCases = window.caseStudies.filter(cs => cs.category === 'Engineering');
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: '工程案例' },
                        { 
                          sender: 'bot', 
                          text: '我们的工程案例研究：' 
                        },
                        createCategoryNavButtons('Engineering', engineeringCases)
                      ]);
                    }
                  },
                  {
                    text: '道德案例',
                    action: () => {
                      const ethicsCases = window.caseStudies.filter(cs => cs.category === 'Ethics');
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: '道德案例' },
                        { 
                          sender: 'bot', 
                          text: '我们的道德案例研究：' 
                        },
                        createCategoryNavButtons('Ethics', ethicsCases)
                      ]);
                    }
                  }
                ]
              }
            ]);
          } else {
            setChatMessages(prevMessages => [
              ...prevMessages, 
              { 
                sender: 'bot', 
                text: '请选择您感兴趣的AI教学集成方向：',
                buttons: [
                  {
                    text: '教学案例',
                    action: () => {
                      const teachingCases = window.caseStudies.filter(cs => cs.category === 'Teaching');
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: '教学案例' },
                        { 
                          sender: 'bot', 
                          text: '我们有多个教学相关案例研究：' 
                        },
                        createCategoryNavButtons('Teaching', teachingCases)
                      ]);
                    }
                  },
                  {
                    text: '科学案例',
                    action: () => {
                      const scienceCases = window.caseStudies.filter(cs => cs.category === 'Science');
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: '科学案例' },
                        { 
                          sender: 'bot', 
                          text: '我们的科学案例研究：' 
                        },
                        createCategoryNavButtons('Science', scienceCases)
                      ]);
                    }
                  },
                  {
                    text: '工程案例',
                    action: () => {
                      const engineeringCases = window.caseStudies.filter(cs => cs.category === 'Engineering');
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: '工程案例' },
                        { 
                          sender: 'bot', 
                          text: '我们的工程案例研究：' 
                        },
                        createCategoryNavButtons('Engineering', engineeringCases)
                      ]);
                    }
                  },
                  {
                    text: '道德案例',
                    action: () => {
                      const ethicsCases = window.caseStudies.filter(cs => cs.category === 'Ethics');
                      setChatMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'user', text: '道德案例' },
                        { 
                          sender: 'bot', 
                          text: '我们的道德案例研究：' 
                        },
                        createCategoryNavButtons('Ethics', ethicsCases)
                      ]);
                    }
                  }
                ]
              }
            ]);
          }
          return;
        }
      }
      
      // Add bot response to chat
      setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };
  
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === '') return;
    
    handleChatbotResponse(userInput);
    setUserInput('');
  };

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
    // Chatbot styles
    chatbotButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#003d7c',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      fontSize: '24px',
      zIndex: 100,
    },
    chatbotButtonWithBadge: {
      position: 'relative',
    },
    chatbotBadge: {
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      backgroundColor: '#e74c3c',
      color: 'white',
      borderRadius: '50%',
      width: '22px',
      height: '22px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    chatContainer: {
      position: 'fixed',
      bottom: '90px',
      right: '20px',
      width: '350px',
      height: '500px',
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
    },
    chatHeader: {
      backgroundColor: '#003d7c',
      color: 'white',
      padding: '10px 15px',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    allCasesChip: {
      backgroundColor: '#e6f0ff',
      color: '#003d7c',
      padding: '3px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: 'bold',
      marginLeft: '8px',
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
    chatForm: {
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
    },
    chatSubmit: {
      backgroundColor: '#003d7c',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '0 15px',
      cursor: 'pointer',
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
    neutralButton: {
      backgroundColor: '#f1f1f1',
      color: '#333',
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
  };

  // Chatbot button
  const renderChatbotButton = () => {
    return React.createElement(
      'div',
      { style: styles.chatbotButtonWithBadge },
      React.createElement(
        'button',
        {
          style: styles.chatbotButton,
          onClick: () => setShowChatbot(!showChatbot),
          'aria-label': showChatbot ? 'Close chat' : 'Open chat',
        },
        showChatbot ? '×' : '?'
      ),
      // Show a notification badge if chatbot is closed and a case is selected
      !showChatbot && selectedCase && React.createElement(
        'div',
        { style: styles.chatbotBadge },
        '!'
      )
    );
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
                <h3 style={{ margin: 0 }}>Case Studies Assistant</h3>
                {/* Show "All Cases" chip if a specific case is selected */}
                {selectedCase && (
                  <span style={styles.allCasesChip}>ALL CASES</span>
                )}
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '20px',
                  cursor: 'pointer',
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
            </div>
            <form style={styles.chatForm} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={selectedCase 
                  ? 'Ask about this or any other case study...' 
                  : 'Ask about our case studies...'}
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                style={styles.chatInput}
              />
              <button type="submit" style={styles.chatSubmit}>Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// Render the component
ReactDOM.render(React.createElement(CaseStudiesPage, null), document.getElementById('root')); 