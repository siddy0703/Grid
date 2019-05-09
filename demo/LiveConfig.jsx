import React, { Component } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';

/*
* The LiveConfig component which will render - live configuration for data grid.
 * @type {class}
*/
class LiveConfig extends Component {
  componentDidMount() {
    const container = document.getElementById('jsoneditor');
    const options = {
      'mode': 'tree',
      'indentation': 0,
      'navigationBar': false,
      'mainMenuBar': true,
      onValidate: (json) => {
        const errors = [];

        if (json && !json.headerConfig) {
          errors.push({
            path: [],
            message: 'Required property "headerConfig" missing.',
          });
        } else {
          this.props.onChangeMetaData(json);
        }
        return errors;
      },
    };
    const editor = new JSONEditor(container, options);
    const json = this.props.metaData;
    editor.set(json);
  }

  render() {
    return (
      <div className="live-config">
        <div
          className="header-column"
        >Live Configurations.
        </div>
        <div id="jsoneditor" style={{ width: '400px', height: 'auto' }} />
      </div>
    );
  }
}


export default LiveConfig;
