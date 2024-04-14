import { Divider, Stack, Typography } from "@mui/material";

interface AnswersScoreTableProps {
    correctPoints: number;
    incorrectPoints: number;
    timeBonus: number;
}   

export default function ScoreTable({ correctPoints, incorrectPoints, timeBonus }: AnswersScoreTableProps) {
    const totalPoints = correctPoints + timeBonus - incorrectPoints;

    const row = (label: string, points: number, minus: boolean) => (
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1">
                {label}
            </Typography>
            <Typography variant="body1" color={minus ? 'primary.main' : 'accent.main'}>
                {points}
            </Typography>
        </Stack>
    );

    const container = {
        bgcolor: 'background.secondary',
        p: 2,
        my: 2,  
        borderRadius: '.375rem',
    }

    return (
        <Stack gap={1} sx={container}>
            {row("Richtige Antworten", correctPoints, false)}
            {row("Falsche Antworten", incorrectPoints, true)}
            {row("Zeitbonus", timeBonus, false)}
            <Divider orientation="horizontal" variant="fullWidth" sx={{ bgcolor: 'text.main'}} />
            {row("Gesamtpunkte", totalPoints, totalPoints < 0)}      
        </Stack>
    )
}