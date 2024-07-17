"use client"
import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

const Header = ()  =>{

    return (
        <Menu style={{ marginTop: '20px' }}>
          <a className='item'>CrowdCoin</a>

          <Menu.Menu position='right'>
            <a className='item'>Campaigns</a>
    
            <a className='item'>+</a>
          </Menu.Menu>
        </Menu>
      )
}

export default Header;