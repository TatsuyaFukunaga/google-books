import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import { GoogleBook } from './GoogleBook';

const SearchBar = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(1),
    width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));

// 型定義
interface GoogleBooksResponse {
    items: Array<any>;
}

const fetchGoogleBooks = async (query: string): Promise<GoogleBook[]> => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        if (!response.ok) throw new Error('Failed to fetch books');
        const data: GoogleBooksResponse = await response.json();
        return data.items.map(item => new GoogleBook(
            item.volumeInfo.imageLinks?.thumbnail || '',
            item.volumeInfo.title || '',
            item.volumeInfo.authors || [],
            item.volumeInfo.publisher || '',
            item.volumeInfo.publishedDate || '',
            item.volumeInfo.description || ''
        ));
    } catch (error) {
        console.error(error);
        return [];
    }
};

const Header: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [googleBooks, setGoogleBooks] = useState<GoogleBook[]>([]);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        const books = await fetchGoogleBooks(searchTerm);
        setGoogleBooks(books);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, textAlign: 'center' }}
                    >
                        Google Books Search
                    </Typography>
                    <SearchBar>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </SearchBar>
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    {googleBooks.map((book, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                            {book.getCard(index)}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Header;
