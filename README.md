# AI Prompts & n8n Workflows Repository

This repository contains a collection of advanced AI prompts and n8n workflows designed for various tasks, from agentic systems and customer research to automated analysis and content generation.

## 🔧 `hybrid_search` Directory

This directory contains the components for a hybrid search system implemented using Supabase and PostgreSQL with the `pgvector` extension. Hybrid search combines traditional keyword-based full-text search with modern semantic (vector) search to provide more accurate and relevant results.

-   **`SQL_setup`**: A SQL script to configure a PostgreSQL database for hybrid search. It enhances a `documents` table with a tsvector column for full-text search, creates indexes for both full-text and vector search (using HNSW for cosine distance), and defines a SQL function `hybrid_search` that merges the results from both search methods using Reciprocal Rank Fusion (RRF).
-   **`index.ts`**: A Supabase Edge Function written in TypeScript. This function serves as the API endpoint. It takes a user query, generates a vector embedding using the OpenAI API (`text-embedding-3-large`), and then calls the `hybrid_search` SQL function via RPC to retrieve the combined search results from the database.
-   **`curl`**: Contains a sample cURL command for testing the `hybrid_search` edge function endpoint.

## 🤖 `n8n` Directory

This directory contains JSON files for n8n.io, a workflow automation tool. These workflows demonstrate complex, multi-step AI agent and data processing pipelines.

-   **`agentic_system_parallelization.json`**: A workflow for an agentic system that refines search queries, conducts research, plans projects, generates content, and creates a Google Doc. It showcases parallel agent execution.
-   **`interview_grader.json`**: A workflow designed to grade an interview transcript. It uses several documents (Laddering Technique, Interviewing Users, JTBD framework) as a knowledge base to provide detailed feedback and scoring.
-   **`model_router.json`**: A workflow that acts as an intelligent router. It analyzes a user's query to determine its complexity and task type, then selects the most appropriate LLM from a list of Google, OpenAI, and Anthropic models to handle the request.
-   **`paper_grader.json`**: A workflow for grading student papers on product strategy. It uses a provided rubric and class transcripts to evaluate different sections of the paper and provide scores and feedback.
-   **`rag_agent_with_reranking.json`**: A workflow that implements a Retrieval-Augmented Generation (RAG) agent. It uses a vector store (Supabase) for semantic search and then a reranking model (Cohere) to refine the search results before answering a query.
-   **`sample_agent_prompt_chain.json`**: A workflow that demonstrates chaining multiple prompts together. It starts with a research agent, then an "Expert Advisor" prompt, and finally a "Concept Development" prompt using a Tree of Thought framework.

## 🤖 `team_prompts` Directory

This directory contains a variety of sophisticated prompts for different AI agent personas and specialized tasks.

-   **`Prompt Engineering_v7.pdf`**: A PDF document on prompt engineering. (Note: Content not analyzed as it is a binary file).
-   **`arq_feedback_analyst.md`**: A prompt for a "Customer Feedback Analyst AI" that uses Attentive Reasoning Queries (ARQs) to analyze product reviews and generate standardized lists of themes, subthemes, and user impacts.
-   **`arq_product_review_topic_modeling.md`**: A prompt that classifies customer feedback against *existing* lists of themes and subthemes using the ARQ process.
-   **`business_consultant_tot_prompt.md`**: A prompt for a team of AI agents (consultants and a risk analyst) that uses a Tree of Thought (ToT) framework to evaluate a business challenge.
-   **`elite_advisor_prompt.md`**: A prompt for an AI to act as a brutally honest, elite-level advisor to a user, focusing on exposing blind spots and driving measurable growth.
-   **`interview_coach.md`**: A prompt for an AI to act as an experienced product researcher providing detailed, constructive feedback on an interview transcript based on provided rubrics.
-   **`interview_summary.md`**: A prompt for a "Customer Interview Analysis Assistant" to analyze a transcript and produce a concise, actionable report, including an executive summary, key pains, themes, and a Jobs to Be Done (JTBD) analysis.
-   **`memory_mcp.md`**: A system prompt for a conversational agent to use a knowledge graph to remember user details across conversations.
-   **`meta_prompt_improvement.xml`**: A prompt for a "world-class prompt engineer" AI to improve a given prompt using a process called "concept elevation".
-   **`mobile_ui_designer.md`**: A prompt for a senior front-end developer AI to generate a UI design plan and HTML file for a mobile app.
-   **`new_product_survey_design.md`**: A prompt for an expert quantitative researcher AI to guide a student in creating effective, closed-ended survey questions to validate a new product concept.
-   **`persona_segment_development.md`**: A prompt for an "Elite Customer Research Specialist" AI to guide a user through a process to transform business data into detailed buyer personas.
-   **`product_requirements_documentation_prompt.md`**: A prompt for a senior product manager AI to guide a user through a conversation to create a comprehensive Product Requirements Document (PRD).
-   **`react_agent.md`**: A simple prompt instructing an AI to solve problems using the ReACT (Reasoning and Acting) framework.
-   **`rubric.md`**: A detailed rubric for evaluating a user interview across several categories like Establishing Rapport, Uncovering Needs, and Active Listening.
-   **`tot_expert_debate_facilitator_prompt.md`**: A prompt for an AI to facilitate a debate between simulated renowned experts using a Tree of Thought (ToT) framework to solve a complex problem.
-   **`tot_market_strategy_prompt.md`**: A prompt for an AI specializing in market strategy to use the Tree of Thoughts (ToT) methodology to develop a go-to-market plan.