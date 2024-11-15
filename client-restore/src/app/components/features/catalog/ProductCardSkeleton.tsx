import {
    Box,
    Card,
    CardContent,
    Grid,
    Skeleton
} from "@mui/material";

export default function ProductCardSkeleton() {
    return (
        <Grid item xs>
            <Card sx={{ borderRadius: "20px", width: 320, maxWidth: "100%", boxShadow: 3 }}>
                <Skeleton
                    sx={{
                        height: 200,
                        borderRadius: "inherit",
                    }}
                    animation="wave"
                    variant="rectangular"
                />
                <CardContent>
                    <Skeleton animation="wave" height={20} width="60%" style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={20} width="80%" />
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                        <Skeleton animation="wave" height={20} width="40%" />
                        <Skeleton animation="wave" height={10} width="20%" style={{ marginLeft: 10 }} />
                    </Box>
                    <Skeleton animation="wave" height={10} width="80%" style={{ marginTop: 10 }} />
                </CardContent>
                 <Box>
                    <Skeleton
                        animation="wave"
                        height={40}
                        width="100%"
                        variant="rectangular"
                        sx={{
                        borderRadius: "0 0 20px 20px", // Match rounded corners
                        }}
                    />
                </Box>
            </Card>
        </Grid>
    )
}