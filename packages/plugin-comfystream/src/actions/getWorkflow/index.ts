import {
    composeContext,
    elizaLogger,
    generateText,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
    type Action,
} from "@elizaos/core";
import { validateComfyStreamConfig } from "../../environment";
import { comfyStreamExamples } from "./examples";
import { searchService } from "./service";
import { getWorkflowTemplate } from "./template";

export default {
    name: "GET_WORKFLOW",
    similes: [
        "CHECK_WORKFLOW",
        "FIND_WORKFLOW",
        "GET_COMFYSTREAM_WORKFLOW",
        "FIND_COMFYSTREAM",
        "CHECK_COMFYSTREAM",
    ],
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        await validateComfyStreamConfig(runtime);
        return true;
    },
    description: "Find a Comfystream workflow.",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.log("Starting ComfyStream GET_WORKFLOW handler...");

        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        try {
            // Compose and generate found workflows
            const workflowContext = composeContext({
                state,
                template: getWorkflowTemplate,
            });
            const content = (await generateText({
                runtime,
                context: workflowContext,
                modelClass: ModelClass.SMALL,
            })) as unknown as string;

            // Get workflows from database
            const config = await validateComfyStreamConfig(runtime);

            const service = searchService(config.GRAPH_API_KEY);

            try {
                const workflowData = await service.getWorkflows(content);
                elizaLogger.success(
                    `Workflows retrieved successfully! ${content}: ${workflowData.length}`
                );

                if (callback) {
                    if (workflowData.length > 0) {
                        callback({
                            text: `Here are some workflows that might help with what you're looking for, here is the search term that I used: "${content}".\n\n${JSON.stringify(workflowData)}`,
                        });
                    } else {
                        callback({
                            text: `I couldn't find any matching workflows, here is the search that I used based on what you told me: "${content}". I can change something and try again?`,
                        });
                    }
                }

                return true;
            } catch (error) {
                elizaLogger.error("Error in GET_WORKFLOW handler:", error);
                if (callback) {
                    callback({
                        text: `Sorry to hear that, kid. Got tripped up by ${error.message}. Typical.\n\nWant me to try again? Or are you going to stand there staring at your screen all day?`,
                        content: { error: error.message },
                    });
                }
                return false;
            }
        } catch (error) {
            elizaLogger.error("Error in GET_WORKFLOW handler:", error);
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
