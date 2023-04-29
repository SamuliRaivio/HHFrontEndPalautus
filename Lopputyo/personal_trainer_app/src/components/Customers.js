import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import AddCustomer from './AddCustomer';




//Customer function return table of customer data (table made with MaterialReactTable)
export default function Customers() {

    //first the function creates customer list to store data from api 
    const [customers, setCustomers] = useState([])

    //useEffect calls fetchCustomerData function that sets the data from API to customer state
    useEffect(() => fetchCustomersData(), [])

    const fetchCustomersData = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(res => res.json())
        .then(resData => setCustomers(resData.content))
    }

    //colums define how data is displayed in table 
    //accessorKey connect column to data (what is rendered in that row from data)
    const columns = [
        {accessorKey: 'firstname', header: 'First Name'},
        {accessorKey: 'lastname', header: 'Last Name'}
    ]

    //table uses columns and defines data to columns with customer data 
    //renderTopToolbarCustomActions makes custom action on toolbar, which is rendering AddCustomer component to the toolbar
    return(
        <MaterialReactTable
            columns={columns}
            data={customers}
            renderTopToolbarCustomActions={() =>(<AddCustomer fetchCustomersData={fetchCustomersData}/>)}
        />
    )
}