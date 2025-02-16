import React, { useState } from "react";
import { 
    Container, 
    Typography, 
    Grid, 
    Button, 
    Tabs, 
    Tab, 
    Paper,
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { styled } from '@mui/material/styles';

// Demo data
const demoNews = [
    {
        _id: "1",
        title: "New Semester Books Available",
        description: "All textbooks for the upcoming semester are now available at our store. Special discounts for early birds!",
        category: "Admissions",
        createdAt: "2024-03-15",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        _id: "2",
        title: "Final Exam Schedule Released",
        description: "The examination department has released the schedule for final exams. Check out the detailed timetable.",
        category: "Exams & Results",
        createdAt: "2024-03-14",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        _id: "3",
        title: "Annual Book Fair 2024",
        description: "Join us for the biggest book fair of the year. Meet authors, attend workshops, and get amazing deals on books.",
        category: "Conferences & Events",
        createdAt: "2024-03-13",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
        _id: "4",
        title: "Review: Latest Science Fiction Releases",
        description: "Our experts review the most anticipated science fiction books of 2024. Find out which ones are worth reading.",
        category: "Book Reviews",
        createdAt: "2024-03-12",
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
];

const categories = [
    "Admissions", 
    "Exams & Results", 
    "Conferences & Events", 
    "Book Reviews"
];

const NewsCard = styled('div')({
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  overflow: 'hidden',
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
});

const NewsImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const News = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const renderNewsCard = (newsItem) => {
        const sanitizedDescription = DOMPurify.sanitize(newsItem.description);

        return (
            <Grid item xs={12} key={newsItem._id}>
                <NewsCard>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box sx={{ width: { xs: '100%', md: '33%' } }}>
                            <NewsImage src={newsItem.image} alt={newsItem.title} />
                        </Box>
                        <Box sx={{ width: { xs: '100%', md: '67%' }, p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {newsItem.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Published on: {dayjs(newsItem.createdAt).format("MMMM D, YYYY")}
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ mb: 2 }}
                                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                            />
                            <Button
                                component={Link}
                                to={`/news/${newsItem._id}`}
                                variant="contained"
                                sx={{ 
                                    bgcolor: '#004225',
                                    '&:hover': { bgcolor: '#006001' }
                                }}
                            >
                                Read More
                            </Button>
                        </Box>
                    </Box>
                </NewsCard>
            </Grid>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                className="text-center font-bold mb-8"
            >
                News & Updates
            </Typography>

            <Paper elevation={0} sx={{ bgcolor: 'transparent', mb: 3 }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                        borderBottom: 1,
                        borderBottom: '2px solid #004225',
                        borderColor: 'divider',
                        mb: 3,
                        '& .MuiTab-root': {
                            color: '#004225',
                            '&.Mui-selected': {
                                color: '#004225',
                                fontWeight: 'bold',
                            }
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#004225',
                        }
                    }}
                >
                    {categories.map((category, index) => (
                        <Tab 
                            key={category} 
                            label={category} 
                            sx={{ textTransform: 'none', borderColor: activeTab === index ? '#004225' : 'none' }} 
                        />
                    ))}

                    {console.log(activeTab)}
                </Tabs>
            </Paper>

            <Grid container spacing={4}>
                {categories.map((category, index) => (
                    activeTab === index && (
                        <Grid item xs={12} key={category}>
                            <Typography 
                                variant="h5" 
                                className="font-bold mb-4"
                            >
                                {category}
                            </Typography>
                            <Grid container spacing={3}>
                                {demoNews
                                    .filter((news) => news.category === category)
                                    .map((newsItem) => renderNewsCard(newsItem))}
                            </Grid>
                        </Grid>
                    )
                ))}
            </Grid>
        </Container>
    );
};

export default News; 