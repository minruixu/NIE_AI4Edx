// References in APA format for Literature Reviews
const references = [
  "Abd-alrazaq, A., AlSaad, R., Alhuwail, D., Ahmed, A., Healy, P. M., Latifi, S., Aziz, S., Damseh, R., Alrazak, S. A., & Sheikh, J. (2023). Large Language Models in Medical Education: Opportunities, Challenges, and Future Directions. JMIR Medical Education, 9(1), e48291. https://doi.org/10.2196/48291",

  "Abdelaal, N., & Al Sawy, I. (2024). Perceptions, challenges, and prospects: University Professors' use of Artificial Intelligence in Education. Australian Journal of Applied Linguistics, 7(1), 1–24. https://doi.org/10.29140/ajal.v7n1.1309",
  
  "Akiba, D., & Fraboni, M. C. (2023). AI-Supported Academic Advising: Exploring ChatGPT's Current State and Future Potential toward Student Empowerment. Journal of Higher Education Theory and Practice, 23(14), 136-146. https://doi.org/10.33423/jhetp.v23i14.6249",
  
  "Alasgarova, K., & Rzayev, R. (2024). Self-determination theory and AI in education: A theoretical framework for enhancing student motivation. [Reference details missing]",
  
  "Albadarin, Y., Saqr, M., Pope, N., & Tukiainen, M. (2024). A systematic literature review of empirical research on ChatGPT in education. Discover Education, 3, 60. https://doi.org/10.1007/s44217-024-00138-2",
  
  "Alhwaiti, M. (2023). Acceptance of artificial intelligence application in the post-covid ERA and its impact on faculty members' occupational well-being and teaching self efficacy: A path analysis using the utaut 2 model. Applied Artificial Intelligence, 37(1). https://doi.org/10.1080/08839514.2023.2175110",
  
  "Almaraz-López, C., Almaraz-Menéndez, F., & López-Esteban, C. (2023). Comparative Study of the Attitudes and Perceptions of University Students in Business Administration and Management and in Education toward Artificial Intelligence. Education Sciences, 13(6), 609. https://doi.org/10.3390/educsci13060609",
  
  "Almufarreh, A., & Arshad, M. (2023). Promising Emerging Technologies for Teaching and Learning: Recent Developments and Future Challenges. Sustainability, 15(10), 7985. https://doi.org/10.3390/su15107985",
  
  "Atchley, P., Pannell, H., Wofford, K., Hopkins, M., & Atchley, R. A. (2024). Human and AI collaboration in the higher education environment: Opportunities and concerns. Cognitive Research: Principles and Implications, 9, 30. https://doi.org/10.1186/s41235-024-00547-9",
  
  "Avgerinou, M., Karampelas, A., & Stefanou, V. (2023). Building the Plane as We Fly It: Experimenting with GenAI for Scholarly Writing. Irish Journal of Technology Enhanced Learning. https://doi.org/10.22554/ijtel.v7i2.128",
  
  "Bandi, A., Adapa, P. V. S. R., & Kuchi, Y. E. V. P. K. (2023). The Power of Generative AI: A Review of Requirements, Models, Input–Output Formats, Evaluation Metrics, and Challenges. IEEE Access, 11, 135089-135108. https://doi.org/10.1109/ACCESS.2023.3333695",
  
  "Barrot, J. S. (2024). Leveraging Google Gemini as a research writing tool in higher education. Technology, Knowledge and Learning. https://doi.org/10.1007/s10758-024-09774-x",
  
  "Biagini, F., et al. (2024). Doctoral students' knowledge and perceptions of AI technologies. [Reference details missing]",
  
  "Bonner, E., Lege, R., & Frazier, E. (2023). Large language model-based artificial intelligence in the language classroom: Practical ideas for teaching. Teaching English With Technology, 23(1), 23-41. https://doi.org/10.56297/BKAM1691/WIEO1749",
  
  "Cabero-Almenara, J., Palacios-Rodríguez, A., Loaiza-Aguirre, M. I., & Rivas-Manzano, M. del. (2024). Acceptance of educational artificial intelligence by teachers and its relationship with some variables and pedagogical beliefs. Education Sciences, 14(7), 740. https://doi.org/10.3390/educsci14070740",
  
  "Chai, F., Ma, J., Wang, Y., Zhu, J., & Han, T. (2024). Grading by AI makes me feel fairer? How different evaluators affect college students' perception of fairness. Frontiers in Psychology, 15. https://doi.org/10.3389/fpsyg.2024.1221177",
  
  "Chan, C. K. Y. (2023). A comprehensive AI policy education framework for university teaching and learning. Studies in Higher Education, 48(8), 1460-1475. https://doi.org/10.1080/03075079.2023.2168020",
  
  "Chan, C. K., & Lee, K. K. (2023). The AI Generation Gap: Are Gen Z students more interested in adopting generative AI such as ChatGPT in teaching and learning than their Gen X and millennial generation teachers? Smart Learning Environments, 10(1). https://doi.org/10.1186/s40561-023-00269-3",
  
  "Chang, D. H., Lin, M. P-C., Hajian, S., & Wang, Q. Q. (2023). Educational Design Principles of Using AI Chatbot That Supports Self-Regulated Learning in Education: Goal Setting, Feedback, and Personalization. Journal of Educational Computing Research, 61(7), 1841-1869. https://doi.org/10.1177/07356331231165921",
  
  "Chen, H., Li, Y., Wang, Y., Lee, Y., Petri, A., & Cha, T. (2022). Computer Science and Communication Students' Perceptions of AI-Integration in Learning: A Case Study of OCEL.AI. Journal of Ethnographic & Qualitative Research, 16(4), 259–274.",
  
  "Cong-Lem, N., Tran, T. N., & Nguyen, T. T. (2024). Academic integrity in the age of generative AI: Perceptions and responses of Vietnamese EFL teachers. Teaching English With Technology, 2024(1). https://doi.org/10.56297/fsyb3031/mxnb7567",
  
  "Cooper, G. (2023). Examining Science Education in ChatGPT: An Exploratory Study of Generative Artificial Intelligence. Journal of Science Education and Technology, 32, 444-452. https://doi.org/10.1007/s10956-023-10039-y",
  
  "Crawford, J., Cowling, M., & Allen, K. A. (2023). Leadership is needed for ethical ChatGPT: Character, assessment, and learning using artificial intelligence (AI). Journal of University Teaching & Learning Practice, 20(2), 1-8. https://doi.org/10.53761/1.20.02.02",
  
  "Dai, Y. (2024). Dual-contrast pedagogy for AI literacy in upper elementary schools. Learning and Instruction, 91, 101899. https://doi.org/10.1016/j.learninstruc.2024.101899",
  
  "Damiano, A. D., Lauría, E. J. M., Sarmiento, C., & Zhao, N. (2024). Early perceptions of teaching and learning using Generative AI in higher education. Journal of Educational Technology Systems, 52(3), 346–375. https://doi.org/10.1177/00472395241233290",
  
  "Dehouche, N. (2021). Plagiarism in the age of massive Generative Pre-trained Transformers (GPT-3). Ethics in Science and Environmental Politics, 21, 17-23. https://doi.org/10.3354/esep00195",
  
  "Dickey, E., & Bejarano, A. (2023). A Model for Integrating Generative AI into Course Content Development. ArXiv, abs/2308.12276. https://doi.org/10.48550/arXiv.2308.12276",
  
  "Dickey, E., Bejarano, A., & Garg, C. (2023). Innovating Computer Programming Pedagogy: The AI-Lab Framework for Generative AI Adoption. ArXiv, abs/2308.12258. https://doi.org/10.48550/arXiv.2308.12258",
  
  "Estacio Pereira, S., Nsair, S., Pereira, L. R., & Grant, K. (2024). Constructive alignment in a graduate-level project management course: An innovative framework using large language models. International Journal of Educational Technology in Higher Education, 21, 25. https://doi.org/10.1186/s41239-024-00457-2",
  
  "Farrelly, T., & Baker, N. (2023). Generative Artificial Intelligence: Implications and Considerations for Higher Education Practice. All Ireland Journal of Higher Education, 15(1). https://ojs.aishe.org/index.php/aishe-j/article/view/664",
  
  "Gao, Y., Wang, Q., & Wang, X. (2024). Exploring EFL university teachers' beliefs in integrating ChatGPT and other large language models in language education: A study in China. Asia Pacific Journal of Education, 44(1), 29-44. https://doi.org/10.1080/02188791.2024.2305173",
  
  "Genimon Vadakkemulanjanal Joseph, P. Athira, M. Anit Thomas, Dawn Jose, Therese V. Roy, & Malavika Prasad. (2024). Impact of Digital Literacy, Use of AI Tools and Peer Collaboration on AI Assisted Learning: Perceptions of the University Students. Digital Education Review, 45, 43–49.",
  
  "Giray, L., De Silos, P. Y., Adornado, A., Buelo, R. J. V., Galas, E., Reyes-Chua, E., Santiago, C., & Ulanday, M. L. (2024). Use and Impact of Artificial Intelligence in Philippine Higher Education: Reflections from Instructors and Administrators. Journal of Web Librarianship, 18(2), 141-159. https://doi.org/10.1080/10875301.2024.2352746",
  
  "Grassini, S. (2023). Shaping the Future of Education: Exploring the Potential and Consequences of AI and ChatGPT in Educational Settings. Education Sciences, 13(5), 410. https://doi.org/10.3390/educsci13050410",
  
  "Grotrian, S., Parriott, L., Griffin, B., Woerth, B., & Rowell, W. (2024). Student Perceptions of ChatGPT and New AI Tools. Educational Research: Theory and Practice, 35(2), 27–30.",
  
  "Hazaimeh, M., & Al-Ansi, A. M. (2024). Model of AI acceptance in Higher Education: Arguing teaching staff and students perspectives. The International Journal of Information and Learning Technology, 41(4), 371–393. https://doi.org/10.1108/ijilt-01-2024-0005",
  
  "Holmes, W., Iniesto, F., Anastopoulou, S., & Boticario, J. G. (2023). Stakeholder perspectives on the ethics of AI in distance-based Higher Education. The International Review of Research in Open and Distributed Learning, 24(2), 96–117. https://doi.org/10.19173/irrodl.v24i2.6089",
  
  "Hostetter, A. B., Call, N., Frazier, G., James, T., Linnertz, C., Nestle, E., & Tucci, M. (2024). Student and Faculty Perceptions of Generative Artificial Intelligence in Student Writing. Teaching of Psychology, 0(0). https://doi.org/10.1177/00986283241279401",
  
  "Husain, A. (2024). Potentials of ChatGPT in computer programming: Insights From Programming instructors. Journal of Information Technology Education: Research, 23, 002. https://doi.org/10.28945/5240",
  
  "Ilieva, G., Yankova, T., Klisarova-Belcheva, S., Dimitrov, A., Bratkov, M., & Angelov, D. (2023). Effects of Generative Chatbots in Higher Education. Education Sciences, 13(8), 807. https://doi.org/10.3390/educsci13080807",
  
  "Kiryakova, G., & Angelova, N. (2023). ChatGPT—A challenging tool for the university professors in their teaching practice. Education Sciences, 13(10), 1056. https://doi.org/10.3390/educsci13101056",
  
  "Kizilcec, R. F. (2024). To advance AI use in education, focus on understanding educators. International Journal of Artificial Intelligence in Education, 34, 595-600. https://doi.org/10.1007/s40593-023-00351-4",
  
  "Kooli, C. (2023). Chatbots in Education and Research: A Critical Examination of Ethical Implications and Solutions. International Journal of Educational Methodology, 9(2), 367-384. https://doi.org/10.12973/ijem.9.2.367",
  
  "Krecar, I. M., Kolega, M., & Jurcec, L. (2024). Perception of ChatGPT Usage for Homework Assignments: Students' and Professors' Perspectives. IAFOR Journal of Education, 12(2), 33–60.",
  
  "Luckin, R., Cukurova, M., Kent, C., & du Boulay, B. (2022). Empowering educators to be AI-ready. Computers and Education: Artificial Intelligence, 3, 100076. https://doi.org/10.1016/j.caeai.2022.100076",
  
  "Ma, D., Akram, H., & Chen, I-H. (2024). Artificial Intelligence in Higher Education: A Cross-Cultural Examination of Students' Behavioral Intentions and Attitudes. International Review of Research in Open & Distributed Learning, 25(3), 134–157. https://doi.org/10.19173/irrodl.v25i3.7703",
  
  "Mageira, K., Pittou, D., Papasalouros, A., Kotis, K., Zangogianni, P., & Daradoumis, A. (2022). Educational AI Chatbots for Content and Language Integrated Learning. Education Sciences, 12(9), 579. https://doi.org/10.3390/educsci12090579",
  
  "Marquardson, J. (2024). Embracing Artificial Intelligence to Improve Self-Directed Learning: A Cybersecurity Classroom Study. Information Systems Education Journal, 22(1), 4–13.",
  
  "Mateus, J.-C., Cappello, G., Lugo, N., & Guerrero-Pico, M. (2024). Communication educators facing the arrival of Generative Artificial Intelligence: Exploration in Mexico, Peru, and Spain. Digital Education Review, (45), 106–114. https://doi.org/10.1344/der.2024.45.106-114",
  
  "Michel-Villarreal, R., Vilalta-Perdomo, E., Salinas-Navarro, D. E., Thierry-Aguilera, R., & Gerardo, F. S. (2023). Challenges and Opportunities of Generative AI for Higher Education as Explained by ChatGPT. Education Sciences, 13(6), 591. https://doi.org/10.3390/educsci13060591",
  
  "Mishra, P., Warr, M., & Islam, R. (2023). TPACK in the age of ChatGPT and generative AI. Journal of Digital Learning in Teacher Education, 39(4), 235-251. https://doi.org/10.1080/21532974.2023.2247480",
  
  "Neo, M. (2022). The Merlin Project: Malaysian Students' Acceptance of an AI Chatbot in Their Learning Process. Turkish Online Journal of Distance Education, 23(3), 31–48.",
  
  "Owan, V. J., Abang, K. B., Idika, D. O., Etta, E. O., & Bassey, B. A. (2023). Exploring the potential of artificial intelligence tools in educational measurement and assessment. Educational Process: International Journal, 12(2), 41-69. https://dx.doi.org/10.22521/edupij.2023.122.3",
  
  "Perkins, M. (2023). Academic integrity considerations of AI Large Language Models in the post-pandemic era: ChatGPT and beyond. Journal of Academic Ethics, 21(4), 531-548. https://doi.org/10.1007/s10805-023-09468-6",
  
  "Popenici, S., Catalano, H., Mestic, G., & Ani-Rus, A. (2023). A systematic review of the artificial intelligence implications in shaping the future of higher education. Educatia 21 Journal, 26, Art. 11. https://doi.org/10.24193/ed21.2023.26.11",
  
  "Prather, J., Denny, P., Leinonen, J., Becker, B., Albluwi, I., Craig, M., Keuning, H., Kiesler, N., Kohn, T., Luxton-Reilly, A., MacNeil, S., Petersen, A., Pettit, R., Reeves, B., & Šavelka, J. (2023). The Robots Are Here: Navigating the Generative AI Revolution in Computing Education. Proceedings of the 2023 Working Group Reports on Innovation and Technology in Computer Science Education. https://doi.org/10.1145/3623762.3633499",
  
  "Rodriguez, W., Angle, P., & Snyder, M. (2021). Can Machine Learning Enhance Human Learning in Times of Disruption? Advances in Science, Technology and Engineering Systems Journal, 6(1), 1260-1271. https://doi.org/10.25046/aj0601142",
  
  "Roumeliotis, K. I., & Tselikas, N. D. (2023). ChatGPT and Open-AI Models: A Preliminary Review. Future Internet, 15(5), 159. https://doi.org/10.3390/fi15050159",
  
  "Ruiz-Rojas, L. I., Acosta-Vargas, P., De-Moreta-Llovet, J., & Gonzalez-Rodriguez, M. (2023). Empowering Education with Generative Artificial Intelligence Tools: Approach with an Instructional Design Matrix. Applied Sciences, 13(15), 8816. https://doi.org/10.3390/app13158816",
  
  "Salhab, R. (2024). AI literacy across Curriculum Design: Investigating College Instructor's perspectives. Online Learning, 28(2). https://doi.org/10.24059/olj.v28i2.4426",
  
  "Sanders, D. A., & Mukhari, S. S. (2024). Lecturers' perceptions of the influence of AI on a blended learning approach in a South African higher education institution. Discover Education, 3(1), 1–18. https://doi.org/10.1007/s44217-024-00235-2",
  
  "Sonderegger, S. (2022). How Generative Language Models can Enhance Interactive Learning with Social Robots. In Proceedings of the 14th International Conference on Social Robotics (ICSR 2022), pp. 545-556. https://doi.org/10.1007/978-3-031-24670-8_49",
  
  "Su, J., & Yang, W. (2023). Unlocking the Power of ChatGPT: A Framework for Applying Generative AI in Education. Education Sciences, 13(8), 817. https://doi.org/10.3390/educsci13080817",
  
  "Treglia, E., & Tomassoni, R. (2024). Creativity and Generative AI in Educational Contexts: Challenges and Future Scenarios. Survey on the Perceptions of Students and Teachers. Italian Journal of Health Education, Sport & Inclusive Didactics, 8(2), 388–401. https://doi.org/10.32043/gsd.v8i2.1147",
  
  "Usher, M., & Barak, M. (2024). Developing AI ethics literacy for STEM students. [Reference details missing]",
  
  "Van den Berg, G., & du Plessis, E. (2023). ChatGPT and Generative AI: Possibilities for Its Contribution to Lesson Planning, Critical Thinking and Openness in Teacher Education. African Journal of Research in Mathematics, Science and Technology Education, 27(3), 412-425. https://doi.org/10.1080/18117295.2023.2266045",
  
  "Van Wyk, M. M. (2024). Is ChatGPT an opportunity or a threat? Preventive strategies employed by academics related to a GenAI-based LLM at a faculty of education. Journal of Applied Learning & Teaching, 7(1). https://doi.org/10.37074/jalt.2024.7.1.15",
  
  "Wang, F., King, R. B., Chai, C. S., & Zhou, Y. (2023). University students' intentions to learn artificial intelligence: the roles of supportive environments and expectancy–value beliefs. International Journal of Educational Technology in Higher Education, 20(1), 1–21. https://doi.org/10.1186/s41239-023-00417-2",
  
  "Wang, X., Li, L., Tan, S. C., Yang, L., & Lei, J. (2023). Preparing for AI-Enhanced Education: Conceptualizing and empirically examining teachers' AI readiness. Computers in Human Behavior, 146, 107798. https://doi.org/10.1016/j.chb.2023.107798",
  
  "Ward, D., Loshbaugh, H. G., Gibbs, A. L., Henkel, T., Siering, G., Williamson, J., & Kayser, M. (2024). How Universities Can Move Forward with Generative AI in Teaching and Learning. Change: The Magazine of Higher Learning, 56(2), 12-19. https://doi.org/10.1080/00091383.2024.2297635",
  
  "Watanabe, T. (2024). AI use in universities in relation to Kant's reflections on enlightenment. [Reference details missing]",
  
  "Wollowski, M., Selkowitz, R., Brown, L., Goel, A., Luger, G., Marshall, J., Neel, A., Neller, T., & Norvig, P. (2016). A survey of current practice and teaching of AI. Proceedings of the AAAI Conference on Artificial Intelligence, 30(1). https://doi.org/10.1609/aaai.v30i1.9857",
  
  "Yan, L., Sha, L., Zhao, L., Li, Y., Martinez‐Maldonado, R., Chen, G., Li, X., Jin, Y., & Gašević, D. (2023). Practical and ethical challenges of large language models in education: A systematic scoping review. British Journal of Educational Technology, 55(1), 90–112. https://doi.org/10.1111/bjet.13370",
  
  "Yeo, M. A. (2022). Academic integrity in the age of Artificial Intelligence (AI) authoring apps. Journal of Academic Ethics, 20(4), 393-410. https://doi.org/10.1007/s10805-022-09452-6",
  
  "Yu, H. (2023). Reflection on whether chat GPT should be banned by academia from the perspective of education and teaching. Frontiers in Psychology, 14. https://doi.org/10.3389/fpsyg.2023.1181712",
  
  "Yu, H., & Guo, Y. (2023). Generative artificial intelligence empowers educational reform: current status, issues, and prospects. Frontiers in Psychology, 14, 1225616. https://doi.org/10.3389/fpsyg.2023.1225616",
  
  "Zhou, Y., & Schofield, D. (2024). Developing AI ethics literacy for students. [Reference details missing]"
];

// Make the data available globally
window.references = references; 