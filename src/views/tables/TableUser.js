import React from 'react';

import ComponentCard from '../../components/ComponentCard';
import ProjectTables from '../../components/dashboard/extraDashboard/UserTable';

const BasicTable = () => {
  return (
    <>
      
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      <ComponentCard
        title="Users List"
        subtitle={
          <p>
            Overview of users
          </p>
        }
      >
        <ProjectTables />
      </ComponentCard>
      

      {/*--------------------------------------------------------------------------------*/}
      {/* Default Table                                                                  */}
      {/*--------------------------------------------------------------------------------*/}

         </>
  );
};

export default BasicTable;
