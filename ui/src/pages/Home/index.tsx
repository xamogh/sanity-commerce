import { Box, Container, Grid, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllProducts,
    getAllProductTypes,
    getAllTags,
    Product,
    ProductType,
    Tag,
} from "../../api/product";
import Filter from "../../components/Filter";
import ProductCard from "../../components/ProductCard";

export default function Home() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [products, setProducts] = React.useState<Array<Product>>([]);
    const [productTypes, setProductTypes] = React.useState<Array<ProductType>>(
        []
    );
    const [tags, setTags] = React.useState<Array<Tag>>([]);
    const [activeProductTypeFilter, setActiveProductTypeFilter] =
        React.useState<{ label: string; id: string } | null>(null);
    const [activeTagFilter, setActiveTagFilter] = React.useState<{
        label: string;
        id: string;
    } | null>(null);

    React.useEffect(() => {
        getAllProducts().then((data) => setProducts(data));
        getAllProductTypes().then((data) => setProductTypes(data));
        getAllTags().then((data) => setTags(data));
    }, []);

    const getActiveFilters = () => {
        const activeFilters = [];
        if (activeProductTypeFilter)
            activeFilters.push(activeProductTypeFilter.label);
        if (activeTagFilter) activeFilters.push(activeTagFilter.label);
        return activeFilters;
    };

    const getFilteredProducts = () => {
        let data = [...products];
        if (activeProductTypeFilter)
            data = data.filter(
                (datum) => datum.product_type._id === activeProductTypeFilter.id
            );
        if (activeTagFilter)
            data = data.filter((datum) =>
                datum.tag.some((t) => t._id === activeTagFilter.id)
            );
        return data;
    };

    return (
        <Container>
            <Box>
                <Filter
                    title="Product Type Filters"
                    filters={productTypes.map(({ _id: id, name: label }) => ({
                        id,
                        label,
                    }))}
                    onClick={(v) => {
                        setActiveProductTypeFilter(
                            v.id === activeProductTypeFilter?.id ? null : v
                        );
                    }}
                />

                <Filter
                    title="Tag Filters"
                    filters={tags.map(({ _id: id, name: label }) => ({
                        id,
                        label,
                    }))}
                    onClick={(v) => {
                        setActiveTagFilter(
                            v.id === activeTagFilter?.id ? null : v
                        );
                    }}
                />
            </Box>
            <Box mt="16px">
                {getActiveFilters().length > 0 && (
                    <Typography sx={{ mb: "8px" }} variant="subtitle2">
                        Applied Filters: {getActiveFilters().join(", ")}
                    </Typography>
                )}

                {!getFilteredProducts().length && (
                    <Typography color="GrayText">
                        No Products found with the applied filter
                    </Typography>
                )}
                <Grid container spacing={2} pb={4}>
                    {getFilteredProducts().map(
                        ({ main_image_url, name, caption, price, _id }) => (
                            <Grid item xs={12} sm={6} md={4} key={_id}>
                                <ProductCard
                                    imageUrl={main_image_url}
                                    title={name}
                                    caption={caption}
                                    price={price}
                                    onLearnMoreClick={() => {
                                        navigate(`/product/${_id}`);
                                    }}
                                    onPurchaseClick={() => {
                                        enqueueSnackbar(
                                            "Product purchased!",
                                            {}
                                        );
                                    }}
                                />
                            </Grid>
                        )
                    )}
                </Grid>
            </Box>
        </Container>
    );
}
