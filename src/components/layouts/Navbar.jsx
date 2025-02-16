import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Avatar,
  Badge,
  Drawer,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { FiMenu, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import { FaWhatsapp, FaBookOpen, FaPrint, FaSignOutAlt, FaStore, FaNewspaper } from 'react-icons/fa';
import { BiBookAdd } from 'react-icons/bi';
import { logout } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';
import { BookOnlineOutlined, Logout, PrintOutlined, Shop2 } from '@mui/icons-material';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Close drawer when user logs in
  useEffect(() => {
    if (currentUser) {
      setIsDrawerOpen(false);
    }
  }, [currentUser]);

  const menuItems = [
    { text: "Bookstore", onClick: () => navigate("/bookstore") },
    { text: "Print Documents", onClick: () => navigate("/print-documents") },
    { text: "Request a Book", onClick: () => navigate("/request-book") },
    { text: "News & Updates", onClick: () => navigate("/news") },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleCloseUserMenu();
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
      handleCloseUserMenu();
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xxl" sx={{ backgroundColor: "#01411c" }}>
        <Toolbar disableGutters>
          {/* Logo */}
          <HomeContainer>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 30,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                cursor: 'pointer'
              }}
              onClick={() => navigate("/")}
            >
              LOGO
            </Typography>
          </HomeContainer>

          {/* Mobile Menu */}
          {isMobile && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                sx={{ mr: 2 }}
              >
                <FiMenu />
              </IconButton>
              <Drawer 
                anchor="left" 
                open={isDrawerOpen} 
                onClose={() => setIsDrawerOpen(false)}
                sx={{
                  '& .MuiDrawer-paper': {
                    width: '250px',
                    backgroundColor: '#004225',
                    color: 'white'
                  }
                }}
              >
                <Box sx={{ p: 2 }}>
                  {menuItems.map((item, index) => (
                    <MenuItem 
                      key={index} 
                      onClick={() => {
                        item.onClick();
                        setIsDrawerOpen(false);
                      }}
                      sx={{
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      {item.text}
                    </MenuItem>
                  ))}
                   
                </Box>
              </Drawer>
            </>
          )}

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center',  // Changed from 'flex-end' to 'center'
              alignItems: 'center'      }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={item.onClick}
                  sx={{
                    color: "white",
                    background: "#006001",
                    borderRadius: "2px",
                    padding: "6px 16px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    margin: "0 10px",
                    "&:hover": { backgroundColor: "#006001", transform: "scale(1.05)" },
                  }}
                >
                  {item.text}
                </Button>
              ))}
              
                    <IconButton
                component="a"
                href="https://wa.me/+1234567890"
                target="_blank"
                sx={{ color: "white" }}
              >
                <FaWhatsapp />
              </IconButton>

                  
            </Box>
          )}

          {/* User Menu */}
          {!currentUser && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => navigate("/login")} sx={{ my: 2, color: 'white', display: 'block' }}>
                Sign in
              </Button>
            </Box>
          )}

          {currentUser?.role === "Customer" && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Tooltip title="Cart">
                <IconButton onClick={() => setIsCartOpen(true)} sx={{ color: 'white' }}>
                  <Badge badgeContent={0} color="error">
                    <FiShoppingCart size={24} />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Account settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ ml: 1 }}>
                  <Avatar sx={{ bgcolor: "#006400" }}>
                    {String(currentUser.name).charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                onClick={handleCloseUserMenu}
                PaperProps={{
                  elevation: 0,
                  sx: styles.styledPaper
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => handleMenuItemClick("/Profile")}>
                  <Avatar />
                  <Link to="/Profile" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/orders")}>
                  <ListItemIcon>
                    <Shop2 fontSize="small" />
                  </ListItemIcon>
                  <Link to="/order">My Orders</Link>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/print-history")}>
                  <ListItemIcon>
                    <PrintOutlined fontSize="small" />
                  </ListItemIcon>
                  <Link to="/print-history">Print Orders</Link>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/request-ur-document-for-printing")}>
                  <ListItemIcon>
                    <PrintOutlined fontSize="small" />
                  </ListItemIcon>
                  <Link to="/request-ur-document-for-printing">Print Your Document</Link>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/request-a-book")}>
                  <ListItemIcon>
                    <BookOnlineOutlined fontSize="small" />
                  </ListItemIcon>
                  <Link to="/request-a-book">Request A Book</Link>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/news")}>
                  <ListItemIcon>
                    <BookOnlineOutlined fontSize="small" />
                  </ListItemIcon>
                  <Link to="/news">News</Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '400px',
          },
        }}
      >
        <Box p={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Shopping Cart</Typography>
            <IconButton onClick={() => setIsCartOpen(false)}>
              <FiX />
            </IconButton>
          </Box>
          
          {/* Empty Cart Message */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: '300px',
              textAlign: 'center'
            }}
          >
            <FiShoppingCart size={50} style={{ color: '#ccc', marginBottom: '1rem' }} />
            <Typography variant="h6" color="textSecondary">
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Add items to your cart to start shopping
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: '#004225',
                '&:hover': { bgcolor: '#006001' }
              }}
              onClick={() => {
                setIsCartOpen(false);
                navigate('/bookstore');
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;

const HomeContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}; 