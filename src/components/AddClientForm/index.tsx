import React, { useState } from "react";

interface Props {
    addClient: AddClient
}

export const AddClientForm: React.FC<Props> = ( { addClient} ) => {
    const [text, setText] = useState('');  
    const [experience, setExperience] = useState('');  
    return (
        <form>

        <input type="text" placeholder="Enter client name" 
            onChange={e => setText( e.target.value )  }
            value={text}
            />

        <input type="text" placeholder="Enter client experience" 
            onChange={e => setExperience(e.target.value) }
            value={experience}
            />

            <button type="submit" onClick={ e => {  e.preventDefault(); addClient(text, experience, false); setText(''); setExperience(''); } } >Add client</button>
        </form>
    );
}