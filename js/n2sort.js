function n2sort( data, view )  {
    const n = data.length;
    for( let i = 0; i < n; ++i )  {
        for( let j = 0; j < n; ++j )  {
            if( data[i] < data[j] )  {
                swap( data, i, j );
            }
        }
        view.addRow( data, `Step ${i + 1}` );
    }
}