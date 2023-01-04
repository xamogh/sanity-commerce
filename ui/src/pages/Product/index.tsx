import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useParams } from "react-router-dom";
import { getProductById, Product } from "../../api/product";

export default function ProductPage() {
    const { id } = useParams();

    const [product, setProduct] = React.useState<null | Product>(null);

    React.useEffect(() => {
        getProductById(id!).then((data) => setProduct(data));
    }, [id]);

    const { enqueueSnackbar } = useSnackbar();

    if (!product) return null;

    return (
        <Container>
            <img
                src={product.banner_image_url}
                alt="banner"
                style={{ width: "100%", height: "320px", objectFit: "cover" }}
            />
            <Typography variant="h1" fontSize="64px" textAlign="center">
                {product.name}
            </Typography>
            <Grid container sx={{ mt: "16px" }}>
                <Grid item xs={12} sm={8}>
                    <Typography fontWeight={600}>
                        {product.description}
                    </Typography>
                    <Typography mt="8px">{product.caption}</Typography>
                    <Typography mt="16px" fontWeight={500}>
                        Product Type: {product.product_type.name}
                    </Typography>
                    <Typography mt="8px" fontWeight={500}>
                        Product Tags:{" "}
                        {product.tag.map((t) => t.name).join(", ")}
                    </Typography>
                    <Typography mt="8px" fontWeight={500}>
                        Product Price:{" "}
                        {!product.is_immediately_purchasable
                            ? "This product is not purchasable immediately. Please contact xxxxxx."
                            : `${product.price} USD` || "-"}
                    </Typography>
                    <Box display="flex" justifyContent="center" mt="16px">
                        <Button
                            variant="outlined"
                            onClick={() => {
                                enqueueSnackbar("Product purchased");
                            }}
                        >
                            Purchase Now
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <img
                        src={product.main_image_url}
                        alt="main"
                        style={{
                            width: "100%",
                            height: "284px",
                            borderRadius: "8px",
                            objectFit: "cover",
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
