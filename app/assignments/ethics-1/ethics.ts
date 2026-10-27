// Ethics 1: "Ethics in Software Engineering", our team's paper for COMP 523
// (Dr. Paul Stotts), transcribed from the submitted Google Doc.

// A paragraph, a bulleted or numbered list, or a two-column table.
export type Block =
  | string
  | { list: string[]; ordered?: boolean }
  | { table: { head: [string, string]; rows: [string, string][] } };

export type Section = {
  heading: string;
  // Subsections, e.g. "What happened" within a case.
  parts: { heading?: string; blocks: Block[] }[];
};

export const AUTHORS = ["Andy Huoy", "Adithi Srikrishna", "Anton Sun", "Jerry Wen"];

export const INTRO: Block[] = [
  "Software Engineering has been implemented in almost all walks of life. Apps let us call rides in a few clicks, machine learning models have been leveraged to help companies efficiently sort through applicants, and AI chatbots promise to answer complicated questions instantly. These advances make services faster, cheaper, and more accessible than ever before. We examined three software systems whose behavior we consider unethical, each showing a different way responsibility can fail. Uber's Greyball was deception built on purpose. Amazon's experimental hiring model learned discrimination nobody intended. New York City's MyCity chatbot gave confident, wrong legal guidance under an official government label.",
  "For each case, we describe what happened, explain why it is unethical, and ask where the problem lies: in the engineers' conduct, in what the software does, or in decisions that fit neither category. We chose the third case because it closely resembles our own project, a retrieval-augmented (RAG) assistant that answers questions about UNC research policy.",
];

