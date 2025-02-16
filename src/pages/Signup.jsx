import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Box, 
  TextField, 
  Checkbox, 
  FormControlLabel, 
  Grid, 
  IconButton,
  InputAdornment,
  Typography,
  Paper,
  CssBaseline
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearError } from '../redux/slices/userSlice'
import { toast } from 'react-toastify'

const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: #004225;
  color: white;
  font-size: 1.125rem;
  font-weight: 500;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 66, 37, 0.9);
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #22C55E;
  margin-left: 0.5rem;
  
  &:hover {
    color: rgba(34, 197, 94, 0.8);
  }
`

const Signup = () => {
  const dispatch = useDispatch()
  const { loading, error, currentUser } = useSelector((state) => state.user)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Password validation
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    try {
      await dispatch(registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'Customer'
      })).unwrap()
      navigate('/') // Redirect on success
    } catch (err) {
      // Remove error logging since it's handled in the slice
      console.error('Registration failed')
    }
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '32rem',
            p: 4
          }}
        >
          <Typography component="h1" variant="h4" sx={{ color: '#1F2937', mb: 2, fontWeight: 500 }}>
            Customer Register
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280', mb: 4 }}>
            Register now to explore and buy products.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="standard"
              sx={{
                mb: 3,
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#004225',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#004225',
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Enter your Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="standard"
              sx={{
                mb: 3,
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#004225',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#004225',
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#004225',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#004225',
                },
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  sx={{
                    color: '#22C55E',
                    '&.Mui-checked': {
                      color: '#22C55E',
                    },
                  }}
                />
              }
              label="Remember me"
              sx={{ mb: 3 }}
            />

            <StyledButton type="submit">
              REGISTER
            </StyledButton>

            <Grid container justifyContent="center" sx={{ mt: 3 }}>
              <Typography variant="body1" sx={{ color: '#1F2937' }}>
                Already have an account?
              </Typography>
              <StyledLink to="/login">
                Log in
              </StyledLink>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Signup 