
class Matrix  {
    constructor( nrows, ncolumns, data = [] )  {
        this.nrows = nrows;
        this.ncolumns = ncolumns;
        this.setData( data );
    }

    setData( data )  {
        const fdata = data.flat();
        this.data = [];
        if( data.length < 1 )  {
            return;
        }
        for( let i = 0; i < this.nrows; ++i )  {
            const start = i * this.ncolumns;
            const end = start + this.ncolumns;
            const row = fdata.slice( start, end );
            this.data.push( row );
        }
    }

    reshape( nrows, ncolumns )  {
        this.nrows = nrows;
        this.ncolumns = ncolumns;
    }

    get( row, column )  {
        if( row < 0 || row >= this.nrows )  {
            throw new Error( `Matrix.get: Invalid row indes: ${row}` );
        }

        if( column < 0 || column >= this.ncolumns )  {
            throw new Error( `Matrix.get: Invalid column indes: ${column}` );
        }

        // console.log( `Matrix.get row = ${row}, column = ${column}, data = ${this.data}` );
        if( this.data.length <= row )  {
            return "";
        }

        return ( (x) => ( x === undefined ) ? "" : x ) ( this.data[row][column] );
    }

    set( row, column, value )  {
        if( row < 0 || row >= this.nrows )  {
            throw new Error( `Matrix.set: Invalid row indes: ${row}` );
        }

        if( column < 0 || column >= this.ncolumns )  {
            throw new Error( `Matrix.set: Invalid column indes: ${column}` );
        }

        this.data[row][column] = value;
    }

    addRow( row )  {
        if( row.length != this.ncolumns )  {
            throw new Error( 'Matrix.addRow Invalid row length' );
        }
        this.data.push( row.slice() );
        console.log( 'Matrix.addRow data = ', this.data );
    }
}

class MatrixView  {

    constructor( container )  {
        this.container = container;
        this.rows = [];
        this.rowLabels = [];
    }

    addRow( row, rowLabel = '' )  {
        this.rows.push( row.slice() );
        this.rowLabels.push( rowLabel );
        this.renderHTML();
    }

    renderHTML()  {
        const old = this.container.querySelector( 'table' );
        // console.log( 'MatrixView.renderHTML: old = ', old );
        if( old != null )  {
            // console.log( 'MatrixView.renderHTML removing old table' );
            old.remove();
        }
        // const gone = this.container.querySelector( 'table' );
        // if( gone != null )  {
        //     console.log( 'MatrixView.renderHTML failed to remove table' );
        // }
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

class Sorter  {

    constructor( data )  {
        this.data = data;
    }

    sort()  {
        console.log( "Sorter.sort called" );
    }
}

function swap( data, i, j )  {
    const tval = data[i];
    data[i] = data[j];
    data[j] = tval;
}

function addPermView( data, view )  {
    view.M.addRow( data );
    view.renderHTML();
}

function displayCode( codeLines, container )  {
    console.log( 'container = ', container );
    const list = document.createElement( 'ol' );
    for( let i = 0; i < codeLines.length; ++i )  {
        const li = document.createElement( 'li' );
        li.appendChild( document.createTextNode( codeLines[i]) );
        list.appendChild( li );
    }
    container.appendChild( list );
}

function doNewData()  {
    console.log( 'New Data button clicked' );
}

// const output = document.querySelector( '#output' );
//const M = new Matrix( 3, 3, [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] );
//const M = new Matrix( 5, 5, [ 3, 2, 5, 1, 4 ] );
//const view = new MatrixView( document.querySelector( '#matrix' ), M );
//view.renderHTML();


const BASE_URL = window.location.href;
const CODE_URL = `${BASE_URL}/js/n2sort.js`;

fetch( CODE_URL )
.then( (response) => {
    return response.text();
})
.then( (code) =>  {
    // console.log( 'code = ', code );
    const lines  = code.split( '\n' );
    displayCode( lines, document.querySelector( '#code-container' ) );
    console.log( 'lines = ', lines );
});

const data = [ 3, 2, 5, 1, 4 ];

const inputView = new MatrixView( document.querySelector( '#input-data' ) );
inputView.addRow( data, 'Input Data' );

const matrixView = new MatrixView( document.querySelector( '#matrix' ) );

n2sort( data, matrixView );



