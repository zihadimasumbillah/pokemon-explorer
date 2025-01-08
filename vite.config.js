import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        exclude: [
            "chunk-YRKBDTLE",
            "chunk-LBN5DLD7",
            "chunk-SGBBG52M",
            "chunk-VAIJX74Z",
            "chunk-T665ICTQ",
        ],
    },
});
