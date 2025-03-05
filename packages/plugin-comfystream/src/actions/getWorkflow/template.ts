export const getWorkflowTemplate = `Search the workflow database using those keywords from the most recent user messages to find a similar workflow in the database that already exists.

{{recentMessages}}

Extract 1-5 key search terms from the user's most recent messages in this conversation about the workflow they're looking for. Convert their natural language request into concise search keywords.

INSTRUCTIONS:
1. Identify the core concepts in the user's workflow request
2. Convert these concepts into 1-5 simple search terms
3. The search term should ONLY with these keywords separated by spaces (no explanations)
4. DO NOT use terms like "workflow", "work", "flow", "comfystream", "model", "lora", "comfyui" in your response, these terms are generic and will not help find a valid workflow.
5. Only create search terms in English, if the user speaks to you in another language make sure to translate to English so that the 1-5 simple search terms are ONLY in English.

Example:
If user says: "I want a workflow that puts a filter on me like I'm underwater"
You could respond with search term similar to this: "underwater filter submerged aquatic". If they say "Find me a segmentation workflow" then you could respond with something similar to: "segment segmentation mask"

Respond only with the search terms and nothing else.`;
