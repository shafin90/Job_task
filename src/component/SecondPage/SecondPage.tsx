import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ThirdComponent from '../DepartmentList/DepartmentList';
import DepartmentList from '../DepartmentList/DepartmentList';

// Define columns for the DataGrid
const columns: GridColDef[] = [
  { field: 'userId', headerName: 'User ID', width: 100 },
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'title', headerName: 'Title', width: 300 },
  { field: 'body', headerName: 'Body', width: 500 },
];

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}






const SecondPage = () => {
  const [jsonData, setJsonData] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then((data: Post[]) => setJsonData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);





  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={jsonData} columns={columns} pageSize={5} checkboxSelection />

       {/* DepartmentList component */}
       <DepartmentList  />
    </div>
  );
}

export default SecondPage;
