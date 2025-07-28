export default function buildCSS( cssObj: object ) {
    let css = '';

    for ( const [ key, value ] of Object.entries( cssObj ) ) {
        if ( value.length < 1 ) {
            continue;
        }

        let tempOutput = key + '{';
        let elementsAdded = 0;

        for ( const [ index, properties ] of Object.entries( value ) ) {
            for ( const [ attribute, val ] of Object.entries( properties ) ) {
                if ( ! val && 0 !== val ) {
                    continue;
                }

                elementsAdded++;
                tempOutput += attribute + ': ' + val + ';';
            }
        }

        tempOutput += '}';

        if ( elementsAdded > 0 ) {
            css += tempOutput;
        }
    }

    return css;
}
