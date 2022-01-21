import React from 'react'
import { useState } from "react";
import styled from 'styled-components'
import Uploader from './../components/Uploader'

const Container = styled.div`
    width: 80%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    margin: 0 auto;
`

const UploadContainer = () => {
    const [imgPath, setImgPath] = useState("");

    return (
        <Container>
            <Uploader
                changeImgPathCallback={imgPath => setImgPath}
            />
        </Container>
    )
}

export default UploadContainer;