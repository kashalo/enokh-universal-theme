import { useContext } from '@wordpress/element';
import BlockContext from '../../../block-context';
import { addToCSS, buildCSS } from '../../../utils';

const DisplayStyle = ( props: ContainerBlockProps ): JSX.Element => {
    const { attributes, clientId } = props;
    const { deviceType } = useContext( BlockContext );
    const { uniqueId, hideOnDesktop, hideOnTablet, hideOnMobile } = attributes;
    const styles = [];
    let isHidden = false;

    if ( hideOnDesktop && deviceType === 'Desktop' ) {
        isHidden = true;
    } else if ( hideOnTablet && deviceType === 'Tablet' ) {
        isHidden = true;
    } else if ( hideOnMobile && deviceType === 'Mobile' ) {
        isHidden = true;
    }

    if ( isHidden ) {
        addToCSS( styles, '#block-' + clientId, {
            display: 'none !important',
        } );
    }
    return (
        <>
            <style>{ buildCSS( styles ) }</style>
        </>
    );
};

export default DisplayStyle;
