import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Box, Button, Card, CardContent, Container, Grid, IconButton, Menu, Modal, Paper, Stack, Typography } from '@mui/material';
import SwiperCore from 'swiper';
import logo from "../images/echonor_logo_resize_comp.png";
import { ReactNode, useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import homeimage from "../images/introduction/home.png";
import mypageimage from "../images/introduction/mypage.png";
import postimage from "../images/introduction/post.png";
import alertimage from "../images/introduction/alert.png";
import buttonmenuimage from "../images/introduction/buttonmenu.png";
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import PersonIcon from '@mui/icons-material/Person';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import menuimage from "../images/introduction/menu.png";
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router';

// アプリ初回起動時にモーダル表示する画面。
// いくつかのページをスワイプできるようになっている。
const Introduction = () => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const navigate = useNavigate();
    const location = useLocation();

    const swiperRef = useRef<SwiperRef>(null);

    // スライドを次に移動する関数
    const goToNextSlide = () => {
        if (swiperRef) {
        swiperRef.current?.swiper.slideNext();
        }
    };

    // スライドを前に移動する関数
    const goToPrevSlide = () => {
        if (swiperRef) {
        swiperRef.current?.swiper.slidePrev();
        }
    };

    const RemarksText = ({text}: {text: string}) => {
        return (
            <Typography variant="body1" fontSize={10} color={"primary"}>
               {text}
            </Typography>
        );
    }

    // /introductionで表示している場合はホーム画面に遷移する。その他の場合はモーダルを閉じる。
    const handleLinkClick = (url: string) => {
        const currentUrl = location.pathname;

        if (currentUrl === "/introduction") {
            navigate(url);
        } else {
            setIsOpen(false);
        }
    }

    const introductionContents: ReactNode[] = [
    <>
        <Box>
            <img src={logo} alt="logo" width="100%" height="100%"></img>
        </Box>
        <Typography variant='h5'>EchoNorへようこそ</Typography>
        <Typography variant="body1">
            EchoNor（エコノア）は「繋がらないSNS」がコンセプトの、匿名性を重視したSNSです。
        </Typography>

    </>,
    <>
        <Typography variant='h5'>EchoNorの特徴</Typography>
        {/* <Box textAlign={"center"} sx={{m: 2}}>
            <Grid container>
                <Grid item xs={4}>
                    <PersonIcon fontSize="large"/>
                </Grid>
                <Grid item xs={8}>
                    全員が匿名
                </Grid>
                <Grid item xs={4}>
                    <RemoveModeratorIcon fontSize='large'/>
                </Grid>
                <Grid item xs={8}>
                    追跡不可
                </Grid>
                <Grid item xs={4}>
                    <Diversity3Icon fontSize='large'/>
                </Grid>
                <Grid item xs={8}>
                    平等なタイムライン
                </Grid>
            </Grid>
        </Box> */}
        <Box sx={{m:1}}>
            <Typography component="div" variant="h6">匿名性保証</Typography>
            <Typography>
                {/* EchoNorでは、ユーザーの名前や身元が他のユーザーに知られることはありません。 */}
                あなたの名前や身元は、EchoNorでは完全に秘密です。
            </Typography>
        </Box>
        <Box sx={{m:1}}>
            <Typography component="div" variant="h6">ユーザ間の非接続性</Typography>
            <Typography>ユーザ同士を直接繋げる機能はありません。フォローやダイレクトメッセージは存在しません。</Typography>
        </Box>
        <Box sx={{m:1}}>
            <Typography component="div" variant="h6">プライベートな体験</Typography>
            <Typography>
                EchoNorで行った全ての行動履歴は他のユーザに知られることはありません。
            </Typography>
        </Box>
        <Box sx={{m:1}}>
            <Typography component="div" variant="h6">タイムラインの均等性</Typography>
            <Typography>ユーザーの投稿は全て同じタイムラインに表示されます。特定のユーザのみ目立つようなことはありません。</Typography>
        </Box>

    </>,
    <>
        <Typography variant='h5'>使い方: ホーム画面1</Typography>
        <Box textAlign={"center"}>
            <img src={homeimage} alt="homeimage" width="50%" height="50%"></img>
        </Box>
        <Typography variant="body1">
            ホーム画面では、ユーザーが投稿した内容が表示されます。
            投稿内容をタップすることでリアクションを送ることができます。
            画面右下の<ChatIcon/>ボタンをタップすることで、投稿を行うことができます。
        </Typography>
    </>,
    <>
        <Typography variant='h5'>使い方: ホーム画面2</Typography>
        <Box textAlign={"center"}>
            <img src={buttonmenuimage} alt="homeimage" width="100%" height="100%"></img>
        </Box>
        <Box>
            下部のメニューをタップすることで、画面を移動することができます。
            <Grid container>
                <Grid item xs={2}>
                    <HomeIcon sx={{m: 1}}/>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{m: 1}}>ホーム</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography sx={{m: 1}}>ユーザが投稿した内容が表示されます。</Typography>
                </Grid>

                <Grid item xs={2}>
                    <NotificationsActiveIcon sx={{m: 1}}/>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{m: 1}}>通知</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography sx={{m: 1}}>ユーザにリアクションされた投稿や、通知内容が表示されます。</Typography>
                </Grid>

                <Grid item xs={2}>
                    <SearchIcon sx={{m: 1}}/>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{m: 1}}>検索</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography sx={{m: 1}}>検索ワードから投稿を検索することができます。</Typography>
                </Grid>
                
                <Grid item xs={2}>
                    <BookmarksIcon sx={{m: 1}}/>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{m: 1}}>ブックマーク</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography sx={{m: 1}}>ユーザがブックマークした投稿が表示されます。</Typography>
                </Grid>
            </Grid>
        </Box>
        <RemarksText text="※検索画面は現在工事中です。各コンテンツは変更される可能性があります。"/>
    </>,
    <>
        <Typography variant='h5'>使い方: マイページ</Typography>
        <Box textAlign={"center"}>
            <img src={mypageimage} alt="homeimage" width="50%" height="50%"></img>
        </Box>
        <Typography variant="body1">
            画面上部のMyPageボタンをタップすることで、マイページに移動することができます。
            マイページでは、自分の投稿した内容を確認できます。
            また、ここでもブックマークした投稿を確認できます。
        </Typography>
        <RemarksText text="※マイページは現在工事中です。各コンテンツは変更される可能性があります。"/>
    </>,
    <>
        <Typography variant='h5'>使い方: メニュー</Typography>
        <Box textAlign={"center"}>
            <img src={menuimage} alt="homeimage" width="50%" height="50%"></img>
        </Box>
        <Typography variant="body1">
            画面右上の<MenuIcon/>ボタンをタップすることで、メニューを表示することができます。
            <Box sx={{m: 1}}>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography>ホーム</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>通常のホーム画面です。</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>集会場</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>集会場画面に移動します。</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>利用規約</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>利用規約を表示します。</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>サポート</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>サポート画面に移動します。</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>ログアウト</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>ログアウトします。</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Typography>
    </>,
    <>
        <Typography variant='h5'>集会場（工事中）</Typography>
        <Typography variant="body1">
            集会場では１つのトピックについてユーザーが自由に意見を投稿することができます。
            また、他のユーザーの意見に対してリアクションを送ることもできます。
            トピックの作成は、ユーザーが自由に行うことができます。
            作成されたトピックはしばらく更新がない場合、自動的に削除されます。
        </Typography>
        <RemarksText text="※集会場は現在工事中です。各コンテンツは変更される可能性があります。"/>
    </>,
    <>
        <Typography variant='h5'>免責事項</Typography>
        <Typography variant="body1" sx={{m: 1}}>
            EchoNorは、ユーザーが投稿した内容について一切の責任を負いません。
            また、ユーザーが投稿した内容によって生じた損害についても一切の責任を負いません。
            ご利用の際は、自己責任にてご利用ください。
        </Typography>
        <Typography variant="body1" sx={{m: 1}}>
            EchoNorは開発中のため、予告なく仕様が変更される可能性があります。
            作業やメンテナンスによる不定期なデータのリセット、サーバーのダウンなどが発生する可能性があります。
            ご利用の際は、予めご了承ください。
        </Typography>
    </>,
    <>
        <Container>
            <Typography variant='h5'>始めましょう</Typography>
            <Typography variant="body1">基本的な使い方は以上です。よきEchoNorライフを!</Typography>
            <Button variant={"contained"} onClick={() => handleLinkClick("/")}>ホーム画面へ</Button>
        </Container>
    </>,
    ]
    

    return (
        <>
            {/* <Button onClick={() => setIsOpen(true)}>モーダルを開く</Button> */}
            <Modal open={isOpen} sx={{m: 2}}>
                <Paper sx={{backgroundColor: "#ADD8E6", p: 2}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box sx={{p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", maxHeight: "100%"}}>
                                <Swiper
                                spaceBetween={50}
                                slidesPerView={1}
                                ref={swiperRef}
                                >
                                    {introductionContents.map((content) => (
                                        <SwiperSlide>
                                            <Card sx={{height: "550px"}}>
                                                <CardContent>
                                                    {content}
                                                </CardContent>
                                            </Card>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', px: 2 }}>
                                <IconButton onClick={goToPrevSlide}>
                                    <ArrowBackIosNewIcon />
                                </IconButton>
                                <IconButton onClick={goToNextSlide}>
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={() => {handleLinkClick("/")}}>閉じる</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </>
      );
}

export default Introduction;
