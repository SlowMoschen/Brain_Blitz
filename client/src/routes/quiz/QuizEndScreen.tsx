import CancelIcon from '@mui/icons-material/Cancel';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Stack, Typography } from "@mui/material";
import { GAME } from "../../configs/Application";
import { URLS } from "../../configs/Links";
import RouterButton from "../../shared/components/buttons/RouterButton";
import { useTimeParser } from "../../shared/hooks/timer/useTimeParser.hook";
import ScoreTable from "./components/ScoreTable";
import { BREAKPOINTS } from '../../configs/Breakpoints';

interface QuizEndScreenProps {
    answersCount: {
        correct: number;
        incorrect: number;
    };
    time: number;
    isSuccess: boolean;
}

export default function QuizEndScreen({ answersCount, time, isSuccess }: QuizEndScreenProps) {
    const { parseMinuteString } = useTimeParser();
    const timeUsed = parseMinuteString(GAME.TIME_PER_QUIZ - time);

    const correctPoints = answersCount.correct * GAME.CORRECT_ANSWER_POINTS;
    const incorrectPoints = answersCount.incorrect * GAME.WRONG_ANSWER_POINTS;
    const timeBonus = (time / 1000) * GAME.POINTS_PER_SECOND;

    return (
        <>
            <Stack height={'90vh'} width={'100%'} maxWidth={BREAKPOINTS.md} justifyContent={'center'} p={2}>
                <Stack alignItems={'center'}>
                    {isSuccess ? <VerifiedIcon sx={{ color: 'accent.main', fontSize: 40 }} /> : <CancelIcon sx={{ color: 'primary.main', fontSize: 40 }} />}
                    <Typography variant="h4">
                        {isSuccess ? "Abgeschlossen" : "Nicht geschafft"}
                    </Typography>
                    <Typography variant="subtitle1">
                        Zeit: {timeUsed}
                    </Typography>
                </Stack>
                <ScoreTable correctPoints={correctPoints} incorrectPoints={incorrectPoints} timeBonus={timeBonus} />
                <RouterButton to={URLS.DASHBOARD} variant="contained" color="primary" text="Zurück zum Dasboard" />
            </Stack>
        </>
    )
}