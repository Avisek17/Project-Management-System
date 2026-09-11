import { Card, CardContent, Typography } from "@mui/material";

interface StatCardProps{
    title: string;
    value: number;
    description: string;
}

export default function StatCard({title, value, description}: StatCardProps){
    return(
        <Card>
            <CardContent>
                <Typography 
                variant="body2"
                color="text.secondary"
                >
                    {title}
                </Typography>

                <Typography
                variant="h4"
                sx={{my:1}}
                >
                    {value}
                </Typography>

                <Typography
                variant="body2"
                color="text.secondary"
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}