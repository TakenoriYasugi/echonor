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
const Introduction = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {

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

    const handleClick = () => {
        if (swiperRef) {
            swiperRef.current?.swiper.slideTo(0);
        }
        setIsOpen(false);

    }

    const [slideIndex, setSlideIndex] = useState<number>(0);

    const handleSlideChanged = (swiper: SwiperClass) => {
        setSlideIndex(swiper.activeIndex);
    }

    const introductionContents: ReactNode[] = [
    <>
        <Box>
            <img src={logo} alt="logo" width="100%" height="100%"></img>
        </Box>
        <Typography variant='h5'>EchoNorへようこそ</Typography>
        <Typography variant="body1">
        EchoNor（エコノア）は、「繋がらないSNS」というコンセプトの下、匿名性を重視したSNSです。
        </Typography>

    </>,
    <>
        <Typography variant='h5'>EchoNorの特徴</Typography>
        <Box sx={{m:1}}>
            <Typography component="div" variant="h6">匿名性保証</Typography>
            <Typography>
                あなたの名前や身元は、EchoNorでは完全に秘密にされます。
            </Typography>
        </Box>
        <Box sx={{m:1}}>
            <Typography component="div" variant="h6">ユーザ間の非接続性</Typography>
            <Typography>ユーザ同士を直接繋げる機能はなく、フォローやダイレクトメッセージも存在しません。</Typography>
        </Box>
        <Box sx={{m:1}}>
            <Typography component="div" variant="h6">プライベートな体験</Typography>
            <Typography>
            EchoNorでのあなたの全ての行動履歴は、他のユーザーには知られません。
            </Typography>
        </Box>
        <Box sx={{m:1}}>
            <Typography component="div" variant="h6">タイムラインの均等性</Typography>
            <Typography>すべてのユーザーの投稿は同じタイムライン上に表示され、特定のユーザーが目立つことはありません。</Typography>
        </Box>

    </>,
    <>
        <Typography variant='h5'>使い方: ホーム画面 1/2</Typography>
        <Box textAlign={"center"}>
            <img src={homeimage} alt="homeimage" width="50%" height="50%"></img>
        </Box>
        <Typography variant="body1">
            ホーム画面では、ユーザーによる投稿が表示されます。投稿をタップすることでリアクションを送れます。
            また、画面右下の<ChatIcon/>ボタンを押すことで新たに投稿することが可能です。
        </Typography>
    </>,
    <>
        <Typography variant='h5'>使い方: ホーム画面 2/2</Typography>
        <Box textAlign={"center"}>
            <img src={buttonmenuimage} alt="homeimage" width="100%" height="100%"></img>
        </Box>
        <Box>
        下部のメニューから、異なる画面に移動できます。
            <Grid container>
                <Grid item xs={2}>
                    <HomeIcon sx={{m: 1}}/>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{m: 1}}>ホーム</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography sx={{m: 1}}>ユーザーの投稿が表示されます。</Typography>
                </Grid>

                <Grid item xs={2}>
                    <NotificationsActiveIcon sx={{m: 1}}/>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{m: 1}}>通知</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography sx={{m: 1}}>ユーザーからのリアクションや通知が表示されます。</Typography>
                </Grid>

                <Grid item xs={2}>
                    <SearchIcon sx={{m: 1}}/>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{m: 1}}>検索</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography sx={{m: 1}}>キーワードで投稿を検索できます。</Typography>
                </Grid>
                
                <Grid item xs={2}>
                    <BookmarksIcon sx={{m: 1}}/>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{m: 1}}>ブックマーク</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography sx={{m: 1}}>あなたがブックマークした投稿が表示されます。</Typography>
                </Grid>
            </Grid>
        </Box>
        <RemarksText text="※検索画面は現在工事中で、コンテンツが変更される可能性があります。"/>
    </>,
    <>
        <Typography variant='h5'>使い方: マイページ</Typography>
        <Box textAlign={"center"}>
            <img src={mypageimage} alt="homeimage" width="50%" height="50%"></img>
        </Box>
        <Typography variant="body1">
            画面上部のMyPageボタンをタップすることでマイページに移動できます。
            ここでは、自分が投稿した内容やブックマークした投稿を確認できます。
        </Typography>
        <RemarksText text="※マイページは現在工事中で、コンテンツが変更される可能性があります。"/>
    </>,
    <>
        <Typography variant='h5'>使い方: メニュー</Typography>
        <Box textAlign={"center"}>
            <img src={menuimage} alt="homeimage" width="50%" height="50%"></img>
        </Box>
        <Typography variant="body1">
            画面右上の<MenuIcon/>ボタンをタップするとメニューが表示されます。
            <Box sx={{m: 1}}>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography sx={{m: 1}}>ホーム</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography sx={{m: 1}}>通常のホーム画面が表示されます。</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{m: 1}}>集会場</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography sx={{m: 1}}>集会場画面へ移動します。</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{m: 1}}>利用規約</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography sx={{m: 1}}>利用規約が表示されます。</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{m: 1}}>サポート</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography sx={{m: 1}}>サポート画面へ移動します。</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{m: 1}}>ログアウト</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography sx={{m: 1}}>アカウントからログアウトします。</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Typography>
    </>,
    <>
        <Typography variant='h5'>集会場（工事中）</Typography>
        <Typography variant="body1" sx={{m: 1}}>
            集会場では、ユーザーが1つのトピックに関して自由に意見を投稿できます。
            他のユーザーの意見にリアクションを送ることも可能です。
            トピックはユーザーによって自由に作成でき、一定期間更新がない場合は自動で削除されます。
        </Typography>
        <RemarksText text="※集会場は現在工事中で、コンテンツが変更される可能性があります。"/>
    </>,
    <>
        <Typography variant='h5'>免責事項</Typography>
        <Typography variant="body1" sx={{m: 1}}>
            EchoNorは、ユーザーが投稿した内容に関して一切の責任を負いません。
            ユーザーの投稿によって生じた損害に対しても責任は負いません。
            ご利用は自己責任でお願いします。
        </Typography>
        <Typography variant="body1" sx={{m: 1}}>
            EchoNorは開発中で、予告なしに仕様が変更される可能性があります。
            また、メンテナンスや作業によるデータのリセットやサーバーのダウンが発生することがありますので、ご了承ください。
        </Typography>
    </>,
    <>
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h5' sx={{m: 5}}>始めましょう</Typography>
            <Typography>以上が基本的な使い方です。</Typography>
            <Typography sx={{m: 3}}>よきEchoNorライフを !</Typography>
            <Button variant={"contained"} onClick={handleClick} sx={{mt: 5}}>ホーム画面へ</Button>
            <Box sx={{mt: 15}}>
                <RemarksText text="※このガイドはいつでもメニューから「使い方ガイド」を選択して再表示できます。"/>
            </Box>
        </Container>
    </>,
    ]
    

    return (
        <>
            {/* <Button onClick={() => setIsOpen(true)}>モーダルを開く</Button> */}
            <Modal open={isOpen} sx={{m: 2}}>
                <Paper sx={{backgroundColor: "#ADD8E6", p: 2, maxWidth: "500px"}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box sx={{p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", maxHeight: "100%"}}>
                                <Swiper
                                spaceBetween={50}
                                slidesPerView={1}
                                ref={swiperRef}
                                onSlideChange={handleSlideChanged}
                                >
                                    {introductionContents.map((content) => (
                                        <SwiperSlide>
                                            <Card sx={{maxWidth: "400px", height: "550px", overflowY: 'auto'}}>
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
                                <Grid container>
                                    <Grid item xs = {5} textAlign={"left"}>
                                        <IconButton onClick={goToPrevSlide}>
                                            {slideIndex > 0 && <ArrowBackIosNewIcon />}
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs = {2} textAlign={"center"}>
                                        <Typography variant="body1">{slideIndex + 1}/{introductionContents.length}</Typography>
                                    </Grid>
                                    <Grid item xs = {5} textAlign={"right"}>
                                        <IconButton onClick={goToNextSlide}>
                                            {slideIndex < introductionContents.length - 1 && <ArrowForwardIosIcon />}
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleClick}>閉じる</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </>
      );
}

export default Introduction;
