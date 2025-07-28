const hasNumericValue = ( value?: string | number ): boolean =>
    value !== null && value !== '' && value !== undefined && ! isNaN( Number( value.toString() ) );

export default hasNumericValue;
