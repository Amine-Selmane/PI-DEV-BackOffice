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
        title="Project Listing"
        subtitle={
          <p>
            Overview of the projects
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
