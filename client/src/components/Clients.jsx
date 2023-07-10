import { gql, useQuery } from "@apollo/client"
import ClientRow from "./ClientsRow.jsx"
import { GET_CLIENTS } from "../queries/clientQueries.js"
import Spinner from "./Spinner.jsx"

export default function Clients() {
    const { loading, error, data } = useQuery(GET_CLIENTS)
    if (loading) return <Spinner />
    if (error) return <p>Error :(</p>

    return (
        <>
            {!loading && !error && (
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.clients.map(client => (
                                <ClientRow key={client.id} client={client} />
                            ))
                        }
                    </tbody>
                </table>
            )}
        </>
    )
}