export const SECTIONS: Section[] = [
  {
    heading: "Case 1: Uber's Greyball",
    parts: [
      {
        heading: "What happened?",
        blocks: [
          "In 2014, Uber used a tool called Greyball to identify government officials and show them a fake version of its app, so they could not catch drivers operating where Uber was banned or unapproved (Isaac, 2017). Greyball sat inside a broader program called VTOS (\"violation of terms of service\"). It was used in cities such as Boston, Paris, and Las Vegas, and in countries including Australia, China, and South Korea.",
          "Uber was likely able to flag officials using signals such as:",
          {
            list: [
              "Geofencing: drawing a digital boundary around government offices and watching for users who repeatedly opened the app nearby.",
              "Payment data: checking whether a rider's credit card was tied to an institution like a police credit union.",
              "Device data: looking up the cheap phone models that city enforcement teams tended to buy for sting accounts.",
              "Social media: searching online profiles when other signals were inconclusive.",
            ],
          },
          "A flagged user saw \"ghost cars\" that did not exist, or no cars at all. In Portland, Oregon, a city enforcement inspector tried to hail an Uber in a late-2014 sting and could not get a ride. The city's own investigation later found Uber had used Greyball against 16 transportation officials, denying them dozens of rides (Reuters, 2017). After the New York Times exposed the program in March 2017, Uber prohibited using Greyball against regulators, and the U.S. Department of Justice opened a criminal investigation (Reuters, 2017).",
        ],
      },
      {
        heading: "Why it is unethical",
        blocks: [
          "Uber and Greyball's purpose in this use was deception. It lied to specific people so that a company could keep operating where officials had said it was not allowed. That undermines the public's ability to enforce rules through its governments, whatever one thinks of the taxi regulations themselves.",
          "This action also turned customer data against customers. Location, payment, and device information that riders handed over to get a ride was mined to profile them for possible law enforcement. This directly conflicts with the ACM Code of Ethics, which asks computing professionals to be honest and trustworthy (1.3) and to know and respect existing rules (2.3) (ACM, 2018).",
        ],
      },
      {
        heading: "Engineer, product, or both?",
        blocks: [
          "Both, with engineers and product at the center. The software did exactly what it was built to do, so this was not a bug. According to the Times, Uber engineers realized that a tool built to hide drivers from hostile competitors could also evade law enforcement. They then wrote a playbook of tactics and distributed it to managers in more than a dozen countries (Isaac, 2017). Responsibility was also organizational. Uber's legal team approved the program, and at least 50 employees knew about it. Some of them doubted it was ethical or legal, yet it continued. This shows how a culture that rewards aggressive growth can make individual engineers feel their objections won't matter.",
          "The case also shows dual use. Uber said the same techniques protected drivers from physical attacks by taxi workers in some countries. A feature can be defensible in one use and unethical in another, so engineers are responsible for how their tools are repurposed, not only for the original intent.",
        ],
      },
    ],
  },
  {
    heading: "Case 2: Amazon's experimental hiring algorithm",
    parts: [
      {
        heading: "What happened?",
        blocks: [
          "Starting in 2014, a team at Amazon built machine-learning models to review résumés and rate job candidates from one to five stars, much like products on its site (Dastin, 2018). The goal was to hand the system a large stack of applications and get back the few best candidates. The models were trained on résumés submitted to Amazon over the previous 10 years, and most of those came from men. By 2015, the company saw that the system was not rating candidates for technical roles in a gender-neutral way.",
          "According to Reuters:",
          {
            list: [
              "It penalized résumés containing the word \"women's,\" as in a women's club or team.",
              "It downgraded graduates of two all-women's colleges.",
              "It favored verbs more common on men's engineering résumés, such as \"executed\" and \"captured.\"",
            ],
          },
          "Amazon edited the models to be neutral toward those specific terms, but could not guarantee the models wouldn't find other ways to discriminate. Amazon disbanded the team by early 2017. Recruiters had looked at the tool's recommendations, though sources said they never relied on them alone. Amazon said the tool was never used by recruiters to evaluate candidates (Dastin, 2018).",
        ],
      },
      {
        heading: "Why it is unethical",
        blocks: [
          "The system discriminated by gender in a decision that shapes people's livelihoods. Women applicants were scored lower for reasons unrelated to their ability to do the job. This conflicts with the ACM Code's principle to be fair and take action to prevent discrimination (ACM, 2018).",
          "The harm is also hard to detect. A rejected applicant would rarely know an algorithm ranked them, let alone why, so they couldn't challenge the decision. Automating a biased process can make that bias look objective and spread it to thousands of applicants at once.",
        ],
      },
      {
        heading: "Engineer, product, or both?",
        blocks: [
          "Mostly the product's function, but engineering choices made it possible. No one appears to have intended the bias. The model learned it from historical data that reflected a male-dominated industry, so the software reproduced the past and treated it as the definition of a good hire.",
          "The engineers still made choices that matter. They used past hiring outcomes as the definition of \"good\" without asking whether those outcomes were fair. They also built a system nobody could fully explain, which is why patching individual words couldn't prove the bias was gone.",
          "Amazon also deserves credit: the team discovered the problem, tried to fix it, and ultimately shut the project down. That shows what responsible behavior looks like when a model fails, and it raises a harder question. Many organizations would not have caught this at all.",
        ],
      },
    ],
  },
  {
    heading: "Case 3: New York City's MyCity chatbot",
    parts: [
      {
        heading: "What happened",
        blocks: [
          "We wanted to choose a system that is similar to ours so we can learn from others' past mistakes, and we came across “New York City's MyCity chatbot”. In October 2023, New York City launched an AI chatbot, built on Microsoft's Azure AI services, to help people start and run businesses in the city (Lecher, 2024). The city said it would draw on more than 2,000 official NYC Business web pages and help with compliance, codes, and regulations. That is essentially the same design as our project: answer questions using a curated set of official documents.",
          "In March 2024, testing by The Markup found the bot confidently gave answers that would lead users to break the law. It said:",
          {
            list: [
              "Employers could take a cut of workers' tips.",
              "Landlords did not have to accept tenants with Section 8 housing vouchers, even though source-of-income discrimination is illegal in NYC.",
              "Businesses could go cash-free, despite a 2020 city law requiring them to accept cash.",
              "There were no rules on notifying staff about schedule changes.",
            ],
          },
          "The answers were also inconsistent. When ten Markup staffers asked the same voucher question, all ten were told the wrong answer, though a reporter had once received the right one. The page carried only a small warning that the bot might produce incorrect content, and it often gave answers without links to sources (Lecher, 2024).",
          "The city kept the bot online, called it a pilot, and added stronger disclaimers telling users not to treat its responses as legal advice. In January 2026, Mayor Zohran Mamdani called the bot functionally unusable and announced it would be shut down to save money; its foundations had reportedly cost nearly $600,000. The city took it offline in early February 2026 (Lecher & Honan, 2026).",
        ],
      },
      {
        heading: "Why it is unethical",
        blocks: [
          "The bot spoke with the authority of the city government while being unreliable on high-stakes legal questions. A small business owner had no way to tell a correct answer from an illegal one. Following its advice could expose them to fines or lawsuits, and it could harm third parties such as workers denied tips or tenants denied housing.",
          "The ethical failure was not the occasional error, since all software has bugs. It was deploying the system to the public without showing it was accurate enough for the job, then keeping it running after the errors were documented. The ACM Code asks professionals to give thorough evaluations of systems and their risks and to be transparent about a system's limitations (ACM, 2018). A small disclaimer does not meet that standard when the whole product is presented as official guidance.",
        ],
      },
      {
        heading: "Engineer, product, or both?",
        blocks: [
          "This case does not fit neatly into either category. The product's behavior was the immediate problem: the language model generated plausible but false legal claims. But that behavior is a known property of these models, so the deeper failures were decisions made by people:",
          {
            list: [
              "Testing: basic questions about tips, vouchers, and cash were enough to expose serious errors, which suggests the system was not tested against the legal questions it was built to answer.",
              "Design: answers often came without sources, so users could not check them.",
              "Deployment and leadership: officials chose to keep it public and defend it after the problems were reported, treating real users as test subjects.",
            ],
          },
          "Responsibility was spread across the city, its vendor, and the people who built and approved it, which made it easy for everyone to assume someone else had checked.",
        ],
      },
      {
        heading: "What this means for our project",
        blocks: [
          "Nora, our UNC research policy assistant, uses the same basic approach as MyCity, and a researcher who receives wrong guidance on IRB approval or data sharing could face real consequences. Several of our requirements respond directly to the failures above:",
          {
            table: {
              head: ["MyCity failure", "Our design response"],
              rows: [
                ["Answers often had no sources", "Every answer cites the policy it came from"],
                [
                  "Guessed instead of admitting uncertainty",
                  "Refers users to the right compliance office when it can't answer",
                ],
                [
                  "Presented as authoritative legal guidance",
                  "Clearly labels answers as guidance, not compliance determinations",
                ],
                [
                  "Weak answers were indistinguishable from good ones",
                  "Confidence indicator and admin tracking of low-confidence and unanswered questions (NF9, F18)",
                ],
                ["Problems persisted after users reported them", "Answer feedback reviewed by admins"],
              ],
            },
          },
          "These safeguards reduce the risk but don't remove it. The model can still misread a document it retrieved correctly, and users may trust the summary without opening the citation. We plan to test Nora against real policy questions with known answers before users rely on it, and to treat our clients at Research Compliance Services as the final authority on what the system tells people.",
        ],
      },
    ],
  },
  {
    heading: "Conclusion",
    parts: [
      {
        blocks: [
          "The three cases fall along a spectrum of intent. Greyball was deliberate deception, Amazon's bias was unintended but built into its data, and MyCity's errors came from launching an unreliable system with the government's authority behind it.",
          "In every case, the engineer-versus-product question breaks down. Software only does what people design, train, approve, and choose to deploy, so responsibility runs through engineers, managers, legal teams, and leaders together. Three lessons stand out for us as engineers:",
          {
            ordered: true,
            list: [
              "Ask how a tool could be misused, not only what it was built for (Greyball).",
              "Question the data and the definition of success before automating a decision (Amazon).",
              "Prove a system is reliable enough for its stakes before releasing it, and be honest with users about its limits (MyCity).",
            ],
          },
        ],
      },
    ],
  },
];

