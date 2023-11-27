import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Box, Button, Card, CardContent, Modal, Paper, Typography } from '@mui/material';
import SwiperCore from 'swiper';
import logo from "../images/echonor_logo_resize_comp.png";
import { useRef, useState } from 'react';

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

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>モーダルを開く</Button>
            <Modal open={isOpen}>
                <Paper sx={{backgroundColor: "#ADD8E6", p: 2}}>
                    <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    ref={swiperRef}
                    >
                        <SwiperSlide>
                            <Card>
                                <CardContent>
                                    <Box>
                                        <img src={logo} alt="logo" width="100%" height="100%"></img>
                                    </Box>
                                    <Typography variant='h4'>EchoNorへようこそ</Typography>
                                    <Typography>EchoNorは、匿名性を重視した「繋がらないSNS」です。</Typography>
                                    <Typography>誰かがあなたの名前を知ることも、フォローしてくることもありません。</Typography>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card sx={{width: 300}}>
                                <CardContent>
                                    <h2>2</h2>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card sx={{width: 300}}>
                                <CardContent>
                                    <h2>3</h2>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card sx={{width: 300}}>
                                <CardContent>
                                    <h2>1</h2>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card sx={{width: 300}}>
                                <CardContent>
                                    <h2>2</h2>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card sx={{width: 300}}>
                                <CardContent>
                                    <h2>3</h2>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    </Swiper>

                    <Button onClick={() => setIsOpen(false)}>閉じる</Button>
                    <Button onClick={goToPrevSlide}>前へ</Button>
                    <Button onClick={goToNextSlide}>次へ</Button>
                    
                    
                </Paper>
            </Modal>
        </>
      );
}

export default Introduction;
