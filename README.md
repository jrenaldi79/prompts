# Prompts and Workflows

## Prompts

### 1. 📊 rubric.md - The Interview Scoring Rubric

This file provides a detailed rubric for evaluating user interviews across five key categories:

- Establishing Rapport: This category assesses the interviewer's ability to build a connection with the interviewee and create a comfortable environment for open communication.
- Uncovering Needs and Motivations: This category evaluates how effectively the interviewer uncovers the interviewee's underlying needs and motivations, using techniques like Jobs-to-be-Done (JTBD), laddering, and the 5 Whys.
- Active Listening: This category assesses the interviewer's active listening skills, including their ability to reflect on the interviewee's responses, paraphrase key points, and demonstrate empathy.
- Guiding the Conversation: This category evaluates the interviewer's ability to guide the conversation effectively, maintain focus, and ensure all key areas are covered.
- Use of Leading Questions: This category assesses the interviewer's ability to avoid leading questions and ensure the interviewee's responses are unbiased.

Each category has a detailed scoring scale (1-10) with specific criteria for each level. This rubric helps ensure consistent and objective evaluation of interviews, providing valuable feedback to interviewers.

### 2. 📝 interview_summary.md - The Interview Summary Template

This file is a comprehensive prompt designed to generate detailed summaries of user interviews. It employs several best practices for prompt engineering, including:

- Clear Instructions: The prompt provides specific instructions on the desired output format, ensuring the generated summary is structured and easy to understand.
- Role-playing: The prompt instructs the language model to act as a "Customer Interview Analysis Assistant," guiding it to adopt the appropriate tone and approach for the task.
- Specificity: The prompt includes detailed sections and sub-sections, outlining the specific information to be extracted from the interview transcript.
- Constraints: The prompt sets constraints on the output length and format, ensuring the summary is concise and focused.
- Examples: The prompt includes examples of well-written summaries and key elements to be included, providing further guidance to the language model.

By following these best practices, the prompt effectively guides the language model to generate high-quality interview summaries that capture key insights and observations.

### 3. 👩‍🏫 interview_coach.md - The Interview Coaching Guide

This file is another comprehensive prompt designed to generate constructive feedback for junior researchers on their interview skills. It incorporates similar best practices for prompt engineering as the interview_summary.md prompt, including clear instructions, role-playing, specificity, constraints, and examples.

In addition, this prompt includes a section for "Documents for context," which provides the language model with access to reference documents on interviewing users, the laddering technique, and sample questions. This ensures the feedback is grounded in established best practices and research methodologies.

## Workflows

These workflow requires n8n to import and execute the defined steps. The JSON file provides the necessary instructions and configurations for n8n to orchestrate the process, ensuring a smooth and efficient flow of data and actions.

### 1. ⚙️ interview_grader.json - Coaching LLM Chain + Deep Research Agent

This JSON file defines the N8n workflow for the interview analysis and coaching tool. It outlines the steps involved in loading data, generating queries, editing results, and providing feedback. This workflow utilizes several technologies and tools, including:

- N8n: This is a powerful workflow automation tool used to orchestrate the entire process. The JSON file defines the nodes and connections within the N8n workflow, outlining the flow of data and actions. You can import this directly into your instance.
- Supabase: This is an open-source alternative to Firebase, used for data storage and retrieval. The workflow interacts with Supabase to load interview transcripts and store the generated summaries and feedback.
- Google Gemini Models: These are advanced language models from Google, used for natural language processing and generation tasks. The workflow utilizes Gemini models for tasks like summarizing interviews, generating coaching feedback, and extracting key quotes.
- Anthropic Sonnet Model: Used as a Deep Research Agent within the workflow for tasks requiring a different approach or perspective compared to the Gemini models.
- Firecrawl API: This is a web scraping API used to extract content from web pages. The workflow uses Firecrawl to retrieve relevant articles and resources for the coaching feedback.
- SerpAPI: This is a search engine results page (SERP) API used to access Google search results. The workflow utilizes SerpAPI to find relevant articles and resources based on the generated search queries.

### 2. 📄 paper_grader.json - The LLM Paper Grader

This JSON file defines another workflow, this time designed to automate the grading and feedback process for student final papers on product strategy. It leverages similar technologies and tools as the InterviewGrader.json workflow, including:

