import React from 'react'

function Header() {
    return (
        <header style = {headerStyle}>
            <h1> Login </h1>
        </header>
    )
}

const headerStyle = {
    background: 'blue',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}


export default Header;