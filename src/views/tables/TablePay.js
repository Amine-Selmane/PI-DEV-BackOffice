import React from 'react';

import ComponentCard from '../../components/ComponentCard';
import PaymentTables from '../../components/dashboard/extraDashboard/PaymentTables';

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
        <PaymentTables />
      </ComponentCard>
      

      {/*--------------------------------------------------------------------------------*/}
      {/* Default Table                                                                  */}
      {/*--------------------------------------------------------------------------------*/}

         </>
  );
};

export default BasicTable;
