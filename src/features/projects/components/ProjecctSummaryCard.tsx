import { Card, CardContent, Stack, Typography } from "@mui/material";

interface ProjectSummaryCardProps {
    title: string;
    value: number;
    description: string;
}

export default function ProjectSummaryCard({title, value, description}: ProjectSummaryCardProps){
return(
    <Card>
        <CardContent>
            <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>

                <Typography variant="h4">
                    {value}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    {description}
                </Typography>
            </Stack>
        </CardContent>
    </Card>
)
}