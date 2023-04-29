import { useEffect, useState } from "react"
import MaterialReactTable from 'material-react-table';
import dayjs from "dayjs";


//Trainings component is pretty much the same as Customers component
//At this stage of this application there is no option to add new training
export default function Trainings() {
    const [trainings, setTrainings] = useState([])
    useEffect(() => fetchTrainingsData(), [])

    const fetchTrainingsData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(res => res.json())
        .then(resData => setTrainings(resData))
    }

    //accessorFn allows custom data to be rendered from data
    //here is is used to parse date from trainings to be more user friendly
    //and compining customers first and last name
    const columns = [
        {accessorKey: 'activity', header: 'Activity'},
        {accessorFn: (row) => `${row.customer.firstname} ${row.customer.lastname}`, id: 'customer', header: 'Customer name'},
        {accessorFn: (row) => dayjs(row.date).format('DD.MM.YYYY'), id: 'date', header: 'Date'}
    ]

    return(
        <MaterialReactTable
            columns={columns}
            data={trainings}
        />
    )
}