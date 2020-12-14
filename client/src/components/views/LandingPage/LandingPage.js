import React, { useEffect } from 'react';
import axios from 'axios';


function LandingPage() {

    // LandingPage에서 바로 실행
    useEffect(() => {
        axios.get('/api/hello')
            .then(response => { console.log(response) })
    }, [])

    return (
        < div >
            LandingPage
        </div >
    )
}

export default LandingPage