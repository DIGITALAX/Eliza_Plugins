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

export const getRemixablesAction: Action = {
    name: "COINOP_GET_REMIXABLES",
    similes: [
        "LIST_REMIXABLES",
        "FETCH_REMIXABLES",
        "SHOW_REMIXABLES",
        "GET_COIN_REMIXABLES",
        "RETRIEVE_REMIXABLES",
        "LOAD_REMIXABLES",
        "AVAILABLE_REMIXABLES",
        "FORMAT_OPTIONS",
        "DISPLAY_REMIXABLES",
        "FORMAT_LIST",
    ],
    description: "Get TripleA remixables.",
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
            const allFormats = await remixService.getRemixables();
            elizaLogger.success(`Successfully fetched formats`);
            if (callback) {
                callback({
                    text: `Select an NFT to remix: `,
                    attachments: allFormats.map((item) => ({
                        url: `${config.IPFS_GATEWAY}${item.image?.split("ipfs://")}`,
                        title: item.title,
                        description: item.title,
                        id: uuidv4(),
                        source: item.image,
                        text: item.title,
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
    examples: remixExamples as ActionExample[][],
} as Action;
