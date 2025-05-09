/**
 * Server-side data handler for storing user experience data
 * 
 * NOTE: This is a demonstration file showing how you would implement
 * server-side storage. To actually use this, you would need to:
 * 1. Set up a Node.js server
 * 2. Install Express.js (npm install express)
 * 3. Run this file with Node.js
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Data directory - this is where files will be stored
const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`Created data directory: ${DATA_DIR}`);
}

// API endpoint to save data
app.post('/api/save-data', (req, res) => {
  try {
    const { dataType, data } = req.body;
    
    if (!dataType || !data) {
      return res.status(400).json({ success: false, message: 'Missing dataType or data' });
    }
    
    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `${dataType}_${timestamp}.json`;
    const filepath = path.join(DATA_DIR, filename);
    
    // Write data to file
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    
    return res.json({ 
      success: true, 
      message: 'Data saved successfully',
      filepath: filepath
    });
  } catch (error) {
    console.error('Error saving data:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error saving data',
      error: error.message
    });
  }
});

// API endpoint to get all data files
app.get('/api/data-files', (req, res) => {
  try {
    const files = fs.readdirSync(DATA_DIR)
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const stats = fs.statSync(path.join(DATA_DIR, file));
        return {
          filename: file,
          size: stats.size,
          created: stats.birthtime
        };
      })
      .sort((a, b) => b.created - a.created); // Sort by date, newest first
    
    return res.json({ success: true, files });
  } catch (error) {
    console.error('Error getting data files:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error retrieving data files',
      error: error.message
    });
  }
});

// API endpoint to get specific data file
app.get('/api/data-files/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filepath = path.join(DATA_DIR, filename);
    
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    
    const fileContent = fs.readFileSync(filepath, 'utf8');
    const data = JSON.parse(fileContent);
    
    return res.json({ success: true, data });
  } catch (error) {
    console.error('Error reading data file:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error reading data file',
      error: error.message
    });
  }
});

// API endpoint to save complete session data when user submits rating
app.post('/api/save-session', (req, res) => {
  try {
    console.log('服务器接收到保存会话数据请求');
    const { sessionData } = req.body;
    
    if (!sessionData || !sessionData.sessionId) {
      console.error('无效的会话数据:', req.body);
      return res.status(400).json({ success: false, message: 'Missing or invalid session data' });
    }
    
    // 检查data目录是否存在，如果不存在则创建
    if (!fs.existsSync(DATA_DIR)) {
      console.log(`数据目录不存在，正在创建: ${DATA_DIR}`);
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    console.log(`数据目录路径: ${DATA_DIR}`);
    console.log(`目录是否存在: ${fs.existsSync(DATA_DIR)}`);
    
    // 列出目录内容
    const dirContents = fs.readdirSync(DATA_DIR);
    console.log('目录内容:', dirContents);
    
    // Create filename with session ID and timestamp
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `complete_session_${sessionData.sessionId}_${timestamp}.json`;
    const filepath = path.join(DATA_DIR, filename);
    
    console.log(`准备写入文件: ${filepath}`);
    
    // Write data to file with better formatting for readability
    fs.writeFileSync(filepath, JSON.stringify(sessionData, null, 2));
    console.log(`文件写入成功: ${filepath}`);
    
    // Also create a summary file with key metrics
    const summaryData = {
      sessionId: sessionData.sessionId,
      timestamp: sessionData.timestamp,
      userRole: sessionData.userRole,
      rating: sessionData.rating,
      sessionDuration: sessionData.sessionDuration,
      messageCount: sessionData.messages ? sessionData.messages.length : 0,
      pagesVisited: sessionData.pagesVisited
    };
    
    const summaryFilename = `session_summary_${sessionData.sessionId}_${timestamp}.json`;
    const summaryFilepath = path.join(DATA_DIR, summaryFilename);
    fs.writeFileSync(summaryFilepath, JSON.stringify(summaryData, null, 2));
    console.log(`摘要文件写入成功: ${summaryFilepath}`);
    
    // 再次检查文件是否被写入
    console.log(`完整会话文件是否存在: ${fs.existsSync(filepath)}`);
    console.log(`摘要文件是否存在: ${fs.existsSync(summaryFilepath)}`);
    
    return res.json({ 
      success: true, 
      message: 'Session data saved successfully',
      filepath: filepath,
      summaryFilepath: summaryFilepath
    });
  } catch (error) {
    console.error('Error saving session data:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error saving session data',
      error: error.message,
      stack: error.stack
    });
  }
});

// API endpoint to clear all data files
app.post('/api/clear-data', (req, res) => {
  try {
    // Read all files in the data directory
    const files = fs.readdirSync(DATA_DIR).filter(file => file.endsWith('.json'));
    
    // Delete each file
    for (const file of files) {
      fs.unlinkSync(path.join(DATA_DIR, file));
    }
    
    return res.json({ 
      success: true, 
      message: 'All data files cleared successfully',
      count: files.length
    });
  } catch (error) {
    console.error('Error clearing data files:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error clearing data files',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Data will be stored in: ${DATA_DIR}`);
});

module.exports = app; 