import { Plugin } from "@elizaos/core";
import getWorkflow from "./actions/getWorkflow";
import createWorkflow from "./actions/createWorkflow";

export const comfystreamPlugin: Plugin = {
    name: "comfystream",
    description: "ComfyStream Workflow Plugin for Eliza",
    actions: [getWorkflow, createWorkflow],
    evaluators: [],
    providers: [],
};

export default comfystreamPlugin;
