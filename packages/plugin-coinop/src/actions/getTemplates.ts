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

export const getTemplatesAction: Action = {
    name: "COINOP_GET_TEMPLATES",
    similes: ["TEMPLATES", "FASHION TEMPLATES", "STREETWEAR", "DIY STREETWEAR"],
    description: "Get Coinop templates.",
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
            const text =
                state.recentMessagesData[state.recentMessagesData.length - 1]
                    .content.text;
            const match = text.match(
                /\b(?:hoodie|hoody|sweatshirt|jumper|pullover)|(?:t-shirt|tshirt|tee|shirt|blouse|top)|(?:sticker|decal|label|adhesive)|(?:poster|print|artwork|canvas|wallpaper)\b/i
            );

            let template: string = "";
            if (match) {
                const category = match[0].toLowerCase();

                if (/hoodie|hoody|sweatshirt|jumper|pullover/.test(category)) {
                    template = "hoodie";
                } else if (
                    /t-shirt|tshirt|tee|shirt|blouse|top/.test(category)
                ) {
                    template = "shirt";
                } else if (/sticker|decal|label|adhesive/.test(category)) {
                    template = "sticker";
                } else if (
                    /poster|print|artwork|canvas|wallpaper/.test(category)
                ) {
                    template = "poster";
                }
            } else {
                elizaLogger.success("No valid item found.");
                return false;
            }

            if (template == "") {
                elizaLogger.success("No valid item found.");
                return false;
            }

            const allTemplates = await coinopService.getTemplates(template);

            elizaLogger.success(`Successfully fetched Templates`);
            if (callback) {
                callback({
                    text: `Now select from the ${template} templates.`,
                    attachments: allTemplates.map((item) => ({
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
            elizaLogger.error("Error in NASA plugin handler:", error);
            callback({
                text: `Error fetching APOD: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getTemplatesExamples as ActionExample[][],
} as Action;
