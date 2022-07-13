async function n2sort( data, view )  {
    console.log( 'n2sort called, data = ', data );
    const n = data.length;
    for( let i = 0; i < n; ++i )  {
        for( let j = 0; j < n; ++j )  {
            if( data[i] < data[j] )  {
                swap( data, i, j );
            }
        }
        console.log( 'n2sort awaiting addRow' );
        await view.addRow( data, `Step ${i + 1}` );
    }
}