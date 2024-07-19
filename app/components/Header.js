"use client"
import Link from 'next/link';
import React from 'react';
import { Menu, MenuItem } from 'semantic-ui-react';

const Header = ()  =>{
  return (
    <Menu style={{ marginTop: '30px', marginBottom: '50px' }}>
      <Link href="/">
        <MenuItem>CrowdCoin</MenuItem>
      </Link>

      <Menu.Menu position='right'>
        <Link href="/">
          <MenuItem>Campaigns</MenuItem>
        </Link>
        
        <Link href="/campaign/new">
          <MenuItem>+</MenuItem>
        </Link>
      </Menu.Menu>
    </Menu>
    )
}

export default Header;