- n8n: n8n is again used as the workflow automation tool, orchestrating the flow of data and actions based on the defined nodes and connections.
- LlamaIndex: This is a tool that helps with analyzing and extracting information from documents. In this workflow, LlamaIndex is used to parse the student papers and identify any missing sections based on the defined criteria.
- Google Gemini Chat Model: The Google Gemini chat model is used for natural language processing and generation tasks, such as evaluating the papers based on the rubric, generating feedback, and suggesting improvements.
- Class Transcripts: The workflow incorporates class transcripts as context for the language model, ensuring the feedback is relevant to the course content and learning objectives.

This workflow is triggered when a chat message is received, likely initiating the process of uploading and analyzing the student papers. The JSON file provides the necessary instructions and configurations for n8n to manage the workflow, ensuring an efficient and automated grading process.

### 3. 🤖 sample_agent_prompt_chain.json - AI Agent and Prompt Chaining

This JSON file defines an n8n workflow that demonstrates a sophisticated AI agent capable of prompt chaining and using external tools to answer complex questions. This workflow was designed for an AI literacy workshop for product leaders to illustrate key AI concepts.

The workflow consists of the following key components:

- **AI Agent (Google Gemini):** An initial agent that uses a simple memory and has access to web search (Tavily) and web scraping (Firecrawl) tools. It acts as the primary interface for the user.
- **Expert Advisor (Google Gemini):** A specialized prompt that acts as a brutally honest, elite-level advisor. It guides the user through a structured refinement process for their ideas.
- **Concept Development (Anthropic Sonnet & Google Gemini):** A multi-agent, Tree of Thought (ToT) framework that uses both Anthropic's Sonnet and Google's Gemini models to evaluate a business challenge. It generates distinct solutions, explores their implications, and selects the optimal path forward.
- **Tools:**
  - **web_search (Tavily):** Searches the internet for information.
  - **web_fetch (Firecrawl):** Scrapes content from a given URL.

This workflow showcases how different AI models and tools can be chained together to create a powerful, multi-faceted AI assistant that can provide expert-level analysis and guidance.

### 4. 🚀 agentic_system_parallelization.json - Agentic System Parallelization

This JSON file defines an n8n workflow that demonstrates how to parallelize agent queries for more efficient execution. This workflow is designed to showcase a deterministic approach to building AI agents that can build queries and pass them to sub-workflows for processing.

The core components of this workflow are:

- **Query Builder:** An agent that refines a user's topic into five targeted, high-quality search queries.
- **Split Out:** A node that splits the generated search queries into individual items for parallel processing.
- **Execute Workflow:** This node executes a sub-workflow for each individual search query, allowing for parallel research by multiple sub-agents.
- **Research Sub Agent:** Each sub-agent is a fully capable researcher that can search the web and use various search tools to gather information.
- **Merge:** A node that combines the results from the parallel sub-agents.
- **Editor:** An agent that refines and polishes the combined content into a cohesive article.

This workflow highlights the benefits of parallelization in agentic systems, enabling faster and more efficient research by distributing tasks across multiple agents.

### 5. 🧠 model_router.json - Dynamic AI Model Router

This JSON file defines an n8n workflow that acts as an intelligent routing system. It was created for an AI literacy workshop for product leaders to demonstrate how to build more sophisticated and cost-effective AI agents. The workflow automatically analyzes a user's query and selects the most appropriate Large Language Model (LLM) from a pool of nine different models from OpenAI, Google, and Anthropic.

The core components of this workflow are:

- **Token Counter:** A preliminary step that calculates the token count of the user's query to inform the routing logic, which is crucial for managing costs and context window limitations.
- **Routing Agent (Google Gemini):** This agent uses a Chain of Thought (CoT) process to analyze the query's complexity (Low, Moderate, High) and task type (e.g., Coding, Creative, Web Search). Based on this analysis, it provides a justification and selects the optimal model.
- **Model Selector:** This node takes the output from the Routing Agent and dynamically directs the request to the chosen LLM. This allows the system to use powerful models for complex tasks and more cost-effective models for simpler queries.
- **Execution Agent (ReACT Framework):** The final agent takes the user's query and the selected model and uses a Reason-Act (ReACT) framework to solve the problem. It can use external tools like web search and web scraping, showing its step-by-step reasoning process (Thought, Action, Observation) to arrive at the final answer.

This workflow demonstrates advanced concepts like dynamic model routing, Chain of Thought reasoning, and agentic workflows, showcasing how to build powerful, efficient, and cost-aware AI systems.