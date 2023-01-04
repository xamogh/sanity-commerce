import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Typography,
} from "@mui/material";
import * as React from "react";

interface Props {
    imageUrl: string;
    title: string;
    caption: string;
    price?: number;
    onLearnMoreClick: () => void;
    onPurchaseClick: () => void;
}

export default function ProductCard(props: Props) {
    const {
        imageUrl,
        title,
        caption,
        price,
        onLearnMoreClick,
        onPurchaseClick,
    } = props;
    return (
        <Card>
            <CardMedia sx={{ height: 140 }} image={imageUrl} title={title} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {caption}
                </Typography>
                {price && (
                    <Chip
                        label={`${price} USD`}
                        color="success"
                        variant="filled"
                        sx={{ mt: "16px", fontFamily: "Poppins" }}
                    />
                )}
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onLearnMoreClick}>
                    Learn More
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={onPurchaseClick}
                >
                    Purchase
                </Button>
            </CardActions>
        </Card>
    );
}
