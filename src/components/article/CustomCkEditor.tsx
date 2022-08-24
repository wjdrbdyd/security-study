import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';

interface ISck {
    height?: string;
}
export const SCkEditor = styled.div<ISck>`
    width: 90%;
    margin-bottom: 70px;
    .ck-editor__editable_inline {
        height: ${props => props.height ? props.height : "350px"};
    }
`
interface IProps {
    height?: string;
    onChange?: any;
    data?: string;
    editing?: boolean;
}
const CustomCkEditor = ({height, onChange, data, editing}:IProps) => {

    return (
        <SCkEditor height={height}>
            <CKEditor 
                disabled = {editing}
                editor={ ClassicEditor }
                data={data}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ onChange }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
        </SCkEditor>
    );
};

export default CustomCkEditor;
