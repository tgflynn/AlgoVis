

class MatrixView  {

    constructor( container, useEvents = false )  {
        this.container = container;
        this.useEvents = useEvents;
        this.rows = [];
        this.rowLabels = [];
    }

    addRow( row, rowLabel = '' )  {
        this.rows.push( row.slice() );
        this.rowLabels.push( rowLabel );
        this.renderHTML();
        return new Promise( (resolve, reject) =>  {
            if( ! this.useEvents )  {
                resolve();
                return;
            }
            document.addEventListener( 'reset', (e) => {
                this.reset();
                reject();
                initSort();
            });
            document.addEventListener( 'step', (e) => {
                ++STEP;
                resolve();
            });
        });
    }

    reset()  {
        this.rows = [];
        this.rowLabels = [];
        this.renderHTML();
    }

    renderHTML()  {
        const old = this.container.querySelector( 'table' );
        if( old != null )  {
            old.remove();
        }
    
        const table = document.createElement( 'table' );
        const nrows = this.rows.length;
        for( let i = 0; i< nrows; ++i )  {
            const row = this.rows[i];
            const rowLabel = this.rowLabels[i];
            const tr = document.createElement( 'tr' );
            const label_td = document.createElement( 'td' );
            label_td.setAttribute( 'class', 'row-label' );
            label_td.appendChild( document.createTextNode( `${rowLabel}` ) );
            tr.appendChild( label_td );
            for( let e of row )  {
                const td = document.createElement( 'td' );
                td.appendChild( document.createTextNode( e ) );
                tr.appendChild( td );
            }
            table.appendChild( tr );
        }
        this.container.appendChild( table );
    }

}

function swap( data, i, j )  {
    const tval = data[i];
    data[i] = data[j];
    data[j] = tval;
}

function displayCode( codeLines, container )  {
    const list = document.createElement( 'ol' );
    for( let i = 0; i < codeLines.length; ++i )  {
        const li = document.createElement( 'li' );
        li.appendChild( document.createTextNode( codeLines[i]) );
        list.appendChild( li );
    }
    container.appendChild( list );
}

function generateRandomArray( n, minval, maxval )  {
    const arr = new Array( n );
    arr.fill( 0 );
    return arr.map( () => {
        return minval + Math.floor( Math.random() * ( maxval + 1 - minval ) );
    } );
}

function doNewData()  {
    DATA = generateRandomArray( N, 0, N ).slice();
    INPUT_VIEW.reset();
    INPUT_VIEW.addRow( DATA, 'Input Data' );
    doReset();
}

function doRun() {
    initSort();
    MATRIX_VIEW.useEvents = false;
    MATRIX_VIEW.reset();
    runSort( DATA, MATRIX_VIEW );
    STEP = DATA.length;
}

function doStep() {
    if( STEP === 0 )  {
        runSort( DATA, MATRIX_VIEW );
        STEP = 1;
        return;
    }
    else if( STEP === DATA.length )  {
        return;
    }
    const e = new Event( 'step' );
    document.dispatchEvent( e );
}

function doReset()  {
    MATRIX_VIEW.useEvents = true;
    MATRIX_VIEW.reset();
    initSort();
    const e = new Event( 'reset' );
    document.dispatchEvent( e );
}

async function runSort( data, view )  {
    try  {
        await n2sort( data, view );
    }
    catch (e)  {}
    finally {
        view.useEvents = true;
    }
}

function initSort()  {
    STEP = 0;
}

const BASE_URL = window.location.href;
const CODE_URL = `${BASE_URL}/js/n2sort.js`;

fetch( CODE_URL )
.then( (response) => {
    return response.text();
})
.then( (code) =>  {
    const lines  = code.split( '\n' );
    displayCode( lines, document.querySelector( '#code-container' ) );
});

const N = 5;
let STEP = 0;
let DATA = [ 3, 2, 5, 1, 4 ];

const INPUT_VIEW = new MatrixView( document.querySelector( '#input-data' ) );
INPUT_VIEW.addRow( DATA, 'Input Data' );

const MATRIX_VIEW = new MatrixView( document.querySelector( '#matrix' ), true );




