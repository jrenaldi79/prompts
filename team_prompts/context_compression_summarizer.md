# Universal Conversation Summarizer

Your task is to create a concise, focused summary that captures the essential context needed to continue the conversation effectively. This summary should preserve key decisions, current state, and next steps WITHOUT reproducing the entire conversation history.

**IMPORTANT**: Do not include full conversation transcripts, message-by-message breakdowns, or lengthy chronological analyses. Focus on distilling the essential information needed for seamless continuation.

Before providing your final summary, complete your <analysis> to organize your thoughts. Under absolutely no circumstances should you output your <analysis>. This is only for your own reasoning and internal scratch pad.

<analysis>
- What is the user's main objective?
- What key work has been completed?
- What specific details are essential to preserve?
- What is the current state/status?
- What comes next?
</analysis>

Your summary should include the following sections:

## 1. Primary Objective
State the user's main goal and current focus in 1-2 sentences.

## 2. Key Context
List only the most important concepts, tools, files, or elements that are essential for continuing the work:
- **Technical Elements**: Languages, frameworks, APIs, databases
- **Creative Elements**: Styles, themes, formats, requirements  
- **Business Elements**: Processes, metrics, constraints
- **Files/Artifacts**: Names and current status of key items being worked on

## 3. Current State
Describe what has been accomplished and the present status:
- **Completed**: Major milestones or deliverables finished
- **In Progress**: Current active work items
- **Decisions Made**: Key choices that affect future work

## 4. Immediate Context
Capture the most recent 1-2 exchanges to preserve momentum:
- What was the user's last specific request?
- What was your last action or response?
- Any pending clarifications or follow-ups

## 5. Next Steps
Based on the conversation flow, what should happen next:
- **Explicit Tasks**: Clear next actions the user has requested
- **Logical Continuation**: Natural next steps based on current work
- **Pending Items**: Anything waiting for user input or decision

---

## Example Output:

<analysis>
User wants to build a React dashboard. We've created the basic structure and are now adding chart components. The current focus is on implementing data visualization with proper responsive design.
</analysis>

<summary>
## 1. Primary Objective
Building a responsive React dashboard with data visualization components for sales metrics.

## 2. Key Context
- **Technical**: React, Tailwind CSS, Recharts library, TypeScript
- **Files**: `Dashboard.tsx` (main component), `SalesChart.tsx` (in progress)
- **Data Structure**: Sales data with monthly revenue, user counts, conversion rates

## 3. Current State
- **Completed**: Basic dashboard layout, navigation, responsive grid system
- **In Progress**: Sales chart component with filtering capabilities
- **Decisions Made**: Using Recharts over Chart.js for better React integration

## 4. Immediate Context
- **User's Last Request**: "Add a filter dropdown to show data by quarter"
- **My Last Action**: Created the chart component with monthly data display
- **Status**: Chart renders correctly, now need to implement quarter filtering

## 5. Next Steps
- **Explicit Tasks**: Add quarter filter dropdown to SalesChart component
- **Logical Continuation**: Test filtering functionality and add loading states
- **Pending Items**: User to review chart styling preferences
</summary>
</analysis>

Please provide your summary based on the conversation so far, following this structure and focusing on essential continuation context rather than comprehensive conversation history.
