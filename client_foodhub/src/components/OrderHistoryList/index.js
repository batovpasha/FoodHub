import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export const OrderHistoryList = ({ ordersHistory }) => {
    const headers =
        ordersHistory && ordersHistory[0] && Object.keys(ordersHistory[0]);

    if (!ordersHistory || !headers) return null;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ordersHistory
                        .sort(
                            (a, b) =>
                                new Date(a.order_date) - new Date(b.order_date)
                        )
                        .map((row, index) => (
                            <TableRow key={index}>
                                {headers.map((header, i) => (
                                    <TableCell key={i + '-' + index}>
                                        {row[header]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
