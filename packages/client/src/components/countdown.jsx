import Countdown from 'react-countdown';

export function CountdownTimer({ startTime, endTime, status }) {
    const renderer = ({ hours, minutes, seconds }) => {
        return (
            <span className="text-2xl">
                {hours}:{minutes}:{seconds}
            </span>
        );
    };
    const date = () => {
        switch (status) {
            case 'CREATED':
                return startTime;
            case 'STARTED':
                return endTime;
            default:
                return 0;
        }
    };
    const title = () => {
        switch (status) {
            case 'CREATED':
                return 'Until Start';
            case 'STARTED':
                return 'Until End';
            default:
                return 'Auction Finished';
        }
    };
    return (
        <div>
            <h2>{title()}</h2>
            <Countdown
                key={date().toString()}
                date={date()}
                intervalDelay={0}
                precision={3}
                renderer={renderer}
            />
        </div>
    );
}
