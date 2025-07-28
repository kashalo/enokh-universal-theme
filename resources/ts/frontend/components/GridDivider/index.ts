function markRowEnds() {
    const cols = Array.from(
        document.querySelectorAll(
            '.enokh-blocks-has-divider > .enokh-blocks-grid-column, .enokh-blocks-has-divider > .enokh-blocks-container'
        )
    );

    if ( ! cols || cols.length <= 0 ) {
        return;
    }
    // clear old markers
    cols.forEach( ( c ) => c.classList.remove( 'row-end' ) );

    // group by vertical position
    const rows = {};
    cols.forEach( ( col ) => {
        const top = Math.round( col.getBoundingClientRect().top );
        if ( ! rows[ top ] ) {
            rows[ top ] = [];
        }
        rows[ top ].push( col );
    } );

    // mark the last column in each row
    Object.values( rows ).forEach( ( colsInRow ) => {
        // @ts-ignore
        const lastCol = colsInRow[ colsInRow.length - 1 ];
        lastCol.classList.add( 'row-end' );
    } );
}

function markInitialize() {
    const blocks = Array.from( document.querySelectorAll( '.enokh-blocks-has-divider' ) );

    if ( ! blocks || blocks.length <= 0 ) {
        return;
    }

    blocks.forEach( ( block ) => {
        block.classList.add( 'js' );
    } );
}
// simple debounce helper
function debounce( fn, wait ) {
    let t: number;
    return ( ...args ) => {
        clearTimeout( t );
        t = setTimeout( () => fn( ...args ), wait );
    };
}

window.addEventListener( 'load', () => {
    markRowEnds();
    markInitialize();
} );
window.addEventListener( 'resize', debounce( markRowEnds, 100 ) );
