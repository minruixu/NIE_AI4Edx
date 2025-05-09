// Define the findings data structure
window.findingsData = {
  // Quantitative Findings (Priority Display)
  quantitative: {
    instructors: [
      {
        id: 1,
        title: "Instructor Readiness & Adoption",
        category: "quantitative-instructors",
        summary: "Analysis of instructor readiness across multiple dimensions",
        content: [
          {
            type: "list",
            title: "Factor Analysis",
            items: []
          },
          {
            type: "customHTML",
            title: "Cronbach's Alpha Reliability",
            html: `
              <div style="margin: 20px 0;">
                <div style="font-size:0.9em; color:#666; margin-top:10px;">
                  <p><strong>Note:</strong> Content will be populated soon.</p>
                </div>
              </div>
            `
          },
          {
            type: "customHTML",
            title: "Descriptive Analysis",
            html: `
              <div id="instructor-descriptive-container" style="margin:20px 0; width:100%; height:450px; position:relative;">
                <div style="text-align:center; padding-top:200px; color:#666;">
                  Data visualization pending
                </div>
              </div>
              <div style="font-size:0.9em; color:#666; margin-top:10px;">
                <p><strong>Note:</strong> Descriptive analysis will be added soon.</p>
              </div>
            `,
            scriptToRun: "createInstructorDescriptiveChart",
            targetContainerId: "instructor-descriptive-container"
          },
          {
            type: "customHTML",
            title: "Correlation Matrix of Instructor Readiness Dimensions",
            html: `
              <div id="correlation-heatmap-container" style="margin:20px 0; width:100%; height:450px; position:relative;">
                <div style="text-align:center; padding-top:200px; color:#666;">
                  Data visualization pending
                </div>
              </div>
              <div style="font-size:0.9em; color:#666; margin-top:10px;">
                <p><strong>Note:</strong> Correlation data will be added soon.</p>
              </div>
            `,
            scriptToRun: "createInstructorCorrelationHeatmap",
            targetContainerId: "correlation-heatmap-container"
          }
        ],
        chartType: "readiness"
      },
      {
        id: 2,
        title: "Instructor Usage Patterns",
        category: "quantitative-instructors",
        summary: "How instructors are integrating GenAI in educational settings",
        content: [
          {
            type: "list",
            title: "Usage Statistics",
            items: []
          },
          {
            type: "customHTML",
            title: "Eigenvalues from Factor Analysis",
            html: `
              <div style="margin: 20px 0;">
                <div style="font-size:0.9em; color:#666; margin-top:10px;">
                  <p><strong>Note:</strong> Factor analysis results in progress.</p>
                </div>
              </div>
            `
          }
        ],
        chartType: "usage"
      },
      {
        id: 3,
        title: "Instructor Ethical Concerns",
        category: "quantitative-instructors",
        summary: "Analysis of ethical concerns expressed by instructors",
        content: [
          {
            type: "list",
            title: "Concern Levels (1-5 scale)",
            items: []
          }
        ],
        chartType: "bar"
      },
      {
        id: 4,
        title: "Instructor Training Needs",
        category: "quantitative-instructors",
        summary: "Analysis of instructor training and support requirements",
        content: [
          {
            type: "list",
            title: "Support Requirements",
            items: []
          }
        ],
        chartType: "pie"
      }
    ],
    students: [
      {
        id: 5,
        title: "Student Readiness & Adoption",
        category: "quantitative-students",
        summary: "Survey results showing student readiness across demographics",
        content: [
          {
            type: "list",
            title: "Factor Analysis",
            items: []
          },
          {
            type: "customHTML",
            title: "Cronbach's Alpha Reliability",
            html: `
              <div style="margin: 20px 0;">
                <div style="font-size:0.9em; color:#666; margin-top:10px;">
                  <p><strong>Note:</strong> Content will be populated soon.</p>
                </div>
              </div>
            `
          },
          {
            type: "customHTML",
            title: "Descriptive Analysis",
            html: `
              <div id="student-descriptive-container" style="margin:20px 0; width:100%; height:450px; position:relative;">
                <div style="text-align:center; padding-top:200px; color:#666;">
                  Data visualization pending
                </div>
              </div>
              <div style="font-size:0.9em; color:#666; margin-top:10px;">
                <p><strong>Note:</strong> Descriptive analysis will be added soon.</p>
              </div>
            `,
            scriptToRun: "createStudentDescriptiveChart",
            targetContainerId: "student-descriptive-container"
          }
        ],
        chartType: "bar"
      },
      {
        id: 6,
        title: "Student Usage Patterns",
        category: "quantitative-students",
        summary: "Data on how students are using GenAI tools",
        content: [
          {
            type: "list",
            title: "Usage Statistics",
            items: []
          }
        ],
        chartType: "pie"
      },
      {
        id: 7,
        title: "Student Ethical Awareness",
        category: "quantitative-students",
        summary: "Analysis of students' ethical perspectives on GenAI use",
        content: [
          {
            type: "list",
            title: "Concern Levels (1-5 scale)",
            items: []
          }
        ],
        chartType: "bar"
      },
      {
        id: 8,
        title: "Student Perceived Benefits",
        category: "quantitative-students",
        summary: "Key benefits identified by student respondents",
        content: [
          {
            type: "list",
            title: "Average Rating (1-5 scale)",
            items: []
          }
        ],
        chartType: "bar"
      }
    ],
    surveyAppendix: {
      id: 9,
      title: "Survey Appendix",
      category: "quantitative-appendix",
      summary: "Survey instruments used in the research",
      content: [
        {
          type: "text",
          content: "The survey instruments will be displayed here to provide context for the research questions and findings."
        }
      ]
    }
  },
  // Qualitative Findings (Secondary Display)
  qualitative: {
    instructors: [
      {
        id: 10,
        title: "Instructor Qualitative Analysis",
        category: "qualitative-instructors",
        summary: "In-depth analysis of instructor experiences across key dimensions",
        dimensions: [
          {
            name: "Cognition",
            content: "Analysis of instructors' understanding and knowledge of AI systems.",
            wordcloud: "instructor-cognition-wordcloud"
          },
          {
            name: "Ability",
            content: "Examination of instructors' skills and capabilities in using AI tools.",
            wordcloud: "instructor-ability-wordcloud"
          },
          {
            name: "Vision",
            content: "Instructors' perspectives on the future of AI in education.",
            wordcloud: "instructor-vision-wordcloud"
          },
          {
            name: "Ethics",
            content: "Ethical considerations and concerns raised by instructors.",
            wordcloud: "instructor-ethics-wordcloud"
          },
          {
            name: "Perceived Threats",
            content: "Analysis of perceived challenges and risks from AI adoption.",
            wordcloud: "instructor-threats-wordcloud"
          },
          {
            name: "AI-enhanced Innovation",
            content: "Innovative approaches and implementations reported by instructors.",
            wordcloud: "instructor-innovation-wordcloud"
          },
          {
            name: "Satisfaction",
            content: "Instructor satisfaction levels with current AI tools and support.",
            wordcloud: "instructor-satisfaction-wordcloud"
          },
          {
            name: "Attitude",
            content: "Overall attitudes and orientation toward AI integration.",
            wordcloud: "instructor-attitude-wordcloud"
          }
        ],
        quotes: [
          {
            type: "quote",
            dimension: "Vision",
            text: "Data pending - instructor perspectives on AI's educational future.",
            author: "Forthcoming"
          },
          {
            type: "quote",
            dimension: "Ethics",
            text: "Data pending - instructor views on ethical AI implementation.",
            author: "Forthcoming"
          }
        ]
      }
    ],
    students: [
      {
        id: 11,
        title: "Student Qualitative Analysis",
        category: "qualitative-students",
        summary: "In-depth analysis of student experiences across key dimensions",
        dimensions: [
          {
            name: "Cognition",
            content: "Analysis of students' understanding and knowledge of AI systems.",
            wordcloud: "student-cognition-wordcloud"
          },
          {
            name: "Ability",
            content: "Examination of students' skills and capabilities in using AI tools.",
            wordcloud: "student-ability-wordcloud"
          },
          {
            name: "Vision",
            content: "Students' perspectives on the future of AI in education.",
            wordcloud: "student-vision-wordcloud"
          },
          {
            name: "Ethics",
            content: "Ethical considerations and concerns raised by students.",
            wordcloud: "student-ethics-wordcloud"
          },
          {
            name: "Perceived Threats",
            content: "Analysis of perceived challenges and risks from AI adoption.",
            wordcloud: "student-threats-wordcloud"
          },
          {
            name: "AI-enhanced Innovation",
            content: "Innovative approaches and implementations reported by students.",
            wordcloud: "student-innovation-wordcloud"
          },
          {
            name: "Satisfaction",
            content: "Student satisfaction levels with current AI tools and support.",
            wordcloud: "student-satisfaction-wordcloud"
          },
          {
            name: "Attitude",
            content: "Overall attitudes and orientation toward AI integration.",
            wordcloud: "student-attitude-wordcloud"
          }
        ],
        quotes: [
          {
            type: "quote",
            dimension: "Ability",
            text: "Data pending - student reflections on using AI tools.",
            author: "Forthcoming"
          },
          {
            type: "quote",
            dimension: "Satisfaction",
            text: "Data pending - student satisfaction with AI learning support.",
            author: "Forthcoming"
          }
        ]
      }
    ]
  },
  recommendations: {
    id: 12,
    title: "Recommendations & Next Steps",
    category: "recommendations",
    summary: "Evidence-based recommendations based on research findings",
    content: [
      {
        type: "list",
        title: "Key Recommendations",
        items: []
      }
    ]
  }
};

