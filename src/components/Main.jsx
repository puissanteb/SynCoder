import React, { useState } from 'react'
import Uploader from './Uploader'
import { v4 } from 'uuid'

export default function Main() {
    return (
        <>
            <p>파일 업로더 테스트</p>
            <Uploader type="test" id={v4()} />
        </>
    )
}
