import React from 'react';
import { Tooltip, IconButton } from '@mui/material';

export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
    <Tooltip title={tip} className={tipClassName} placement="top">
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
);