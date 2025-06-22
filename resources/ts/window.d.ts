import * as HeaderTypes from '../../src/Blocks/Header/resources/ts/types'

declare global {
    interface Window {
        MahUniversalTheme: {
            Config: {
                Blocks: {
                    Header: HeaderTypes.ElementConfig;
                }
            }
        }
    }
}