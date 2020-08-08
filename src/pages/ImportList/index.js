import React from "react";
import ImportListForm from "../../components/ImportListForm/importListForm";
function ImportList() {
    return (
        <div className="mr-4">
            <p className="menu-title">Import List</p>
            <div className="container">
                <ImportListForm />
            </div>
        </div>
    );
}

export default ImportList;
