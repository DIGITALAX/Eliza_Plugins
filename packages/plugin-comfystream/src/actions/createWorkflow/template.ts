export const createWorkflowTemplate = `Create an image prompt that accurately captures the essence of the user's most recent messages and their desired style. If specific details are missing, use your judgment to add appropriate elements that a diffusion model like Stable Diffusion can effectively render.

Here are the user's most recent messages for context:
{{recentMessages}}

Here is an example prompt:
A performer emerges from the pages of a sketch-book style monochromatic, hand-drawn comic book, their pencil-sketched outline blending with live-action romance and real-world textures. The background shifts between a cozy café filled with warm, diffused sunlight and a dynamic pencil-drawn world of abstract corridors and twisting mechanical obstacles. The subject wears a minimalist, fitted jacket and tousled hair, exuding youthful charm. Fluid rotoscoped animation seamlessly transitions between hand-drawn and live-action, creating a surreal, dreamlike experience. Lighting alternates between soft natural tones in the café and stark, high-contrast shading in the sketch world. The foreground is alive with rippling pencil strokes that react to the performer’s movements, blurring the boundaries between art and reality.

Rules:
1. Identify the core concepts in the user's prompt/workflow request
2. Convert these concepts into a prompt of 1 paragraph
3. Provide only the prompt text without explanations or acknowledgments
4. Use English only for the prompt, regardless of the user's language
5. Respond with just the prompt string and nothing else`;

export const BASE_WORFKLOW = {
    "1": {
        inputs: {
            image: "sampled_frame.jpg",
            upload: "image",
        },
        class_type: "LoadImage",
        _meta: {
            title: "Load Image",
        },
    },
    "2": {
        inputs: {
            images: ["1", 0],
            engine: "depth_anything_v2_vitb-fp16.engine",
        },
        class_type: "DepthAnythingTensorrt",
        _meta: {
            title: "Depth Anything Tensorrt",
        },
    },
    "3": {
        inputs: {
            ckpt_name: "realcartoonRealistic_v14.safetensors",
        },
        class_type: "CheckpointLoaderSimple",
        _meta: {
            title: "Checkpoint Loader Simple",
        },
    },
    "4": {
        class_type: "CLIPTextEncode",
        _meta: {
            title: "CLIP Text Encode",
        },
        inputs: {
            text: "Clear, rippling water—objects slightly distorted and refracted with gentle blue tones washing over the scene, light dancing across subtle undulations, capturing that ephemeral moment when the material world transforms through the lens of liquid transparency.",
            clip: ["3", 1],
        },
    },
    "5": {
        class_type: "CLIPTextEncode",
        _meta: {
            title: "CLIP Text Encode",
        },
        inputs: {
            text: "b&w, blurry, nsfw, dark",
            clip: ["3", 1],
        },
    },
    "6": {
        class_type: "VAEEncode",
        _meta: {
            title: "VAE Encode",
        },
        inputs: {
            vae: ["3", 2],
            pixels: ["2", 0],
        },
    },
    "7": {
        class_type: "ControlNetLoader",
        _meta: {
            title: "ControlNet Loader",
        },
        inputs: {
            control_net_name: "control_sd15_depth.pth",
        },
    },
    "8": {
        class_type: "ControlNetApplyAdvanced",
        _meta: {
            title: "ControlNet Apply Advanced",
        },
        inputs: {
            positive: ["4", 0],
            negative: ["5", 0],
            control_net: ["7", 0],
            image: ["2", 0],
            strength: 1.0,
            start_percent: 0.0,
            end_percent: 1.0,
        },
    },
    "9": {
        class_type: "KSampler",
        _meta: {
            title: "K Sampler",
        },
        inputs: {
            model: ["3", 0],
            positive: ["8", 0],
            negative: ["8", 1],
            latent_image: ["6", 0],
            seed: 781158629542217,
            steps: 10,
            control_after_generate: "randomize",
            cfg: 7.8,
            sampler_name: "euler",
            scheduler: "normal",
            denoise: 1.0,
        },
    },
    "10": {
        class_type: "VAEDecode",
        _meta: {
            title: "VAE Decode",
        },
        inputs: {
            samples: ["9", 0],
            vae: ["3", 2],
        },
    },
    "11": {
        inputs: {
            images: ["10", 0],
        },
        class_type: "PreviewImage",
        _meta: {
            title: "Preview Image",
        },
    },
};
