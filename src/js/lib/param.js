function params(a) {
     var s = [ ];
     function add( key, value ){
         s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
     };
     // If an array was passed in, assume that it is an array
     // of form elements

         // Serialize the key/values
     for ( var j in a )
             add( j, a[j] );
     // Return the resulting serialization
     return s.join("&").replace(/%20/g, "+");
}

export {params}
