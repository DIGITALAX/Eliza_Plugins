import { Plugin } from "@elizaos/core";
import { getRemixablesAction } from "./actions/getRemixables";
import { synthPresetAction } from "./actions/remix";
import { mintAction } from "./actions/mint";

export const remixPlugin: Plugin = {
    name: "remix",
    description:
        "Roll your own NFT, streetwear, and art prints with an integrated AI editor canvas for local, decentralized fulfillment.",
    actions: [getRemixablesAction, synthPresetAction, mintAction],
    evaluators: [],
    providers: [],
};
export default remixPlugin;
