import {
    composeContext,
    elizaLogger,
    generateObjectDeprecated,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
    type Action,
} from "@elizaos/core";
import { validateComfyStreamConfig } from "../../environment";
import { comfyStreamExamples } from "./examples";
import { createSearchService } from "./service";
import { CreateWorkflowContent } from "./types";
import { isCreateWorkflowContent } from "./validation";

export default {
    name: "CREATE_WORKFLOW",
    similes: [
        "MAKE_WORKFLOW",
        "MAKE_COMFYSTREAM_WORKFLOW",
        "CREATE_COMFYSTREAM_WORKFLOW",
        "CREATE_COMFYSTREAM",
    ],
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        await validateComfyStreamConfig(runtime);
        return true;
    },
    description: "Create a new Comfystream workflow.",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.log("Starting ComfyStream CREATE_WORKFLOW handler...");

        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        try {
            try {
                // Get workflows from database
                const config = await validateComfyStreamConfig(runtime);

                const searchService = createSearchService(config.GRAPH_API_KEY);

                const workflowData = await searchService.getAllWorkflows();

                // Compose and generate workflow
                const workflowContext = composeContext({
                    state,
                    template: `Create a new ComfyUI workflow based on the user's requirements extracted from their most recent messages. Your response should follow the exact structure of the example workflows provided below.

Example workflows for reference:
${workflowData}

INSTRUCTIONS:
1. Carefully analyze the user's recent messages to understand what kind of workflow they need
2. Create a new workflow that matches their requirements while following the EXACT same structure as the examples
3. Ensure your workflow JSON string is properly formatted and escaped
4. Include relevant tags that would help users find this workflow when searching

RESPONSE FORMAT:
Respond ONLY with a JSON array containing a single workflow object with these fields:
- name: A clear, descriptive name for the workflow
- description: Detailed explanation of what the workflow does and how it works
- workflow: The COMPLETE workflow as a properly escaped JSON string
- tags: Comma-separated keywords relevant to the workflow (no spaces after commas)

Example response structure:
[{ "name": "Cinematic Portrait", "description": "Creates professional cinematic portraits with dramatic lighting and color grading. Includes adjustable intensity and optional film grain.", "workflow": ${workflowData[0]}, "tags": "portrait,cinematic,dramatic,lighting,photography" }]`,
                });

                const content = (await generateObjectDeprecated({
                    runtime,
                    context: workflowContext,
                    modelClass: ModelClass.SMALL,
                })) as unknown as CreateWorkflowContent;

                // Validate content
                if (!isCreateWorkflowContent(content)) {
                    throw new Error("Invalid create workflow check content");
                }

                elizaLogger.success(
                    `Workflow created successfully: ${content}`
                );

                if (callback) {
                    callback({
                        text: `What do you think of this workflow? ${content}`,
                    });
                }

                return true;
            } catch (error) {
                elizaLogger.error("Error in CREATE_WORKFLOW handler:", error);
                if (callback) {
                    callback({
                        text: `Error fetching all workflows: ${error.message}`,
                        content: { error: error.message },
                    });
                }
                return false;
            }
        } catch (error) {
            elizaLogger.error("Error in CREATE_WORKFLOW handler:", error);
            if (callback) {
                callback({
                    text: `Error fetching workflow: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },
    examples: comfyStreamExamples,
} as Action;
