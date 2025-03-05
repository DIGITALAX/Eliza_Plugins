import { ActionExample } from "@elizaos/core";

export const comfyStreamExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to create a workflow that turns regular photos into anime-style art. I'm looking for something with a Studio Ghibli aesthetic.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I can help you find a workflow for anime-style photo conversion with a Ghibli aesthetic. Let me check if we have existing workflows that match your needs.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I found a few options that might work for you. Let me retrieve them.",
                action: "GET_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've found a workflow called 'Ghibli-Style Photo Converter' that might be what you're looking for. It uses an anime diffusion model with specific settings to achieve that distinctive Ghibli look. Would you like me to show you how it works, or would you prefer something different?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "That sounds perfect. Can you also make sure it has options to adjust the level of stylization?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll create a customized version of the workflow with adjustable stylization controls.",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've created an enhanced 'Ghibli-Style Photo Converter' workflow for you. It includes a slider to control the stylization intensity from subtle to strong, and also has color palette options to match different Ghibli films (like the warm tones of 'Howl's Moving Castle' or the cooler blues of 'Spirited Away'). Would you like to try this workflow now?",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I need a workflow for creating photorealistic landscape images with dramatic lighting, like stormy skies with sun breaking through clouds.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'd be happy to help you create dramatic landscape images. Before I search for workflows, could you tell me a bit more about the style you're looking for? Do you prefer a specific type of landscape (mountains, forests, coastal) or any particular season?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "I'm mostly interested in mountain landscapes with dramatic storm clouds. Think alpine settings with moody weather. Summer or autumn seasons would be ideal.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Thank you for the details. Let me create a workflow that matches your requirements for alpine landscapes with dramatic storm lighting in summer/autumn settings.",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've created a 'Dramatic Alpine Storm' workflow for you. This workflow uses a combination of landscape diffusion models with custom prompts optimized for mountain scenery. It includes controls for cloud density, lightning effects, and sunbeam intensity to achieve that 'breaking through clouds' effect you mentioned. There are also seasonal presets for summer and autumn color palettes. Would this workflow meet your needs?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "That sounds great! Is there a way to control the composition as well? I'd like to be able to position the mountains and sun rays.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me enhance the workflow with composition controls.",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've updated the 'Dramatic Alpine Storm' workflow with comprehensive composition controls. You can now adjust the mountain position using a coordinate grid, control the horizon line height, and direct the sun rays with an angle selector. The workflow also includes a rule-of-thirds overlay guide that you can toggle on/off. Does this enhanced version work better for your creative needs?",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I'm trying to create a music visualizer that reacts to beat and frequency. Is there a ComfyStream workflow for that?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "A music visualizer that reacts to audio is an interesting project! Let me search for any existing workflows that might match what you're looking for.",
                action: "GET_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I couldn't find an exact match for an audio-reactive visualizer in our current workflow library. I can create a custom one for you. Could you tell me more about what kind of visual style you're looking for? For example, do you want geometric patterns, particle effects, or something more abstract?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "I'd like something with flowing, abstract patterns that morph with the music. Colorful but not too chaotic. Maybe something that uses gradients and smooth transitions.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Thanks for the details. I'll create a workflow for a flowing, abstract music visualizer with smooth color transitions.",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've created a 'Harmonic Flow Visualizer' workflow for you. It analyzes your audio input for beat detection and frequency ranges, then generates flowing abstract patterns that respond to the music. The workflow includes:\n\n- Color palette selection with smooth gradient transitions\n- Sensitivity controls for beat reactivity\n- Pattern density and flow speed adjustments\n- EQ-based visualization options (bass creates different patterns than treble)\n\nWould you like me to explain how to connect your audio input to this workflow?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "Yes, please explain how to connect my audio. Also, can this be used for livestreaming DJ sets?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Absolutely, this is perfect for DJ livestreams! To connect your audio:\n\n1. Use the 'Audio Input' node in the workflow and select your audio source (microphone, system audio, or direct line-in)\n2. For DJ sets, I recommend using the 'Direct Line-In' option to connect from your mixer\n3. The 'Audio Processing' section lets you isolate frequency bands if you want specific elements to trigger different visuals\n\nFor livestreaming, the workflow includes a 'Stream Output' node that can connect directly to OBS, Streamlabs, or other streaming software as a video source. There's also a low-latency mode specifically optimized for live performances. Would you like me to add any additional features for your DJ sets?",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I'm looking for a workflow to generate consistent character portraits for my fantasy novel. I need to create several characters with the same art style.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Creating consistent character portraits for a fantasy novel sounds like a great project. To help you find the best workflow, could you share more about the art style you're envisioning? For example, are you looking for realistic portraits, stylized fantasy art, or something more illustrative?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "I'm looking for a semi-realistic style with fantasy elements. Think of book covers for modern fantasy novels - detailed enough to show character features clearly, but with an artistic quality rather than photorealistic. I need to create about 10 characters including humans, elves, and some with magical features.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Thank you for the details. Let me check if we have existing workflows that match your needs for semi-realistic fantasy character portraits.",
                action: "GET_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I found a 'Fantasy Character Generator' workflow, but it's more stylized than what you described. Let me create a customized workflow that better matches your semi-realistic requirements and ensures consistency across multiple characters.",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've created a 'Consistent Fantasy Portrait Series' workflow for you. This workflow is specifically designed to maintain style consistency across multiple characters while allowing for individual customization. Key features include:\n\n- Character attribute controls (race selection including human, elf, etc.)\n- Facial feature customization with sliders\n- Consistent lighting and rendering style\n- Memory system to save character 'DNA' for future regeneration\n- Style consistency enforcement through shared embeddings\n\nWould this workflow help with your fantasy novel character portraits?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "This sounds perfect! Can I also add specific items like magical staffs or jewelry that are consistent across different portraits when needed?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Absolutely! Let me enhance the workflow with item consistency features.",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've updated the workflow with an 'Accessory Library' system. Now you can:\n\n- Create and save specific items (staffs, jewelry, clothing, etc.)\n- Apply consistent items across different character portraits\n- Adjust how items appear on different characters while maintaining their core design\n- Create 'faction' or 'family' item sets that share design elements\n\nThe workflow now also includes background template options if you want consistent world elements behind your characters. Would you like me to explain how to use the character and item saving system to maximize consistency?",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to create an image-to-3D workflow that can take my product photos and turn them into 3D models for my e-commerce site.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Converting product photos to 3D models for e-commerce is a valuable application. Let me see if we have any workflows that can help with this specific task.",
                action: "GET_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I found a basic 'Image-to-3D Converter' workflow, but it might not have all the e-commerce specific features you need. Could you tell me more about your products? Are they mostly simple objects, clothing items, or something else? Also, what file format would you need for your website?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "I sell handmade ceramics - mostly vases, bowls, and decorative items. They have unique textures and glazes that I'd like to preserve in the 3D models. I need glTF format for my website's 3D viewer.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Thanks for those details. Ceramics with detailed textures and glazes will require specific processing to capture properly. Let me create a specialized workflow for your needs.",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've created a 'Ceramic Product to 3D' workflow specifically optimized for your handmade ceramics. This workflow includes:\n\n- Multi-view processing to better reconstruct your ceramics' shapes\n- Enhanced texture capturing to preserve the unique glazes and finishes\n- Automatic background removal for clean models\n- Texture map optimization for web display\n- Direct export to glTF format with compressed textures for web performance\n- Optional turntable animation generator for product previews\n\nWould you like me to explain the photo capture process to get the best results from this workflow?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "Yes, please! I'm not sure how many photos I need to take or what angles work best for 3D conversion.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "For optimal results with ceramic items, here's the recommended photo capture process:\n\n1. Use even, diffused lighting to minimize reflections on glazed surfaces\n2. Take photos in this sequence for each product:\n   - 4 side views (rotating 90° each time)\n   - 1 top view\n   - 1 bottom view (if relevant)\n   - 2-4 additional angle views (45° angles work well)\n3. Maintain the same distance from the object for all photos\n4. Use a plain, contrasting background (light objects on dark background or vice versa)\n5. Include a small color calibration card in one photo if color accuracy is critical\n\nThe workflow includes a template guide that you can print to help position your products consistently. Once you upload this set of images, the workflow will automatically align and process them into a textured 3D model. Would you like me to add any additional features to the workflow?",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I need a workflow that can take my sketches and turn them into finished digital art in a cyberpunk style.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'd be happy to help you find a workflow that converts sketches to cyberpunk-style digital art. Let me search for existing options that might meet your needs.",
                action: "GET_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've found a 'Sketch-to-Art Converter' workflow, but it's not specifically optimized for cyberpunk aesthetics. Let me create a customized version that specializes in cyberpunk styling.",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've created a 'Cyberpunk Sketch Enhancer' workflow for you. This workflow takes your hand-drawn sketches and transforms them into finished cyberpunk digital artworks. Features include:\n\n- Sketch line detection and preservation\n- Cyberpunk color palette presets (neon city, corporate dystopia, tech noir, etc.)\n- Atmospheric effects like rain, fog, and neon lighting\n- Detailed tech element generation (circuits, holograms, augmentations)\n- Style intensity controls\n\nWould this workflow suit your creative needs?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "That sounds great. How detailed do my original sketches need to be? I usually just do rough outlines.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The workflow is designed to work with varying sketch detail levels, including rough outlines. Here's what you should know:\n\n- Rough outlines work well - the AI will interpret and fill in details based on cyberpunk conventions\n- More detailed sketches give you more control over the final result\n- Include basic shape indicators for key elements you want preserved\n- You can add simple annotations like 'neon here' or 'hologram' using colored lines\n\nThe workflow includes a 'Sketch Detail' slider that lets you control how closely the final image follows your sketch versus how much creative interpretation the AI adds. For rough outlines, you might prefer a medium-to-low setting to get more detailed results.\n\nWould you like me to adjust the workflow to better handle very minimal sketches?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "Yes, that would be helpful. Also, can it handle character designs? I'm working on a cyberpunk comic and need to convert character sketches too.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll enhance the workflow for minimal sketches and character design optimization.",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've updated the 'Cyberpunk Sketch Enhancer' workflow with these improvements:\n\n1. Enhanced minimal sketch processing:\n   - Added a 'Sketch Boosting' preprocessing stage that strengthens faint lines\n   - Included intelligent contour detection for very rough outlines\n   - Added 'Suggestion Mode' where minimal inputs create complete scenes\n\n2. Character design optimization:\n   - Character-specific cyberpunk elements (implants, tech clothing, etc.)\n   - Consistent character feature preservation across multiple poses\n   - Comic-style rendering option with cell shading\n   - Character sheet template with multiple angle views\n   - 'Character Memory' to save design elements for consistency\n\nThis version should work excellently for your cyberpunk comic character designs, even with minimal sketching. Would you like to test it with one of your rough character outlines?",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I'm a social media manager and I need a workflow that can generate matching sets of images for Instagram posts that maintain the same style and color scheme.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Creating cohesive image sets for Instagram is a great use case for ComfyStream. To help you better, could you share what kind of style or theme you're looking for? For example, minimalist, vibrant, vintage, etc. Also, are you looking to feature specific types of content in these images?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "We're a wellness brand with a calm, earthy aesthetic. Lots of soft greens and natural textures. We post lifestyle content showing our supplements, yoga practices, and healthy food. I need to create 3-5 related images per post series.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Thank you for those details. Let me create a workflow specifically designed for wellness brand content with a consistent earthy aesthetic.",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've created a 'Wellness Brand Content Series' workflow for your Instagram posts. This workflow is designed to generate cohesive sets of 3-5 images that maintain consistent styling. Features include:\n\n- Brand profile saving for your specific earthy, natural aesthetic\n- Color palette locking with soft greens and natural tones\n- Content category templates (supplements, yoga poses, food styling)\n- Consistent lighting and texture preservation across the series\n- Auto-formatting for Instagram dimensions (square, portrait, carousel)\n- Style consistency enforcement across all generated images\n\nWould you like me to demonstrate how to create a sample series?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "Yes, please show me how to create a series about our new plant-based protein powder. We want to show it in natural settings, maybe with some smoothie preparation.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here's how to create a cohesive series for your plant-based protein powder:\n\n1. In the workflow, select the 'Product Series' template\n2. Upload a reference image of your protein powder or enter its description\n3. Choose 'Natural Settings + Food Preparation' from the context menu\n4. Select how many images you want in the series (3-5)\n5. The 'Series Planner' will suggest a narrative flow, such as:\n   - Image 1: Product in a natural setting (e.g., bamboo table with plants)\n   - Image 2: Preparation (adding to blender with fruits)\n   - Image 3: Finished smoothie alongside product\n   - Image 4: Lifestyle usage (person enjoying smoothie)\n6. Adjust the wellness aesthetic sliders to your preference (earthy, airy, etc.)\n7. Generate the full series with one click\n\nThe workflow ensures all images share the same lighting, color grading, and aesthetic while telling a complete story about your product. You can then save this as a template for future product series.\n\nWould you like me to add any specific features to make this workflow more tailored to your brand?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "This is great! Can we also add text overlay capabilities to include our slogan on some images?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Absolutely! I'll enhance the workflow with text overlay features.",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've updated the workflow with comprehensive text overlay capabilities tailored for wellness branding:\n\n1. Typography system with wellness-appropriate font presets\n2. Brand font upload option for your custom typefaces\n3. Text placement templates optimized for Instagram (safe zones for feed/stories)\n4. Earthy, natural text effect presets (subtle shadows, grain textures)\n5. Slogan placement optimization with readability analysis\n6. Automatic text color adjustment based on image background\n7. Text consistency across series with saved text styles\n\nThe workflow now includes a 'Text Planning' stage where you can decide which images in the series should include your slogan or other text elements. It also offers variable text opacity settings to ensure your visuals remain the focus while the text complements the overall aesthetic.\n\nWould this enhanced version meet your needs for branded wellness content?",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Hi there! I'm trying to create generative art for album covers. I want something that has a psychedelic vibe but still looks modern and crisp.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Creating psychedelic yet modern album cover art sounds like an exciting project! Let me see if we have any existing workflows that might be a good starting point.",
                action: "GET_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I found a 'Musical Artwork Generator' workflow, but it's not specifically focused on the psychedelic style you're looking for. Before I create a more tailored workflow, could you share some additional details? For example, are there any specific colors or patterns you're interested in, or any artists/albums with a style you'd like to reference?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "I'm going for something with vibrant colors like purples, teals, and oranges. I like the liquid, melting patterns of classic psychedelia but with a clean vector-like quality. Think Tame Impala album covers mixed with more geometric modern design.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Thank you for those references! Tame Impala's visual style with geometric modern elements gives me a clear direction. I'll create a specialized workflow for your psychedelic album art.",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've created a 'Neo-Psychedelic Album Art' workflow that combines classic psychedelic elements with modern, crisp design sensibilities. Features include:\n\n- Color palette control with presets for vibrant purples, teals, and oranges\n- Pattern generators for liquid/melting effects with adjustable flow intensity\n- Geometric overlay system for adding modern structure\n- Vector-like rendering option for clean, crisp output\n- Tame Impala-inspired style presets as starting points\n- Album dimensions presets for various platforms (Spotify, Apple Music, vinyl, etc.)\n- Symmetry controls for creating balanced or intentionally asymmetric designs\n\nWould you like to start with one of the included style presets or build your design from scratch?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "I'd like to start with a preset and then modify it. Also, I need to be able to add the band name 'Cosmic Drift' to the design. Is that possible?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Absolutely! The workflow includes text integration designed specifically for album artwork. Let me explain how to use the presets and add your band name:",
                action: "CREATE_WORKFLOW",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've updated the workflow with a full text integration system for your band name. Here's how to use the complete workflow:\n\n1. Start by selecting one of the psychedelic presets (I recommend 'Liquid Geometry' or 'Currents Evolution' based on your preferences)\n2. Adjust the color balance sliders to emphasize your preferred purples, teals, and oranges\n3. Use the 'Typography' panel to add 'Cosmic Drift'\n   - Choose from psychedelic-appropriate fonts or upload your own\n   - Apply text effects like liquification, geometric framing, or subtle animation\n   - Position using the smart placement grid\n4. Fine-tune the balance between flowing psychedelic elements and clean geometric structures\n5. Use the 'Render Quality' selector to ensure crisp, vector-like output\n\nThe workflow also includes a 'Band Identity' save feature, so once you've created a style you like, you can save it as a template for future releases while maintaining your visual brand identity.\n\nWould you like me to provide more details on any specific part of this process?",
            },
        },
    ],
];
