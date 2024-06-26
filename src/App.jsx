import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import './style/App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [metadata, setMetadata] = useState({});

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).filter(file => file.type === 'image/jpeg');
    setFiles(selectedFiles);
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

  const downloadCSVFiles = () => {
    const exportData = prepareExportData();

    // Configurations for different CSV files
    const csvFreepik = {
      data: exportData,
      headers: [
        { label: 'File name', key: 'File name' },
        { label: 'Title', key: 'Title' },
        { label: 'Keywords', key: 'Keywords' }
      ],
      separator: ';',
      filename: 'metadatafreepik.csv',
    };

    const csvAdobe = {
      data: exportData,
      headers: [
        { label: 'File name', key: 'File name' },
        { label: 'Title', key: 'Title' },
        { label: 'Keywords', key: 'Keywords' }
      ],
      separator: ',',
      filename: 'metadataadobe.csv',
    };
    const csvVectezy = {
      data: exportData,
      headers: [
        { label: 'Filename', key: 'File name' },
        { label: 'Title', key: 'Title' },
        { label: 'Description', key: 'Title' },
        { label: 'Keywords', key: 'Keywords' }
      ],
      separator: ',',
      quoteStrings:'true',
      filename: 'metadatavectezy.csv',
    };
    const csvSS = {
      data: exportData,
      headers: [
        { label: 'Filename', key: 'File name' },
        { label: 'Description', key: 'Title' },
        { label: 'Keywords', key: 'Keywords' },
        { label: 'Categories', key: '' }
      ],
      separator: ';',
      quoteStrings:'true',
      filename: 'metadataSS.csv',
    };

    // Function to create CSV and download
    const createAndDownloadCSV = ({ data, headers, separator, filename }) => {
      const csvData = [
        headers.map(header => header.label).join(separator),
        ...data.map(row => headers.map(header => row[header.key]).join(separator))
      ].join('\n');

      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Download both CSV files
    createAndDownloadCSV(csvFreepik);
    createAndDownloadCSV(csvAdobe);
    createAndDownloadCSV(csvVectezy);
    createAndDownloadCSV(csvSS);
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
          <button
            onClick={downloadCSVFiles}
            className="btn btn-secondary mx-5"
          >
            Ekspor CSV
          </button>
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
