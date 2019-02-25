#install

With npm installed, run

```
	$ npm i simple-react-data-grid
```

##Usage

    import DataGrid from 'simple-react-data-grid';
    <DataGrid data={'data'}  metaData={'metaData'}  styles={'styles')} />
	
    ------------------------------------------------------------------------------
	data = json data to be rendered.
	metaData = json data with values to be shown as column config.
	

##Example Input

  Provide Metadata to configure the widget

    metaData =	{
      headerConfig: [
        {
          'name': 'COMPANY NAME',
          'key': 'companyName',
        },
        {
          'name': 'BROKER',
          'key': 'brokerName',
        },
        {
          'name': 'CLIENT TYPE',
          'key': 'companyType',
        },
        {
          'name': 'CONFIGURATION NAME',
          'key': 'configurationName',
        },
      ],
	  recordsPerPage: 25,
    };


  The styles json will override default styling.
	
    styles = {
      gridWrapper:{
        'color': 'red',
      },
      gridContent:{
        'background-color': 'blue',
      },
      gridTableTD:{
        'padding': '5px',
      },
      gridTableThead:{
        'margin': '10px',
      },
    }


  styles options :

    -gridWrapper,
    -gridContent,
    -gridTable,
    -gridTableThead,
    -gridTableTR,
    -gridTableTH,
    -gridTableTD,
    -gridTableTbody,






