import { __ } from '@wordpress/i18n';
import PostTypeControl from './PostTypeControl';
import PostTypeRecordsSelect from '../../../PostTypeSelectControl';
import SourceSelectControl from './SourceSelectControl';
import CustomSelectControl from '@enokh-blocks/components/CustomSelectControl';
import { useMemo, useState } from '@wordpress/element';
import { useTaxonomies } from '@enokh-blocks/stores';
import SingleTaxonomySelectControl from '@enokh-blocks/components/SingleTaxonomySelect';

const SourceControls = ( {
    dynamicSource,
    postType,
    postId,
    setAttributes,
    dynamicContentType,
    name,
    termTaxonomy,
    termId,
} ): JSX.Element => {
    const taxonomies = useTaxonomies();
    const taxonomiesOptions = useMemo(
        () => taxonomies.map( ( tax ) => ( { value: tax.slug, label: tax.name } ) ),
        [ JSON.stringify( taxonomies ) ]
    );
    const selectedTaxonomy = taxonomiesOptions.filter( ( option ) => option.value === termTaxonomy );

    return (
        <>
            <SourceSelectControl
                postType={ dynamicSource }
                onChange={ ( option ) => {
                    setAttributes( {
                        dynamicSource: option.value,
                        postId: '',
                        postType: 'post',
                    } );
                } }
                value={ dynamicContentType }
                name={ name }
            />

            { dynamicSource === 'post-type' && (
                <>
                    <PostTypeControl
                        postType={ postType }
                        onChange={ ( option ) => {
                            setAttributes( { postType: option.value, postId: '' } );
                        } }
                    />

                    <PostTypeRecordsSelect
                        postId={ postId }
                        postType={ postType }
                        value={ !! postId ? [ postId ] : [] }
                        id={ 'enokh-blocks-select-post' }
                        label={ __( 'Select source post', 'enokh-blocks' ) }
                        help={ __( 'Search by name or ID.', 'enokh-blocks' ) }
                        onChange={ ( option ) => {
                            setAttributes( { postId: option.value } );
                        } }
                        isMulti={ false }
                    />
                </>
            ) }

            { dynamicSource === 'taxonomy' && (
                <>
                    <CustomSelectControl
                        wrapperStyles={ { marginBottom: '8px' } }
                        label={ __( 'Taxonomies', 'enokh-blocks' ) }
                        placeholder={ __( 'Select taxonomy', 'enokh-blocks' ) }
                        options={ taxonomiesOptions }
                        value={ selectedTaxonomy }
                        onChange={ ( option ) => {
                            setAttributes( {
                                termTaxonomy: option.value,
                                termId: 0,
                            } );
                        } }
                        id={ 'enokh-blocks-simple-select' }
                    />

                    { termTaxonomy && (
                        <>
                            <SingleTaxonomySelectControl
                                taxonomy={ termTaxonomy }
                                value={ termId }
                                placeholder={ __( 'Search term…', 'enokh-blocks' ) }
                                onChange={ ( newValue ) => {
                                    setAttributes( { termId: newValue.value } );
                                } }
                                help={
                                    ! termId ? __( 'You must select a term. Search by name or ID.', 'enokh-blocks' ) : ''
                                }
                            />
                        </>
                    ) }
                </>
            ) }
        </>
    );
};
export default SourceControls;
