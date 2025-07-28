import { colord } from 'colord';

const hexToRGBA = ( hex: string, alpha: number ): string => {
    if ( ! hex ) {
        return '';
    }

    if ( ! alpha && 0 !== alpha ) {
        return hex;
    }

    if ( 1 === alpha || ! hex.startsWith( '#' ) ) {
        return hex;
    }

    return colord( hex ).alpha( alpha ).toRgbString();
};
export default hexToRGBA;
