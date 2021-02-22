import React from "react";

interface Props {
    clients: ClientInformation,
}

export const ClientListItem : React.FC<Props> = ( {clients} ) => {
    return(
        <li key={clients.name}> {clients.name + ' with experience of ' } { + clients.experience + ' is ' } {+ clients.attending ? 'attending event' : 'not attending event'} </li>
    );
}