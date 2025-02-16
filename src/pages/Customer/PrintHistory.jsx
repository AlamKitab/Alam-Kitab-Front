import React, { useState } from 'react';
import {
    Container,
    Typography,
    Stack,
    Button,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';

// Demo data
const demoOrders = [
    {
        _id: "1",
        pdfNumber: "PDF001",
        paperQuality: "Premium",
        totalCost: "150",
        numPages: "25",
        side: "Double",
        createdAt: "2024-03-15",
        uploadedFile: "sample1.pdf"
    },
    {
        _id: "2",
        pdfNumber: "PDF002",
        paperQuality: "Standard",
        totalCost: "80",
        numPages: "15",
        side: "Single",
        createdAt: "2024-03-14",
        uploadedFile: "sample2.pdf"
    },
    {
        _id: "3",
        pdfNumber: "PDF003",
        paperQuality: "Premium",
        totalCost: "200",
        numPages: "40",
        side: "Double",
        createdAt: "2024-03-13",
        uploadedFile: "sample3.pdf"
    },
];

const PrintHistory = () => {
    const [open, setOpen] = useState(null);
    const [selectedOption, setSelectedOption] = useState('newest');
    const [sortedOrders, setSortedOrders] = useState(demoOrders);

    const handleOpen = (event) => setOpen(event.currentTarget);
    const handleClose = () => setOpen(null);
    
    const handleMenuItemClick = (value) => {
        setSelectedOption(value);
        const sorted = [...demoOrders].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return value === 'newest' ? dateB - dateA : dateA - dateB;
        });
        setSortedOrders(sorted);
        handleClose();
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography 
                variant="h3" 
                sx={{ 
                    textAlign: 'center', 
                    mb: 4,
                    color: '#004225',
                    fontWeight: 'bold'
                }}
            >
                My Print Documents
            </Typography>

            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="flex-end" 
                sx={{ mb: 4 }}
            >
                <Button 
                    onClick={handleOpen}
                    sx={{ 
                        color: '#004225',
                        '&:hover': { bgcolor: 'rgba(0, 66, 37, 0.08)' }
                    }}
                >
                    Sort By: {selectedOption === 'newest' ? 'Newest' : 'Oldest'}
                </Button>
                <Menu
                    anchorEl={open}
                    open={!!open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={() => handleMenuItemClick('newest')}>Newest</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('oldest')}>Oldest</MenuItem>
                </Menu>
            </Stack>

            <TableContainer 
                component={Paper} 
                sx={{ 
                    maxWidth: '100%', 
                    overflowX: 'auto', 
                    mb: 4,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#004225' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Document ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Paper Type</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price (with Delivery)</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>No. Pages</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Single/Double Side</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Your Document</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedOrders.map((order) => (
                            <TableRow 
                                key={order._id}
                                sx={{ '&:hover': { bgcolor: 'rgba(0, 66, 37, 0.04)' } }}
                            >
                                <TableCell>{order.pdfNumber}</TableCell>
                                <TableCell>{order.paperQuality}</TableCell>
                                <TableCell>Rs. {order.totalCost}</TableCell>
                                <TableCell>{order.numPages}</TableCell>
                                <TableCell>{order.side}</TableCell>
                                <TableCell>{formatDate(order.createdAt)}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained"
                                        sx={{ 
                                            bgcolor: '#004225',
                                            '&:hover': { bgcolor: '#006001' }
                                        }}
                                    >
                                        <Link
                                            to={`#`}
                                            target="_blank"
                                            style={{ 
                                                textDecoration: 'none', 
                                                color: 'white' 
                                            }}
                                        >
                                            View Document
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default PrintHistory; 