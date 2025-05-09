// Case Studies Data
window.caseStudies = [
  {
    id: 1,
    title: "Responsible Use of ChatGPT in University History Seminars",
    category: "Teaching",
    summary: "How Dr. Lim structured a three-phase assignment sequence to integrate ChatGPT in a history course.",
    content: "Dr. Lim teaches a third-year undergraduate seminar titled Critical Approaches to Historical Inquiry. As generative AI tools like ChatGPT become more widely used, Dr. Lim notices a divide among students—some use AI for idea generation or feedback, while others avoid it due to concerns about plagiarism or its credibility. A few students submit AI-generated content without critical revision, which raises issues of academic honesty and lack of analytical depth.\n\nTo address this, Dr. Lim introduces a structured three-phase assignment sequence:\n\n1. Inquiry Question Development via ChatGPT: Students are instructed to use ChatGPT to generate 3–5 inquiry-based research questions related to their term paper topics. They then critically assess these questions, identify historical inaccuracies or conceptual weaknesses, and refine them based on scholarly criteria discussed in class.\n\n2. Draft Feedback and Revision Cycle: After writing a first draft of their term paper, students use ChatGPT to generate formative feedback (e.g., suggestions on structure, clarity, coherence). They reflect on this feedback, apply selected revisions, and justify their choices in a meta-commentary. AI-generated content is cross-checked with plagiarism software, and students are required to cite or disclose any direct use of AI output.\n\n3. AI Output Critique and Peer Discussion: As a final exercise, students critique a ChatGPT-generated historical analysis. In seminar, they compare the AI's reasoning, use of evidence, and historical perspective with peer submissions. The goal is to foster a deeper understanding of historiographical methods and the limitations of LLMs in nuanced historical interpretation.\n\nStudents submit a portfolio including original vs refined inquiry questions, revised term paper with AI feedback logs, reflective commentary on AI use, and critique of AI-generated historical analysis. This case builds students' skills in ethical tool use, critical engagement, and scholarly writing.",
    reflectionPrompts: [
      "In what ways can ChatGPT enhance, rather than replace, your role as a critical thinker and writer in academic work?",
      "What limitations might exist in AI's ability to generate meaningful historical inquiry or conclusions, and how would you address them?",
      "How can students responsibly integrate generative AI tools into academic assignments while upholding academic integrity and disciplinary standards?"
    ],
    hasWordCloud: true
  },
  {
    id: 2,
    title: "Guided Inquiry in Environmental Chemistry",
    category: "Science",
    summary: "How Dr. Tan integrated AI tools to help students visualize reaction pathways and interpret lab data.",
    content: "Dr. Tan teaches Environmental Chemistry at a large university. Many students struggle with visualizing reaction pathways and interpreting lab data. To address this, Dr. Tan integrates ChatGPT and ChemDraw plugins into pre-lab activities, helping students simulate and analyze chemical reactions before hands-on sessions.\n\nIn the implementation, students enter lab scenarios and raw data into ChatGPT with prompts like \"Explain this titration result and suggest what might have gone wrong.\" The AI provides structured reasoning and visual molecule diagrams. Dr. Tan adds a task requiring students to critique the AI's analysis using their own understanding.\n\nThe outcomes were significant: lab performance improved, especially among students with lower prior knowledge; students reported higher confidence in pre-lab preparation; and the instructor used student-AI interaction data to revise unclear instructions in the lab manual.",
    reflectionPrompts: [
      "How can educators ensure that AI-generated feedback aligns with pedagogical goals and assessment criteria?",
      "What are the potential risks of over-relying on AI for formative feedback, and how can they be mitigated?",
      "How might data from AI-student interactions be ethically used to improve teaching without infringing on privacy?"
    ],
    hasWordCloud: true
  },
  {
    id: 3,
    title: "Automating Design Feedback in a CAD Course",
    category: "Engineering",
    summary: "How Dr. Tan uses AI to provide iterative feedback on CAD designs in a mechanical engineering course.",
    content: "In an undergraduate mechanical engineering course at a Singaporean university, Dr. Tan uses ChatGPT and Copilot to assist students in iterative design tasks involving CAD software.\n\nStudents upload their design summaries into ChatGPT, which provides preliminary feedback on structural assumptions, materials choice, and compliance with design constraints. Feedback is cross-referenced with actual testing outcomes and peer reviews.\n\nThis use of AI reduces repetitive instructor workload and helps students refine their thinking. However, Dr. Tan notices some students overly trust AI's engineering advice, prompting him to run workshops on AI's computational limits and verification protocols.",
    reflectionPrompts: [
      "How can generative AI support the development of critical thinking skills in engineering education without fostering dependency?",
      "In what ways does AI-generated feedback differ from instructor feedback in terms of depth, accuracy, and perspective?",
      "How should educators scaffold the responsible use of generative AI to align with ethical academic practices?"
    ],
    hasWordCloud: true
  },
  {
    id: 4,
    title: "Cultural Ethics in AI-Enhanced Humanities Teaching",
    category: "Ethics",
    summary: "Dr. Farah Tan's experience addressing privacy concerns when students shared cultural narratives with AI.",
    content: "Dr. Tan, from the Sociology of Technology department, uses ChatGPT in a discussion-based seminar to help students analyze social implications of AI. Students were asked to simulate arguments on surveillance ethics using GPT-generated content.\n\nAn issue arose when she later discovered students had inputted private family narratives from interview assignments into ChatGPT. This raised serious cultural sensitivity concerns and breaches of informed consent.\n\nIn response, Dr. Tan paused the use of AI and created a workshop on digital ethics, emphasizing data ownership, oral traditions, and cultural respect, incorporating values from the Malay community about safeguarding family stories.",
    reflectionPrompts: [
      "How can educators ensure student data remains private and secure when using external AI tools in coursework?",
      "To what extent does AI-assisted learning affect students' sense of authorship, creativity, and academic integrity?",
      "How can we balance the pedagogical advantages of AI with the need to preserve authentic teacher-student relationships?"
    ],
    hasWordCloud: true
  },
  {
    id: 5,
    title: "The Mirage of Accuracy in Science Education",
    category: "Science",
    summary: "How Dr. Tan addresses students uncritically citing AI-generated climate statistics in biology lab reports.",
    content: "Dr. Tan Wei Ling, a science lecturer at NUS, notices her first-year biology students citing AI-generated climate statistics in lab reports without referencing actual field data. One student claimed, \"ChatGPT already summarized the findings,\" overlooking the need for peer-reviewed validation. Concerned, she realizes students assume AI outputs equal truth.\n\nTo address this issue, she mandates all students to attach source verification for any AI-generated content and introduces a module on \"Scientific Misinformation in the AI Age.\" Students must cross-check AI responses against government and academic databases (e.g., NEA, PUB, Scopus).\n\nIn her reflection, she worries that \"science without skepticism is no science at all,\" and believes instructors must explicitly teach discernment and data literacy alongside content knowledge.",
    reflectionPrompts: [
      "How can instructors across disciplines explicitly teach students to verify, critique, and reflect on AI usage in academic work?",
      "What role should cultural and disciplinary context play when designing AI-integrated assessments in Singapore's universities?",
      "How can instructors preserve students' voice, creativity, and critical thinking in an age of seamless AI fluency?"
    ],
    hasWordCloud: true
  },
  {
    id: 6,
    title: "AI Integration in University Teaching Across Disciplines",
    category: "Teaching",
    summary: "Examining how instructors in science, engineering, and humanities are exploring AI integration with varying approaches and outcomes.",
    content: "This case study examines three different approaches to AI integration across disciplines:\n\nScience – Biology Seminar on Climate Change: In a university-level environmental biology course, Dr. Lim is \"still exploring\" how AI can be integrated. She uses ChatGPT to generate scientific discussion prompts about climate change, tailored to recent journal articles. Students are asked to verify the AI's claims by reviewing peer-reviewed literature and presenting their critiques. However, students become reliant on AI-generated summaries, which are sometimes outdated or simplified. Dr. Lim realizes that AI is useful for ideation, but needs to scaffold student source validation and argument construction. She redesigns the assignment to include an annotated bibliography and peer feedback.\n\nEngineering – Programming for IoT Devices: Mr. Tan, a computer engineering lecturer, plans to \"try using AI to generate Python code.\" He introduces an optional AI assistant during practical lab sessions on IoT device programming. Students are allowed to use CoPilot or ChatGPT for code suggestions but must annotate which parts were AI-generated and explain the logic. Some students submit code they don't fully understand. Mr. Tan includes AI audit logs and mini oral checks to ensure students can explain their solutions. He concludes that AI can boost productivity but needs to be coupled with metacognitive reflection.\n\nHumanities – Critical Thinking in Historical Analysis: A history lecturer has \"no concrete plans yet\" but is interested in \"adaptive systems\" and \"AI for flipped classrooms.\" She pilots ChatGPT to generate multiple interpretations of historical events. Students use AI to simulate debates between historical figures (e.g., Churchill vs. Roosevelt) and are required to fact-check and refine these debates. However, students tend to accept AI interpretations uncritically. The instructor adds pre-debate readings and source analysis tasks to ensure deeper engagement and critical evaluation.",
    reflectionPrompts: [
      "How can we guide students to balance AI support with independent critical thinking?",
      "What scaffolds can ensure students understand and validate AI-generated outputs?",
      "In what ways can we assess AI-integrated assignments without promoting over-reliance?"
    ],
    hasWordCloud: true
  },
  {
    id: 7,
    title: "University-level AI Implementation Across Disciplines",
    category: "Teaching",
    summary: "Case studies of AI integration in environmental science, engineering, and philosophy at the university level.",
    content: "This case study showcases three university-level implementations of AI across different disciplines:\n\nEnvironmental Science: Dr. Lim introduces ChatGPT into a unit on urban sustainability. Students input different urban planning policies into ChatGPT to simulate environmental impact assessments. Using AI-generated comparisons, students then validate outputs with real-world data sets from Singapore's URA and NEA databases. Students become more critical in evaluating AI outputs, identifying hallucinations, and refining their prompts to produce reliable policy scenarios.\n\nMechanical Engineering: Prof. Tan implements AI to support a CAD project. Students design an automated gear system and use ChatGPT to generate initial design rationales, material recommendations, and basic stress analysis parameters. The outputs serve as drafts to be tested and improved through real simulations in SolidWorks. Students accelerate early-stage conceptualization while learning to verify and iterate AI-supported designs with engineering software.\n\nPhilosophy: Dr. Chong's ethics seminar includes an activity where students use AI to generate opposing arguments on controversial topics like euthanasia or AI rights. Students critique the AI's logic and compare it against classic ethical frameworks (e.g., Kantianism, Utilitarianism), then revise the arguments accordingly. This encourages metacognition, deepens argumentation skills, and fosters ethical reflection on the nature of reasoning and bias in both AI and human cognition.",
    reflectionPrompts: [
      "How does AI integration reshape student engagement and autonomy across disciplines?",
      "What strategies help students critically assess and refine AI-generated outputs?",
      "In what ways can instructors mitigate overreliance and preserve critical human inquiry in AI-supported classrooms?"
    ],
    hasWordCloud: true
  },
  {
    id: 8,
    title: "AI Integration Across University Disciplines: Science, Engineering, and Humanities",
    category: "Teaching",
    summary: "Examining AI integration strategies in biology lab reports, engineering design, and humanities source analysis.",
    content: "This case study examines three different approaches to AI integration across university disciplines:\n\nScience – Biology Lab Reports & Feedback Automation: Dr. Yeo teaches undergraduate biology. Struggling to keep up with the marking load, she starts using an AI writing assistant (e.g., ChatGPT or SciNote) to provide initial formative feedback on students' weekly lab reports. The tool highlights structural issues, suggests rephrasing, and checks for clarity in hypothesis statements and result interpretations. Students begin to rely too heavily on AI suggestions. Dr. Yeo modifies the workflow: students must submit an \"AI Reflection Log\" where they document what the AI suggested, what they accepted, and why. Students reported learning to critically evaluate AI input. Dr. Yeo was able to provide more targeted human feedback, reducing repetitive commenting. Peer reviews improved as students mimicked AI's feedback language.\n\nEngineering – Prompt Engineering in a Design Module: Prof. Lim, teaching an \"AI in Design Thinking\" elective, introduces students to prompt engineering. Teams work on building a prototype ChatGPT-based assistant to simulate responses in a customer support system for smart home devices. Students initially use overly generic prompts and receive inconsistent results. To address this, Prof. Lim runs workshops on refining instructions and testing outputs for accuracy and hallucination detection. Students report a deeper understanding of how input affects AI output and begin documenting prompt chains as part of their project submission. One group adapts their chatbot into a Capstone project.\n\nHumanities – Critical Source Analysis with AI Assistance: Ms. Tan teaches a course on Historical Methods. She introduces GenAI tools to help students brainstorm research questions and analyze sample primary sources (e.g., 19th-century letters). Students use AI to draft arguments and identify themes, but must compare them against traditional methods. Some students overly rely on AI-summarized interpretations without engaging with the text deeply. To reinforce critical thinking, Ms. Tan requires side-by-side comparisons between AI interpretation and their own. A rubric assesses not only argument quality but also AI usage reflection.",
    reflectionPrompts: [
      "How can AI tools be scaffolded to support—not supplant—critical thinking and academic integrity across disciplines?",
      "What strategies can educators adopt to track and assess meaningful student-AI interaction (e.g., reflective logs, prompt revision logs)?",
      "What role should institutional policy play in guiding responsible and effective AI integration in teaching, learning, and assessment?"
    ],
    hasWordCloud: true
  }
]; 