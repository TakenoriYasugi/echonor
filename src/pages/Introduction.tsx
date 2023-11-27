import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Box, Button, Card, CardContent, Grid, IconButton, Modal, Paper, Typography } from '@mui/material';
import SwiperCore from 'swiper';
import logo from "../images/echonor_logo_resize_comp.png";
import { ReactNode, useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// アプリ初回起動時にモーダル表示する画面。
// いくつかのページをスワイプできるようになっている。
const Introduction = () => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

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

    const intoroductionContents: ReactNode[] = [<>
        <Box>
            <img src={logo} alt="logo" width="100%" height="100%"></img>
        </Box>
        <Typography variant='h5'>EchoNorへようこそ</Typography>
        <Typography variant="body1">
            EchoNor（エコノア）は「繋がらないSNS」というコンセプトを持つ匿名性を重視したSNSです。
            EchoNorではユーザーのプライバシーと安全性が最優先され、自由に意見や感情を表現することができます。
        </Typography>

    </>,
    <>
        <Typography variant='h5'>EchoNorの特徴</Typography>
        <Typography variant="body1">
            EchoNorでは、ユーザーの名前や身元が他のユーザーに知られることはありません。
            投稿の追跡も不可能であり、フォローやダイレクトメッセージのような直接的なつながりも存在しません。
            これにより、安心して自分の思いを共有することが可能です。
        </Typography>
    </>,
    <>
        <Typography variant='h5'>EchoNorの使い方</Typography>
        <Typography variant="body1">
            EchoNorでは、投稿に対してリアクションを送ることができます。
            リアクションは、投稿に対して「いいね」や「悲しい」などの感情を表すことができます。
            また、リアクションを送ることで、投稿をブックマークすることもできます。
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
    </>,
    ]
    

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>モーダルを開く</Button>
            <Modal open={isOpen} sx={{m: 2}}>
                <Paper sx={{backgroundColor: "#ADD8E6", p: 2}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box sx={{p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%"}}>
                                <Swiper
                                spaceBetween={50}
                                slidesPerView={1}
                                ref={swiperRef}
                                >
                                    {intoroductionContents.map((content) => (
                                        <SwiperSlide>
                                            <Card>
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
                            <Button onClick={() => setIsOpen(false)}>閉じる</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </>
      );
}

export default Introduction;
