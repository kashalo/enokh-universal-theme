const getAttribute = ( name: string, props: any, getName: boolean = false ): any => {
    const { attributes, deviceType } = props;

    const device = 'Desktop' === deviceType ? '' : deviceType;
    const attributeName = name + device;

    if ( getName ) {
        return attributeName;
    }

    return attributes[ attributeName ];
};

export default getAttribute;
