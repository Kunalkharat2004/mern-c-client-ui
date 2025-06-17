"use client";

import React from 'react'
import { Button } from '../ui/button';
import { logout } from '@/lib/actions/logout';

const Logout = () => {
  return (
      <Button
          variant="default"
          className="ml-4 cursor-pointer"
          onClick={async()=> await logout()}
      >
      Logout
    </Button>
  );
}

export default Logout