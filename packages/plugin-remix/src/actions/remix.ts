import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { validateRemixConfig } from "../environment";
import { remixExamples } from "../examples";
import { createRemixService } from "../services";
import { v4 as uuidv4 } from "uuid";

export const synthPresetAction: Action = {
    name: "REMIX_SYNTH_PRESET",
    similes: [
        "GET_SYNTH_PRESET",
        "FETCH_SYNTH_PRESET",
        "LOAD_SYNTH_PRESET",
        "SHOW_SYNTH_PRESET",
        "SYNTHESIZER_PRESET",
        "SYNTH_PRESET_OPTIONS",
        "AVAILABLE_SYNTH_PRESETS",
        "LIST_SYNTH_PRESETS",
        "RETRIEVE_SYNTH_PRESET",
        "SYNTH_CONFIG",
    ],
    description: "Synth Remix preset.",
    validate: async (runtime: IAgentRuntime) => {
        await validateRemixConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const config = await validateRemixConfig(runtime);
        const remixService = createRemixService(config.THE_GRAPH_KEY);

        try {
            const combinedPreset = await remixService.synthesize(
                state.recentMessagesData[state.recentMessagesData.length - 1]
                    .content.attachments[0].url
            );
            elizaLogger.success(`Successfully fetched presets`);
            if (callback) {
                callback({
                    text: `Great, what do you think about this?`,
                    attachments: [
                        {
                            url: `${config.IPFS_GATEWAY}${combinedPreset}`,
                            title: "preset-synthed",
                            description: "preset-synthed",
                            id: uuidv4(),
                            source: combinedPreset,
                            text: "preset-synthed",
                        },
                    ],
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in presets plugin handler:", error);
            callback({
                text: `Error fetching presets: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: remixExamples as ActionExample[][],
} as Action;
