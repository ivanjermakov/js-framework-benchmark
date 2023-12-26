import { defineConfig } from 'vite'

export default defineConfig(() => {
    return {
        base: "/frameworks/keyed/ruic/dist/",
        plugins: [],
        preview: {
            headers: {
                "Cache-Control": "public, max-age=600",
            },
        },
        server: {
            fs: {
                allow: ["../../.."],
            },
        },
    };
});

