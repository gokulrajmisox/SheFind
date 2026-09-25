<div align="center">
  <h1>🌸 SheFind</h1>
  <p><b>Women Scholarship & Government Scheme Finder</b></p>
  <p>A civic-tech platform empowering women and girl students by centralizing scholarships and government schemes.</p>
  
  [![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/gokulrajmisox/SheFind)
</div>

<br/>

## 🌍 Alignment with UN SDG Goal 5: Gender Equality
**SheFind is strictly aligned with the United Nations Sustainable Development Goal 5:** *Achieve gender equality and empower all women and girls.* 

Education and financial independence are the cornerstones of female empowerment. However, financial barriers frequently prevent young women from pursuing higher education or advancing their careers. By democratizing access to financial aid, scholarships, and welfare schemes, **SheFind directly contributes to:**
- Ensuring women's full and effective participation and equal opportunities for leadership at all levels of decision-making in political, economic, and public life.
- Undertaking reforms to give women equal rights to economic resources.
- Enhancing the use of enabling technology, in particular information and communications technology, to promote the empowerment of women.

## 📖 Detailed Description
**SheFind** is a comprehensive, centralized civic-tech digital platform designed exclusively for women and girl students. It acts as a one-stop discovery engine for scholarships, grants, and government welfare schemes. 

Navigating the bureaucratic maze of government and private funding can be overwhelming. SheFind simplifies this by aggregating and organizing financial aid data into a clean, searchable, and highly intuitive user interface. Whether a student is looking for a high school stipend, a women-in-STEM grant, or a single-girl-child government scheme, SheFind curates the best opportunities tailored to their specific demographic and educational background.

## ⚠️ The Problem Statement
Despite the existence of billions of dollars in allocated government funds and private scholarships aimed at empowering women, **millions of eligible girls miss out every year**. This paradox exists due to several critical friction points:

1. **Information Fragmentation:** Data is scattered across dozens of disconnected websites, individual state portals, and obscure departmental pages. There is no single source of truth.
2. **Complex Bureaucratic Jargon:** Eligibility criteria are often buried in dense legal or bureaucratic language, making it difficult for standard applicants to know if they qualify.
3. **Lack of Awareness & Digital Divide:** Many students lack the awareness or digital literacy required to navigate complex official web portals to hunt for schemes.
4. **Missed Deadlines:** With opportunities hosted on different platforms, tracking application cycles and deadlines is nearly impossible without a unified dashboard.
5. **Scams and Middlemen:** The confusing landscape forces students to rely on paid "agents" or third-party portals that charge fees or peddle misinformation.

## 🛠️ Our Approach
SheFind tackles these challenges through a targeted, user-centric approach:

- **Centralized Aggregation:** We act as an aggregator, pulling authenticated information from official sources and presenting it on a single platform.
- **Demystified Information:** We break down complex eligibility criteria into simple, easily understandable checklists and summaries.
- **Smart Filtering & Personalization:** Instead of scrolling through hundreds of irrelevant schemes, users can input their education level, category, and interests to see strictly matched opportunities.
- **Direct Official Links:** We eliminate the middleman by providing direct links to the official application portals, ensuring safety, transparency, and authenticity.

## ✨ Key Features
- **Discover Opportunities:** Browse an extensive directory of scholarships and government schemes dedicated to women.
- **Smart Search:** Quickly locate specific programs using keywords.
- **Category Filtering:** Filter schemes by specific demographic or focus categories (e.g., STEM, Minority, Single Girl Child).
- **Education Level Filtering:** Narrow down programs based on the applicant's current educational pursuit (e.g., High School, Undergraduate, Ph.D.).
- **SheFind Guide Chatbot:** Ask Gemini 3.8 Flash for plain-language guidance about scholarships, schemes, eligibility, documents, and next steps.

## 📸 Screenshots

### Discover Opportunities
<img src="./images/discover.png" alt="Discover Opportunities" width="800"/>

### User Dashboard
<img src="./images/dashboard.png" alt="User Dashboard" width="800"/>

### Secure Login
<img src="./images/login.png" alt="Secure Login" width="800"/>


## 👥 Meet the Team
We are a dedicated team passionate about leveraging technology for civic good and women's empowerment.

| Role | Name |
| :--- | :--- |
| **👑 Team Leader** | **Gokulraj** |
| 💻 Team Member | Jayashree |
| 💻 Team Member | Soshi |
| 💻 Team Member | Kumaran |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/gokulrajmisox/SheFind.git
cd SheFind

# Install dependencies and run locally
npm install
npm run dev
```

## 🤖 Gemini Chatbot API

SheFind includes a chatbot at `/chatbot` powered by Gemini 3.8 Flash. The browser sends messages to the same-origin Vercel serverless route at `/api/chat`; the route calls Gemini server-side. This keeps the Gemini API key out of the frontend bundle and out of public source code.

### Vercel environment variables

In **Vercel → Project Settings → Environment Variables**, add the following variables for Production, Preview, and Development:

```env
GEMINI_API_KEY=<your Gemini API key>
GEMINI_MODEL=gemini-3.8-flash
```

Do not prefix the Gemini variables with `VITE_`. Variables beginning with `VITE_` are exposed to the browser. After adding or changing the variables, redeploy the Vercel project.

The frontend-safe Supabase variables remain separate:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=<your Supabase anon key>
```

### API files

- [`api/chat.ts`](api/chat.ts) — secure Vercel serverless Gemini proxy.
- [`src/pages/Chatbot.tsx`](src/pages/Chatbot.tsx) — chatbot interface and conversation state.
- [`api/README.md`](api/README.md) — concise deployment reference.

Never commit the Gemini key or place it in client-side code. If a key has been exposed publicly, revoke it and create a replacement before adding it to Vercel.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/gokulrajmisox/SheFind/issues) if you want to contribute.

---
<div align="center">
  Built with ❤️ for women's education and empowerment.
</div>
