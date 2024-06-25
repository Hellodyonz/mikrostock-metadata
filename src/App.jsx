import React, { useState } from 'react';
import './style/App.css';

function App() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).filter(file => file.type === 'image/jpeg');
    setFiles(selectedFiles);
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
          <button className="btn btn-secondary mx-5">Ekspor CSV</button>
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
                    <p>{file.name}</p>
                  </td>
                  <td className='py-3'>
                    <div className='w-100'>
                      <p className='mb-2'>Description</p>
                      <input className='w-100' type="text" />
                    </div>
                    <div className='w-100'>
                      <p className='mb-2 mt-3'>Tags</p>
                      <textarea></textarea>
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
