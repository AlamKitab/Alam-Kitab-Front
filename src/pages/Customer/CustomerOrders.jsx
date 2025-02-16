import React, { useEffect, useState } from 'react';
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
  useMediaQuery,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useTheme } from '@mui/material/styles';
import { demoOrders, demoUser } from '../../data/ordersDemoData';

const CustomerOrders = () => {
  const [open, setOpen] = useState(null);
  const [selectedOption, setSelectedOption] = useState('newest');
  const [sortedProductData, setSortedProductData] = useState([]);
  const [allPoints, setAllPoints] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const totalPoints = demoOrders.reduce(
      (acc, order) => acc + (order?.loyaltyPoints || 0),
      0
    );
    setAllPoints(totalPoints);
  }, []);

  useEffect(() => {
    const sortedData = [...demoOrders].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return selectedOption === 'newest' ? dateB - dateA : dateA - dateB;
    });
    setSortedProductData(sortedData);
  }, [selectedOption]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMenuItemClick = (value) => {
    setSelectedOption(value);
    handleClose();
  };

  const handleDownloadPDF = (order) => {
    const doc = new jsPDF();
    
    // Add company logo background
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 0, 210, 45, 'F');
    
    // Add accent line
    doc.setDrawColor(0, 96, 1);
    doc.setLineWidth(0.5);
    doc.line(0, 45, 210, 45);
    
    // Add heading with styling
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(32);
    doc.setTextColor(0, 96, 1);
    doc.text('ALAMKITAB', 105, 25, { align: 'center' });
    
    // Add subtitle
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text('ORDER INVOICE', 105, 38, { align: 'center' });

    // Add decorative elements
    doc.setDrawColor(0, 96, 1);
    doc.setLineWidth(0.5);
    doc.line(85, 40, 125, 40);

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Add order status badge with improved design
    const statusColor = {
      'Delivered': [39, 174, 96],
      'Processing': [241, 196, 15],
      'Shipped': [52, 152, 219]
    };
    
    // Create status badge box
    doc.setFillColor(...(statusColor[order.orderStatus] || [149, 165, 166]));
    doc.roundedRect(15, 55, 45, 18, 4, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.text(order.orderStatus, 37.5, 66, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    // Create boxes for order and customer details
    doc.setDrawColor(230, 230, 230);
    doc.setFillColor(230, 230, 230);
    doc.setTextColor(0, 0, 0);
    
    // Left box - Order Details
    doc.roundedRect(15, 85, 85, 45, 2, 2, 'FD');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('ORDER DETAILS', 25, 98);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Order ID: #${order.orderNumber}`, 25, 108);
    doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, 25, 115);
    doc.text(`Payment Method: Cash on Delivery`, 25, 122);
    
    // Right box - Customer Details
    doc.roundedRect(110, 85, 85, 45, 2, 2, 'F');
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('CUSTOMER DETAILS', 120, 98);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Name: ${demoUser.name}`, 120, 108);
    doc.text(`Email: ${demoUser.email}`, 120, 115);
    doc.text(`Phone: ${demoUser.shippingData.phoneNo}`, 120, 122);
    doc.text(`Address: ${demoUser.shippingData.address}`, 120, 129);

    // Reset colors for next elements
    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(230, 230, 230);

    // Add table with improved styling
    autoTable(doc, {
      startY: 145,
      head: [['Book', 'Quantity', 'Price (Rs.)', 'Total (Rs.)']],
      body: order.orderedProducts.map(item => [
        item.productName,
        item.quantity,
        item.price.cost.toLocaleString('en-IN'),
        (item.quantity * item.price.cost).toLocaleString('en-IN'),
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 6,
      },
      headStyles: {
        fillColor: [0, 96, 1],
        fontSize: 10,
        halign: 'center',
        fontStyle: 'bold',
        textColor: [255, 255, 255],
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 30, halign: 'center' },
        2: { cellWidth: 35, halign: 'right' },
        3: { cellWidth: 35, halign: 'right' },
      },
      alternateRowStyles: {
        fillColor: [252, 252, 252],
      },
      margin: { left: 15, right: 15 },
    });

    const totalPriceWithoutShipping = order.orderedProducts.reduce(
      (acc, item) => acc + item.quantity * item.price.cost,
      0
    );
    const shippingFee = 100;
    const totalPriceWithShipping = totalPriceWithoutShipping + shippingFee;

    const yPosition = doc.lastAutoTable.finalY + 15;

    // Add loyalty points box with improved design
    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(230, 230, 230);
    doc.roundedRect(15, yPosition, 85, 30, 2, 2, 'FD');
    
    // Add star icon
    doc.setFillColor(0, 96, 1);
    doc.circle(25, yPosition + 15, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('★', 25, yPosition + 17, { align: 'center' });
    
    // Add loyalty points text
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'bold');
    doc.text(`Loyalty Points Earned:`, 35, yPosition + 12);
    doc.setFontSize(14);
    doc.text(`${order.loyaltyPoints}`, 35, yPosition + 22);

    // Add price summary box with improved design
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(110, yPosition, 85, 60, 2, 2, 'FD');
    
    // Price summary content
    doc.setFontSize(9);
    doc.setFont('Helvetica', 'normal');
    doc.text('Subtotal:', 120, yPosition + 15);
    doc.text('Shipping Fee:', 120, yPosition + 30);
    doc.setLineWidth(0.1);
    doc.line(120, yPosition + 40, 185, yPosition + 40);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Total Amount:', 120, yPosition + 52);
    
    // Align prices to right with Rs. symbol
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Rs. ${totalPriceWithoutShipping.toLocaleString('en-IN')}`, 185, yPosition + 15, { align: 'right' });
    doc.text(`Rs. ${shippingFee.toLocaleString('en-IN')}`, 185, yPosition + 30, { align: 'right' });
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Rs. ${totalPriceWithShipping.toLocaleString('en-IN')}`, 185, yPosition + 52, { align: 'right' });

    // Add footer with improved design
    const footerY = yPosition + 80;
    doc.setFillColor(245, 245, 245);
    doc.rect(0, footerY, 210, 45, 'F');
    
    // Footer content
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for shopping with Alamkitab!', 105, footerY + 15, { align: 'center' });
    doc.setFontSize(8);
    doc.text('For any queries, please contact:', 105, footerY + 25, { align: 'center' });
    doc.text('Email: contactus@alamkitab.com | WhatsApp: +92 332 2440544', 105, footerY + 35, { align: 'center' });

    // Save the PDF
    doc.save(`Alamkitab-Order-${order.orderNumber}.pdf`);
  };

  const MobileOrderCard = ({ order }) => (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Order #{order.orderNumber}</Typography>
        <Typography color="textSecondary" gutterBottom>Status: {order.orderStatus}</Typography>
        
        {order.orderedProducts.map(product => (
          <Typography key={product._id} sx={{ mb: 1 }}>
            {product.productName} (Qty: {product.quantity}) - ₹{product.price.cost}
          </Typography>
        ))}
        
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Typography 
            sx={{
              bgcolor: '#006001',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 5,
              display: 'inline-block'
            }}
          >
            {order.loyaltyPoints} points
          </Typography>
          <Button 
            variant="contained" 
            size="small"
            onClick={() => handleDownloadPDF(order)}
          >
            Download Invoice
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Container sx={{ padding: { xs: 2, md: 4 } }}>
      <Typography 
        sx={{ 
          fontSize: { xs: 28, md: 40 }, 
          textAlign: 'center', 
          mb: 4 
        }}
      >
        My Orders
      </Typography>
      
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 4 }}
        flexWrap="wrap"
        gap={1}
      >
        <Typography sx={{ mr: { xs: 0, md: 3 } }}>
          Total Loyalty Points: {allPoints}
        </Typography>
        <Button color="inherit" onClick={handleOpen}>
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

      {sortedProductData && sortedProductData.length > 0 ? (
        isMobile ? (
          <Grid container spacing={2}>
            {sortedProductData.map((order) => (
              <Grid item xs={12} key={order._id}>
                <MobileOrderCard order={order} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto', mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Loyalty Points</TableCell>
                  <TableCell>Download Invoice</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedProductData.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>
                      {order.orderedProducts.map(product => (
                        <div key={product._id}>
                          {product.productName} (Qty: {product.quantity})
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {order.orderedProducts.map(product => (
                        <div key={product._id}>₹{product.price?.cost}</div>
                      ))}
                    </TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>
                      <div style={{
                        backgroundColor: "#006001",
                        color: "white",
                        width: "fit-content",
                        padding: "2px 10px",
                        borderRadius: 20,
                      }}>
                        {order?.loyaltyPoints}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        onClick={() => handleDownloadPDF(order)}
                      >
                        Download Invoice
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      ) : (
        <Typography>No Orders Till Now</Typography>
      )}
    </Container>
  );
};

export default CustomerOrders; 