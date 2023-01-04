import * as React from "react";
import { Box, Chip } from "@mui/material";

interface Props<T> {
    filters: Array<T>;
    onClick: (f: T) => void;
    title: string;
}

export default function Filter<T extends { label: string; id: string }>(
    props: Props<T>
) {
    const [active, setActive] = React.useState<string | null>("all");

    const { filters, onClick, title } = props;

    return (
        <Box>
            {filters.length > 0 && (
                <Box component="span" mr="8px">
                    {title}:
                </Box>
            )}
            {filters.map((f) => (
                <Chip
                    key={f.id}
                    variant={active === f.id ? "filled" : "outlined"}
                    label={f.label}
                    color={active === f.id ? "primary" : "default"}
                    sx={{ mx: "4px", my: "8px", fontFamily: "Poppins" }}
                    onClick={() => {
                        onClick(f);
                        setActive(active === f.id ? null : f.id);
                    }}
                />
            ))}
        </Box>
    );
}
