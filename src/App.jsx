import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import './style/App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [metadata, setMetadata] = useState({});

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).filter(file => file.type === 'image/jpeg');
    setFiles(selectedFiles);
    // Reset metadata when files change
    setMetadata({});
  };

  const handleInputChange = (index, field, value) => {
    setMetadata(prevMetadata => ({
      ...prevMetadata,
      [index]: {
        ...prevMetadata[index],
        [field]: value
      }
    }));
  };

  const prepareExportData = () => {
    const exportData = [];
    
    files.forEach((file, index) => {
      const fileNameTrimmed = file.name.trim().replace(/\s+/g, '');
      const rowData = {
        'File name': fileNameTrimmed,
        'Title': metadata[index]?.description,
        'Keywords': metadata[index]?.tags
      };
      exportData.push(rowData);
    });
    
    return exportData;
  };

  return (
    <div className='main bg-dark'>
      <div className="container-fluid">
        <h2 className='pt-4 text-white'>Mikrostock Metadata</h2>

        <div className="button-control mt-4 d-flex justify-content-between">
          <input
            type="file"
            multiple
            accept="image/jpeg"
            onChange={handleFileChange}
            className="btn"
          />
          <CSVLink
            data={prepareExportData()}
            headers={[
              { label: 'File name', key: 'File name' },
              { label: 'Title', key: 'Title' },
              { label: 'Keywords', key: 'Keywords' }
            ]}
            filename="metadatafreepik.csv"
            className="btn btn-secondary mx-5"
            separator=';'
            quoteStrings={false}
          >
            Ekspor CSV
          </CSVLink>
          <CSVLink
            data={prepareExportData()}
            headers={[
              { label: 'File name', key: 'File name' },
              { label: 'Title', key: 'Title' },
              { label: 'Keywords', key: 'Keywords' }
            ]}
            filename="metadataadobe.csv"
            className="btn btn-secondary mx-5"
            separator=','
            quoteStrings={true}
          >
            Ekspor CSV Adobe
          </CSVLink>
        </div>

        <div className="main-content mx-2 mt-4">
          <table className="table table-bordered table-dark table-striped">
            <thead>
              <tr className='text-center table-secondary'>
                <th scope="col">No</th>
                <th scope="col">Preview</th>
                <th scope="col">Filename</th>
                <th scope="col" colSpan={2} style={{ width: '70%' }}>Metadata Preview</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index}>
                  <th scope="row" className='text-center align-middle'>{index + 1}</th>
                  <td className='align-middle text-center'>
                    <img src={URL.createObjectURL(file)} alt="Preview" width="100" />
                  </td>
                  <td className='align-middle text-center'>
                    <p>{file.name.trim().replace(/\s+/g, '')}</p>
                  </td>
                  <td className='py-3' colSpan={2}>
                    <div className='w-100'>
                      <p className='mb-2'>Description</p>
                      <input
                        className='w-100'
                        type="text"
                        value={metadata[index]?.description || ''}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                      />
                    </div>
                    <div className='w-100'>
                      <div className='d-flex'>
                        <p className='mb-2 mt-3'>Tags</p>
                      </div>
                      <textarea
                        className='w-100'
                        value={metadata[index]?.tags || ''}
                        onChange={(e) => handleInputChange(index, 'tags', e.target.value)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
