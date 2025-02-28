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

export const mintAction: Action = {
    name: "COINOP_MINT",
    similes: [
        "MINT_TOKEN",
        "CREATE_NFT",
        "GENERATE_ASSET",
        "MINT_ASSET",
        "TOKENIZE",
        "ISSUE_NFT",
        "DEPLOY_NFT",
        "MINT_COIN",
        "MINT_COLLECTIBLE",
        "NFT_CREATION",
    ],
    description: "Mint to Coinop.",
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
                    text: `Minted! Congrats, it's minted and ready to sell on coinop. Check out it out here: `,
                    url: `https://coinop.themanufactory.xyz/`,
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in mint plugin handler:", error);
            callback({
                text: `Error minting: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: coinopExamples as ActionExample[][],
} as Action;
