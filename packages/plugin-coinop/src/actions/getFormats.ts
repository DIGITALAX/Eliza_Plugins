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

export const getFormatsAction: Action = {
    name: "COINOP_GET_FORMATS",
    similes: [
        "LIST_FORMATS",
        "FETCH_FORMATS",
        "SHOW_FORMATS",
        "GET_COIN_FORMATS",
        "RETRIEVE_FORMATS",
        "LOAD_FORMATS",
        "AVAILABLE_FORMATS",
        "FORMAT_OPTIONS",
        "DISPLAY_FORMATS",
        "FORMAT_LIST",
    ],
    description: "Get Coinop formats.",
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
            const allFormats = await coinopService.getFormats();
            elizaLogger.success(`Successfully fetched formats`);
            if (callback) {
                callback({
                    text: `Choose your format: hoodie, tee, sticker or poster.`,
                    attachments: allFormats.map((item) => ({
                        url: `${config.IPFS_GATEWAY}${item.image?.split("ipfs://")}`,
                        title: item.type,
                        description: `${item.category} -> ${item.type}`,
                        id: uuidv4(),
                        source: item.image,
                        text: `${item.category} -> ${item.type}`,
                    })),
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in formats plugin handler:", error);
            callback({
                text: `Error fetching formats: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: coinopExamples as ActionExample[][],
} as Action;
