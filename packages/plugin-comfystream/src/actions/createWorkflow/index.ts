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
import { BASE_WORFKLOW, createWorkflowTemplate } from "./template";

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
            const workflowContext = composeContext({
                state,
                template: createWorkflowTemplate,
            });
            const content = (await generateText({
                runtime,
                context: workflowContext,
                modelClass: ModelClass.SMALL,
            })) as unknown as string;

            elizaLogger.success(`Prompt created successfully: ${content}`);

            try {
                const updatedWorkflow = JSON.parse(
                    JSON.stringify(BASE_WORFKLOW)
                );
                updatedWorkflow["4"].inputs.text = content;

                if (callback) {
                    callback({
                        text: `What do you think of this workflow? It's functional, but barely. You're getting a depth map with the image style overlaid on the stream—congratulations on achieving the absolute minimum. MAKE DAMN SURE you've got all the models downloaded first. People always forget and then come crying when nothing works. If you've got half a brain, you can swap another model at object 4, but test it thoroughly before you waste everyone's time showing it off.\n\nThe prompt I used is below. Don't mess with it unless you actually understand what you're doing: ${content}\n\n\nWorkflow JSON: ${JSON.stringify(updatedWorkflow)}`,
                    });
                }

                return true;
            } catch (error) {
                elizaLogger.error("Error in CREATE_WORKFLOW handler:", error);
                if (callback) {
                    callback({
                        text: `Sorry to hear that, kid. Got tripped up by ${error.message}. Typical.\n\nWant me to try again? Or are you going to stand there staring at your screen all day?`,
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
