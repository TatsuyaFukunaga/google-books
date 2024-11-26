import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

export class GoogleBook {
    private link: string;
    private title: string;
    private authors: string[];
    private publisher: string;
    private publishedDate: string;
    private description: string;

    constructor(link: string, title: string, authors: string[], publisher: string, publishedDate: string, description: string) {
        this.link = link;
        this.title = title;
        this.authors = authors;
        this.publisher = publisher;
        this.publishedDate = publishedDate;
        this.description = description;
    }

    // Descriptionを省略するためのメソッド
    private truncateDescription(description: string, maxLength: number): string {
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    }

    public getCard = (cardKey: number) => {
        const truncatedDescription = this.truncateDescription(this.description, 100); // 最大100文字に制限

        return (
            <Grid key={cardKey} size={1}>
                <Card
                    elevation={10}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: 500, // カード全体の高さを統一
                    }}
                >
                    <CardMedia
                        component="img"
                        image={`${this.link ? this.link : "./null.jpg"}`}
                        alt={`${this.title ? this.title : "No image available"}`}
                        sx={{
                            maxHeight: 200,
                            objectFit: 'contain',
                        }}
                    />
                    <CardContent
                        sx={{
                            flexGrow: 1, // 残りのスペースを埋める
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Typography gutterBottom variant="h5" component="div">
                            {`${this.title ? this.title : ""}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {`著者: ${this.authors ? this.authors.join(', ') : ''}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {`出版社: ${this.publisher ? this.publisher : ''}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {`出版日: ${this.publishedDate ? this.publishedDate : ''}`}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 4, // 最大行数を指定
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {truncatedDescription}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}
