import { React, useEffect, useState } from 'react'
import { Box, Text, Avatar, Button, Grid} from '@mantine/core'; //Mantine UI

import '../css/knowledgebase.css';

function Interest(props) {

    useEffect(() => {});

    return(
        <div className="interestForm" >
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfdfBLR8DRQQS5bzn-trJ0snYOqPMjMNWuUMnrzKF6rYTnYFQ/viewform?embedded=true" width="640" height="1175" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div>
    );
}

export default Interest;