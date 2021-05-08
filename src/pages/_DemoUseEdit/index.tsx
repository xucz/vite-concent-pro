import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BraftEditor, { EditorState } from 'braft-editor';
import 'braft-editor/dist/index.css'

function DemoPageEdit(props: RouteComponentProps) {

  const [data, setData] = useState({
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
    outputHTML: '<p></p>'
  });

  const handleChange = (editorState: EditorState) => {
    setData({
      editorState,
      outputHTML: editorState.toHTML(),
    });
  };
  return (
    <div>
      <div className="editor-wrapper">
        <BraftEditor
          value={data.editorState}
          onChange={handleChange}
        />
      </div>
      <h5>输出内容</h5>
      <div className="output-content">{data.outputHTML}</div>
    </div>
  );
}

export default React.memo(DemoPageEdit);
