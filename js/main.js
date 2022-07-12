
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

    constructor( container, M )  {
        this.container = container;
        this.M = M;
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
        for( let i = 0; i < this.M.nrows; ++i )  {
            const tr = document.createElement( 'tr' );
            for( let j = 0; j < this.M.ncolumns; ++j )  {
                const td = document.createElement( 'td' );
                td.appendChild( document.createTextNode( this.M.get( i,j ) ) );
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

/*
    Assumes data is sorted.
*/
function insert_rec( value, data )  {


}

const output = document.querySelector( '#output' );
//const M = new Matrix( 3, 3, [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] );
//const M = new Matrix( 5, 5, [ 3, 2, 5, 1, 4 ] );
//const view = new MatrixView( document.querySelector( '#matrix' ), M );
//view.renderHTML();



const data = [ 3, 2, 5, 1, 4 ];

const M = new Matrix( data.length + 1, data.length );
const matrixView = new MatrixView( document.querySelector( '#matrix' ), M );
console.log( 'before first call to renderHTML' );
matrixView.renderHTML();
console.log( 'after first call to renderHTML' );


n2sort( data, matrixView );

output.innerHTML = `data = ${data}`;


