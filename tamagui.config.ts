import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'

const config = createTamagui({
  ...defaultConfig,
  settings: {
    ...defaultConfig.settings,
    defaultTheme: 'light',
  },
})

export type AppTamaguiConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}

export default config
