import { ActionExample } from "@elizaos/core";

export const remixExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "I wonder what mars looks like today?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch a picture from a mars rover.",
                action: "NASA_GET_MARS_ROVER_PHOTO",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you fetch a random picture of Mars?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch a picture from a mars rover.",
                action: "NASA_GET_MARS_ROVER_PHOTO",
            },
        },
    ],
];
