import React from "react";
import { ClientListItem } from "../ClientListItem";

interface Props {
    clients: ClientInformation[]
}

export const ClientList: React.FC<Props> = ( { clients } ) => {
    return (
        <ul> { 
              clients.map(client => (
                <ClientListItem  key={client.name} clients={client} />
              ))
        } </ul>
    );
}