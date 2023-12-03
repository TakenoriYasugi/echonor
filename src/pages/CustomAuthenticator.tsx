import styled from "@emotion/styled";
import { Card, CardContent, useMediaQuery, Typography, Box, Container, Grid, Stack, useTheme, Button } from "@mui/material";
import { Auth } from "aws-amplify";
import { useState, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";
import Introduction from "./Introduction";
import ImageSwiper from "../uiparts/ImageSwiper";
import "../css/custom-authenticator.css";

// カスタム認証コンポーネント
// 未ログイン時に表示されるコンポーネント

const CardContainer = ({children}: {children: ReactNode}) => (
    <Card sx={{m: 3, minWidth: "250px", minHeight: "200px", maxWidth: '400px', maxHeight: "400px"}}>
        <CardContent>
            {children}
        </CardContent>
    </Card>
)


const CustomAuthenticator = ({onSignIn}: {onSignIn: (method: string) => void}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const gridXs = isMobile ? 12 : 3;
    
    const Header = styled(Typography)`
        font-weight: bold; /* 太字 */
        color: #333; /* 文字色をダークグレーに設定 */
        margin-top: 10px; /* 上のマージンを10pxに設定 */
        margin-bottom: 10px; /* 下のマージンを10pxに設定 */
        font-size: 1.2em; /* フォントサイズを1emに設定 */
    `
    const contents = [
        <>
            <Header variant="h6">匿名性保証</Header>
            <Typography>
                あなたの名前や身元は、EchoNorでは完全に秘密にされます。
            </Typography>
        </>,
        <>
            <Header variant="h6">ユーザ間の非接続性</Header>
            <Typography>ユーザ同士を直接繋げる機能はなく、フォローやダイレクトメッセージも存在しません。</Typography>
        </>,
        <>
            <Header variant="h6">プライベートな体験</Header>
            <Typography>
                EchoNorでのあなたの全ての行動履歴は、他のユーザーには知られません。
            </Typography>
        </>,
        <>
            <Header variant="h6">タイムラインの均等性</Header>
            <Typography>すべてのユーザーの投稿は同じタイムライン上に表示され、特定のユーザーが目立つことはありません。</Typography>
        </>
    ]

    const StyledButton = styled(Button)`
        background-color: #121858;
    `;

    return (
        <>  
            <Box className="background">
                <Box className="title-container">
                    <Typography variant="h4" className="subtitle">繋がらないSNS</Typography>
                    <Typography variant="h3" className="main-title">EchoNor</Typography>
                </Box>
            </Box>

            <Stack direction={'column'} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <StyledButton variant={"contained"} sx={{m: 1}} onClick={() => onSignIn('login')}>ログイン / ユーザー登録</StyledButton>
                <StyledButton variant={"contained"} sx={{m: 1}} onClick={() => onSignIn('guest')}>ゲストとして続ける</StyledButton>
                <Typography color={"red"} fontSize={12}>※ゲスト(未登録のユーザー)はタイムラインの閲覧のみ行えます。</Typography>
                <Typography color={"red"} fontSize={12}>投稿やリアクションにはユーザー登録が必要です。</Typography>

            </Stack>

            <Typography variant="body1" sx={{m: 3}} textAlign={'center'} >
                EchoNor（エコノア）は「繋がらないSNS」というコンセプトの下開発中の、匿名性を重視したSNSです。<br/>
                必要以上に繋がることのない、プライベートな体験を提供します。
            </Typography>
            
            <Container sx={{maxWidth: "500px", maxHeight: "auto"}}>
                <ImageSwiper/>
            </Container>

            <Grid container id="grid-contents" sx={{display:'flex', justifyContent: 'center', alignContent: "center"}}>
                {contents.map((content, index) => (
                    <Grid item xs={gridXs} sx={{m: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        <CardContainer key={index}>
                            {content}
                        </CardContainer>
                    </Grid>
                ))}
            </Grid>

            {/* <!-- admax --> */}
                <script src="https://adm.shinobi.jp/s/ea492f162cbda4ac8d8bf88a20cb6eb4"></script>
            {/* <!-- admax --> */}
        </>
    );
}

export default CustomAuthenticator;