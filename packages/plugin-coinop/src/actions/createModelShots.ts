import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { validateCoinopConfig } from "../environment";
import { coinopExamples } from "../examples";
import { createCoinopService } from "../services";
import { v4 as uuidv4 } from "uuid";

export const createModelShotsAction: Action = {
    name: "COINOP_CREATE_MODEL_SHOTS",
    similes: [
        "GENERATE_MODEL_SHOTS",
        "CREATE_MODEL_IMAGES",
        "RENDER_MODEL_SHOTS",
        "MAKE_MODEL_SHOTS",
        "BUILD_MODEL_SHOTS",
        "CAPTURE_MODEL_SHOTS",
        "GET_MODEL_SHOTS",
        "PRODUCE_MODEL_SHOTS",
        "MODEL_SHOT_GENERATION",
        "MODEL_PHOTO_CREATION",
    ],
    description: "Create Coinop model shots.",
    validate: async (runtime: IAgentRuntime) => {
        await validateCoinopConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const config = await validateCoinopConfig(runtime);
        const coinopService = createCoinopService(config.THE_GRAPH_KEY);

        try {
            const modelShots = await coinopService.createModelShots();
            elizaLogger.success(`Successfully fetched presets`);
            if (callback) {
                callback({
                    text: `Check out how they might look IRL.`,
                    attachments: modelShots.map((shot) => ({
                        url: `${config.IPFS_GATEWAY}${shot.split("ipfs://")[1]}`,
                        title: `model-shot-${shot}`,
                        description: `model-shot-${shot}`,
                        id: uuidv4(),
                        source: shot,
                        text: `model-shot-${shot}`,
                    })),
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in model shots plugin handler:", error);
            callback({
                text: `Error fetching model shots: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: coinopExamples as ActionExample[][],
} as Action;
