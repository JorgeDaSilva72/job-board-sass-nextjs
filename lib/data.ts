export const ads = [
  {
    imageUrl: "/ads/lws.png",
    linkUrl: "https://www.lws.fr/",
    altText: "lws",
  },
  {
    imageUrl: "/ads/qonto.png",
    linkUrl: "https://qonto.com/fr/r/388uto",
    altText: "quonto",
  },

  {
    imageUrl: "/ads/revolut.png",
    linkUrl: "https://www.revolut.com",
    altText: "revolut",
  },

  {
    imageUrl: "/ads/goopy_368x63.jpg",
    linkUrl: "https://www.goopy.fr/",
    altText: "goopy",
  },

  {
    imageUrl: "/pub.png",
    linkUrl: "#contact",
    altText: "Annonce 1",
  },
] as const;

// Constants for languages with ISO codes
export const languagesList = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "nl", label: "Dutch" },
  { value: "ru", label: "Russian" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "ar", label: "Arabic" },
  { value: "hi", label: "Hindi" },
  { value: "bn", label: "Bengali" },
  { value: "tr", label: "Turkish" },
  { value: "pl", label: "Polish" },
  { value: "vi", label: "Vietnamese" },
  { value: "th", label: "Thai" },
  { value: "sv", label: "Swedish" },
  { value: "da", label: "Danish" },
] as const;

// Comprehensive list of technical and professional skills
export const skillsList = [
  // Programming Languages
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "golang", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "typescript", label: "TypeScript" },

  // Web Technologies
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue.js" },
  { value: "nodejs", label: "Node.js" },
  { value: "nextjs", label: "Next.js" },
  { value: "express", label: "Express.js" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },

  // Database Technologies
  { value: "mysql", label: "MySQL" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mongodb", label: "MongoDB" },
  { value: "redis", label: "Redis" },
  { value: "elasticsearch", label: "Elasticsearch" },
  { value: "firebase", label: "Firebase" },

  // Cloud Platforms
  { value: "aws", label: "AWS" },
  { value: "azure", label: "Azure" },
  { value: "gcp", label: "Google Cloud" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },

  // Design Skills
  { value: "ui-design", label: "UI Design" },
  { value: "ux-design", label: "UX Design" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "figma", label: "Figma" },
  { value: "sketch", label: "Sketch" },
  { value: "adobe-xd", label: "Adobe XD" },
  { value: "photoshop", label: "Photoshop" },
  { value: "illustrator", label: "Illustrator" },

  // Project Management
  { value: "agile", label: "Agile Methodology" },
  { value: "scrum", label: "Scrum" },
  { value: "kanban", label: "Kanban" },
  { value: "jira", label: "Jira" },
  { value: "trello", label: "Trello" },

  // Data Science & AI
  { value: "machine-learning", label: "Machine Learning" },
  { value: "deep-learning", label: "Deep Learning" },
  { value: "data-analysis", label: "Data Analysis" },
  { value: "tensorflow", label: "TensorFlow" },
  { value: "pytorch", label: "PyTorch" },
  { value: "computer-vision", label: "Computer Vision" },
  { value: "nlp", label: "Natural Language Processing" },

  // DevOps
  { value: "ci-cd", label: "CI/CD" },
  { value: "jenkins", label: "Jenkins" },
  { value: "git", label: "Git" },
  { value: "linux", label: "Linux" },
  { value: "bash", label: "Bash Scripting" },

  // Soft Skills
  { value: "communication", label: "Communication" },
  { value: "teamwork", label: "Teamwork" },
  { value: "problem-solving", label: "Problem Solving" },
  { value: "leadership", label: "Leadership" },
  { value: "time-management", label: "Time Management" },
  { value: "adaptability", label: "Adaptability" },
  { value: "creativity", label: "Creativity" },

  // Testing
  { value: "unit-testing", label: "Unit Testing" },
  { value: "jest", label: "Jest" },
  { value: "cypress", label: "Cypress" },
  { value: "selenium", label: "Selenium" },
  { value: "qa", label: "Quality Assurance" },

  // Mobile Development
  { value: "react-native", label: "React Native" },
  { value: "flutter", label: "Flutter" },
  { value: "ios", label: "iOS Development" },
  { value: "android", label: "Android Development" },

  // Security
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "penetration-testing", label: "Penetration Testing" },
  { value: "encryption", label: "Encryption" },
  { value: "security-audit", label: "Security Auditing" },
] as const;
