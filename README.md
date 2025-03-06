# Prompts and Workflows

## Prompts

### 1. 📊 rubric.md - The Interview Scoring Rubric
This file provides a detailed rubric for evaluating user interviews across five key categories:

* Establishing Rapport: This category assesses the interviewer's ability to build a connection with the interviewee and create a comfortable environment for open communication.
* Uncovering Needs and Motivations: This category evaluates how effectively the interviewer uncovers the interviewee's underlying needs and motivations, using techniques like Jobs-to-be-Done (JTBD), laddering, and the 5 Whys.
* Active Listening: This category assesses the interviewer's active listening skills, including their ability to reflect on the interviewee's responses, paraphrase key points, and demonstrate empathy.
* Guiding the Conversation: This category evaluates the interviewer's ability to guide the conversation effectively, maintain focus, and ensure all key areas are covered.
* Use of Leading Questions: This category assesses the interviewer's ability to avoid leading questions and ensure the interviewee's responses are unbiased.

Each category has a detailed scoring scale (1-10) with specific criteria for each level. This rubric helps ensure consistent and objective evaluation of interviews, providing valuable feedback to interviewers.

### 2. 📝 interview_summary.md - The Interview Summary Template
This file is a comprehensive prompt designed to generate detailed summaries of user interviews. It employs several best practices for prompt engineering, including:

* Clear Instructions: The prompt provides specific instructions on the desired output format, ensuring the generated summary is structured and easy to understand.
* Role-playing: The prompt instructs the language model to act as a "Customer Interview Analysis Assistant," guiding it to adopt the appropriate tone and approach for the task.
* Specificity: The prompt includes detailed sections and sub-sections, outlining the specific information to be extracted from the interview transcript.
* Constraints: The prompt sets constraints on the output length and format, ensuring the summary is concise and focused.
* Examples: The prompt includes examples of well-written summaries and key elements to be included, providing further guidance to the language model.

By following these best practices, the prompt effectively guides the language model to generate high-quality interview summaries that capture key insights and observations.

### 3. 👩‍🏫 interview_coach.md - The Interview Coaching Guide
This file is another comprehensive prompt designed to generate constructive feedback for junior researchers on their interview skills. It incorporates similar best practices for prompt engineering as the interview_summary.md prompt, including clear instructions, role-playing, specificity, constraints, and examples.

In addition, this prompt includes a section for "Documents for context," which provides the language model with access to reference documents on interviewing users, the laddering technique, and sample questions. This ensures the feedback is grounded in established best practices and research methodologies.

## Workflows

### 1. ⚙️ InterviewGrader.json - Import into N8n
This workflow requires n8n to import and execute the defined steps. The JSON file provides the necessary instructions and configurations for n8n to orchestrate the process, ensuring a smooth and efficient flow of data and actions.

This JSON file defines the N8n workflow for the interview analysis and coaching tool. It outlines the steps involved in loading data, generating queries, editing results, and providing feedback. This workflow utilizes several technologies and tools, including:

* N8n: This is a powerful workflow automation tool used to orchestrate the entire process. The JSON file defines the nodes and connections within the N8n workflow, outlining the flow of data and actions. You can import this directly into your instance.
* Supabase: This is an open-source alternative to Firebase, used for data storage and retrieval. The workflow interacts with Supabase to load interview transcripts and store the generated summaries and feedback.
* Google Gemini Models: These are advanced language models from Google, used for natural language processing and generation tasks. The workflow utilizes Gemini models for tasks like summarizing interviews, generating coaching feedback, and extracting key quotes.
* Anthropic Sonnet Model: Used as a Deep Research Agent within the workflow for tasks requiring a different approach or perspective compared to the Gemini models.
* Firecrawl API: This is a web scraping API used to extract content from web pages. The workflow uses Firecrawl to retrieve relevant articles and resources for the coaching feedback.
* SerpAPI: This is a search engine results page (SERP) API used to access Google search results. The workflow utilizes SerpAPI to find relevant articles and resources based on the generated search queries.
