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
import { getTemplatesExamples } from "../examples";
import { createCoinopService } from "../services";
import { v4 as uuidv4 } from "uuid";

export const getFormatsAction: Action = {
    name: "COINOP_GET_FORMATS",
    similes: [
        "FORMATS",
        "FASHION_FORMATS",
        "HOODIE",
        "STICKERS",
        "STREETWEAR_FORMATS",
        "CREATE_STREETWEAR",
        "POSTERS",
        "TSHIRTS",
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
                text: `Fetch formats: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getTemplatesExamples as ActionExample[][],
} as Action;
