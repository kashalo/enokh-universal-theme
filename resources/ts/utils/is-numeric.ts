const isNumeric = ( n: any ) => ! isNaN( parseFloat( n ) ) && isFinite( n );
export default isNumeric;
