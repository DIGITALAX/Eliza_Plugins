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

export const mintAction: Action = {
    name: "REMIX_MINT",
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
    description: "Mint to Remix.",
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
            await remixService.mint();
            elizaLogger.success(`Successfully fetched presets`);
            if (callback) {
                callback({
                    text: `Minted! Congrats, it's minted and ready to sell on TripleA. Check out it out here: `,
                    url: `https://triplea.agentmeme.xyz/`,
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
    examples: remixExamples as ActionExample[][],
} as Action;
