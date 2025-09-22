///<reference types="vite-plugin-svgr/client" />

interface EnvironmentVariables {
    readonly VITE_FIREBASE_API_KEY: string
    readonly VITE_AUTHDOMAIN: string
    readonly VITE_PROJECT_ID: string
    readonly VITE_STORAGE_BUCKET: string
    readonly VITE_MESSAGING_SENDER_ID: string
    readonly VITE_APP_ID: string
    readonly VITE_STRIPE_PH_KEY: string
}

interface ImportMeta {
    readonly env: EnvironmentVariables
}