import { Plugin } from "@elizaos/core";
import { getTemplatesAction } from "./actions/getTemplates";
import { getFormatsAction } from "./actions/getFormats";
import { getPresetsAction } from "./actions/getPresets";
import { synthPresetAction } from "./actions/synthPreset";
import { createModelShotsAction } from "./actions/createModelShots";
import { mintAction } from "./actions/mint";

export const coinopPlugin: Plugin = {
    name: "coinop",
    description:
        "Roll your own NFT, streetwear, and art prints with an integrated AI editor canvas for local, decentralized fulfillment.",
    actions: [
        getTemplatesAction,
        getFormatsAction,
        getPresetsAction,
        synthPresetAction,
        createModelShotsAction,
        mintAction,
    ],
    evaluators: [],
    providers: [],
};
export default coinopPlugin;
