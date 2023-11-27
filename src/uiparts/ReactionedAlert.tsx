import { Alert, AlertTitle } from "@mui/material"

const ReactionedAlert = () => {
    return (
        <div style={{ position: "fixed", top: 50, left: 0, right: 0, zIndex: 999 }}>
            <Alert severity="info">
                <AlertTitle>リアクションされました</AlertTitle>
                あなたの投稿にリアクションがありました！
            </Alert>
        </div>
    )
}

export default ReactionedAlert;