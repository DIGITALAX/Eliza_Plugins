import { Plugin } from "@elizaos/core";
import { getTemplatesAction } from "./actions/getTemplates";
import { getFormatsAction } from "./actions/getFormatsAction";
import { getPresetsAction } from "./actions/getPresetsAction";
import { synthesizeAction } from "./actions/synthesizeAction";
import { createModelShotsAction } from "./actions/createModelShotsAction";
import { mintAction } from "./actions/mintAction";

export const nasaPlugin: Plugin = {
    name: "coinop",
    description:
        "Roll your own NFT, streetwear, and art prints with an integrated AI editor canvas for local, decentralized fulfillment.",
    actions: [
        getTemplatesAction,
        getFormatsAction,
        getPresetsAction,
        synthesizeAction,
        createModelShotsAction,
        mintAction,
    ],
    evaluators: [],
    providers: [],
};
export default nasaPlugin;
