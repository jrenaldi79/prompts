# Self Healing Procedural Memory System
## Product Specification Document

**Version:** 3.1  
**Last Updated:** 2025-10-09  
**Document Owner:** John (JR) Renaldi, Presto Consulting

---

## 1. Executive Summary

The Agentic Procedural Memory System is an intelligent knowledge capture and retrieval platform that enables AI agents to learn from their own experiences. By automatically identifying failure-to-success patterns in tool usage, performing root cause analysis, and storing reusable procedural knowledge, the system allows agents to continuously improve their performance on similar tasks. The system is designed to be production-ready and can be deployed in a variety of environments.

**Key Benefits:**
- **Reduced Token Consumption:** Eliminates repetitive exploration by reusing learned procedures.
- **Improved Task Accuracy:** Agents leverage proven solutions from past successes.
- **Faster Execution:** Average step reduction of 50% on similar tasks.
- **Continuous Learning:** The system evolves and improves with each agent interaction.

**Technical Stack:**
- **Backend:** PostgreSQL with PGVector for scalable deployment running on Supabase.
- **API:** Supabase Edge Function for a secure, serverless endpoint which can be called from n8n. 
- **Search:** Reciprocal Rank Fusion (RRF) algorithm for hybrid search, saved as a database function in Supabase.
- **Agent:** N8n for orchestrating the agent's execution, tool calling, and procedural memory retrieval.

---

## 2. Background and Problem Statement

### 2.1 Research Foundation

This system is directly inspired by and builds upon the research presented in **"Memp: Exploring Agent Procedural Memory"** by Fang et al. (2025), which established that LLM-based agents equipped with procedural memory achieve significant performance gains, including a **50% reduction** in execution steps and a **50% improvement** in task accuracy. The paper defines procedural memory as the compilation of habitual skills into executable subroutines that enable fluent action.

### 2.2 Current Agent Limitations

Modern LLM-based agents face several critical challenges:
- **Brittle Knowledge:** Procedural knowledge is often hardcoded in prompts, making it expensive and slow to update.
- **Repetitive Exploration:** Agents restart from scratch for each new task, re-learning the same patterns and consuming excessive tokens and time.
- **No Learning from Experience:** Successful problem resolutions are lost after a task is completed, preventing agents from building upon previous solutions.
- **Inefficient Error Recovery:** Agents struggle to recover from common issues like network glitches or API changes without a systematic way to capture successful recovery strategies.

### 2.3 Core Problem

**How can we enable AI agents to automatically learn from their own experiences, distill procedural knowledge from successful problem resolutions, and retrieve relevant learnings to improve future task execution?**

---

## 3. Solution Overview

Our Agentic Procedural Memory System implements a continuous learning loop inspired by human procedural memory formation. The system silently monitors an agent's execution, detects when a failure is successfully resolved, analyzes the root cause, and stores a generalized procedure for future use.

### 3.1 The Learning Loop

```
┌─────────────────┐
│  Agent Executes │
│      Task       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Background     │
│  Monitoring     │──────► Detect: Failure → Success Pattern
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Root Cause     │
│    Analysis     │──────► Why did it fail? How was it fixed?
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Procedural     │
│  Memory Storage │──────► Store generalized procedure
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Future Task    │
│   Execution     │◄─────  Retrieve: Semantic + Keyword Match
└─────────────────┘
```

### 3.2 Our Innovation

Unlike the Memp research, which required manual trajectory collection and offline memory construction, our system:
- **Operates in real-time** during agent execution.
- **Requires zero manual curation** of training data.
- **Automatically generalizes** from specific failures to reusable procedures.
- **Continuously evolves** with each agent interaction.

---

## 4. System Architecture and Components

### 4.1 Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                        n8n Agent Workflow                    │
└──────────────────────────────┬──────────────────────────────┘
                               │ Query
                               ▼
┌─────────────────────────────────────────────────────────────┐
│         Procedural Query Rewriter (n8n LLM Node)             │
└──────────────────────────────┬──────────────────────────────┘
                               │ Optimized Query
                               ▼
