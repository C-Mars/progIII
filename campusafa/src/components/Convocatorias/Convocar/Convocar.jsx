import React from "react";
import { useNavigate } from 'react-router-dom';
import {

    Box,
    Card,
    Dialog,
    DiDialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CardContent,
    CardHeader,
    Container,
    Table,
    TableHead, Avatar,
    TableCell,
    TableContainer,
    Button,
    TableRow,
    ButtonBase,
    TableBody,
    TextField,
    Grid,
    Typography,
    FormControl, MenuItem, InputLabel, Select, NativeSelect

} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';

import Tooltip from '@mui/material/Tooltip';

import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

export function Convocar() {

    return (
        <>
            <Tooltip disableFocusListener title="Convocar">
                <IconButton aria-label="convocar" 
                // onClick={() => convocar(item.idConvocatoria)}
                >
                    <SportsSoccerRoundedIcon fontSize="large" color="success" />
                </IconButton>
            </Tooltip>
        </>
    )
}