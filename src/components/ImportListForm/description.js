import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

function Description(props) {
    const { originDesc } = props;

    const handleEditorChange = (e) => {
        console.log(e.target.getContent());
    };

    return (
        <div>
            {props.tabActive === 2 && (
                <Editor
                    initialValue={originDesc}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            "advlist autolink lists link image",
                            "charmap print preview anchor help",
                            "searchreplace visualblocks code",
                            "insertdatetime media table paste wordcount",
                        ],
                        toolbar:
                            "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help",
                    }}
                    onChange={handleEditorChange}
                />
            )}
        </div>
    );
}

export default Description;