// Add visualization data
window.findingsVisualData = {
  wordcloud: {
    words: [
      { text: "AI", size: 100 },
      { text: "Education", size: 80 },
      { text: "Learning", size: 75 },
      { text: "Teaching", size: 75 },
      { text: "ChatGPT", size: 70 },
      { text: "Ethics", size: 65 },
      { text: "Assessment", size: 60 },
      { text: "Feedback", size: 55 },
      { text: "Curriculum", size: 50 },
      { text: "Personalization", size: 50 },
      { text: "Integration", size: 45 },
      { text: "Readiness", size: 45 },
      { text: "Cognition", size: 43 },
      { text: "Ability", size: 40 },
      { text: "Vision", size: 45 },
      { text: "Innovation", size: 40 },
      { text: "Challenges", size: 40 },
      { text: "Policy", size: 35 },
      { text: "Faculty", size: 35 },
      { text: "Students", size: 35 },
      { text: "Instructors", size: 35 },
      { text: "Privacy", size: 30 },
      { text: "Training", size: 30 },
      { text: "Guidelines", size: 25 },
      { text: "Adoption", size: 25 },
      { text: "Integrity", size: 25 },
      { text: "Threats", size: 23 },
      { text: "Bias", size: 20 },
      { text: "Literacy", size: 20 },
      { text: "Research", size: 20 }
    ]
  },
  timeline: [
    { date: "2022", event: "Initial survey design" },
    { date: "2023 Q1", event: "Pilot testing" },
    { date: "2023 Q2", event: "Full survey distribution" },
    { date: "2023 Q3", event: "Data collection complete" },
    { date: "2023 Q4", event: "Preliminary analysis" },
    { date: "2024 Q1", event: "In-depth analysis" },
    { date: "2024 Q2", event: "Final report" }
  ]
}; 