export const REFERENCES: { citation: string; url: string }[] = [
  {
    citation:
      "Association for Computing Machinery. (2018). ACM code of ethics and professional conduct.",
    url: "https://www.acm.org/code-of-ethics",
  },
  {
    citation:
      "Dastin, J. (2018, October 10). Amazon scraps secret AI recruiting tool that showed bias against women. Reuters.",
    url: "https://www.reuters.com/article/us-amazon-com-jobs-automation-insight/amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women-idUSKCN1MK08G",
  },
  {
    citation:
      "Isaac, M. (2017, March 3). How Uber deceives the authorities worldwide. The New York Times.",
    url: "https://www.nytimes.com/2017/03/03/technology/uber-greyball-program-evade-authorities.html",
  },
  {
    citation:
      "Lecher, C. (2024, March 29). NYC's AI chatbot tells businesses to break the law. The Markup.",
    url: "https://themarkup.org/artificial-intelligence/2024/03/29/nycs-ai-chatbot-tells-businesses-to-break-the-law",
  },
  {
    citation:
      "Lecher, C., & Honan, K. (2026, January 30). Mamdani to kill the NYC AI chatbot we caught telling businesses to break the law. The Markup.",
    url: "https://themarkup.org/artificial-intelligence/2026/01/30/mamdani-to-kill-the-nyc-ai-chatbot-we-caught-telling-businesses-to-break-the-law",
  },
  {
    citation:
      "Reuters. (2017, May 5). Uber faces criminal probe over software used to evade authorities. Republished by ARY News.",
    url: "https://arynews.tv/uber-faces-criminal-probe-over-software-used-to-evade-authorities",
  },
];
