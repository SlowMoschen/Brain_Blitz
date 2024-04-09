import timerBeep from '../../../public/sounds/timerBeep.wav'
import startBeep from '../../../public/sounds/startBeep.wav'
import correct from '../../../public/sounds/correct.mp3'
import wrong from '../../../public/sounds/wrong.mp3'
type Sound = 'timerBeep' | 'startBeep' | 'correct' | 'wrong';

export function useGameSounds() {
    
    const play = (sound: string) => {
        const audio = new Audio(sound);
        audio.play();
    };

    const playSound = (sound: Sound) => {
        switch (sound) {
            case 'timerBeep':
                play(timerBeep);
                break;
            case 'startBeep':
                play(startBeep);
                break;
            case 'correct':
                play(correct);
                break;
            case 'wrong':
                play(wrong);
                break;
            default:
                break;
        }
    }

    return { playSound };
}