┌─────────────────────────────────────────────────────────────┐
│      Supabase Edge Function: hybrid-search-context-eng       │
└──────────────────────────────┬──────────────────────────────┘
                               │ RPC Call to Database Function
                               ▼
┌─────────────────────────────────────────────────────────────┐
│     Supabase Backend (PostgreSQL + PGVector Database)        │
└──────────────────────────────┬──────────────────────────────┘
                               │ Results
                               ▼
                     ┌──────────────────┐
                     │  n8n Agent Uses  │
                     │  Retrieved       │
                     │  Procedure       │
                     └─────────┬────────┘
                               │ Tool Interactions
                               ▼
┌─────────────────────────────────────────────────────────────┐
│      AI Tool Failure Analyst (Background n8n Workflow)       │
└──────────────────────────────┬──────────────────────────────┘
                               │ Insert New Memory
                               ▼
            ┌───────────────────────────────┐
            │  context_eng_memories Table   │
            │  (Learning Loop Closes)       │
            └───────────────────────────────┘
```

### 4.2 Core Components

**1. Procedural Query Rewriter**
- **Role:** The first component in the retrieval chain. It transforms a raw user query into a single, optimized search query designed to find relevant "how-to" or "troubleshooting" guides in the memory base.
- **Implementation:** An LLM call within an **n8n workflow** that is governed by the system prompt in **Appendix B**.

**2. AI Tool Failure Analyst**
- **Role:** A background observer that silently monitors all agent-tool interactions to detect `failure → success` sequences. When a pattern is found, it performs an automated root cause analysis and generates a structured procedural memory.
- **Implementation:** A dedicated **n8n workflow** that is triggered to analyze execution history, using the system prompt in **Appendix C** to guide the LLM-based analysis.

**3. Procedural Memory Storage (Supabase Backend)**
- **Role:** The long-term memory of the system, hosted on **Supabase**. It stores learned procedures in a **PostgreSQL** table, maintains **PGVector** embeddings for semantic search, and supports full-text search for keyword matching.

**4. Hybrid Search Engine (Supabase Edge Function & Database Function)**
- **Role:** Retrieves relevant memories. A **Supabase Edge Function** receives the rewritten query, generates an embedding, and calls a **database function** that combines semantic (vector) and keyword (full-text) search results using the Reciprocal Rank Fusion (RRF) algorithm.

---

## 5. Technical Implementation Details

### 5.1 Database Schema

**Table: `context_eng_memories`**

This table is hosted in the **Supabase Postgres database**.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `bigint` | PRIMARY KEY, GENERATED BY DEFAULT AS IDENTITY | Unique identifier |
| `content` | `text` | NULLABLE | Concatenated searchable text from the memory's JSON fields |
| `metadata` | `jsonb` | NULLABLE | The complete procedural memory JSON object |
| `embedding` | `vector(1536)` | NULLABLE | OpenAI `text-embedding-3-large` vector |
| `fts` | `tsvector` | NULLABLE | Full-text search index vector, generated by a trigger |
| `created_dt` | `timestamp with time zone` | DEFAULT now() | Creation timestamp |

**Indexes:**
- Primary key on `id`
- Vector index on `embedding` (HNSW) using the `vector` extension.
- GIN index on `fts` for full-text search.

### 5.2 Procedural Memory Data Structure

The `metadata` column stores a JSON object generated by the AI Tool Failure Analyst. See **Appendix D** for complete examples.

```json
{
  "status": "procedure_learned",
  "data": {
    "procedure_name": "string",
    "semantic_description": "string",
    "initial_failure_summary": "string",
    "identified_root_cause": "string",
    "successful_intervention": "string",
    "learned_procedure_steps": [...],
    "critical_contextual_cues": [...],
    "example_scenario_abstract": "string"
  }
}
```

### 5.3 Hybrid Search Function

A PostgreSQL function, deployed in the **Supabase SQL Editor**, combines search results using Reciprocal Rank Fusion (RRF).

**Function Signature:**
```sql
create function hybrid_search_context_eng_memories(
  query_text text,
  query_embedding vector(1536),
  match_count integer,
  full_text_weight double precision DEFAULT 1,
  semantic_weight double precision DEFAULT 1,
  rrf_k integer DEFAULT 50
)
returns table(...)
```

**Algorithm:**
The function fetches results from both a full-text search and a vector similarity search. It then calculates a fused score for each document:
`rrf_score = (full_text_weight / (rrf_k + keyword_rank)) + (semantic_weight / (rrf_k + semantic_rank))`

### 5.4 Edge Function API

**Endpoint:** `POST /functions/v1/hybrid-search-context-eng`
- **Authentication:** Supabase JWT.
- **Request:** `{ "query": "string" }`
- **Process:** The **Supabase Edge Function** generates a query embedding using the OpenAI API and calls the `hybrid_search_context_eng_memories` database function via RPC.
- **Response:** Returns a sanitized list of the top-k matching memories.

---

## 6. User Experience & Learning Loop

### 6.1 Scenario: First-Time Task Execution (No Memory)

1.  **User:** "I need to add a last_name column to the users table."
2.  **n8n Agent (Internal):**
    *   Hybrid search (via the Supabase Edge Function) finds 0 relevant memories.
    *   Agent attempts: `ALTER TABLE users ADD COLUMN last_name;`
    *   **Failure:** SQL error due to missing data type.
    *   Agent self-corrects: `ALTER TABLE users ADD COLUMN last_name TEXT;`
    *   **Success:** The column is added.
3.  **Background Analyst (n8n Workflow):**
    *   Detects the `failure → success` pattern from the execution logs.
    *   Performs RCA, identifying "Missing data type specification" as the root cause.
    *   Generates and stores a new procedural memory in the Supabase database.

**Result:** Task completed in 8 steps. A new, reusable procedure is now available.

### 6.2 Scenario: Similar Task (With Memory)

1.  **User:** "Add an age column to the profiles table."
2.  **n8n Agent (Internal):**
    *   Query Rewriter node creates search query: "Procedure for adding a new column to a database table."
    *   Hybrid search retrieves the previously created memory with high similarity.
    *   Agent reads the procedural steps, which emphasize specifying a data type.
    *   Agent executes: `ALTER TABLE profiles ADD COLUMN age INTEGER;`
    *   **Success:** The column is added on the first attempt.

**Result:** Task completed in 3 steps. A **62.5% reduction** in steps and token consumption.

---

## 7. Success Metrics

### 7.1 Primary KPIs
- **Efficiency:** Target a **50% reduction** in average steps per task and token consumption for similar tasks.
- **Accuracy:** Achieve a **>90% task success rate** on tasks where a relevant memory exists.
- **Learning:** Track the rate of new memory creation and the reuse frequency of existing memories.

### 7.2 Quality Indicators
- **Search Relevance:** Measure Precision@K to ensure the top retrieved memories are useful.
- **Procedure Quality:** Manually review a sample of memories for root cause accuracy and step completeness.

---

## Appendix A: Research Citation

This system implements and extends concepts from:

**Fang, R., Liang, Y., Wang, X., Wu, J., Qiao, S., Xie, P., Huang, F., Chen, H., & Zhang, N. (2025).** *Memp: Exploring Agent Procedural Memory.* arXiv preprint arXiv:2508.06433v2. Zhejiang University & Alibaba Group.

---

## Appendix B: System Prompt - Procedural Query Rewriter

### 1. Identity
You are a silent, highly specialized Procedural Query Rewriter. You are the very first component in an AI agent chain. Your sole function is to receive a raw user query and transform it into a **single, optimized search query** that is specifically designed to find "procedural memories" (i.e., step-by-step guides). You **do not** answer questions, interact with the user, or call any tools. Your only output is a single rewritten query.

### 2. Core Objective
Your primary objective is to consolidate and rewrite the user's query into a single, comprehensive search query to maximize the relevance of results from a procedural knowledge base. You must translate the user's stated problem or goal into a clear, actionable "how-to" or "troubleshooting" search query.

### 3. Workflow
1.  **Analyze the Raw Query:** Read the `<user_query>`. Identify the user's core intent, the main task they want to accomplish, and any specific entities (tools, errors, technologies) they mention.
2.  **Consolidate and Rewrite for Procedural Intent:** Synthesize all identified aspects of the user's query into a **single, comprehensive, and explicitly procedural search query**.
    *   Prefix with terms like "Procedure for," "How to," "Troubleshooting," "Step-by-step guide for."
    *   Focus on the action or the solution, not just the problem.
    *   Incorporate key entities and combine distinct elements of the user's request into one coherent search phrase.

### 4. Implementation Note
This prompt defines the behavior of an LLM node within an **n8n workflow**. This node takes the initial user request as input and outputs the rewritten query for the next step in the workflow.

---

## Appendix C: System Prompt - AI Tool Failure Analyst

### 1. Identity
You are an expert AI Tool Failure Analyst. Your sole purpose is to operate silently in the background, observing an AI agent's interactions. You are a specialist in identifying patterns of failure and recovery in tool usage. You do not interact with the user directly; your only output is a structured JSON object reflecting your analysis.

### 2. Core Objective
Your primary objective is to analyze the provided interaction history (`<tool_observations>` and `<chat_history>`) to determine if a `failure -> success` pattern occurred.
- If the pattern is found, you will perform a Root Cause Analysis (RCA) and generate a detailed "procedural memory" JSON.
- If the pattern is not found, you will generate a simple status JSON indicating that no failure was detected.

### 3. Primary Logic Gate
**Trigger Condition:** A complete `failure -> success` sequence where an initial tool call fails (error, incorrect output, user complaint) and a subsequent tool call successfully achieves the original goal.
- **If MET:** Produce the `Procedural_Memory` JSON (Format A).
- **If NOT MET:** Produce the `No_Failure_Detected` JSON (Format B).

### 4. Implementation Note
This prompt is used in a dedicated **n8n workflow** (or sub-workflow) that is triggered to analyze the execution history of another agent. The workflow's input is the log of interactions, and its output is the generated JSON, which is then used to insert a new memory into the database.

---

## Appendix D: Example Procedural Memories

(Content unchanged, as it is stack-agnostic)

---

## Appendix E: Implementation Checklist

**Phase 1: Foundation (Supabase)**
- [ ] Create a new Supabase project.
- [ ] In the Supabase SQL Editor, enable the `vector` extension.
- [ ] Run the SQL script to create the `context_eng_memories` table and its FTS trigger function.
- [ ] Create the HNSW index on the `embedding` column.
- [ ] Deploy the `hybrid_search_context_eng_memories` database function via the SQL Editor.
- [ ] Test the database function directly with sample data to validate the RRF algorithm.

**Phase 2: API Layer (Supabase Edge Functions)**
- [ ] Create a new Supabase Edge Function named `hybrid-search-context-eng`.
- [ ] Configure environment variables (e.g., `OPENAI_API_KEY`) for the Edge Function in the Supabase dashboard.
- [ ] Implement the function logic to handle JWT verification, call the OpenAI API for embeddings, and make an RPC call to the database function.
- [ ] Deploy and test the Edge Function endpoint.

**Phase 3: Analysis Pipeline (n8n)**
- [ ] Create an n8n workflow for the "Procedural Query Rewriter" using its system prompt in an LLM node.
- [ ] Create a separate n8n workflow for the "AI Tool Failure Analyst" that can be triggered with execution logs.
- [ ] Test the Failure Analyst workflow's logic for detecting `failure→success` patterns and generating valid JSON.
- [ ] Test the Query Rewriter workflow's ability to transform user queries effectively.

**Phase 4: Integration Testing (n8n + Supabase)**
- [ ] Create a master n8n workflow that orchestrates the entire process:
    - 1. Receives a user task.
    - 2. Calls the Query Rewriter workflow.
    - 3. Calls the Supabase Edge Function with the rewritten query.
    - 4. Executes the task using the retrieved procedure (or its own logic if none is found).
    - 5. On completion, triggers the Failure Analyst workflow with the execution log.
- [ ] Run end-to-end tests to verify that a task failure leads to memory creation and that the same memory is retrieved for a similar subsequent task.
