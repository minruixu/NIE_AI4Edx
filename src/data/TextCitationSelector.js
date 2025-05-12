import React, { useState, useEffect } from 'react';

// Text selection and quote component
const TextCitationSelector = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState('');
  
  useEffect(() => {
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
  
  return (
    <>
      {isVisible && (
        <div
          style={{
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
          }}
        >
          <button
            onClick={handleQuoteClick}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              padding: '0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '14px',
            }}
          >
            <span style={{ fontSize: '16px' }}>💬</span> Quote
          </button>
        </div>
      )}
      
      {/* Add keyframes for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `
      }} />
    </>
  );
};

export default TextCitationSelector; 