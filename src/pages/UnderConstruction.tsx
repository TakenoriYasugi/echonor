import { Typography } from "@mui/material"
import RemarksCard from "../uiparts/RemarksCard"

const UnderConstruction = () => {
    return (
        <div className="under-construction">
            <RemarksCard>
                <Typography>現在準備中です。</Typography>
                <Typography>実装までしばらくお待ちください。</Typography>
            </RemarksCard>
        </div>
    );
};

export default UnderConstruction;